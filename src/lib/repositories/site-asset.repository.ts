import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import {
  buildAdminStringSearchWhere,
  normalizeAdminSearchQuery,
} from "@/lib/admin-list-filters";

export type AdminSiteAssetListFilters = {
  q?: string;
  countryId?: string;
};

function buildSiteAssetAdminWhere(
  filters?: AdminSiteAssetListFilters,
): Prisma.SiteAssetWhereInput {
  const and: Prisma.SiteAssetWhereInput[] = [];
  const q = normalizeAdminSearchQuery(filters?.q);
  const searchWhere = buildAdminStringSearchWhere(q, ["fileName"]);
  if (searchWhere) and.push(searchWhere);

  if (filters?.countryId?.trim()) {
    and.push({ countryId: filters.countryId.trim() });
  }

  if (and.length === 0) return {};
  if (and.length === 1) return and[0];
  return { AND: and };
}

export async function listSiteAssetsForAdmin(
  options?: { skip?: number; take?: number } & AdminSiteAssetListFilters,
) {
  const { skip, take, q, countryId } = options ?? {};
  return prisma.siteAsset.findMany({
    where: buildSiteAssetAdminWhere({ q, countryId }),
    orderBy: [{ country: { name: "asc" } }, { fileName: "asc" }],
    skip,
    take,
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

export async function countSiteAssetsForAdmin(filters?: AdminSiteAssetListFilters) {
  return prisma.siteAsset.count({ where: buildSiteAssetAdminWhere(filters) });
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
