import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/services/seo.service";
import {
  findCountriesForSitemap,
  findProgramsForSitemap,
  findCountryCategoryPairsForSitemap,
} from "@/lib/repositories/sitemap.repository";
import { findBlogPostsForSitemap } from "@/lib/repositories/blog.repository";
import { findAllActiveConsulates } from "@/lib/repositories/consulate.repository";
import { buildCategoryPath, buildVisaProgramPath } from "@/lib/services/path-resolver.service";
import { buildToolPath, siteTools, TOOLS_LIST_PATH } from "@/lib/tools";
import {
  buildRejectionReasonPath,
  rejectionReasons,
} from "@/lib/rejection-guide-data";
import { buildBlogListPath, buildBlogPath, buildConsulatePath } from "@/lib/paths";
import {
  FOREIGN_CONSULTANCY_OPTIONS,
  buildForeignConsultancyCategoryPath,
  buildForeignConsultancyContentPath,
} from "@/lib/foreign-consultancy";
import { findForeignConsultancyContentsForSitemap } from "@/lib/repositories/foreign-consultancy.repository";
import { foreignConsultancyCategoryToSlug } from "@/lib/foreign-consultancy-categories";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl;
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/ulkeler`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/hizmetlerimiz`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/yabanci-danismanlik`, changeFrequency: "weekly", priority: 0.85 },
    ...FOREIGN_CONSULTANCY_OPTIONS.map((option) => ({
      url: `${base}${buildForeignConsultancyCategoryPath(option.slug)}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    { url: `${base}${buildBlogListPath()}`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}${TOOLS_LIST_PATH}`, changeFrequency: "monthly", priority: 0.75 },
    ...siteTools.map((tool) => ({
      url: `${base}${buildToolPath(tool.slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...rejectionReasons.map((reason) => ({
      url: `${base}${buildRejectionReasonPath(reason.slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    { url: `${base}/hakkimizda`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/iletisim`, changeFrequency: "monthly", priority: 0.8 },
  ];

  try {
    const [countries, programs, categoryPairs, consulates, blogPosts, foreignContents] =
      await Promise.all([
      findCountriesForSitemap(),
      findProgramsForSitemap(),
      findCountryCategoryPairsForSitemap(),
      findAllActiveConsulates(),
      findBlogPostsForSitemap(),
      findForeignConsultancyContentsForSitemap(),
    ]);

    const countryRoutes = countries.map((c) => ({
      url: `${base}/${c.slug}`,
      lastModified: c.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));

    const programRoutes = programs.map((p) => ({
      url: `${base}${buildVisaProgramPath(p.country.slug, p.slug)}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    const categoryRoutes = categoryPairs.map((pair) => ({
      url: `${base}${buildCategoryPath(pair.countrySlug, [pair.categorySlug])}`,
      lastModified: pair.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }));

    const consulateRoutes = consulates.map((c) => ({
      url: `${base}${buildConsulatePath(c.country.slug, c.slug)}`,
      lastModified: c.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    const blogRoutes = blogPosts.map((post) => ({
      url: `${base}${buildBlogPath(post.slug)}`,
      lastModified: post.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }));

    const foreignContentRoutes = foreignContents.map((item) => ({
      url: `${base}${buildForeignConsultancyContentPath(
        foreignConsultancyCategoryToSlug(item.category),
        item.slug,
      )}`,
      lastModified: item.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }));

    return [
      ...staticRoutes,
      ...countryRoutes,
      ...programRoutes,
      ...categoryRoutes,
      ...consulateRoutes,
      ...blogRoutes,
      ...foreignContentRoutes,
    ];
  } catch {
    return staticRoutes;
  }
}
