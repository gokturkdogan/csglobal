import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { scrapeEagvsCountryHub } from "@/lib/eagvs-country-hub-scrape";
import {
  scrapeEagvsPage,
  slugFromEagvsUrl,
  type EagvsScrapedSection,
} from "@/lib/eagvs-scrape";
import {
  parseServiceSectionsJson,
  serializeServiceSections,
  type ServiceContentSection,
} from "@/lib/service-page";
import { buildVisaProgramPath } from "@/lib/paths";
import {
  PROGRAM_CONTENT_TRUNCATION_RATIO,
  PROGRAM_REPAIR_BATCH_SIZE,
} from "@/lib/eagvs-program-repair-constants";

export { PROGRAM_CONTENT_TRUNCATION_RATIO, PROGRAM_REPAIR_BATCH_SIZE };

export type ProgramRepairQueueItem = {
  countryId: string;
  countryName: string;
  countrySlug: string;
  programId: string;
  programName: string;
  programSlug: string;
  eagvsUrl: string;
  eagvsLabel: string;
  dbCharCount: number;
};

export type ProgramRepairPreviewRow = {
  countryId: string;
  countryName: string;
  countrySlug: string;
  programId: string;
  programName: string;
  programSlug: string;
  eagvsUrl: string;
  eagvsLabel: string;
  dbCharCount: number;
  liveCharCount: number;
  ratio: number;
  needsRepair: boolean;
};

export type ProgramRepairStatus = "fixed" | "skipped" | "error";

export type ProgramRepairResult = {
  programId: string;
  programName: string;
  countryName: string;
  countrySlug: string;
  programSlug: string;
  status: ProgramRepairStatus;
  message: string;
  dbCharCount: number;
  liveCharCount: number;
};

export type ProgramRepairCountrySummary = {
  countryId: string;
  countryName: string;
  countrySlug: string;
  eagvsUrl: string;
  programCount: number;
};

function plainLen(html: string): number {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().length;
}

export function plainCharTotalFromSections(
  sections: Array<{ content: string }>,
): number {
  return sections.reduce((sum, section) => sum + plainLen(section.content), 0);
}

export function plainCharTotalFromSectionsJson(json: string | null | undefined): number {
  return plainCharTotalFromSections(parseServiceSectionsJson(json));
}

export function needsProgramContentRepair(dbTotal: number, liveTotal: number): boolean {
  if (liveTotal <= 0) return false;
  return dbTotal < liveTotal * PROGRAM_CONTENT_TRUNCATION_RATIO;
}

function excerptFromSections(sections: EagvsScrapedSection[]): string | null {
  const intro = sections[0]?.content ?? "";
  const text = intro.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (!text) return null;
  return text.length > 220 ? `${text.slice(0, 217)}...` : text;
}

export async function listProgramRepairCountries(): Promise<ProgramRepairCountrySummary[]> {
  const countries = await prisma.country.findMany({
    where: { isActive: true },
    select: { id: true, name: true, slug: true },
    orderBy: { name: "asc" },
  });

  const counts = await prisma.visaProgram.groupBy({
    by: ["countryId"],
    _count: { _all: true },
  });
  const countMap = new Map(counts.map((row) => [row.countryId, row._count._all]));

  return countries
    .filter((country) => (countMap.get(country.id) ?? 0) > 0)
    .map((country) => ({
      countryId: country.id,
      countryName: country.name,
      countrySlug: country.slug,
      eagvsUrl: "",
      programCount: countMap.get(country.id) ?? 0,
    }));
}

export async function buildProgramRepairQueueForCountry(
  countryId: string,
  eagvsHubUrl: string,
): Promise<ProgramRepairQueueItem[]> {
  const country = await prisma.country.findFirst({
    where: { id: countryId, isActive: true },
    select: { id: true, name: true, slug: true },
  });
  if (!country) {
    throw new Error("Ülke bulunamadı.");
  }

  const hub = await scrapeEagvsCountryHub(eagvsHubUrl);
  const programLinks = hub.sidebarLinks.filter((link) => link.type === "rehber");

  const dbPrograms = await prisma.visaProgram.findMany({
    where: { countryId: country.id },
    select: {
      id: true,
      name: true,
      slug: true,
      sectionsJson: true,
    },
  });
  const dbBySlug = new Map(dbPrograms.map((program) => [program.slug, program]));

  const items: ProgramRepairQueueItem[] = [];
  const seenProgramIds = new Set<string>();

  for (const link of programLinks) {
    const slug = slugFromEagvsUrl(link.url);
    const program = dbBySlug.get(slug);
    if (!program) continue;
    if (seenProgramIds.has(program.id)) continue;
    seenProgramIds.add(program.id);

    items.push({
      countryId: country.id,
      countryName: country.name,
      countrySlug: country.slug,
      programId: program.id,
      programName: program.name,
      programSlug: program.slug,
      eagvsUrl: link.url,
      eagvsLabel: link.label,
      dbCharCount: plainCharTotalFromSectionsJson(program.sectionsJson),
    });
  }

  return items;
}

export async function previewProgramRepairItem(
  programId: string,
  eagvsUrl: string,
): Promise<ProgramRepairPreviewRow> {
  const program = await prisma.visaProgram.findUnique({
    where: { id: programId },
    select: {
      id: true,
      name: true,
      slug: true,
      sectionsJson: true,
      country: { select: { id: true, name: true, slug: true } },
    },
  });

  if (!program) {
    throw new Error("Program bulunamadı.");
  }

  const dbCharCount = plainCharTotalFromSectionsJson(program.sectionsJson);
  let liveCharCount = 0;
  let ratio = 0;

  try {
    const scraped = await scrapeEagvsPage(eagvsUrl);
    liveCharCount = plainCharTotalFromSections(scraped.sections);
    ratio = liveCharCount > 0 ? dbCharCount / liveCharCount : 0;
  } catch {
    liveCharCount = 0;
    ratio = 0;
  }

  return {
    countryId: program.country.id,
    countryName: program.country.name,
    countrySlug: program.country.slug,
    programId: program.id,
    programName: program.name,
    programSlug: program.slug,
    eagvsUrl,
    eagvsLabel: program.name,
    dbCharCount,
    liveCharCount,
    ratio,
    needsRepair: needsProgramContentRepair(dbCharCount, liveCharCount),
  };
}

export async function previewProgramRepairForCountry(
  countryId: string,
  eagvsHubUrl: string,
): Promise<ProgramRepairPreviewRow[]> {
  const queue = await buildProgramRepairQueueForCountry(countryId, eagvsHubUrl);
  const rows: ProgramRepairPreviewRow[] = [];

  for (const item of queue) {
    try {
      rows.push(await previewProgramRepairItem(item.programId, item.eagvsUrl));
    } catch {
      rows.push({
        ...item,
        liveCharCount: 0,
        ratio: 0,
        needsRepair: false,
      });
    }
  }

  return rows;
}

export async function repairProgramContentFromEagvs(
  programId: string,
  eagvsUrl: string,
): Promise<ProgramRepairResult> {
  const program = await prisma.visaProgram.findUnique({
    where: { id: programId },
    select: {
      id: true,
      name: true,
      slug: true,
      sectionsJson: true,
      country: { select: { name: true, slug: true } },
    },
  });

  if (!program) {
    return {
      programId,
      programName: "",
      countryName: "",
      countrySlug: "",
      programSlug: "",
      status: "error",
      message: "Program bulunamadı.",
      dbCharCount: 0,
      liveCharCount: 0,
    };
  }

  const dbCharCount = plainCharTotalFromSectionsJson(program.sectionsJson);

  try {
    const scraped = await scrapeEagvsPage(eagvsUrl);
    const sections = scraped.sections as ServiceContentSection[];
    const liveCharCount = plainCharTotalFromSections(sections);

    if (sections.length === 0) {
      return {
        programId: program.id,
        programName: program.name,
        countryName: program.country.name,
        countrySlug: program.country.slug,
        programSlug: program.slug,
        status: "error",
        message: "EAGVS sayfasından bölüm çıkarılamadı.",
        dbCharCount,
        liveCharCount: 0,
      };
    }

    if (!needsProgramContentRepair(dbCharCount, liveCharCount)) {
      return {
        programId: program.id,
        programName: program.name,
        countryName: program.country.name,
        countrySlug: program.country.slug,
        programSlug: program.slug,
        status: "skipped",
        message: `Atlandı: içerik yeterli (DB ${dbCharCount}, canlı ${liveCharCount}).`,
        dbCharCount,
        liveCharCount,
      };
    }

    if (liveCharCount <= dbCharCount) {
      return {
        programId: program.id,
        programName: program.name,
        countryName: program.country.name,
        countrySlug: program.country.slug,
        programSlug: program.slug,
        status: "skipped",
        message: `Atlandı: canlı içerik DB'den kısa (DB ${dbCharCount}, canlı ${liveCharCount}).`,
        dbCharCount,
        liveCharCount,
      };
    }

    const sectionsJson = serializeServiceSections(sections);
    const shortDescription = excerptFromSections(scraped.sections);

    await prisma.visaProgram.update({
      where: { id: program.id },
      data: {
        sectionsJson,
        shortDescription,
        excerpt: shortDescription,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/vize-programlari");
    revalidatePath(`/${program.country.slug}`);
    revalidatePath(buildVisaProgramPath(program.country.slug, program.slug));

    return {
      programId: program.id,
      programName: program.name,
      countryName: program.country.name,
      countrySlug: program.country.slug,
      programSlug: program.slug,
      status: "fixed",
      message: `Düzeltildi: ${dbCharCount} → ${liveCharCount} karakter.`,
      dbCharCount,
      liveCharCount,
    };
  } catch (error) {
    return {
      programId: program.id,
      programName: program.name,
      countryName: program.country.name,
      countrySlug: program.country.slug,
      programSlug: program.slug,
      status: "error",
      message:
        error instanceof Error ? error.message : "Program içeriği güncellenemedi.",
      dbCharCount,
      liveCharCount: 0,
    };
  }
}
