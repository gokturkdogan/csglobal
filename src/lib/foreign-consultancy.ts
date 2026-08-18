import {
  FOREIGN_CONSULTANCY_CATEGORY_SLUGS,
  type ForeignConsultancyCategorySlug,
  foreignConsultancyCategoryToSlug,
  foreignConsultancySlugToCategory,
  getForeignConsultancyCategoryLabel,
  type ForeignConsultancyCategoryValue,
} from "@/lib/foreign-consultancy-categories";

export const FOREIGN_CONSULTANCY_BASE_PATH = "/yabanci-danismanlik";

export const FOREIGN_CONSULTANCY_OPTIONS = FOREIGN_CONSULTANCY_CATEGORY_SLUGS.map((slug) => {
  const category = foreignConsultancySlugToCategory(slug)!;
  return {
    slug,
    title: getForeignConsultancyCategoryLabel(category),
    description:
      slug === "oturma-izni"
        ? "Türkiye ikamet izni başvurusu, yenileme ve uzun dönem oturum için evrak listesi, randevu planı ve süreç takibi."
        : "Türkiye çalışma izni başvurusu, yenileme ve işveren değişikliği için evrak listesi, başvuru planı ve süreç takibi.",
    category,
  };
});

export type ForeignConsultancyOptionSlug = ForeignConsultancyCategorySlug;

export function getForeignConsultancyOption(slug: string) {
  return FOREIGN_CONSULTANCY_OPTIONS.find((option) => option.slug === slug);
}

export function buildForeignConsultancyCategoryPath(categorySlug: string) {
  return `${FOREIGN_CONSULTANCY_BASE_PATH}/${categorySlug}`;
}

export function buildForeignConsultancyContentPath(
  category: ForeignConsultancyCategoryValue | ForeignConsultancyCategorySlug,
  contentSlug: string,
) {
  const categorySlug =
    typeof category === "string" &&
    (FOREIGN_CONSULTANCY_CATEGORY_SLUGS as readonly string[]).includes(category)
      ? category
      : foreignConsultancyCategoryToSlug(category as ForeignConsultancyCategoryValue);
  return `${FOREIGN_CONSULTANCY_BASE_PATH}/${categorySlug}/${contentSlug}`;
}

export function buildForeignConsultancyOptionPath(slug: string) {
  return buildForeignConsultancyCategoryPath(slug);
}
