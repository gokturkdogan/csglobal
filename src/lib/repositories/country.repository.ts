import { prisma } from "@/lib/prisma";

const activeCountry = { isActive: true };

export async function findActiveCountries() {
  return prisma.country.findMany({
    where: activeCountry,
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: {
      services: {
        where: { isActive: true },
        select: { id: true },
      },
    },
  });
}

export async function findCountryBySlug(slug: string) {
  return prisma.country.findFirst({
    where: { slug, ...activeCountry },
  });
}

/** Ülke detay sayfası: ülkeye özel SSS dahil */
export async function findCountryPageBySlug(slug: string) {
  return prisma.country.findFirst({
    where: { slug, ...activeCountry },
    include: {
      faqs: {
        where: {
          isActive: true,
          serviceId: null,
          categoryId: null,
        },
        orderBy: { sortOrder: "asc" },
        take: 5,
        select: { id: true, question: true, answer: true },
      },
    },
  });
}

export async function findCountryById(id: string) {
  return prisma.country.findUnique({
    where: { id },
    include: {
      faqs: {
        where: { serviceId: null, categoryId: null },
        orderBy: { sortOrder: "asc" },
        take: 5,
      },
    },
  });
}

export async function countActiveCountries() {
  return prisma.country.count({ where: activeCountry });
}
