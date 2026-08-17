"use client";

import { useEffect, useRef, useState } from "react";
import type { HomePopularCountry } from "@/lib/homepage";
import { FlagImage } from "@/components/ui/FlagImage";
import { SiteImage } from "@/components/ui/SiteImage";
import { resolveCountryGridItemImage } from "@/lib/country-item-image";
import { useHomepageEdit } from "./HomepageEditContext";

export function HomeEditablePopularCountries({
  countryCatalog,
}: {
  countryCatalog: HomePopularCountry[];
}) {
  const edit = useHomepageEdit();
  if (!edit) return null;

  const slugs = edit.content.popularCountrySlugs;
  const bySlug = new Map(countryCatalog.map((country) => [country.slug, country]));

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {slugs.map((slug, index) => (
        <HomeEditablePopularCountrySlot
          key={`popular-country-${index}`}
          index={index}
          slug={slug}
          country={slug ? bySlug.get(slug) : undefined}
        />
      ))}
    </div>
  );
}

function HomeEditablePopularCountrySlot({
  index,
  slug,
  country,
}: {
  index: number;
  slug: string;
  country?: HomePopularCountry;
}) {
  const edit = useHomepageEdit();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  if (!edit) return null;

  const usedSlugs = edit.content.popularCountrySlugs.filter((item, i) => i !== index && item);
  const serviceCount = country?.visaPrograms.length ?? 0;

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!panelRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  return (
    <div ref={panelRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`group flex w-full cursor-pointer flex-col overflow-hidden rounded-xl border bg-white text-left shadow-sm transition ${
          open
            ? "border-csg-blue ring-2 ring-csg-blue ring-offset-2"
            : "border-dashed border-slate-300 hover:border-csg-blue/40 hover:shadow-md"
        }`}
        aria-expanded={open}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
          {country ? (
            <SiteImage
              src={resolveCountryGridItemImage(country.itemImage)}
              alt={country.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-slate-100 text-sm text-slate-500">
              Ülke seçin
            </div>
          )}
          {country && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-3 left-4 flex items-center gap-3">
                {country.flag && (
                  <FlagImage
                    flag={country.flag}
                    displayWidth={48}
                    className="rounded shadow-md ring-1 ring-white/30"
                  />
                )}
                <span className="text-lg font-semibold text-white">{country.name}</span>
              </div>
              <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-700 backdrop-blur-sm">
                {serviceCount} program
              </span>
            </>
          )}
        </div>
        {country?.shortDescription ? (
          <p className="px-5 py-4 text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {country.shortDescription}
          </p>
        ) : (
          <p className="px-5 py-4 text-sm text-slate-500">Popüler ülkeler için ülke seçin</p>
        )}
        <span className="px-5 pb-4 text-sm font-medium text-csg-red">Düzenlemek için tıklayın</span>
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-2 min-w-[240px] rounded-lg border border-slate-200 bg-white p-3 shadow-lg"
        >
          <p className="text-xs font-semibold text-slate-700">Popüler ülke #{index + 1}</p>
          <select
            value={slug}
            onChange={(event) => {
              edit.updatePopularCountrySlug(index, event.target.value);
              setOpen(false);
            }}
            className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-csg-blue focus:outline-none focus:ring-2 focus:ring-csg-blue/20"
          >
            <option value="">Ülke seçin</option>
            {edit.countryOptions.map((option) => (
              <option
                key={option.slug}
                value={option.slug}
                disabled={usedSlugs.includes(option.slug)}
              >
                {option.name}
              </option>
            ))}
          </select>
          <p className="mt-2 text-[11px] leading-snug text-slate-500">
            Kaydettiğinizde canlı sitede aynı ülkeler listelenir.
          </p>
        </div>
      )}
    </div>
  );
}
