import { prisma } from "@/lib/prisma";

export async function findPublishedArticles(limit?: number) {
  return prisma.article.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
    take: limit,
    include: { articleCategory: true },
  });
}

export async function findArticleBySlug(slug: string) {
  return prisma.article.findFirst({
    where: { slug, isPublished: true },
    include: { articleCategory: true, country: true },
  });
}

export async function findAllPublishedArticles() {
  return prisma.article.findMany({
    where: { isPublished: true },
    select: { slug: true, publishedAt: true },
  });
}
