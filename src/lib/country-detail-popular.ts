/** Ülke detay sayfası altındaki popüler ülkeler: 5 görünür + 1 yedek. */
export const COUNTRY_DETAIL_FEATURED_PRIMARY_COUNT = 5;
export const COUNTRY_DETAIL_FEATURED_SLOT_COUNT =
  COUNTRY_DETAIL_FEATURED_PRIMARY_COUNT + 1;

export type CountryFeaturedSlotOption = {
  name: string;
  slug: string;
  flag?: string | null;
};

export function parseCountryDetailPopularCountrySlugs(
  json: string | null | undefined,
): string[] {
  if (!json?.trim()) {
    return Array.from({ length: COUNTRY_DETAIL_FEATURED_SLOT_COUNT }, () => "");
  }
  try {
    const parsed = JSON.parse(json) as unknown;
    if (!Array.isArray(parsed)) {
      return Array.from({ length: COUNTRY_DETAIL_FEATURED_SLOT_COUNT }, () => "");
    }
    const slots: string[] = [];
    for (let i = 0; i < COUNTRY_DETAIL_FEATURED_SLOT_COUNT; i++) {
      const raw = parsed[i];
      slots.push(typeof raw === "string" ? raw.trim() : "");
    }
    return slots;
  } catch {
    return Array.from({ length: COUNTRY_DETAIL_FEATURED_SLOT_COUNT }, () => "");
  }
}

export function serializeCountryDetailPopularCountrySlugs(slugs: string[]): string {
  const padded = Array.from({ length: COUNTRY_DETAIL_FEATURED_SLOT_COUNT }, (_, i) =>
    (slugs[i] ?? "").trim(),
  );
  const hasAny = padded.some((slug) => slug.length > 0);
  return hasAny ? JSON.stringify(padded) : "";
}

export function normalizeCountryDetailPopularCountrySlugs(
  slugs: string[],
  countries: CountryFeaturedSlotOption[],
): string[] {
  const valid = new Set(countries.map((country) => country.slug));
  const picked: string[] = [];

  for (const slug of slugs) {
    if (!slug || !valid.has(slug) || picked.includes(slug)) continue;
    picked.push(slug);
    if (picked.length >= COUNTRY_DETAIL_FEATURED_SLOT_COUNT) break;
  }

  while (picked.length < COUNTRY_DETAIL_FEATURED_SLOT_COUNT) {
    picked.push("");
  }

  return picked.slice(0, COUNTRY_DETAIL_FEATURED_SLOT_COUNT);
}

/**
 * Ziyaret edilen ülke ilk 5 içindeyse kaldırılır, yedek (6. slot) listeye girer.
 * Aksi halde ilk 5 olduğu gibi gösterilir (en fazla 5 kart).
 */
export function resolveCountryDetailPopularDisplaySlugs(
  slots: string[],
  currentCountrySlug: string,
): string[] {
  const primary = slots
    .slice(0, COUNTRY_DETAIL_FEATURED_PRIMARY_COUNT)
    .map((slug) => slug.trim())
    .filter(Boolean);
  const backup = slots[COUNTRY_DETAIL_FEATURED_PRIMARY_COUNT]?.trim() ?? "";

  const display = [...primary];
  const selfIndex = display.indexOf(currentCountrySlug);
  if (selfIndex !== -1) {
    display.splice(selfIndex, 1);
    if (
      backup &&
      backup !== currentCountrySlug &&
      !display.includes(backup)
    ) {
      display.push(backup);
    }
  }

  return display.slice(0, COUNTRY_DETAIL_FEATURED_PRIMARY_COUNT);
}

export type CountryDetailPopularItem = {
  name: string;
  slug: string;
  shortDescription?: string | null;
  flag?: string | null;
  itemImage?: string | null;
  visaPrograms: { id: string }[];
};

export function pickCountryDetailPopularCountries(
  catalog: CountryDetailPopularItem[],
  slotsJson: string,
  currentCountrySlug: string,
): CountryDetailPopularItem[] {
  const slots = parseCountryDetailPopularCountrySlugs(slotsJson);
  const displaySlugs = resolveCountryDetailPopularDisplaySlugs(slots, currentCountrySlug);
  const bySlug = new Map(catalog.map((country) => [country.slug, country]));
  return displaySlugs
    .map((slug) => bySlug.get(slug))
    .filter((country): country is CountryDetailPopularItem => country != null);
}