import type { BlogTopicCategory } from "@/generated/prisma/client";
import type { ForeignConsultancyCategory } from "@/generated/prisma/client";
import {
  BLOG_TOPIC_CATEGORY_LABELS,
  BLOG_TOPIC_CATEGORY_VALUES,
  isBlogTopicCategory,
} from "@/lib/blog-topic-categories";
import {
  FOREIGN_CONSULTANCY_CATEGORY_VALUES,
  isForeignConsultancyCategoryValue,
} from "@/lib/foreign-consultancy-categories";

export const ADMIN_LIST_SEARCH_PARAM = "q";
export const ADMIN_LIST_COUNTRY_PARAM = "countryId";
export const ADMIN_LIST_CATEGORY_PARAM = "categoryId";
export const ADMIN_LIST_TOPIC_CATEGORY_PARAM = "topicCategory";
export const ADMIN_LIST_FC_CATEGORY_PARAM = "fcCategory";
export const ADMIN_LIST_CITY_PARAM = "city";

export type AdminListSearchParams = {
  q?: string;
  countryId?: string;
  categoryId?: string;
  topicCategory?: string;
  fcCategory?: string;
  city?: string;
  page?: string;
  pageSize?: string;
};

export type AdminListFilterValues = {
  q: string;
  countryId: string;
  categoryId: string;
  topicCategory: string;
  fcCategory: string;
  city: string;
};

export type AdminListFilterField = {
  name: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  emptyLabel?: string;
};

export function normalizeAdminSearchQuery(value: string | undefined): string {
  return value?.trim() ?? "";
}

export function resolveAdminListFilters(
  searchParams: AdminListSearchParams,
): AdminListFilterValues {
  return {
    q: normalizeAdminSearchQuery(searchParams.q),
    countryId: searchParams.countryId?.trim() ?? "",
    categoryId: searchParams.categoryId?.trim() ?? "",
    topicCategory: searchParams.topicCategory?.trim() ?? "",
    fcCategory: searchParams.fcCategory?.trim() ?? "",
    city: searchParams.city?.trim() ?? "",
  };
}

export function hasActiveAdminListFilters(filters: AdminListFilterValues): boolean {
  return Boolean(
    filters.q ||
      filters.countryId ||
      filters.categoryId ||
      filters.topicCategory ||
      filters.fcCategory ||
      filters.city,
  );
}

export function buildAdminListFilterQuery(
  filters: AdminListFilterValues,
): Record<string, string> {
  const query: Record<string, string> = {};
  if (filters.q) query[ADMIN_LIST_SEARCH_PARAM] = filters.q;
  if (filters.countryId) query[ADMIN_LIST_COUNTRY_PARAM] = filters.countryId;
  if (filters.categoryId) query[ADMIN_LIST_CATEGORY_PARAM] = filters.categoryId;
  if (filters.topicCategory) {
    query[ADMIN_LIST_TOPIC_CATEGORY_PARAM] = filters.topicCategory;
  }
  if (filters.fcCategory) query[ADMIN_LIST_FC_CATEGORY_PARAM] = filters.fcCategory;
  if (filters.city) query[ADMIN_LIST_CITY_PARAM] = filters.city;
  return query;
}

export function resolveBlogTopicCategoryFilter(
  value: string,
): BlogTopicCategory | undefined {
  if (!value || !isBlogTopicCategory(value)) return undefined;
  return value;
}

export function resolveForeignConsultancyCategoryFilter(
  value: string,
): ForeignConsultancyCategory | undefined {
  if (!value || !isForeignConsultancyCategoryValue(value)) return undefined;
  return value as ForeignConsultancyCategory;
}

export function buildAdminStringSearchWhere(
  q: string,
  fields: ("name" | "slug" | "title" | "fileName")[],
) {
  const trimmed = normalizeAdminSearchQuery(q);
  if (!trimmed) return undefined;

  return {
    OR: fields.map((field) => ({
      [field]: { contains: trimmed, mode: "insensitive" as const },
    })),
  };
}

export const BLOG_TOPIC_CATEGORY_FILTER_OPTIONS = BLOG_TOPIC_CATEGORY_VALUES.map(
  (value) => ({
    value,
    label: BLOG_TOPIC_CATEGORY_LABELS[value],
  }),
);

export const FOREIGN_CONSULTANCY_CATEGORY_FILTER_OPTIONS =
  FOREIGN_CONSULTANCY_CATEGORY_VALUES.map((value) => ({
    value,
    label: value === "OTURMA_IZNI" ? "Oturma izni" : "Çalışma izni",
  }));
