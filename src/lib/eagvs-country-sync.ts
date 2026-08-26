import { prisma } from "@/lib/prisma";
import {
  parseCountryDetailSectionsJson,
  serializeCountryDetailSections,
  type CountryDetailSection,
} from "@/lib/country-detail";
import { importEagvsDocument, fileNameFromEagvsAssetUrl } from "@/lib/eagvs-document-import";
import { findExistingDocumentMatch, findExistingProgramMatch } from "@/lib/eagvs-dedupe";
import { importEagvsPage } from "@/lib/eagvs-import";
import { scrapeEagvsCountryHub } from "@/lib/eagvs-country-hub-scrape";
import { matchCountrySlugFromEagvsUrl, scrapeEagvsPage, slugFromEagvsUrl } from "@/lib/eagvs-scrape";

export type EagvsCountrySyncResult = {
  countryId: string;
  countrySlug: string;
  countryName: string;
  detailSectionCount: number;
  detailUpdated: boolean;
  sidebarLinkCount: number;
  programs: Array<{ title: string; slug: string; groupTitle: string }>;
  documents: Array<{ fileName: string; label: string; publicPath: string }>;
  skipped: Array<{ label: string; url: string; reason: string }>;
  failed: Array<{ label: string; url: string; message: string }>;
};

export async function importEagvsCountryHub(options: {
  url: string;
  countryId?: string;
  /** Sadece ülke detay bölümlerini güncelle; sol panel program/döküman tarama. */
  detailOnly?: boolean;
  /** Detay bölümü zaten doluysa ağ isteği yapmadan atla. */
  skipIfHasDetail?: boolean;
}): Promise<EagvsCountrySyncResult> {
  const activeCountries = await prisma.country.findMany({
    where: { isActive: true },
    select: { id: true, slug: true, name: true, detailSectionsJson: true },
  });

  const countryFromId = options.countryId
    ? activeCountries.find((row) => row.id === options.countryId)
    : null;

  if (options.countryId && !countryFromId) {
    throw new Error("Ülke bulunamadı. Linkten algılanamadıysa ülkeyi manuel seçin.");
  }

  if (options.skipIfHasDetail && countryFromId) {
    const existingCount = parseCountryDetailSectionsJson(
      countryFromId.detailSectionsJson,
    ).length;
    if (existingCount > 0) {
      return {
        countryId: countryFromId.id,
        countrySlug: countryFromId.slug,
        countryName: countryFromId.name,
        detailSectionCount: existingCount,
        detailUpdated: false,
        sidebarLinkCount: 0,
        programs: [],
        documents: [],
        skipped: [
          {
            label: countryFromId.name,
            url: options.url,
            reason: `Detay içeriği zaten mevcut (${existingCount} bölüm)`,
          },
        ],
        failed: [],
      };
    }
  }

  const hub = await scrapeEagvsCountryHub(options.url);

  const country =
    countryFromId ??
    activeCountries.find(
      (row) =>
        row.slug ===
        matchCountrySlugFromEagvsUrl(
          hub.url,
          activeCountries.map((c) => c.slug),
        ),
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

  const programs: EagvsCountrySyncResult["programs"] = [];
  const documents: EagvsCountrySyncResult["documents"] = [];
  const skipped: EagvsCountrySyncResult["skipped"] = [];
  const failed: EagvsCountrySyncResult["failed"] = [];

  if (options.detailOnly) {
    return {
      countryId: country.id,
      countrySlug: country.slug,
      countryName: country.name,
      detailSectionCount,
      detailUpdated: true,
      sidebarLinkCount: hub.sidebarLinks.length,
      programs,
      documents,
      skipped,
      failed,
    };
  }

  const existingPrograms = await prisma.visaProgram.findMany({
    where: { countryId: country.id },
    select: { id: true, slug: true, name: true },
  });

  const existingDocuments = await prisma.siteAsset.findMany({
    where: { countryId: country.id },
    select: { id: true, fileName: true },
  });

  let programSortOrder = await prisma.visaProgram.count({
    where: { countryId: country.id },
  });

  for (const link of hub.sidebarLinks) {
    if (link.type === "skip") {
      skipped.push({
        label: link.label,
        url: link.url,
        reason: "Atlanan link türü",
      });
      continue;
    }

    if (link.type === "document") {
      const duplicateDocument = findExistingDocumentMatch(
        existingDocuments,
        fileNameFromEagvsAssetUrl(link.url),
        link.label,
      );
      if (duplicateDocument) {
        skipped.push({
          label: link.label,
          url: link.url,
          reason: `Döküman zaten mevcut (${duplicateDocument.fileName})`,
        });
        continue;
      }

      try {
        const result = await importEagvsDocument({
          url: link.url,
          countryId: country.id,
          label: link.label,
          skipIfExists: true,
        });

        if (result.skipped) {
          skipped.push({
            label: link.label,
            url: link.url,
            reason: `Döküman zaten mevcut (${result.fileName})`,
          });
        } else {
          documents.push({
            fileName: result.fileName,
            label: result.label,
            publicPath: result.publicPath,
          });
          existingDocuments.push({ id: result.entityId, fileName: result.fileName });
        }
      } catch (error) {
        failed.push({
          label: link.label,
          url: link.url,
          message: error instanceof Error ? error.message : "Döküman aktarılamadı",
        });
      }
      continue;
    }

    const programSlug = slugFromEagvsUrl(link.url);
    if (!programSlug) {
      failed.push({
        label: link.label,
        url: link.url,
        message: "Program slug belirlenemedi",
      });
      continue;
    }

    const duplicateProgram = findExistingProgramMatch(existingPrograms, {
      slug: programSlug,
      label: link.label,
    });

    if (duplicateProgram) {
      skipped.push({
        label: link.label,
        url: link.url,
        reason: `Program zaten mevcut (${duplicateProgram.slug})`,
      });
      continue;
    }

    try {
      programSortOrder += 1;
      const scraped = await scrapeEagvsPage(link.url);
      const duplicateAfterScrape = findExistingProgramMatch(existingPrograms, {
        slug: programSlug,
        label: link.label,
        title: scraped.h1Title,
      });

      if (duplicateAfterScrape) {
        skipped.push({
          label: link.label,
          url: link.url,
          reason: `Program zaten mevcut (${duplicateAfterScrape.slug})`,
        });
        continue;
      }

      const result = await importEagvsPage({
        url: link.url,
        countryId: country.id,
        contentType: "program",
        scrapedPage: scraped,
        categoryMatchContext: {
          groupTitle: link.groupTitle,
          linkLabel: link.label,
          url: link.url,
        },
        sortOrder: programSortOrder,
        skipIfExists: true,
      });

      if (result.skipped) {
        skipped.push({
          label: link.label,
          url: link.url,
          reason: `Program zaten mevcut (${result.slug})`,
        });
        continue;
      }

      programs.push({
        title: result.title,
        slug: result.slug,
        groupTitle: link.groupTitle,
      });
      existingPrograms.push({
        id: result.entityId,
        slug: result.slug,
        name: result.title,
      });
    } catch (error) {
      failed.push({
        label: link.label,
        url: link.url,
        message: error instanceof Error ? error.message : "Program aktarılamadı",
      });
    }
  }

  const expectedProgramLinks = hub.sidebarLinks.filter((link) => link.type === "rehber");
  const handledProgramLinks =
    programs.length +
    skipped.filter((item) => item.reason.startsWith("Program zaten mevcut")).length +
    failed.filter((item) => expectedProgramLinks.some((link) => link.url === item.url)).length;

  if (handledProgramLinks < expectedProgramLinks.length) {
    throw new Error(
      `Sol panel program linklerinin tamamı işlenemedi (${handledProgramLinks}/${expectedProgramLinks.length}).`,
    );
  }

  const expectedDocumentLinks = hub.sidebarLinks.filter((link) => link.type === "document");
  const handledDocumentLinks =
    documents.length +
    skipped.filter((item) => item.reason.startsWith("Döküman zaten mevcut")).length +
    failed.filter((item) => expectedDocumentLinks.some((link) => link.url === item.url)).length;

  if (handledDocumentLinks < expectedDocumentLinks.length) {
    throw new Error(
      `Dilekçe ve formlar linklerinin tamamı işlenemedi (${handledDocumentLinks}/${expectedDocumentLinks.length}).`,
    );
  }

  if (failed.length > 0) {
    throw new Error(
      failed.map((item) => `${item.label}: ${item.message}`).join(" | "),
    );
  }

  return {
    countryId: country.id,
    countrySlug: country.slug,
    countryName: country.name,
    detailSectionCount,
    detailUpdated: true,
    sidebarLinkCount: hub.sidebarLinks.length,
    programs,
    documents,
    skipped,
    failed,
  };
}
