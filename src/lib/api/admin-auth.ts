import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function requireAdminApi(): Promise<NextResponse | null> {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }
  return null;
}
