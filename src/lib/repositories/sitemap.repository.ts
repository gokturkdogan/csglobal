import { prisma } from "@/lib/prisma";
import { isIndexableCountryCategory } from "@/lib/country-page/category-seo";

export async function findCountriesForSitemap() {
  return prisma.country.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: { slug: true, updatedAt: true },
  });
}

export async function findProgramsForSitemap() {
  return prisma.visaProgram.findMany({
    where: { isActive: true, country: { isActive: true } },
    select: {
      slug: true,
      updatedAt: true,
      country: { select: { slug: true } },
    },
  });
}

/**
 * Indexlenebilir ülke-kategori çiftleri:
 * - aktif kategori, en az MIN_PROGRAMS_FOR_INDEXABLE_CATEGORY aktif program,
 * - aynı ülkede kategoriyle aynı slug'lı program yok (o URL programa çözülür).
 */
export async function findCountryCategoryPairsForSitemap() {
  const activeCategory = { isActive: true };
  const programs = await prisma.visaProgram.findMany({
    where: {
      isActive: true,
      country: { isActive: true },
    },
    select: {
      id: true,
      slug: true,
      updatedAt: true,
      country: { select: { slug: true } },
      category: { select: { slug: true, isActive: true } },
      categoryLinks: {
        where: { category: activeCategory },
        select: { category: { select: { slug: true } } },
      },
    },
  });

  const programPaths = new Set(programs.map((p) => `${p.country.slug}/${p.slug}`));
  const pairMap = new Map<string, { updatedAt: Date; programIds: Set<string> }>();

  for (const program of programs) {
    const countrySlug = program.country.slug;
    const categorySlugs = new Set<string>();
    if (program.category?.slug && program.category.isActive) categorySlugs.add(program.category.slug);
    for (const link of program.categoryLinks) {
      if (link.category.slug) categorySlugs.add(link.category.slug);
    }
    for (const categorySlug of categorySlugs) {
      const key = `${countrySlug}/${categorySlug}`;
      const entry = pairMap.get(key) ?? { updatedAt: program.updatedAt, programIds: new Set<string>() };
      entry.programIds.add(program.id);
      if (program.updatedAt > entry.updatedAt) entry.updatedAt = program.updatedAt;
      pairMap.set(key, entry);
    }
  }

  return Array.from(pairMap.entries())
    .filter(
      ([key, entry]) =>
        isIndexableCountryCategory(entry.programIds.size) && !programPaths.has(key),
    )
    .map(([key, entry]) => {
      const slash = key.indexOf("/");
      return {
        countrySlug: key.slice(0, slash),
        categorySlug: key.slice(slash + 1),
        updatedAt: entry.updatedAt,
      };
    });
}
