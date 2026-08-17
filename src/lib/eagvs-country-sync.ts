import { prisma } from "@/lib/prisma";
import {
  parseCountryDetailSectionsJson,
  serializeCountryDetailSections,
  type CountryDetailSection,
} from "@/lib/country-detail";
import { importEagvsConsulate } from "@/lib/eagvs-consulate-import";
import { importEagvsBlogPage } from "@/lib/eagvs-blog-import";
import {
  scrapeEagvsCountryHub,
} from "@/lib/eagvs-country-hub-scrape";
import { matchCountrySlugFromEagvsUrl, scrapeEagvsPage } from "@/lib/eagvs-scrape";

export type EagvsCountrySyncResult = {
  countryId: string;
  countrySlug: string;
  countryName: string;
  detailSectionCount: number;
  blogs: Array<{ title: string; slug: string; groupTitle: string }>;
  consulates: Array<{ name: string; slug: string }>;
  skipped: Array<{ label: string; url: string; reason: string }>;
  failed: Array<{ label: string; url: string; message: string }>;
};

export async function importEagvsCountryHub(options: {
  url: string;
  countryId?: string;
}): Promise<EagvsCountrySyncResult> {
  const hub = await scrapeEagvsCountryHub(options.url);

  const activeCountries = await prisma.country.findMany({
    where: { isActive: true },
    select: { id: true, slug: true, name: true },
  });

  const country =
    options.countryId
      ? activeCountries.find((row) => row.id === options.countryId)
      : activeCountries.find(
          (row) =>
            row.slug === matchCountrySlugFromEagvsUrl(hub.url, activeCountries.map((c) => c.slug)),
        );

  if (!country) {
    throw new Error("Ülke bulunamadı. Linkten algılanamadıysa ülkeyi manuel seçin.");
  }

  const sections = hub.sections as CountryDetailSection[];
  if (sections.length === 0) {
    throw new Error("Ülke sayfasından bölüm çıkarılamadı.");
  }

  const sectionsJson = serializeCountryDetailSections(sections);
  const detailSectionCount = parseCountryDetailSectionsJson(sectionsJson).length;
  if (detailSectionCount === 0) {
    throw new Error("Ülke detay bölümleri kaydedilemedi.");
  }

  await prisma.country.update({
    where: { id: country.id },
    data: { detailSectionsJson: sectionsJson },
  });

  const blogs: EagvsCountrySyncResult["blogs"] = [];
  const consulates: EagvsCountrySyncResult["consulates"] = [];
  const skipped: EagvsCountrySyncResult["skipped"] = [];
  const failed: EagvsCountrySyncResult["failed"] = [];

  for (const link of hub.sidebarLinks) {
    if (link.type === "skip") {
      skipped.push({
        label: link.label,
        url: link.url,
        reason: "PDF / form grubu atlandı",
      });
      continue;
    }

    if (link.type === "consulate") {
      try {
        const result = await importEagvsConsulate({
          url: link.url,
          countryId: country.id,
        });
        consulates.push({ name: result.name, slug: result.slug });
      } catch (error) {
        failed.push({
          label: link.label,
          url: link.url,
          message: error instanceof Error ? error.message : "Konsolosluk aktarılamadı",
        });
      }
      continue;
    }

    try {
      const scraped = await scrapeEagvsPage(link.url);
      const result = await importEagvsBlogPage({
        url: link.url,
        countryId: country.id,
        scrapedPage: scraped,
      });
      blogs.push({
        title: result.title,
        slug: result.slug,
        groupTitle: link.groupTitle,
      });
    } catch (error) {
      failed.push({
        label: link.label,
        url: link.url,
        message: error instanceof Error ? error.message : "Blog aktarılamadı",
      });
    }
  }

  return {
    countryId: country.id,
    countrySlug: country.slug,
    countryName: country.name,
    detailSectionCount,
    blogs,
    consulates,
    skipped,
    failed,
  };
}
