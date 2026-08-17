import { prisma } from "@/lib/prisma";
import { serializeServiceSections, type ServiceContentSection } from "@/lib/service-page";
import { buildBlogPath } from "@/lib/paths";
import {
  isJunkEagvsSection,
  sanitizeEagvsSectionContent,
} from "@/lib/eagvs-content-sanitize";
import {
  normalizeEagvsUrl,
  scrapeEagvsPage,
  slugFromEagvsUrl,
  matchCountrySlugFromEagvsUrl,
  type EagvsScrapedPage,
  type EagvsScrapedSection,
} from "@/lib/eagvs-scrape";

export type EagvsBlogImportResult = {
  title: string;
  slug: string;
  sectionCount: number;
  countrySlug: string | null;
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

/** Başlıksız bloklar için blog adını veya sıra numarasını kullanır. */
export function prepareBlogSectionsFromEagvs(
  blogTitle: string,
  sections: EagvsScrapedSection[],
): ServiceContentSection[] {
  const trimmedTitle = blogTitle.trim();
  const prepared: ServiceContentSection[] = [];

  for (let i = 0; i < sections.length; i++) {
    const raw = sections[i];
    const content = sanitizeEagvsSectionContent(raw.content ?? "");
    if (!content || /^<p>\s*<\/p>$/i.test(content)) continue;

    let sectionTitle = raw.title?.trim() ?? "";
    if (!sectionTitle) {
      sectionTitle =
        prepared.length === 0 && trimmedTitle
          ? trimmedTitle
          : `Bölüm ${prepared.length + 1}`;
    }

    if (isJunkEagvsSection(sectionTitle, content)) continue;

    prepared.push({ title: sectionTitle, content });
  }

  if (prepared.length === 0) {
    throw new Error("Geçerli bölüm kaydedilemedi.");
  }

  return prepared;
}

async function resolveCountryFromImport(
  url: string,
  countryId?: string,
): Promise<{ id: string; slug: string } | null> {
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

  if (countryFromUrl) {
    return countryFromUrl;
  }

  if (countryId) {
    const selected = activeCountries.find((row) => row.id === countryId);
    if (!selected) {
      throw new Error("Seçilen ülke bulunamadı veya aktif değil.");
    }
    return selected;
  }

  return null;
}

async function upsertBlogPost(
  countryId: string | null,
  slug: string,
  title: string,
  sections: ServiceContentSection[],
): Promise<string> {
  const sectionsJson = serializeServiceSections(sections);
  const excerpt = excerptFromSections(
    sections.map((section) => ({ title: section.title, content: section.content })),
  );

  const post = await prisma.blogPost.upsert({
    where: { slug },
    create: {
      slug,
      title,
      excerpt,
      content: "",
      heroTitle: title,
      sectionsJson,
      countryId,
      isActive: true,
      publishedAt: new Date(),
    },
    update: {
      title,
      excerpt,
      heroTitle: title,
      sectionsJson,
      countryId,
      isActive: true,
      publishedAt: new Date(),
    },
  });

  return post.id;
}

export async function importEagvsBlogPage(options: {
  url: string;
  countryId?: string;
  slug?: string;
  scrapedPage?: EagvsScrapedPage;
}): Promise<EagvsBlogImportResult> {
  const url = normalizeEagvsUrl(options.url);
  const country = await resolveCountryFromImport(url, options.countryId);

  const scraped = options.scrapedPage ?? (await scrapeEagvsPage(url));
  const slug = options.slug?.trim() || slugFromEagvsUrl(url);
  if (!slug) {
    throw new Error("Slug belirlenemedi.");
  }

  const title = scraped.h1Title.trim() || slug;
  const sections = prepareBlogSectionsFromEagvs(title, scraped.sections);

  const sectionsJson = serializeServiceSections(sections);
  const sectionCount = JSON.parse(sectionsJson).length;
  if (sectionCount === 0) {
    throw new Error("Geçerli bölüm kaydedilemedi.");
  }

  const entityId = await upsertBlogPost(country?.id ?? null, slug, title, sections);

  return {
    title,
    slug,
    sectionCount,
    countrySlug: country?.slug ?? null,
    entityId,
    editPath: `/admin/bloglar/${entityId}`,
    publicPath: buildBlogPath(slug),
  };
}

export type EagvsBlogBatchImportResult = {
  succeeded: EagvsBlogImportResult[];
  failed: Array<{ url: string; message: string }>;
};

export async function importEagvsBlogPages(options: {
  urls: string[];
  countryId?: string;
}): Promise<EagvsBlogBatchImportResult> {
  const urls = options.urls.map((url) => url.trim()).filter(Boolean);
  if (urls.length === 0) {
    throw new Error("En az bir EAGVS linki girin.");
  }

  const succeeded: EagvsBlogImportResult[] = [];
  const failed: Array<{ url: string; message: string }> = [];

  for (const url of urls) {
    try {
      const result = await importEagvsBlogPage({
        url,
        countryId: options.countryId,
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
