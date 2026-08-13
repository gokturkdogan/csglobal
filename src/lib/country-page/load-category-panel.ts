import { findActiveConsulatesByCountrySlug } from "@/lib/repositories/consulate.repository";
import { findCategoriesWithCountryServices } from "@/lib/repositories/category.repository";
import { findCategoryPanelArticlesByCountry } from "@/lib/repositories/article.repository";
import {
  attachGuidesToCategoryPanel,
  mapCategoriesForCountryPanel,
  type CountryCategoryPanelItem,
  type CountryConsulatePanelItem,
  type CountryDocumentPanelItem,
} from "@/lib/country-page/category-panel";
import { findSiteAssetsByCountryId } from "@/lib/repositories/site-asset.repository";
import { formatSiteAssetDisplayName } from "@/lib/site-asset";

export async function loadCountryCategoryPanelData(
  countryId: string,
  countrySlug: string,
): Promise<{
  panelCategories: CountryCategoryPanelItem[];
  consulates: CountryConsulatePanelItem[];
  documents: CountryDocumentPanelItem[];
}> {
  const categories = (await findCategoriesWithCountryServices(countryId)) ?? [];
  const categoryIdToSlug = new Map(categories.map((cat) => [cat.id, cat.slug]));
  const panelGuides = await findCategoryPanelArticlesByCountry(countryId);
  const panelCategories = attachGuidesToCategoryPanel(
    mapCategoriesForCountryPanel(categories),
    panelGuides,
    categoryIdToSlug,
  );
  const consulateRows = await findActiveConsulatesByCountrySlug(countrySlug);
  const consulates = consulateRows.map((c) => ({
    name: c.name,
    slug: c.slug,
  }));

  const assetRows = await findSiteAssetsByCountryId(countryId);
  const documents = assetRows.map((asset) => ({
    id: asset.id,
    fileName: asset.fileName,
    label: formatSiteAssetDisplayName(asset.fileName),
  }));

  return { panelCategories, consulates, documents };
}
