import { cache } from "react";
import { findActiveConsulatesByCountrySlug } from "@/lib/repositories/consulate.repository";
import { findCategoriesWithCountryPrograms } from "@/lib/repositories/category.repository";
import { findPanelProgramsByCountry } from "@/lib/repositories/visa-program.repository";
import {
  attachLinkedProgramsToCategoryPanel,
  filterPopulatedCountryCategories,
  mapCategoriesForCountryPanel,
  type CountryCategoryPanelItem,
  type CountryConsulatePanelItem,
  type CountryDocumentPanelItem,
} from "@/lib/country-page/category-panel";
import { findSiteAssetsByCountryId } from "@/lib/repositories/site-asset.repository";
import { formatSiteAssetDisplayName } from "@/lib/site-asset";

export const loadCountryCategoryPanelData = cache(async (
  countryId: string,
  countrySlug: string,
): Promise<{
  panelCategories: CountryCategoryPanelItem[];
  consulates: CountryConsulatePanelItem[];
  documents: CountryDocumentPanelItem[];
}> => {
  const [categoriesRaw, panelPrograms, consulateRows, assetRows] = await Promise.all([
    findCategoriesWithCountryPrograms(countryId),
    findPanelProgramsByCountry(countryId),
    findActiveConsulatesByCountrySlug(countrySlug),
    findSiteAssetsByCountryId(countryId),
  ]);

  const categories = categoriesRaw ?? [];
  const categoryIdToSlug = new Map(categories.map((cat) => [cat.id, cat.slug]));
  const panelCategories = filterPopulatedCountryCategories(
    attachLinkedProgramsToCategoryPanel(
      mapCategoriesForCountryPanel(categories),
      panelPrograms,
      categoryIdToSlug,
    ),
  );
  const consulates = consulateRows.map((c) => ({
    name: c.name,
    slug: c.slug,
  }));

  const documents = assetRows.map((asset) => ({
    id: asset.id,
    fileName: asset.fileName,
    label: formatSiteAssetDisplayName(asset.fileName),
  }));

  return { panelCategories, consulates, documents };
});
