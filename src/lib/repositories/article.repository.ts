import { prisma } from "@/lib/prisma";

const articleListInclude = {
  country: { select: { name: true, slug: true, itemImage: true, heroImage: true } },
  linkedCategories: { select: { categoryId: true } },
} as const;

export async function findPublishedArticles(limit?: number) {
  return prisma.article.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
    take: limit,
    include: {
      country: { select: { name: true, slug: true, itemImage: true, heroImage: true } },
    },
  });
}

export async function findArticleBySlug(slug: string) {
  return prisma.article.findFirst({
    where: { slug, isPublished: true },
    include: {
      country: true,
      linkedCategories: {
        include: {
          category: { select: { id: true, name: true, slug: true } },
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
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      publishedAt: true,
      country: { select: { name: true } },
    },
  });
}

export async function findPublishedArticlesByCategoryId(categoryId: string) {
  return prisma.article.findMany({
    where: {
      isPublished: true,
      linkedCategories: { some: { categoryId } },
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
      linkedCategories: { some: {} },
    },
    orderBy: { publishedAt: "desc" },
    select: {
      slug: true,
      title: true,
      linkedCategories: {
        select: { categoryId: true },
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

export async function listArticlesForAdmin(options?: { skip?: number; take?: number }) {
  return prisma.article.findMany({
    orderBy: { updatedAt: "desc" },
    skip: options?.skip,
    take: options?.take,
    select: {
      id: true,
      title: true,
      slug: true,
      isPublished: true,
      updatedAt: true,
      countryId: true,
      country: { select: { name: true } },
      linkedCategories: { select: { categoryId: true } },
    },
  });
}

export async function countArticlesForAdmin() {
  return prisma.article.count();
}

export async function listCategoriesForGuideAdmin() {
  const categories = await prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      isActive: true,
    },
  });

  return categories;
}
