export const COUNTRY_NOTES_MAX = 10;
export const COUNTRY_FAQ_MAX = 5;

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
    label: "Hizmet alanı",
    value: `${country.categoryCount} kategori`,
  });

  return stats;
}

export function buildCountryDetailParagraphs(country: {
  detailParagraph1?: string | null;
  detailParagraph2?: string | null;
}): string[] {
  return [country.detailParagraph1, country.detailParagraph2]
    .filter((p): p is string => typeof p === "string" && p.trim().length > 0)
    .map((p) => p.trim());
}
