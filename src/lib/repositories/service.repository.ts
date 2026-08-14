import { prisma } from "@/lib/prisma";
import { servicePublicDetailSelect } from "@/lib/repositories/public-selects";

const active = { isActive: true };

export async function findServiceByCountrySlug(countryId: string, slug: string) {
  return prisma.service.findFirst({
    where: { countryId, slug, ...active },
    select: servicePublicDetailSelect,
  });
}

export async function findServicesByCategory(categoryId: string) {
  return prisma.service.findMany({
    where: { categoryId, ...active },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}

export async function findServicesByCountryAndCategory(
  countryId: string,
  categoryId: string,
) {
  return prisma.service.findMany({
    where: { countryId, categoryId, ...active },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      slug: true,
      shortDescription: true,
      processingTime: true,
    },
  });
}

export async function findFeaturedServices(limit?: number) {
  return prisma.service.findMany({
    where: { isFeatured: true, ...active },
    orderBy: { sortOrder: "asc" },
    ...(limit ? { take: limit } : {}),
    select: {
      id: true,
      name: true,
      slug: true,
      shortDescription: true,
      processingTime: true,
      country: { select: { name: true, slug: true, itemImage: true, heroImage: true } },
    },
  });
}

export async function findAllActiveServices() {
  return prisma.service.findMany({
    where: active,
    include: { country: { select: { slug: true, isActive: true } } },
  });
}

/** Tüm aktif hizmetler (aktif ülkeler), liste sayfası için. */
export async function findAllServicesForListing() {
  return prisma.service.findMany({
    where: {
      ...active,
      country: { isActive: true },
    },
    orderBy: [
      { country: { name: "asc" } },
      { category: { sortOrder: "asc" } },
      { sortOrder: "asc" },
      { name: "asc" },
    ],
    select: {
      id: true,
      name: true,
      slug: true,
      shortDescription: true,
      processingTime: true,
      country: { select: { name: true, slug: true, itemImage: true, heroImage: true } },
      category: { select: { name: true, slug: true } },
    },
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

export async function listServicesForAdmin(options?: { skip?: number; take?: number }) {
  return prisma.service.findMany({
    orderBy: [{ countryId: "asc" }, { sortOrder: "asc" }],
    skip: options?.skip,
    take: options?.take,
    select: {
      id: true,
      name: true,
      slug: true,
      isActive: true,
      sortOrder: true,
      countryId: true,
      categoryId: true,
      country: { select: { name: true, slug: true, itemImage: true, heroImage: true } },
      category: { select: { name: true } },
    },
  });
}

export async function countServicesForAdmin() {
  return prisma.service.count();
}
