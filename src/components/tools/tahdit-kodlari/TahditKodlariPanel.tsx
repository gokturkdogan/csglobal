"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ContactCTA } from "@/components/domain/ContactCTA";
import {
  tahditCodeGroups,
  tahditCodes,
  tahditEntryStatusOptions,
  tahditKodlariData,
  type TahditCode,
  type TahditEntryStatus,
  matchesTahditSearch,
} from "@/lib/tahdit-kodlari";
import type { SiteSettingsMap } from "@/lib/site-settings.shared";

type Props = {
  settings: SiteSettingsMap;
};

function entryBadgeClass(status: TahditEntryStatus) {
  switch (status) {
    case "ENTRY_BAN":
      return "bg-csg-red/10 text-csg-red ring-csg-red/20";
    case "MINISTRY_PERMISSION":
      return "bg-amber-100 text-amber-900 ring-amber-200/80";
    case "INFORMATION_ONLY":
      return "bg-slate-100 text-slate-700 ring-slate-200";
    default:
      return "bg-emerald-50 text-emerald-800 ring-emerald-200/80";
  }
}

function TahditCodeCard({ code }: { code: TahditCode }) {
  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ring-1 ${entryBadgeClass(code.entryStatus)}`}
        >
          {code.entryStatusLabel}
        </span>
        {code.severity ? (
          <span className="inline-flex rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
            {code.severity}
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
          {code.group}
        </span>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900">{code.code}</h3>
          <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-csg-blue">
            {code.category}
          </p>
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-slate-600">{code.shortDescription}</p>

      <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/80 p-4">
        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
          Resmi Giriş Bilgisi
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-800">{code.entryMessage}</p>
        {code.banDuration ? (
          <p className="mt-2 text-xs font-semibold text-csg-red">
            Yasak süresi: {code.banDuration}
          </p>
        ) : null}
      </div>

      <p className="mt-3 text-[11px] text-slate-400">{code.systemTag}</p>
    </article>
  );
}

export function TahditKodlariPanel({ settings }: Props) {
  const [search, setSearch] = useState("");
  const [groupFilter, setGroupFilter] = useState<string>("ALL");
  const [entryFilter, setEntryFilter] = useState<TahditEntryStatus | "ALL">("ALL");

  const filteredCodes = useMemo(() => {
    return tahditCodes.filter((code) => {
      if (groupFilter !== "ALL" && code.group !== groupFilter) return false;
      if (entryFilter !== "ALL" && code.entryStatus !== entryFilter) return false;
      if (!matchesTahditSearch(code, search)) return false;
      return true;
    });
  }, [search, groupFilter, entryFilter]);

  const meta = tahditKodlariData.meta;
  const filterChipClass = (active: boolean) =>
    `shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
      active
        ? "bg-csg-blue text-white"
        : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
    }`;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
        <label htmlFor="tahdit-search" className="text-sm font-semibold text-slate-900">
          Kod veya anahtar kelime ile ara
        </label>
        <input
          id="tahdit-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Kod veya anahtar kelime ile ara…"
          className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-csg-blue focus:ring-2 focus:ring-csg-blue/20"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" className={filterChipClass(groupFilter === "ALL")} onClick={() => setGroupFilter("ALL")}>
            Tüm Kodlar
          </button>
          {tahditCodeGroups.map((group) => (
            <button
              key={group.code}
              type="button"
              className={filterChipClass(groupFilter === group.code)}
              onClick={() => setGroupFilter(group.code)}
            >
              {group.code} Kodları
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-slate-500">Giriş durumu:</span>
          {tahditEntryStatusOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={filterChipClass(entryFilter === option.value)}
              onClick={() => setEntryFilter(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {groupFilter !== "ALL" ? (
        <p className="text-sm text-slate-600">
          {tahditCodeGroups.find((g) => g.code === groupFilter)?.description}
        </p>
      ) : null}

      {filteredCodes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-base font-semibold text-slate-900">
            Aramanıza uygun tahdit kodu bulunamadı.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Kodun yazımını kontrol edin veya farklı bir anahtar kelime deneyin.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredCodes.map((code) => (
            <TahditCodeCard key={code.slug} code={code} />
          ))}
        </div>
      )}

      <section className="rounded-2xl border border-amber-200/80 bg-amber-50/80 p-5 md:p-6">
        <h2 className="text-sm font-semibold text-amber-950 md:text-base">
          {meta.disclaimerTitle}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-amber-950/80">{meta.disclaimerBody}</p>
      </section>

      <ContactCTA
        settings={settings}
        title={meta.ctaTitle}
        subtitle={meta.ctaSubtitle}
        context="Tahdit kodları araç"
      />

      <p className="text-center text-xs text-slate-500">
        <Link href="/araclar" className="font-semibold text-csg-blue hover:underline">
          Tüm araçlara dön
        </Link>
      </p>
    </div>
  );
}
