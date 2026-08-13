import { prisma } from "@/lib/prisma";

export async function listSiteAssetsForAdmin() {
  return prisma.siteAsset.findMany({
    orderBy: [{ country: { name: "asc" } }, { fileName: "asc" }],
    include: {
      country: { select: { id: true, name: true, slug: true } },
    },
  });
}

export async function findSiteAssetForPublicUrl(
  id: number,
  countrySlug: string,
  fileName: string,
) {
  const decodedName = decodeURIComponent(fileName);
  return prisma.siteAsset.findFirst({
    where: {
      id,
      fileName: decodedName,
      country: { slug: countrySlug, isActive: true },
    },
    select: {
      fileUrl: true,
      cloudinaryPublicId: true,
      mimeType: true,
      fileName: true,
      fileData: true,
    },
  });
}

export async function findSiteAssetForPublicView(
  id: number,
  countrySlug: string,
  fileName: string,
) {
  const decodedName = decodeURIComponent(fileName);
  return prisma.siteAsset.findFirst({
    where: {
      id,
      fileName: decodedName,
      country: { slug: countrySlug, isActive: true },
    },
    select: {
      id: true,
      fileName: true,
      fileUrl: true,
      cloudinaryPublicId: true,
      mimeType: true,
      byteSize: true,
      fileData: true,
      country: { select: { name: true, slug: true } },
    },
  });
}

export async function deleteSiteAssetById(id: number) {
  return prisma.siteAsset.delete({ where: { id } });
}
