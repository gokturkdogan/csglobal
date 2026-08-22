import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/api/admin-auth";
import { parseImmigrationOfficeJsonBody } from "@/lib/immigration-office-input";
import {
  findImmigrationOfficeById,
  serializeImmigrationOfficePublic,
} from "@/lib/repositories/immigration-office.repository";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

function serializeAdminOffice(office: NonNullable<Awaited<ReturnType<typeof findImmigrationOfficeById>>>) {
  return {
    ...serializeImmigrationOfficePublic(office),
    notes: office.notes,
    isActive: office.isActive,
    sortOrder: office.sortOrder,
    createdAt: office.createdAt.toISOString(),
    updatedAt: office.updatedAt.toISOString(),
  };
}

export async function GET(_request: Request, context: RouteContext) {
  const authError = await requireAdminApi();
  if (authError) return authError;

  const { id } = await context.params;
  const office = await findImmigrationOfficeById(id);
  if (!office) {
    return NextResponse.json({ error: "Kayıt bulunamadı." }, { status: 404 });
  }

  return NextResponse.json({ item: serializeAdminOffice(office) });
}

export async function PATCH(request: Request, context: RouteContext) {
  const authError = await requireAdminApi();
  if (authError) return authError;

  const { id } = await context.params;
  const existing = await findImmigrationOfficeById(id);
  if (!existing) {
    return NextResponse.json({ error: "Kayıt bulunamadı." }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Geçersiz istek gövdesi." }, { status: 400 });
  }

  const record = body as Record<string, unknown>;

  if (record.toggleActive === true) {
    try {
      const office = await prisma.immigrationOffice.update({
        where: { id },
        data: { isActive: !existing.isActive },
      });
      return NextResponse.json({ item: serializeAdminOffice(office) });
    } catch (error) {
      console.error("[api/admin/immigration-offices/:id] toggle failed:", error);
      return NextResponse.json({ error: "Durum güncellenemedi." }, { status: 500 });
    }
  }

  const parsed = parseImmigrationOfficeJsonBody(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.message }, { status: 400 });
  }

  try {
    const office = await prisma.immigrationOffice.update({
      where: { id },
      data: parsed.data,
    });
    return NextResponse.json({ item: serializeAdminOffice(office) });
  } catch (error) {
    console.error("[api/admin/immigration-offices/:id] update failed:", error);
    return NextResponse.json({ error: "Kayıt güncellenemedi." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const authError = await requireAdminApi();
  if (authError) return authError;

  const { id } = await context.params;

  try {
    await prisma.immigrationOffice.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/admin/immigration-offices/:id] delete failed:", error);
    return NextResponse.json({ error: "Kayıt silinemedi." }, { status: 500 });
  }
}
