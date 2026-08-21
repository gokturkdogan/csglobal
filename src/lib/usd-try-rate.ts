import { DEFAULT_USD_TRY_RATE } from "@/lib/visa-penalty-calculator";

export type UsdTryRateResult = {
  rate: number;
  source: string;
  asOf: string | null;
  fallback: boolean;
};

async function fetchFrankfurter(): Promise<UsdTryRateResult | null> {
  const response = await fetch(
    "https://api.frankfurter.app/latest?from=USD&to=TRY",
    {
      signal: AbortSignal.timeout(8_000),
      next: { revalidate: 3600 },
    },
  );
  if (!response.ok) return null;

  const data = (await response.json()) as {
    date?: string;
    rates?: { TRY?: number };
  };
  const rate = data.rates?.TRY;
  if (typeof rate !== "number" || !Number.isFinite(rate) || rate <= 0) {
    return null;
  }

  return {
    rate: Number(rate.toFixed(4)),
    source: "Frankfurter",
    asOf: data.date ?? null,
    fallback: false,
  };
}

async function fetchOpenErApi(): Promise<UsdTryRateResult | null> {
  const response = await fetch("https://open.er-api.com/v6/latest/USD", {
    signal: AbortSignal.timeout(8_000),
    next: { revalidate: 3600 },
  });
  if (!response.ok) return null;

  const data = (await response.json()) as {
    result?: string;
    time_last_update_utc?: string;
    rates?: { TRY?: number };
  };
  if (data.result !== "success") return null;

  const rate = data.rates?.TRY;
  if (typeof rate !== "number" || !Number.isFinite(rate) || rate <= 0) {
    return null;
  }

  return {
    rate: Number(rate.toFixed(4)),
    source: "ExchangeRate-API",
    asOf: data.time_last_update_utc ?? null,
    fallback: false,
  };
}

export async function fetchUsdTryRate(): Promise<UsdTryRateResult> {
  try {
    const primary = await fetchFrankfurter();
    if (primary) return primary;
  } catch {
    // try fallback
  }

  try {
    const secondary = await fetchOpenErApi();
    if (secondary) return secondary;
  } catch {
    // use static fallback
  }

  return {
    rate: DEFAULT_USD_TRY_RATE,
    source: "Varsayılan",
    asOf: null,
    fallback: true,
  };
}
