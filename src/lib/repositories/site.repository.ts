import { prisma } from "@/lib/prisma";

export async function findSitePageBySlug(slug: string) {
  return prisma.sitePage.findFirst({
    where: { slug, isActive: true },
  });
}

/** Rehber liste sayfası site kaydı; admin ilk açılışta otomatik oluşturur. */
export async function ensureGuidesListSitePage() {
  return prisma.sitePage.upsert({
    where: { slug: "rehber" },
    create: {
      slug: "rehber",
      title: "Rehberlerimiz",
      content: "Ülkeye özel vize ve göçmenlik rehberleri.",
      isActive: true,
    },
    update: {},
  });
}

export async function findSiteSettings() {
  return prisma.siteSetting.findMany();
}
