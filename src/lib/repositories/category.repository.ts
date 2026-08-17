import { prisma } from "@/lib/prisma";
import { visaProgramCountryPanelSelect } from "@/lib/repositories/public-selects";

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

/** Global kategoriler + belirli ülkeye bağlı vize programları */
export async function findCategoriesWithCountryPrograms(countryId: string) {
  return prisma.category.findMany({
    where: {
      isActive: true,
      OR: [
        {
          visaPrograms: {
            some: { countryId, isActive: true },
          },
        },
        {
          programLinks: {
            some: {
              visaProgram: {
                countryId,
                isActive: true,
                showInCategoryPanel: true,
              },
            },
          },
        },
      ],
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: {
      visaPrograms: {
        where: { countryId, isActive: true },
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
        select: visaProgramCountryPanelSelect,
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
