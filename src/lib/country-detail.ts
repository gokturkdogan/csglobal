import { normalizeRichTextContent } from "@/lib/rich-text";
import { normalizePageSortOrder } from "@/lib/service-constants";

export const COUNTRY_NOTES_MAX = 10;
export const COUNTRY_FAQ_MAX = 5;
export const COUNTRY_SHORT_DESCRIPTION_MAX = 100;

export type CountryDetailSection = {
  title: string;
  content: string;
  sortOrder?: number;
};

export function parseCountryNotesJson(json: string | null | undefined): string[] {
  if (!json?.trim()) return [];
  try {
    const parsed = JSON.parse(json) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
      .slice(0, COUNTRY_NOTES_MAX);
  } catch {
    return [];
  }
}

export function buildCountryQuickStats(country: {
  name: string;
  visaRegion?: string | null;
  averageProcessingTime?: string | null;
  requiresAppointment: boolean;
  categoryCount: number;
}) {
  const stats: { label: string; value: string }[] = [];

  if (country.visaRegion?.trim()) {
    stats.push({ label: "Vize bölgesi", value: country.visaRegion.trim() });
  }

  if (country.averageProcessingTime?.trim()) {
    stats.push({
      label: "Ortalama işlem süresi",
      value: country.averageProcessingTime.trim(),
    });
  }

  stats.push({
    label: "Randevu",
    value: country.requiresAppointment ? "Zorunlu" : "Ülkeye bağlı",
  });

  stats.push({
    label: "Program alanı",
    value: `${country.categoryCount} kategori`,
  });

  return stats;
}

/** Hero alt metin; en fazla COUNTRY_SHORT_DESCRIPTION_MAX karakter. */
export function normalizeCountryShortDescription(
  value: string | null | undefined,
): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, COUNTRY_SHORT_DESCRIPTION_MAX);
}

/** Satır sonları ve iç boşluklar korunur; yalnızca baş/son trim edilir. */
export function normalizeMultilineText(value: string | null | undefined): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.replace(/\r\n/g, "\n").trim();
  return normalized.length > 0 ? normalized : null;
}

export function buildCountryDetailParagraphs(country: {
  detailParagraph1?: string | null;
  detailParagraph2?: string | null;
}): string[] {
  return [country.detailParagraph1, country.detailParagraph2]
    .map((p) => normalizeMultilineText(p))
    .filter((p): p is string => p !== null);
}

export function parseCountryDetailSectionsJson(
  json: string | null | undefined,
): CountryDetailSection[] {
  if (!json?.trim()) return [];
  try {
    const parsed = JSON.parse(json) as unknown;
    if (!Array.isArray(parsed)) return [];

    const sections: CountryDetailSection[] = [];
    for (const [index, item] of parsed.entries()) {
      if (!item || typeof item !== "object") continue;
      const record = item as { title?: unknown; content?: unknown; sortOrder?: unknown };
      const title = typeof record.title === "string" ? record.title.trim() : "";
      const content = normalizeRichTextContent(
        typeof record.content === "string" ? record.content : "",
      );
      if (!title || !content) continue;
      sections.push({
        title,
        content,
        sortOrder: normalizePageSortOrder(record.sortOrder, index + 1),
      });
    }

    const indexed = sections.map((section, index) => ({ section, index }));
    indexed.sort(
      (a, b) =>
        (a.section.sortOrder ?? 0) - (b.section.sortOrder ?? 0) || a.index - b.index,
    );
    return indexed.map(({ section }) => section);
  } catch {
    return [];
  }
}

export function serializeCountryDetailSections(sections: CountryDetailSection[]): string {
  const valid = sections
    .map((section, index) => ({
      title: section.title.trim(),
      content: normalizeRichTextContent(section.content) ?? "",
      sortOrder: normalizePageSortOrder(section.sortOrder, index + 1),
    }))
    .filter((section) => section.title && section.content);

  return JSON.stringify(valid);
}
