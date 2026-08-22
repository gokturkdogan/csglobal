import { cache } from "react";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type { ForeignConsultancyCategory } from "@/generated/prisma/client";
import {
  buildAdminStringSearchWhere,
  normalizeAdminSearchQuery,
  resolveForeignConsultancyCategoryFilter,
} from "@/lib/admin-list-filters";
import { foreignConsultancySlugToCategory } from "@/lib/foreign-consultancy-categories";

const active = { isActive: true };

const listSelect = {
  id: true,
  name: true,
  slug: true,
  excerpt: true,
  shortDescription: true,
  processingTime: true,
  category: true,
  sortOrder: true,
  publishedAt: true,
  translationsJson: true,
} as const;

export async function findForeignConsultancyContentById(id: string) {
  return prisma.foreignConsultancyContent.findUnique({ where: { id } });
}

export const findForeignConsultancyContentBySlug = cache(
  async (categorySlug: string, slug: string) => {
    const category = foreignConsultancySlugToCategory(categorySlug);
    if (!category) return null;

    return prisma.foreignConsultancyContent.findFirst({
      where: {
        slug,
        category: category as ForeignConsultancyCategory,
        ...active,
      },
    });
  },
);

export type AdminForeignConsultancyListFilters = {
  q?: string;
  fcCategory?: string;
};

function buildForeignConsultancyAdminWhere(
  filters?: AdminForeignConsultancyListFilters,
): Prisma.ForeignConsultancyContentWhereInput {
  const and: Prisma.ForeignConsultancyContentWhereInput[] = [];
  const q = normalizeAdminSearchQuery(filters?.q);
  const searchWhere = buildAdminStringSearchWhere(q, ["name", "slug"]);
  if (searchWhere) and.push(searchWhere);

  const category = resolveForeignConsultancyCategoryFilter(filters?.fcCategory ?? "");
  if (category) {
    and.push({ category });
  }

  if (and.length === 0) return {};
  if (and.length === 1) return and[0];
  return { AND: and };
}

export async function listForeignConsultancyContentsForAdmin(
  options?: { skip?: number; take?: number } & AdminForeignConsultancyListFilters,
) {
  const { skip, take, q, fcCategory } = options ?? {};
  return prisma.foreignConsultancyContent.findMany({
    where: buildForeignConsultancyAdminWhere({ q, fcCategory }),
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
    skip,
    take,
    select: {
      id: true,
      name: true,
      slug: true,
      category: true,
      isActive: true,
      sortOrder: true,
    },
  });
}

export async function countForeignConsultancyContentsForAdmin(
  filters?: AdminForeignConsultancyListFilters,
) {
  return prisma.foreignConsultancyContent.count({
    where: buildForeignConsultancyAdminWhere(filters),
  });
}

export async function findActiveForeignConsultancyContentsByCategorySlug(
  categorySlug: string,
) {
  const category = foreignConsultancySlugToCategory(categorySlug);
  if (!category) return [];

  return prisma.foreignConsultancyContent.findMany({
    where: {
      ...active,
      category: category as ForeignConsultancyCategory,
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: listSelect,
  });
}

export async function findForeignConsultancyContentsForSitemap() {
  return prisma.foreignConsultancyContent.findMany({
    where: active,
    select: {
      slug: true,
      category: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: "desc" },
  });
}

export const findForeignConsultancyCategoryPageByCategorySlug = cache(
  async (categorySlug: string) => {
    const category = foreignConsultancySlugToCategory(categorySlug);
    if (!category) return null;

    return prisma.foreignConsultancyCategoryPage.findUnique({
      where: { category: category as ForeignConsultancyCategory },
    });
  },
);

export async function findForeignConsultancyCategoryPageForAdmin(categorySlug: string) {
  const category = foreignConsultancySlugToCategory(categorySlug);
  if (!category) return null;

  return prisma.foreignConsultancyCategoryPage.findUnique({
    where: { category: category as ForeignConsultancyCategory },
  });
}
