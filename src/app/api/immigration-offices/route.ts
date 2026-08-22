import { NextResponse } from "next/server";
import {
  listActiveImmigrationOfficesPublic,
  serializeImmigrationOfficePublic,
} from "@/lib/repositories/immigration-office.repository";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") ?? undefined;
  const search = searchParams.get("search") ?? undefined;

  try {
    const offices = await listActiveImmigrationOfficesPublic({ city, search });
    return NextResponse.json(
      { offices },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  } catch (error) {
    console.error("[api/immigration-offices] list failed:", error);
    return NextResponse.json(
      { error: "Göç İdaresi kayıtları yüklenemedi." },
      { status: 500 },
    );
  }
}

export type ImmigrationOfficesApiResponse = {
  offices: ReturnType<typeof serializeImmigrationOfficePublic>[];
};
