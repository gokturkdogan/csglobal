import { cache } from "react";
import { prisma } from "@/lib/prisma";
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

export async function listConsulatesForAdmin(options?: { skip?: number; take?: number }) {
  return prisma.consulate.findMany({
    orderBy: [{ countryId: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
    skip: options?.skip,
    take: options?.take,
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

export async function countConsulatesForAdmin() {
  return prisma.consulate.count();
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
