import { prisma } from "@/lib/prisma";

const active = { isActive: true };

export async function findServiceByCountrySlug(countryId: string, slug: string) {
  return prisma.service.findFirst({
    where: { countryId, slug, ...active },
    include: {
      country: true,
      category: true,
      sections: {
        where: active,
        orderBy: { sortOrder: "asc" },
      },
      fees: { where: { isActive: true } },
      faqs: { where: active, orderBy: { sortOrder: "asc" } },
      serviceDocuments: {
        orderBy: { sortOrder: "asc" },
        include: {
          document: true,
          applicantProfile: true,
        },
      },
    },
  });
}

export async function findServicesByCategory(categoryId: string) {
  return prisma.service.findMany({
    where: { categoryId, ...active },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}

export async function findFeaturedServices(limit?: number) {
  return prisma.service.findMany({
    where: { isFeatured: true, ...active },
    orderBy: { sortOrder: "asc" },
    ...(limit ? { take: limit } : {}),
    include: {
      country: { select: { name: true, slug: true } },
    },
  });
}

export async function findAllActiveServices() {
  return prisma.service.findMany({
    where: active,
    include: { country: { select: { slug: true, isActive: true } } },
  });
}

export async function findServiceById(id: string) {
  return prisma.service.findUnique({
    where: { id },
    include: {
      sections: { orderBy: { sortOrder: "asc" } },
      fees: true,
      faqs: { orderBy: { sortOrder: "asc" } },
      serviceDocuments: {
        include: { document: true, applicantProfile: true },
        orderBy: { sortOrder: "asc" },
      },
      country: true,
      category: true,
    },
  });
}
