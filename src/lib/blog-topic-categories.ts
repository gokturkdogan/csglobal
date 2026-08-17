export const BLOG_TOPIC_CATEGORY_VALUES = ["VIZE", "PASSAPORT", "EK_HIZMETLER"] as const;

export type BlogTopicCategoryValue = (typeof BLOG_TOPIC_CATEGORY_VALUES)[number];

export const BLOG_TOPIC_CATEGORY_LABELS: Record<BlogTopicCategoryValue, string> = {
  VIZE: "VİZE",
  PASSAPORT: "PASSAPORT",
  EK_HIZMETLER: "EK HİZMETLER",
};

export function getBlogTopicCategoryLabel(category: BlogTopicCategoryValue): string {
  return BLOG_TOPIC_CATEGORY_LABELS[category];
}

export function isBlogTopicCategory(value: string): value is BlogTopicCategoryValue {
  return (BLOG_TOPIC_CATEGORY_VALUES as readonly string[]).includes(value);
}
