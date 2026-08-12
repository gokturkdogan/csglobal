import { prisma } from "@/lib/prisma";

export async function findSitePageBySlug(slug: string) {
  return prisma.sitePage.findFirst({
    where: { slug, isActive: true },
  });
}

export async function findSiteSettings() {
  return prisma.siteSetting.findMany();
}
