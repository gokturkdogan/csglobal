import { prisma } from "@/lib/prisma";

export async function findActiveConsulatesByCountrySlug(countrySlug: string) {
  return prisma.consulate.findMany({
    where: {
      isActive: true,
      country: { slug: countrySlug, isActive: true },
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: {
      country: { select: { name: true, slug: true } },
    },
  });
}

export async function findConsulateByCountryAndSlug(
  countrySlug: string,
  consulateSlug: string,
) {
  return prisma.consulate.findFirst({
    where: {
      slug: consulateSlug,
      isActive: true,
      country: { slug: countrySlug, isActive: true },
    },
    include: {
      country: true,
    },
  });
}

export async function findConsulateForAdmin(id: string) {
  return prisma.consulate.findUnique({
    where: { id },
    include: {
      country: { select: { name: true, slug: true } },
    },
  });
}

export async function listConsulatesForAdmin() {
  return prisma.consulate.findMany({
    orderBy: [{ countryId: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
    include: {
      country: { select: { name: true, slug: true } },
    },
  });
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
