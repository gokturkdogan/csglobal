import { prisma } from "@/lib/prisma";

const active = { isActive: true };

export async function findCategoriesByCountry(countryId: string) {
  return prisma.category.findMany({
    where: { countryId, ...active },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}

export async function findRootCategories(countryId: string) {
  return prisma.category.findMany({
    where: { countryId, parentId: null, ...active },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}

export async function findCategoryChildren(parentId: string) {
  return prisma.category.findMany({
    where: { parentId, ...active },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}

export async function findCategoryById(id: string) {
  return prisma.category.findUnique({ where: { id } });
}

export async function findCategoryInCountry(
  countryId: string,
  slug: string,
  parentId: string | null,
) {
  return prisma.category.findFirst({
    where: {
      countryId,
      slug,
      parentId,
      ...active,
    },
  });
}

export async function findAllActiveCategories() {
  return prisma.category.findMany({
    where: active,
    include: { country: { select: { slug: true, isActive: true } } },
  });
}
