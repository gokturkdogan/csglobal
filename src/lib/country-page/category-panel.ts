export type CountryCategoryServiceItem = {
  slug: string;
  name: string;
  shortDescription?: string | null;
  processingTime?: string | null;
};

export type CountryCategoryGuideItem = {
  slug: string;
  title: string;
};

export type CountryPanelConsulateItem = {
  slug: string;
  name: string;
};

export type CountryCategoryPanelItem = {
  slug: string;
  name: string;
  services: CountryCategoryServiceItem[];
  guides: CountryCategoryGuideItem[];
};

export type CountryConsulatePanelItem = {
  slug: string;
  name: string;
};

export type CountryDocumentPanelItem = {
  id: number;
  fileName: string;
  label: string;
};

/** Panel içinde konsolosluk satırı için sabit slug (gerçek kategori slug çakışmasını önler). */
export const COUNTRY_PANEL_CONSULATES_SLUG = "__consulates__";

/** Panel içinde dilekçe / form / belge satırı için sabit slug. */
export const COUNTRY_PANEL_DOCUMENTS_SLUG = "__documents__";

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
    guides: [],
  }));
}

type CategoryPanelGuideRecord = {
  slug: string;
  title: string;
  linkedServices: Array<{ service: { categoryId: string } }>;
};

/** Kategori panelinde gösterilecek rehberleri kategori slug'ına dağıtır (kategori içinde tekilleştirilmiş). */
export function attachGuidesToCategoryPanel(
  categories: CountryCategoryPanelItem[],
  guides: CategoryPanelGuideRecord[],
  categoryIdToSlug: Map<string, string>,
): CountryCategoryPanelItem[] {
  const guidesByCategorySlug = new Map<string, CountryCategoryGuideItem[]>();

  for (const guide of guides) {
    const categoryIds = new Set<string>();
    for (const link of guide.linkedServices) {
      categoryIds.add(link.service.categoryId);
    }

    for (const categoryId of categoryIds) {
      const categorySlug = categoryIdToSlug.get(categoryId);
      if (!categorySlug) continue;

      const list = guidesByCategorySlug.get(categorySlug) ?? [];
      if (list.some((item) => item.slug === guide.slug)) continue;

      list.push({ slug: guide.slug, title: guide.title });
      guidesByCategorySlug.set(categorySlug, list);
    }
  }

  return categories.map((category) => ({
    ...category,
    guides: guidesByCategorySlug.get(category.slug) ?? [],
  }));
}

/** Yalnızca en az bir hizmeti olan kategoriler (hizmet detay yan paneli vb.) */
export function filterPopulatedCountryCategories(
  categories: CountryCategoryPanelItem[],
): CountryCategoryPanelItem[] {
  return categories.filter((category) => (category.services?.length ?? 0) > 0);
}
