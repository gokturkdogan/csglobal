import { prisma } from "@/lib/prisma";
import { serializeConsulateSections, type ConsulateSection } from "@/lib/consulate";
import { buildConsulatePath } from "@/lib/paths";
import {
  matchCountrySlugFromEagvsUrl,
  normalizeEagvsUrl,
  slugFromEagvsUrl,
} from "@/lib/eagvs-scrape";
import { scrapeEagvsConsulatePage } from "@/lib/eagvs-consulate-scrape";

export type EagvsConsulateImportResult = {
  name: string;
  slug: string;
  sectionCount: number;
  countrySlug: string;
  entityId: string;
  editPath: string;
  publicPath: string;
  mapEmbedUrl: string | null;
  mapAddress: string | null;
};

export async function importEagvsConsulate(options: {
  url: string;
  countryId?: string;
  slug?: string;
}): Promise<EagvsConsulateImportResult> {
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
      "Ülke linkten algılanamadı. Geçerli bir EAGVS ülke linki girin veya ülkeyi manuel seçin.",
    );
  }

  const slug = options.slug?.trim() || slugFromEagvsUrl(url);
  if (!slug) {
    throw new Error("Slug belirlenemedi.");
  }

  const scraped = await scrapeEagvsConsulatePage(url);
  const name = scraped.h1Title.trim() || slug;
  const sections = scraped.sections as ConsulateSection[];

  if (sections.length === 0) {
    throw new Error("Sayfadan bölüm çıkarılamadı.");
  }

  const sectionsJson = serializeConsulateSections(sections);
  const sectionCount = JSON.parse(sectionsJson).length;
  if (sectionCount === 0) {
    throw new Error("Geçerli bölüm kaydedilemedi.");
  }

  const consulateCount = await prisma.consulate.count({
    where: { countryId: country.id },
  });

  const consulate = await prisma.consulate.upsert({
    where: { countryId_slug: { countryId: country.id, slug } },
    create: {
      countryId: country.id,
      name,
      slug,
      heroTitle: name,
      sectionsJson,
      mapEmbedUrl: scraped.mapEmbedUrl,
      mapAddress: scraped.mapAddress,
      isActive: true,
      sortOrder: consulateCount + 1,
    },
    update: {
      name,
      heroTitle: name,
      sectionsJson,
      mapEmbedUrl: scraped.mapEmbedUrl,
      mapAddress: scraped.mapAddress,
      isActive: true,
    },
  });

  return {
    name,
    slug,
    sectionCount,
    countrySlug: country.slug,
    entityId: consulate.id,
    editPath: `/admin/consulates/${consulate.id}`,
    publicPath: buildConsulatePath(country.slug, slug),
    mapEmbedUrl: scraped.mapEmbedUrl,
    mapAddress: scraped.mapAddress,
  };
}

export type EagvsConsulateBatchImportResult = {
  succeeded: EagvsConsulateImportResult[];
  failed: Array<{ url: string; message: string }>;
};

export async function importEagvsConsulates(options: {
  urls: string[];
  countryId?: string;
}): Promise<EagvsConsulateBatchImportResult> {
  const urls = options.urls.map((url) => url.trim()).filter(Boolean);
  if (urls.length === 0) {
    throw new Error("En az bir EAGVS linki girin.");
  }

  const succeeded: EagvsConsulateImportResult[] = [];
  const failed: Array<{ url: string; message: string }> = [];

  for (const url of urls) {
    try {
      const result = await importEagvsConsulate({
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
        : "Hiçbir konsolosluk içe aktarılamadı.",
    );
  }

  return { succeeded, failed };
}
