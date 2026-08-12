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

export async function findCountryById(id: string) {
  return prisma.country.findUnique({ where: { id } });
}

export async function countActiveCountries() {
  return prisma.country.count({ where: activeCountry });
}
