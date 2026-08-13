export type CountryCategoryServiceItem = {
  slug: string;
  name: string;
  shortDescription?: string | null;
  processingTime?: string | null;
};

export type CountryCategoryPanelItem = {
  slug: string;
  name: string;
  services: CountryCategoryServiceItem[];
};

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
