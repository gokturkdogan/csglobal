export type CountryCategoryProgramItem = {
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
  programs: CountryCategoryProgramItem[];
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
    visaPrograms: Array<{
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
    programs: (category.visaPrograms ?? []).map((program) => ({
      slug: program.slug,
      name: program.name,
      shortDescription: program.shortDescription,
      processingTime: program.processingTime,
    })),
  }));
}

type PanelProgramRecord = {
  slug: string;
  name: string;
  shortDescription?: string | null;
  processingTime?: string | null;
  categoryId: string;
  categoryLinks: Array<{ categoryId: string }>;
};

/** Junction üzerinden gelen programları kategori slug'ına dağıtır ve birleştirir. */
export function attachLinkedProgramsToCategoryPanel(
  categories: CountryCategoryPanelItem[],
  programs: PanelProgramRecord[],
  categoryIdToSlug: Map<string, string>,
): CountryCategoryPanelItem[] {
  const programsByCategorySlug = new Map<string, CountryCategoryProgramItem[]>();

  for (const program of programs) {
    const categoryIds = new Set<string>();
    if (program.categoryId) categoryIds.add(program.categoryId);
    for (const link of program.categoryLinks) {
      categoryIds.add(link.categoryId);
    }

    for (const categoryId of categoryIds) {
      const categorySlug = categoryIdToSlug.get(categoryId);
      if (!categorySlug) continue;

      const list = programsByCategorySlug.get(categorySlug) ?? [];
      if (list.some((item) => item.slug === program.slug)) continue;

      list.push({
        slug: program.slug,
        name: program.name,
        shortDescription: program.shortDescription,
        processingTime: program.processingTime,
      });
      programsByCategorySlug.set(categorySlug, list);
    }
  }

  return categories.map((category) => {
    const linked = programsByCategorySlug.get(category.slug) ?? [];
    const merged = [...category.programs];

    for (const item of linked) {
      if (!merged.some((p) => p.slug === item.slug)) {
        merged.push(item);
      }
    }

    return {
      ...category,
      programs: merged,
    };
  });
}

/** Yalnızca en az bir program içeren kategoriler */
export function filterPopulatedCountryCategories(
  categories: CountryCategoryPanelItem[],
): CountryCategoryPanelItem[] {
  return categories.filter((category) => (category.programs?.length ?? 0) > 0);
}
