import { NextResponse } from "next/server";
import { fetchUsdTryRate } from "@/lib/usd-try-rate";

export const revalidate = 3600;

export async function GET() {
  try {
    const result = await fetchUsdTryRate();
    return NextResponse.json(result, {
      headers: {
        "Cache-Control": result.fallback
          ? "no-store"
          : "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return NextResponse.json(
      {
        rate: null,
        source: null,
        asOf: null,
        fallback: true,
        message: "Kur alınamadı.",
      },
      { status: 502 },
    );
  }
}
