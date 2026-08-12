import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/services/seo.service";
import { findActiveCountries } from "@/lib/repositories/country.repository";
import { findAllActiveServices } from "@/lib/repositories/service.repository";
import { findAllActiveCategories } from "@/lib/repositories/category.repository";
import { findAllPublishedArticles } from "@/lib/repositories/article.repository";
import { buildCategoryPath, buildServicePath } from "@/lib/services/path-resolver.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl;
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/ulkeler`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/rehber`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/hakkimizda`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/iletisim`, changeFrequency: "monthly", priority: 0.8 },
  ];

  try {
    const [countries, services, categories, articles] = await Promise.all([
      findActiveCountries(),
      findAllActiveServices(),
      findAllActiveCategories(),
      findAllPublishedArticles(),
    ]);

    const countryRoutes = countries.map((c) => ({
      url: `${base}/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));

    const serviceRoutes = services
      .filter((s) => s.country.isActive)
      .map((s) => ({
        url: `${base}${buildServicePath(s.country.slug, s.slug)}`,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

    const categoryRoutes = countries.flatMap((country) =>
      categories.map((cat) => ({
        url: `${base}${buildCategoryPath(country.slug, [cat.slug])}`,
        changeFrequency: "weekly" as const,
        priority: 0.75,
      })),
    );

    const articleRoutes = articles.map((a) => ({
      url: `${base}/rehber/${a.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    return [
      ...staticRoutes,
      ...countryRoutes,
      ...serviceRoutes,
      ...categoryRoutes,
      ...articleRoutes,
    ];
  } catch {
    return staticRoutes;
  }
}
