import { prisma } from "@/lib/prisma";

export async function listSiteAssetsForAdmin(options?: { skip?: number; take?: number }) {
  return prisma.siteAsset.findMany({
    orderBy: [{ country: { name: "asc" } }, { fileName: "asc" }],
    skip: options?.skip,
    take: options?.take,
    select: {
      id: true,
      fileName: true,
      fileUrl: true,
      mimeType: true,
      byteSize: true,
      showInMenu: true,
      updatedAt: true,
      country: { select: { id: true, name: true, slug: true } },
    },
  });
}

export async function countSiteAssetsForAdmin() {
  return prisma.siteAsset.count();
}

export async function findSiteAssetsByCountryId(countryId: string) {
  return prisma.siteAsset.findMany({
    where: { countryId, showInMenu: true },
    orderBy: { fileName: "asc" },
    select: {
      id: true,
      fileName: true,
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
