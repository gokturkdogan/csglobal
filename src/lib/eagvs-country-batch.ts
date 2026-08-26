import { parseCountryDetailSectionsJson } from "@/lib/country-detail";
import { scrapeEagvsAllCountries } from "@/lib/eagvs-all-countries-scrape";
import { matchCountrySlugFromEagvsUrl } from "@/lib/eagvs-scrape";

export type EagvsBatchCountryRow = {
  eagvsName: string;
  eagvsUrl: string;
  eagvsPath: string;
  countryId: string | null;
  countryName: string | null;
  countrySlug: string | null;
  matchStatus: "matched" | "unmatched";
  detailSectionCount: number;
  hasDetailContent: boolean;
};

type DbCountry = {
  id: string;
  name: string;
  slug: string;
  detailSectionsJson: string | null;
};

export async function buildEagvsBatchCountryPreview(
  dbCountries: DbCountry[],
): Promise<EagvsBatchCountryRow[]> {
  const eagvsEntries = await scrapeEagvsAllCountries();
  const slugs = dbCountries.map((country) => country.slug);

  return eagvsEntries.map((entry) => {
    const matchedSlug = matchCountrySlugFromEagvsUrl(entry.url, slugs);
    const country = matchedSlug
      ? dbCountries.find((row) => row.slug === matchedSlug)
      : null;
    const detailSectionCount = country
      ? parseCountryDetailSectionsJson(country.detailSectionsJson).length
      : 0;

    return {
      eagvsName: entry.name,
      eagvsUrl: entry.url,
      eagvsPath: entry.path,
      countryId: country?.id ?? null,
      countryName: country?.name ?? null,
      countrySlug: country?.slug ?? null,
      matchStatus: country ? "matched" : "unmatched",
      detailSectionCount,
      hasDetailContent: detailSectionCount > 0,
    };
  });
}
