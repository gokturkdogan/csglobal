import { cache } from "react";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import {
  buildAdminStringSearchWhere,
  normalizeAdminSearchQuery,
} from "@/lib/admin-list-filters";
import {
  consulatePublicDetailSelect,
  consulatePublicListSelect,
} from "@/lib/repositories/public-selects";

export async function findActiveConsulatesByCountrySlug(countrySlug: string) {
  return prisma.consulate.findMany({
    where: {
      isActive: true,
      country: { slug: countrySlug, isActive: true },
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: consulatePublicListSelect,
  });
}

export const findConsulateByCountryAndSlug = cache(async (
  countrySlug: string,
  consulateSlug: string,
) => {
  return prisma.consulate.findFirst({
    where: {
      slug: consulateSlug,
      isActive: true,
      country: { slug: countrySlug, isActive: true },
    },
    select: consulatePublicDetailSelect,
  });
});

export async function findConsulateForAdmin(id: string) {
  return prisma.consulate.findUnique({
    where: { id },
    include: {
      country: { select: { name: true, slug: true } },
    },
  });
}

export type AdminConsulateListFilters = {
  q?: string;
  countryId?: string;
};

function buildConsulateAdminWhere(
  filters?: AdminConsulateListFilters,
): Prisma.ConsulateWhereInput {
  const and: Prisma.ConsulateWhereInput[] = [];
  const q = normalizeAdminSearchQuery(filters?.q);
  const searchWhere = buildAdminStringSearchWhere(q, ["name", "slug"]);
  if (searchWhere) and.push(searchWhere);

  if (filters?.countryId?.trim()) {
    and.push({ countryId: filters.countryId.trim() });
  }

  if (and.length === 0) return {};
  if (and.length === 1) return and[0];
  return { AND: and };
}

export async function listConsulatesForAdmin(
  options?: { skip?: number; take?: number } & AdminConsulateListFilters,
) {
  const { skip, take, q, countryId } = options ?? {};
  return prisma.consulate.findMany({
    where: buildConsulateAdminWhere({ q, countryId }),
    orderBy: [{ countryId: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
    skip,
    take,
    select: {
      id: true,
      name: true,
      slug: true,
      isActive: true,
      sortOrder: true,
      countryId: true,
      country: { select: { name: true, slug: true } },
    },
  });
}

export async function countConsulatesForAdmin(filters?: AdminConsulateListFilters) {
  return prisma.consulate.count({ where: buildConsulateAdminWhere(filters) });
}

export async function findAllActiveConsulates() {
  return prisma.consulate.findMany({
    where: { isActive: true, country: { isActive: true } },
    select: {
      slug: true,
      updatedAt: true,
      country: { select: { slug: true } },
    },
  });
}
