export const FOREIGN_CONSULTANCY_CATEGORY_VALUES = ["OTURMA_IZNI", "CALISMA_IZNI"] as const;

export type ForeignConsultancyCategoryValue =
  (typeof FOREIGN_CONSULTANCY_CATEGORY_VALUES)[number];

export const FOREIGN_CONSULTANCY_CATEGORY_LABELS: Record<
  ForeignConsultancyCategoryValue,
  string
> = {
  OTURMA_IZNI: "Oturma izni",
  CALISMA_IZNI: "Çalışma izni",
};

export const FOREIGN_CONSULTANCY_CATEGORY_SLUGS = ["oturma-izni", "calisma-izni"] as const;

export type ForeignConsultancyCategorySlug =
  (typeof FOREIGN_CONSULTANCY_CATEGORY_SLUGS)[number];

const CATEGORY_TO_SLUG: Record<ForeignConsultancyCategoryValue, ForeignConsultancyCategorySlug> = {
  OTURMA_IZNI: "oturma-izni",
  CALISMA_IZNI: "calisma-izni",
};

const SLUG_TO_CATEGORY: Record<ForeignConsultancyCategorySlug, ForeignConsultancyCategoryValue> = {
  "oturma-izni": "OTURMA_IZNI",
  "calisma-izni": "CALISMA_IZNI",
};

export function isForeignConsultancyCategoryValue(
  value: string,
): value is ForeignConsultancyCategoryValue {
  return (FOREIGN_CONSULTANCY_CATEGORY_VALUES as readonly string[]).includes(value);
}

export function isForeignConsultancyCategorySlug(
  slug: string,
): slug is ForeignConsultancyCategorySlug {
  return (FOREIGN_CONSULTANCY_CATEGORY_SLUGS as readonly string[]).includes(slug);
}

export function foreignConsultancyCategoryToSlug(
  category: ForeignConsultancyCategoryValue,
): ForeignConsultancyCategorySlug {
  return CATEGORY_TO_SLUG[category];
}

export function foreignConsultancySlugToCategory(
  slug: string,
): ForeignConsultancyCategoryValue | null {
  if (!isForeignConsultancyCategorySlug(slug)) return null;
  return SLUG_TO_CATEGORY[slug];
}

export function getForeignConsultancyCategoryLabel(
  category: ForeignConsultancyCategoryValue,
): string {
  return FOREIGN_CONSULTANCY_CATEGORY_LABELS[category];
}
