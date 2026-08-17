import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/services/seo.service";
import {
  findCountriesForSitemap,
  findProgramsForSitemap,
  findCountryCategoryPairsForSitemap,
} from "@/lib/repositories/sitemap.repository";
import { findAllActiveConsulates } from "@/lib/repositories/consulate.repository";
import { buildCategoryPath, buildVisaProgramPath } from "@/lib/services/path-resolver.service";
import { buildConsulatePath } from "@/lib/paths";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl;
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/ulkeler`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/hizmetlerimiz`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/hakkimizda`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/iletisim`, changeFrequency: "monthly", priority: 0.8 },
  ];

  try {
    const [countries, programs, categoryPairs, consulates] = await Promise.all([
      findCountriesForSitemap(),
      findProgramsForSitemap(),
      findCountryCategoryPairsForSitemap(),
      findAllActiveConsulates(),
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

    return [
      ...staticRoutes,
      ...countryRoutes,
      ...programRoutes,
      ...categoryRoutes,
      ...consulateRoutes,
    ];
  } catch {
    return staticRoutes;
  }
}
