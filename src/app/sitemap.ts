import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/services/seo.service";
import { findActiveCountries } from "@/lib/repositories/country.repository";
import { findAllActivePrograms } from "@/lib/repositories/visa-program.repository";
import { findAllActiveCategories } from "@/lib/repositories/category.repository";
import { findAllActiveConsulates } from "@/lib/repositories/consulate.repository";
import { buildCategoryPath, buildVisaProgramPath } from "@/lib/services/path-resolver.service";
import { buildConsulatePath } from "@/lib/paths";

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
    const [countries, programs, categories, consulates] = await Promise.all([
      findActiveCountries(),
      findAllActivePrograms(),
      findAllActiveCategories(),
      findAllActiveConsulates(),
    ]);

    const countryRoutes = countries.map((c) => ({
      url: `${base}/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));

    const programRoutes = programs
      .filter((p) => p.country.isActive)
      .map((p) => ({
        url: `${base}${buildVisaProgramPath(p.country.slug, p.slug)}`,
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

    const consulateRoutes = consulates.map((c) => ({
      url: `${base}${buildConsulatePath(c.country.slug, c.slug)}`,
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
