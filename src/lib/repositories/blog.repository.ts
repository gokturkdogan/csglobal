import { cache } from "react";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import {
  buildAdminStringSearchWhere,
  normalizeAdminSearchQuery,
  resolveBlogTopicCategoryFilter,
} from "@/lib/admin-list-filters";
import {
  BLOG_TOPIC_CATEGORY_VALUES,
  BLOG_TOPIC_CATEGORY_LABELS,
  type BlogTopicCategoryValue,
} from "@/lib/blog-topic-categories";
import type { BlogTopicCategory } from "@/generated/prisma/client";

const active = { isActive: true };

const blogCountrySelect = {
  id: true,
  name: true,
  slug: true,
  heroImage: true,
};

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
      topicCategory: true,
    },
  });
}

export async function countActiveBlogPosts() {
  return prisma.blogPost.count({ where: active });
}

/** Anasayfa öne çıkan rehberler bölümü (isFeatured + aktif). */
export async function findFeaturedBlogPostsForHomepage(
  limit = 9,
) {
  return prisma.blogPost.findMany({
    where: { ...active, isFeatured: true },
    orderBy: [{ sortOrder: "asc" }, { publishedAt: "desc" }, { updatedAt: "desc" }],
    take: limit,
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      publishedAt: true,
      topicCategory: true,
      country: { select: { name: true, slug: true, itemImage: true } },
    },
  });
}

export async function countFeaturedBlogPostsForHomepage(excludePostId?: string) {
  return prisma.blogPost.count({
    where: {
      ...active,
      isFeatured: true,
      ...(excludePostId ? { id: { not: excludePostId } } : {}),
    },
  });
}

export const findBlogPostBySlug = cache(async (slug: string) => {
  return prisma.blogPost.findFirst({
    where: { slug, ...active },
    include: {
      country: { select: blogCountrySelect },
    },
  });
});

export async function findBlogPostById(id: string) {
  return prisma.blogPost.findUnique({
    where: { id },
    include: { country: true },
  });
}

export type AdminBlogListFilters = {
  q?: string;
  countryId?: string;
  topicCategory?: string;
};

function buildBlogAdminWhere(filters?: AdminBlogListFilters): Prisma.BlogPostWhereInput {
  const and: Prisma.BlogPostWhereInput[] = [];
  const q = normalizeAdminSearchQuery(filters?.q);
  const searchWhere = buildAdminStringSearchWhere(q, ["title", "slug"]);
  if (searchWhere) and.push(searchWhere);

  if (filters?.countryId?.trim()) {
    and.push({ countryId: filters.countryId.trim() });
  }

  const topicCategory = resolveBlogTopicCategoryFilter(filters?.topicCategory ?? "");
  if (topicCategory) {
    and.push({ topicCategory });
  }

  if (and.length === 0) return {};
  if (and.length === 1) return and[0];
  return { AND: and };
}

export async function listBlogPostsForAdmin(
  options?: { skip?: number; take?: number } & AdminBlogListFilters,
) {
  const { skip, take, q, countryId, topicCategory } = options ?? {};
  return prisma.blogPost.findMany({
    where: buildBlogAdminWhere({ q, countryId, topicCategory }),
    orderBy: [{ sortOrder: "asc" }, { publishedAt: "desc" }, { title: "asc" }],
    skip,
    take,
    select: {
      id: true,
      title: true,
      slug: true,
      isActive: true,
      sortOrder: true,
      publishedAt: true,
      country: { select: { name: true, slug: true } },
      topicCategory: true,
    },
  });
}

export async function countBlogPostsForAdmin(filters?: AdminBlogListFilters) {
  return prisma.blogPost.count({ where: buildBlogAdminWhere(filters) });
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

export type BlogTopicCategoryPanelData = {
  category: BlogTopicCategory;
  label: string;
  posts: { id: string; title: string; slug: string }[];
}[];

/** Ülkeye bağlı olmayan bloglar için sabit kategori paneli verisi. */
export const loadBlogTopicCategoryPanelData = cache(async (): Promise<BlogTopicCategoryPanelData> => {
  const posts = await prisma.blogPost.findMany({
    where: {
      ...active,
      countryId: null,
      topicCategory: { not: null },
    },
    orderBy: [{ sortOrder: "asc" }, { publishedAt: "desc" }, { updatedAt: "desc" }],
    select: {
      id: true,
      title: true,
      slug: true,
      topicCategory: true,
    },
  });

  return BLOG_TOPIC_CATEGORY_VALUES.map((category) => ({
    category: category as BlogTopicCategory,
    label: BLOG_TOPIC_CATEGORY_LABELS[category],
    posts: posts
      .filter((post) => post.topicCategory === category)
      .map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
      })),
  }));
});
