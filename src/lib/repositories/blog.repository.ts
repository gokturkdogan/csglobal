import { prisma } from "@/lib/prisma";

const active = { isActive: true };

export async function findActiveBlogPosts(options?: { skip?: number; take?: number }) {
  return prisma.blogPost.findMany({
    where: active,
    orderBy: [{ sortOrder: "asc" }, { publishedAt: "desc" }, { updatedAt: "desc" }],
    skip: options?.skip,
    take: options?.take,
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      publishedAt: true,
      country: { select: { name: true, slug: true, itemImage: true, heroImage: true } },
    },
  });
}

export async function countActiveBlogPosts() {
  return prisma.blogPost.count({ where: active });
}

export async function findBlogPostBySlug(slug: string) {
  return prisma.blogPost.findFirst({
    where: { slug, ...active },
    include: {
      country: true,
    },
  });
}

export async function findBlogPostById(id: string) {
  return prisma.blogPost.findUnique({
    where: { id },
    include: { country: true },
  });
}

export async function listBlogPostsForAdmin(options?: { skip?: number; take?: number }) {
  return prisma.blogPost.findMany({
    orderBy: [{ sortOrder: "asc" }, { publishedAt: "desc" }, { title: "asc" }],
    skip: options?.skip,
    take: options?.take,
    select: {
      id: true,
      title: true,
      slug: true,
      isActive: true,
      sortOrder: true,
      publishedAt: true,
      country: { select: { name: true, slug: true } },
    },
  });
}

export async function countBlogPostsForAdmin() {
  return prisma.blogPost.count();
}

export async function findBlogPostsForSitemap() {
  return prisma.blogPost.findMany({
    where: active,
    select: { slug: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
  });
}

/** Aynı ülkeye bağlı diğer aktif bloglar (mevcut yazı hariç). */
export async function findRelatedBlogPostsByCountry(
  countryId: string,
  excludePostId: string,
  limit = 8,
) {
  return prisma.blogPost.findMany({
    where: {
      ...active,
      countryId,
      id: { not: excludePostId },
    },
    orderBy: [{ sortOrder: "asc" }, { publishedAt: "desc" }, { updatedAt: "desc" }],
    take: limit,
    select: {
      id: true,
      title: true,
      slug: true,
    },
  });
}
