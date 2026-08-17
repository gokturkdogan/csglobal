"use client";

import { useEffect, useRef, useState } from "react";
import { FlagImage } from "@/components/ui/FlagImage";
import { useHomepageEdit } from "./HomepageEditContext";

export function HomeEditableCountryBadges() {
  const edit = useHomepageEdit();
  if (!edit) return null;

  const slugs = edit.content.heroQuickLinkSlugs;

  return (
    <div className="mt-12 flex flex-wrap gap-2">
      {slugs.map((slug, index) => (
        <HomeEditableCountryBadge key={`hero-country-${index}`} index={index} slug={slug} />
      ))}
    </div>
  );
}

function HomeEditableCountryBadge({ index, slug }: { index: number; slug: string }) {
  const edit = useHomepageEdit();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  if (!edit) return null;

  const country = edit.countryOptions.find((item) => item.slug === slug);
  const usedSlugs = edit.content.heroQuickLinkSlugs.filter((item, i) => i !== index && item);

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
        className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition ${
          open
            ? "border-csg-blue bg-csg-blue/30 ring-2 ring-csg-blue ring-offset-2 ring-offset-slate-900"
            : "border-dashed border-white/40 bg-white/10 hover:border-white/60 hover:bg-white/20"
        }`}
        aria-expanded={open}
      >
        {country?.flag && (
          <FlagImage flag={country.flag} displayWidth={20} className="rounded-sm" />
        )}
        {country?.name ?? "Ülke seçin"}
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-2 min-w-[220px] rounded-lg border border-slate-200 bg-white p-3 shadow-lg shadow-slate-900/20"
        >
          <p className="text-xs font-semibold text-slate-700">Hero ülke rozeti</p>
          <select
            value={slug}
            onChange={(event) => {
              edit.updateHeroQuickLinkSlug(index, event.target.value);
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
            Seçim kaydettiğinizde canlı sitede de güncellenir.
          </p>
        </div>
      )}
    </div>
  );
}
