import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { normalizeAdminSearchQuery } from "@/lib/admin-list-filters";

export type ImmigrationOfficePublicRecord = {
  id: string;
  institutionName: string;
  slug: string;
  city: string;
  district: string | null;
  address: string;
  phone: string | null;
  workingHours: string | null;
  latitude: number | null;
  longitude: number | null;
  mapsUrl: string | null;
  shortDescription: string | null;
};

export type AdminImmigrationOfficeListFilters = {
  q?: string;
  city?: string;
};

const immigrationOfficePublicSelect = {
  id: true,
  institutionName: true,
  slug: true,
  city: true,
  district: true,
  address: true,
  phone: true,
  workingHours: true,
  latitude: true,
  longitude: true,
  mapsUrl: true,
  shortDescription: true,
} satisfies Prisma.ImmigrationOfficeSelect;

function decimalToNumber(value: Prisma.Decimal | null | undefined): number | null {
  if (value == null) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function serializeImmigrationOfficePublic(
  office: Prisma.ImmigrationOfficeGetPayload<{ select: typeof immigrationOfficePublicSelect }>,
): ImmigrationOfficePublicRecord {
  return {
    id: office.id,
    institutionName: office.institutionName,
    slug: office.slug,
    city: office.city,
    district: office.district,
    address: office.address,
    phone: office.phone,
    workingHours: office.workingHours,
    latitude: decimalToNumber(office.latitude),
    longitude: decimalToNumber(office.longitude),
    mapsUrl: office.mapsUrl,
    shortDescription: office.shortDescription,
  };
}

function buildPublicWhere(filters: { city?: string; search?: string }): Prisma.ImmigrationOfficeWhereInput {
  const where: Prisma.ImmigrationOfficeWhereInput = { isActive: true };

  const city = filters.city?.trim();
  if (city) {
    where.city = { equals: city, mode: "insensitive" };
  }

  const search = normalizeAdminSearchQuery(filters.search);
  if (search) {
    where.OR = [
      { institutionName: { contains: search, mode: "insensitive" } },
      { city: { contains: search, mode: "insensitive" } },
      { district: { contains: search, mode: "insensitive" } },
      { address: { contains: search, mode: "insensitive" } },
    ];
  }

  return where;
}

function buildAdminWhere(filters: AdminImmigrationOfficeListFilters): Prisma.ImmigrationOfficeWhereInput {
  const where: Prisma.ImmigrationOfficeWhereInput = {};
  const q = normalizeAdminSearchQuery(filters.q);
  const city = filters.city?.trim();

  if (city) {
    where.city = { equals: city, mode: "insensitive" };
  }

  if (q) {
    where.OR = [
      { institutionName: { contains: q, mode: "insensitive" } },
      { city: { contains: q, mode: "insensitive" } },
      { district: { contains: q, mode: "insensitive" } },
      { address: { contains: q, mode: "insensitive" } },
      { slug: { contains: q, mode: "insensitive" } },
    ];
  }

  return where;
}

export async function listActiveImmigrationOfficesPublic(filters: {
  city?: string;
  search?: string;
}): Promise<ImmigrationOfficePublicRecord[]> {
  const offices = await prisma.immigrationOffice.findMany({
    where: buildPublicWhere(filters),
    select: immigrationOfficePublicSelect,
    orderBy: [{ sortOrder: "asc" }, { institutionName: "asc" }],
  });

  return offices.map(serializeImmigrationOfficePublic);
}

export async function listImmigrationOfficeCitiesPublic(): Promise<string[]> {
  const rows = await prisma.immigrationOffice.findMany({
    where: { isActive: true },
    select: { city: true },
    distinct: ["city"],
    orderBy: { city: "asc" },
  });

  return rows.map((row) => row.city);
}

export async function listImmigrationOfficeCitiesForAdmin(): Promise<string[]> {
  const rows = await prisma.immigrationOffice.findMany({
    select: { city: true },
    distinct: ["city"],
    orderBy: { city: "asc" },
  });

  return rows.map((row) => row.city);
}

export async function listImmigrationOfficesForAdmin({
  skip,
  take,
  q,
  city,
}: AdminImmigrationOfficeListFilters & { skip: number; take: number }) {
  return prisma.immigrationOffice.findMany({
    where: buildAdminWhere({ q, city }),
    orderBy: [{ sortOrder: "asc" }, { institutionName: "asc" }],
    skip,
    take,
  });
}

export async function countImmigrationOfficesForAdmin(filters: AdminImmigrationOfficeListFilters) {
  return prisma.immigrationOffice.count({
    where: buildAdminWhere(filters),
  });
}

export async function findImmigrationOfficeForAdmin(id: string) {
  return prisma.immigrationOffice.findUnique({ where: { id } });
}

export async function findImmigrationOfficeById(id: string) {
  return prisma.immigrationOffice.findUnique({ where: { id } });
}

export async function findImmigrationOfficeBySlug(slug: string) {
  return prisma.immigrationOffice.findUnique({ where: { slug } });
}
