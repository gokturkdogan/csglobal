"use client";

import { useMemo, useState } from "react";
import { FlagImage } from "@/components/ui/FlagImage";
import {
  COUNTRY_DETAIL_FEATURED_PRIMARY_COUNT,
  parseCountryDetailPopularCountrySlugs,
  serializeCountryDetailPopularCountrySlugs,
} from "@/lib/country-detail-popular";

const selectClass =
  "mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition focus:border-csg-blue focus:outline-none focus:ring-2 focus:ring-csg-blue/20";

export type FeaturedCountryOption = {
  name: string;
  slug: string;
  flag?: string | null;
};

type Props = {
  initialJson: string;
  countries: FeaturedCountryOption[];
};

export function FeaturedCountriesEditor({ initialJson, countries }: Props) {
  const [slots, setSlots] = useState(() =>
    parseCountryDetailPopularCountrySlugs(initialJson),
  );

  const serialized = useMemo(
    () => serializeCountryDetailPopularCountrySlugs(slots),
    [slots],
  );

  const updateSlot = (index: number, slug: string) => {
    setSlots((prev) => {
      const next = [...prev];
      next[index] = slug;
      return next;
    });
  };

  const usedElsewhere = (index: number) =>
    new Set(
      slots.map((slug, i) => (i !== index && slug ? slug : null)).filter(Boolean) as string[],
    );

  return (
    <div className="space-y-8">
      <input
        type="hidden"
        name="countryDetailPopularCountrySlugsJson"
        value={serialized}
        readOnly
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {Array.from({ length: COUNTRY_DETAIL_FEATURED_PRIMARY_COUNT }, (_, index) => (
          <SlotCard
            key={`primary-${index}`}
            label={`Popüler ülke ${index + 1}`}
            slug={slots[index] ?? ""}
            countries={countries}
            disabledSlugs={usedElsewhere(index)}
            onChange={(slug) => updateSlot(index, slug)}
            variant="primary"
          />
        ))}
      </div>

      <div className="max-w-md">
        <SlotCard
          label="Yedek ülke (+1)"
          slug={slots[COUNTRY_DETAIL_FEATURED_PRIMARY_COUNT] ?? ""}
          countries={countries}
          disabledSlugs={usedElsewhere(COUNTRY_DETAIL_FEATURED_PRIMARY_COUNT)}
          onChange={(slug) => updateSlot(COUNTRY_DETAIL_FEATURED_PRIMARY_COUNT, slug)}
          variant="backup"
          hint="Ziyaret edilen ülke ilk 5 içindeyse listede yerine bu ülke gösterilir."
        />
      </div>
    </div>
  );
}

function SlotCard({
  label,
  slug,
  countries,
  disabledSlugs,
  onChange,
  variant,
  hint,
}: {
  label: string;
  slug: string;
  countries: FeaturedCountryOption[];
  disabledSlugs: Set<string>;
  onChange: (slug: string) => void;
  variant: "primary" | "backup";
  hint?: string;
}) {
  const selected = slug ? countries.find((country) => country.slug === slug) : undefined;

  return (
    <div
      className={`rounded-xl border bg-white p-4 shadow-sm ${
        variant === "backup"
          ? "border-amber-200 bg-amber-50/40 ring-1 ring-amber-100"
          : "border-slate-200"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>

      <div className="mt-3 flex min-h-[3rem] items-center gap-3">
        {selected?.flag ? (
          <FlagImage flag={selected.flag} displayWidth={40} alt="" className="rounded shadow-sm" />
        ) : (
          <span className="flex h-8 w-12 shrink-0 items-center justify-center rounded bg-slate-100 text-[10px] text-slate-400">
            -
          </span>
        )}
        <p className="min-w-0 text-sm font-medium text-slate-900">
          {selected?.name ?? "Seçilmedi"}
        </p>
      </div>

      <select
        value={slug}
        onChange={(e) => onChange(e.target.value)}
        className={selectClass}
      >
        <option value="">Ülke seçin</option>
        {countries.map((country) => (
          <option
            key={country.slug}
            value={country.slug}
            disabled={disabledSlugs.has(country.slug)}
          >
            {country.name}
          </option>
        ))}
      </select>

      {hint && <p className="mt-2 text-[11px] leading-snug text-slate-500">{hint}</p>}
    </div>
  );
}