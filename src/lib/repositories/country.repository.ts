import { cache } from "react";
import { prisma } from "@/lib/prisma";

const activeCountry = { isActive: true };

export const findActiveCountries = cache(async () => {
  const countries = await prisma.country.findMany({
    where: activeCountry,
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      slug: true,
      shortDescription: true,
      flag: true,
      itemImage: true,
    },
  });

  if (countries.length === 0) return [];

  const counts = await prisma.visaProgram.groupBy({
    by: ["countryId"],
    where: {
      isActive: true,
      countryId: { in: countries.map((country) => country.id) },
    },
    _count: { _all: true },
  });
  const countMap = new Map(counts.map((row) => [row.countryId, row._count._all]));

  return countries.map((country) => ({
    ...country,
    visaPrograms: Array.from({ length: countMap.get(country.id) ?? 0 }, (_, index) => ({
      id: `${country.id}-${index}`,
    })),
  }));
});

export const findCountryBySlug = cache(async (slug: string) => {
  return prisma.country.findFirst({
    where: { slug, ...activeCountry },
  });
});

/** Ülke detay sayfası: ülkeye özel SSS dahil */
export const findCountryPageBySlug = cache(async (slug: string) => {
  return prisma.country.findFirst({
    where: { slug, ...activeCountry },
    include: {
      faqs: {
        where: {
          isActive: true,
          visaProgramId: null,
          categoryId: null,
        },
        orderBy: { sortOrder: "asc" },
        take: 5,
        select: { id: true, question: true, answer: true },
      },
    },
  });
});

export async function findCountryById(id: string) {
  return prisma.country.findUnique({
    where: { id },
    include: {
      faqs: {
        where: { visaProgramId: null, categoryId: null },
        orderBy: { sortOrder: "asc" },
        take: 5,
      },
    },
  });
}

export async function countActiveCountries() {
  return prisma.country.count({ where: activeCountry });
}
