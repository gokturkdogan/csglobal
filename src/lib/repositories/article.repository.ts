import { prisma } from "@/lib/prisma";

const articleListInclude = {
  country: { select: { name: true, slug: true } },
  linkedServices: { select: { serviceId: true } },
} as const;

export async function findPublishedArticles(limit?: number) {
  return prisma.article.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
    take: limit,
    include: {
      country: { select: { name: true, slug: true } },
    },
  });
}

export async function findArticleBySlug(slug: string) {
  return prisma.article.findFirst({
    where: { slug, isPublished: true },
    include: {
      country: true,
      linkedServices: {
        include: {
          service: {
            select: { id: true, name: true, slug: true, countryId: true },
          },
        },
      },
    },
  });
}

export async function findPublishedArticlesByCountryId(countryId: string) {
  return prisma.article.findMany({
    where: {
      isPublished: true,
      countryId,
    },
    orderBy: { publishedAt: "desc" },
    include: {
      country: { select: { name: true } },
    },
  });
}

export async function findPublishedArticlesByServiceId(serviceId: string) {
  return prisma.article.findMany({
    where: {
      isPublished: true,
      linkedServices: { some: { serviceId } },
    },
    orderBy: { publishedAt: "desc" },
    include: {
      country: { select: { name: true } },
    },
  });
}

/** Ülke panelinde kategori altında listelenecek yayınlanmış rehberler. */
export async function findCategoryPanelArticlesByCountry(countryId: string) {
  return prisma.article.findMany({
    where: {
      countryId,
      isPublished: true,
      showInCategoryPanel: true,
      linkedServices: { some: {} },
    },
    orderBy: { publishedAt: "desc" },
    select: {
      slug: true,
      title: true,
      linkedServices: {
        select: {
          service: { select: { categoryId: true } },
        },
      },
    },
  });
}

export async function findAllPublishedArticles() {
  return prisma.article.findMany({
    where: { isPublished: true },
    select: { slug: true, publishedAt: true },
  });
}

export async function findArticleForAdmin(id: string) {
  return prisma.article.findUnique({
    where: { id },
    include: articleListInclude,
  });
}

export async function listArticlesForAdmin() {
  return prisma.article.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      country: { select: { name: true } },
      linkedServices: { select: { serviceId: true } },
    },
  });
}

export async function listServicesForGuideAdmin() {
  return prisma.service.findMany({
    where: { isActive: true },
    orderBy: [{ countryId: "asc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      countryId: true,
      category: { select: { name: true } },
    },
  });
}
