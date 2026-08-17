import { cache } from "react";
import { prisma } from "@/lib/prisma";
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
      topicCategory: true,
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
