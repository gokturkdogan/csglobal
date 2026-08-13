export type CountryCategoryServiceItem = {
  slug: string;
  name: string;
  shortDescription?: string | null;
  processingTime?: string | null;
};

export type CountryPanelConsulateItem = {
  slug: string;
  name: string;
};

export type CountryCategoryPanelItem = {
  slug: string;
  name: string;
  services: CountryCategoryServiceItem[];
};

export type CountryConsulatePanelItem = {
  slug: string;
  name: string;
};

/** Panel içinde konsolosluk satırı için sabit slug (gerçek kategori slug çakışmasını önler). */
export const COUNTRY_PANEL_CONSULATES_SLUG = "__consulates__";

export function mapCategoriesForCountryPanel(
  categories: Array<{
    slug: string;
    name: string;
    services: Array<{
      slug: string;
      name: string;
      shortDescription?: string | null;
      processingTime?: string | null;
    }>;
  }>,
): CountryCategoryPanelItem[] {
  return (categories ?? []).map((category) => ({
    slug: category.slug,
    name: category.name,
    services: (category.services ?? []).map((service) => ({
      slug: service.slug,
      name: service.name,
      shortDescription: service.shortDescription,
      processingTime: service.processingTime,
    })),
  }));
}

/** Yalnızca en az bir hizmeti olan kategoriler (hizmet detay yan paneli vb.) */
export function filterPopulatedCountryCategories(
  categories: CountryCategoryPanelItem[],
): CountryCategoryPanelItem[] {
  return categories.filter((category) => (category.services?.length ?? 0) > 0);
}
