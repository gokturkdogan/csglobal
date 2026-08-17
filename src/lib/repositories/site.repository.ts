import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const findSitePageBySlug = cache(async (slug: string) => {
  return prisma.sitePage.findFirst({
    where: { slug, isActive: true },
  });
});

export async function findSitePageRecordBySlug(slug: string) {
  return prisma.sitePage.findFirst({
    where: { slug },
  });
}

export async function findSiteSettings() {
  return prisma.siteSetting.findMany();
}
