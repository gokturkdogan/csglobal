import { prisma } from "@/lib/prisma";

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

/** Yalnızca aktif program içeren ülke-kategori çiftleri. */
export async function findCountryCategoryPairsForSitemap() {
  const programs = await prisma.visaProgram.findMany({
    where: {
      isActive: true,
      country: { isActive: true },
    },
    select: {
      updatedAt: true,
      country: { select: { slug: true } },
      category: { select: { slug: true } },
      categoryLinks: {
        select: { category: { select: { slug: true } } },
      },
    },
  });

  const pairMap = new Map<string, Date>();

  for (const program of programs) {
    const countrySlug = program.country.slug;
    const categorySlugs = new Set<string>();
    if (program.category?.slug) categorySlugs.add(program.category.slug);
    for (const link of program.categoryLinks) {
      if (link.category.slug) categorySlugs.add(link.category.slug);
    }
    for (const categorySlug of categorySlugs) {
      const key = `${countrySlug}/${categorySlug}`;
      const existing = pairMap.get(key);
      if (!existing || program.updatedAt > existing) {
        pairMap.set(key, program.updatedAt);
      }
    }
  }

  return Array.from(pairMap.entries()).map(([key, updatedAt]) => {
    const slash = key.indexOf("/");
    return {
      countrySlug: key.slice(0, slash),
      categorySlug: key.slice(slash + 1),
      updatedAt,
    };
  });
}
