import { prisma } from "@/lib/prisma";
import {
  serializeServiceSections,
  type ServiceContentSection,
} from "@/lib/service-page";
import { buildVisaProgramPath } from "@/lib/paths";
import {
  normalizeEagvsUrl,
  scrapeEagvsPage,
  slugFromEagvsUrl,
  matchCountrySlugFromEagvsUrl,
  matchCategoryIdFromEagvsUrl,
  type EagvsScrapedPage,
  type EagvsScrapedSection,
} from "@/lib/eagvs-scrape";
import {
  ensureEagvsCategoryId,
  loadActiveEagvsCategories,
} from "@/lib/eagvs-category-resolve";
import type { EagvsCategoryMatchContext } from "@/lib/eagvs-category-match";

export type EagvsContentType = "program";

export type EagvsImportResult = {
  title: string;
  slug: string;
  contentType: EagvsContentType;
  sectionCount: number;
  countrySlug: string;
  entityId: string;
  editPath: string;
  publicPath: string;
};

function excerptFromSections(sections: EagvsScrapedSection[]): string | null {
  const intro = sections[0]?.content ?? "";
  const text = intro.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (!text) return null;
  return text.length > 220 ? `${text.slice(0, 217)}...` : text;
}

async function upsertVisaProgram(
  countryId: string,
  categoryId: string,
  slug: string,
  title: string,
  sections: ServiceContentSection[],
): Promise<string> {
  const sectionsJson = serializeServiceSections(sections);
  const shortDescription = excerptFromSections(sections);
  const excerpt = shortDescription;

  const programCount = await prisma.visaProgram.count({ where: { countryId } });

  const program = await prisma.visaProgram.upsert({
    where: { countryId_slug: { countryId, slug } },
    create: {
      countryId,
      categoryId,
      name: title,
      slug,
      shortDescription,
      excerpt,
      content: "",
      heroTitle: title,
      sectionsJson,
      isActive: true,
      showInCategoryPanel: true,
      sortOrder: programCount + 1,
      publishedAt: new Date(),
    },
    update: {
      categoryId,
      name: title,
      shortDescription,
      excerpt,
      heroTitle: title,
      sectionsJson,
      isActive: true,
      showInCategoryPanel: true,
      publishedAt: new Date(),
    },
  });

  await prisma.visaProgramCategoryLink.deleteMany({
    where: { visaProgramId: program.id },
  });
  await prisma.visaProgramCategoryLink.create({
    data: { visaProgramId: program.id, categoryId },
  });

  return program.id;
}

export async function importEagvsPage(options: {
  url: string;
  countryId?: string;
  categoryId?: string;
  preferFormCategory?: boolean;
  contentType: EagvsContentType;
  slug?: string;
  scrapedPage?: EagvsScrapedPage;
}): Promise<EagvsImportResult> {
  const url = normalizeEagvsUrl(options.url);

  const activeCountries = await prisma.country.findMany({
    where: { isActive: true },
    select: { id: true, slug: true },
  });

  const matchedSlug = matchCountrySlugFromEagvsUrl(
    url,
    activeCountries.map((row) => row.slug),
  );
  const countryFromUrl = matchedSlug
    ? activeCountries.find((row) => row.slug === matchedSlug)
    : null;

  const country = countryFromUrl
    ? await prisma.country.findFirst({
        where: { id: countryFromUrl.id, isActive: true },
        select: { id: true, slug: true },
      })
    : await prisma.country.findFirst({
        where: { id: options.countryId ?? "", isActive: true },
        select: { id: true, slug: true },
      });

  if (!country) {
    throw new Error(
      countryFromUrl
        ? "URL üzerinden ülke eşleşti ancak kayıt bulunamadı."
        : "Ülke linkten algılanamadı. Geçerli bir EAGVS ülke linki girin veya ülkeyi manuel seçin.",
    );
  }

  if (!countryFromUrl && options.countryId) {
    const selected = activeCountries.find((row) => row.id === options.countryId);
    if (!selected) {
      throw new Error("Seçilen ülke bulunamadı veya aktif değil.");
    }
  }

  const scraped = options.scrapedPage ?? (await scrapeEagvsPage(url));

  let effectiveCategoryId: string | undefined;
  if (options.preferFormCategory && options.categoryId) {
    effectiveCategoryId = options.categoryId;
  } else {
    const categories = await loadActiveEagvsCategories();
    const matchContext: EagvsCategoryMatchContext = {
      url,
      pageSidebarGroup: scraped.categoryContext.sidebarGroupTitle,
      breadcrumbActive: scraped.categoryContext.breadcrumbActive,
      pageSidebarActiveLabel: scraped.categoryContext.sidebarActiveLabel,
    };
    const fromPage = await ensureEagvsCategoryId(matchContext, categories);
    effectiveCategoryId =
      fromPage.categoryId ??
      matchCategoryIdFromEagvsUrl(url, categories) ??
      options.categoryId;
  }

  if (!effectiveCategoryId) {
    throw new Error(
      "Kategori eşleşmedi. Sayfa sidebar veya breadcrumb bilgisinden kategori çıkarılamadı.",
    );
  }

  const category = await prisma.category.findFirst({
    where: { id: effectiveCategoryId, isActive: true },
    select: { id: true },
  });
  if (!category) {
    throw new Error("Seçilen kategori bulunamadı veya aktif değil.");
  }

  const slug = options.slug?.trim() || slugFromEagvsUrl(url);
  if (!slug) {
    throw new Error("Slug belirlenemedi.");
  }

  const title = scraped.h1Title.trim() || slug;
  const sections = scraped.sections;

  if (sections.length === 0) {
    throw new Error("Sayfadan bölüm çıkarılamadı.");
  }

  const sectionsJson = serializeServiceSections(sections);
  const sectionCount = JSON.parse(sectionsJson).length;

  if (sectionCount === 0) {
    throw new Error("Geçerli bölüm kaydedilemedi.");
  }

  const entityId = await upsertVisaProgram(
    country.id,
    category.id,
    slug,
    title,
    sections,
  );

  return {
    title,
    slug,
    contentType: "program",
    sectionCount,
    countrySlug: country.slug,
    entityId,
    editPath: `/admin/vize-programlari/${entityId}`,
    publicPath: buildVisaProgramPath(country.slug, slug),
  };
}

export type EagvsBatchImportResult = {
  succeeded: EagvsImportResult[];
  failed: Array<{ url: string; message: string }>;
};

export async function importEagvsPages(options: {
  urls: string[];
  countryId?: string;
  categoryId?: string;
  preferFormCategory?: boolean;
  contentType: EagvsContentType;
}): Promise<EagvsBatchImportResult> {
  const urls = options.urls.map((url) => url.trim()).filter(Boolean);
  if (urls.length === 0) {
    throw new Error("En az bir EAGVS linki girin.");
  }

  const succeeded: EagvsImportResult[] = [];
  const failed: Array<{ url: string; message: string }> = [];

  for (const url of urls) {
    try {
      const result = await importEagvsPage({
        url,
        countryId: options.countryId,
        categoryId: options.categoryId,
        preferFormCategory: options.preferFormCategory,
        contentType: "program",
      });
      succeeded.push(result);
    } catch (error) {
      failed.push({
        url,
        message: error instanceof Error ? error.message : "İçe aktarma başarısız.",
      });
    }
  }

  if (succeeded.length === 0) {
    throw new Error(
      failed.length > 0
        ? failed.map((item) => `${item.url}: ${item.message}`).join(" | ")
        : "Hiçbir sayfa içe aktarılamadı.",
    );
  }

  return { succeeded, failed };
}
