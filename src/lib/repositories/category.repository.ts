import { prisma } from "@/lib/prisma";

const active = { isActive: true };

export async function findAllCategories() {
  return prisma.category.findMany({
    where: active,
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}

export async function findCategoryBySlug(slug: string) {
  return prisma.category.findFirst({
    where: { slug, ...active },
  });
}

export async function findCategoryById(id: string) {
  return prisma.category.findUnique({ where: { id } });
}

/** Global kategoriler + belirli ülkeye bağlı hizmetler veya panel rehberleri */
export async function findCategoriesWithCountryServices(countryId: string) {
  return prisma.category.findMany({
    where: {
      isActive: true,
      OR: [
        {
          services: {
            some: { countryId, isActive: true },
          },
        },
        {
          articleLinks: {
            some: {
              article: {
                countryId,
                isPublished: true,
                showInCategoryPanel: true,
              },
            },
          },
        },
      ],
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: {
      services: {
        where: { countryId, isActive: true },
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      },
    },
  });
}

export async function findAllActiveCategories() {
  return prisma.category.findMany({
    where: active,
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}
