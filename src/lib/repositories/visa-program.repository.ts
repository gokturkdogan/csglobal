import { prisma } from "@/lib/prisma";
import { visaProgramPublicDetailSelect } from "@/lib/repositories/public-selects";

const active = { isActive: true };

const programListInclude = {
  country: { select: { name: true, slug: true, itemImage: true, heroImage: true } },
  categoryLinks: { select: { categoryId: true } },
} as const;

export async function findVisaProgramByCountryAndSlug(countryId: string, slug: string) {
  return prisma.visaProgram.findFirst({
    where: { countryId, slug, ...active },
    select: visaProgramPublicDetailSelect,
  });
}

export async function findProgramsByCategory(categoryId: string) {
  return prisma.visaProgram.findMany({
    where: {
      ...active,
      OR: [{ categoryId }, { categoryLinks: { some: { categoryId } } }],
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}

export async function findProgramsByCountryAndCategory(countryId: string, categoryId: string) {
  return prisma.visaProgram.findMany({
    where: {
      countryId,
      ...active,
      OR: [{ categoryId }, { categoryLinks: { some: { categoryId } } }],
    },
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

export async function findFeaturedPrograms(limit?: number) {
  return prisma.visaProgram.findMany({
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

export async function findAllActivePrograms() {
  return prisma.visaProgram.findMany({
    where: active,
    include: { country: { select: { slug: true, isActive: true } } },
  });
}

export async function findAllProgramsForListing() {
  return prisma.visaProgram.findMany({
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

export async function findLatestPublishedPrograms(limit?: number) {
  return prisma.visaProgram.findMany({
    where: { isActive: true },
    orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }],
    take: limit,
    include: {
      country: { select: { name: true, slug: true, itemImage: true, heroImage: true } },
    },
  });
}

export async function findPublishedProgramsByCountryId(countryId: string) {
  return prisma.visaProgram.findMany({
    where: { isActive: true, countryId },
    orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }],
    select: {
      id: true,
      name: true,
      slug: true,
      excerpt: true,
      publishedAt: true,
      country: { select: { name: true } },
    },
  });
}

/** Ülke panelinde kategori altında listelenecek yayınlanmış programlar. */
export async function findPanelProgramsByCountry(countryId: string) {
  return prisma.visaProgram.findMany({
    where: {
      countryId,
      isActive: true,
      showInCategoryPanel: true,
      OR: [
        { categoryLinks: { some: {} } },
        { categoryId: { not: "" } },
      ],
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: {
      slug: true,
      name: true,
      shortDescription: true,
      processingTime: true,
      categoryId: true,
      categoryLinks: {
        select: { categoryId: true },
      },
    },
  });
}

export async function findAllPublishedProgramsForSitemap() {
  return prisma.visaProgram.findMany({
    where: { isActive: true },
    select: { slug: true, publishedAt: true, country: { select: { slug: true } } },
  });
}

export async function findVisaProgramById(id: string) {
  return prisma.visaProgram.findUnique({
    where: { id },
    include: {
      sections: { orderBy: { sortOrder: "asc" } },
      fees: true,
      faqs: { orderBy: { sortOrder: "asc" } },
      programDocuments: {
        include: { document: true, applicantProfile: true },
        orderBy: { sortOrder: "asc" },
      },
      country: true,
      category: true,
      categoryLinks: { select: { categoryId: true } },
    },
  });
}

export async function listVisaProgramsForAdmin(options?: { skip?: number; take?: number }) {
  return prisma.visaProgram.findMany({
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
      showInCategoryPanel: true,
      country: { select: { name: true, slug: true, itemImage: true, heroImage: true } },
      category: { select: { name: true } },
      categoryLinks: { select: { categoryId: true } },
    },
  });
}

export async function countVisaProgramsForAdmin() {
  return prisma.visaProgram.count();
}

export async function listCategoriesForVisaProgramAdmin() {
  return prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      isActive: true,
    },
  });
}
