import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/api/admin-auth";
import { parseImmigrationOfficeJsonBody } from "@/lib/immigration-office-input";
import {
  countImmigrationOfficesForAdmin,
  findImmigrationOfficeById,
  listImmigrationOfficesForAdmin,
  serializeImmigrationOfficePublic,
} from "@/lib/repositories/immigration-office.repository";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function serializeAdminOffice(office: Awaited<ReturnType<typeof findImmigrationOfficeById>>) {
  if (!office) return null;
  return {
    ...serializeImmigrationOfficePublic(office),
    notes: office.notes,
    isActive: office.isActive,
    sortOrder: office.sortOrder,
    createdAt: office.createdAt.toISOString(),
    updatedAt: office.updatedAt.toISOString(),
  };
}

export async function GET(request: Request) {
  const authError = await requireAdminApi();
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? undefined;
  const city = searchParams.get("city") ?? undefined;
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const pageSize = Math.min(100, Math.max(1, Number(searchParams.get("pageSize") || 20)));
  const skip = (page - 1) * pageSize;

  try {
    const [items, totalCount] = await Promise.all([
      listImmigrationOfficesForAdmin({ skip, take: pageSize, q, city }),
      countImmigrationOfficesForAdmin({ q, city }),
    ]);

    return NextResponse.json({
      items: items.map((office) => serializeAdminOffice(office)),
      page,
      pageSize,
      totalCount,
    });
  } catch (error) {
    console.error("[api/admin/immigration-offices] list failed:", error);
    return NextResponse.json({ error: "Kayıtlar yüklenemedi." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authError = await requireAdminApi();
  if (authError) return authError;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON." }, { status: 400 });
  }

  const parsed = parseImmigrationOfficeJsonBody(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.message }, { status: 400 });
  }

  try {
    const office = await prisma.immigrationOffice.create({ data: parsed.data });
    return NextResponse.json({ item: serializeAdminOffice(office) }, { status: 201 });
  } catch (error) {
    console.error("[api/admin/immigration-offices] create failed:", error);
    return NextResponse.json({ error: "Kayıt oluşturulamadı." }, { status: 500 });
  }
}
