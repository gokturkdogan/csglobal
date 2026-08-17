"use client";

import { useState } from "react";
import type { AdminActionResult } from "@/lib/admin-action-result";
import {
  EAGVS_IMPORT_URL_SLOTS,
  matchCountrySlugFromEagvsUrl,
} from "@/lib/eagvs-scrape";
import {
  AdminActionForm,
  AdminSubmitButton,
} from "@/components/admin/AdminForm";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-csg-blue focus:outline-none focus:ring-2 focus:ring-csg-blue/20";

type CountryOption = {
  id: string;
  name: string;
  slug: string;
};

type Props = {
  countries: CountryOption[];
  action: (formData: FormData) => Promise<AdminActionResult>;
};

export function EagvsConsulateImportForm({ countries, action }: Props) {
  const [urls, setUrls] = useState<string[]>(
    Array.from({ length: EAGVS_IMPORT_URL_SLOTS }, () => ""),
  );
  const [countryId, setCountryId] = useState("");
  const [countryHint, setCountryHint] = useState<string | null>(null);

  function applyCountryFromUrl(url: string) {
    const slug = matchCountrySlugFromEagvsUrl(url, countries.map((c) => c.slug));
    if (!slug) return;

    const country = countries.find((c) => c.slug === slug);
    if (!country) {
      setCountryHint("URL üzerinden ülke tanındı ancak sistemde eşleşen kayıt yok.");
      return;
    }

    setCountryId(country.id);
    setCountryHint(`${country.name} linkten seçildi.`);
  }

  function handleUrlChange(index: number, value: string) {
    setUrls((current) => {
      const next = [...current];
      next[index] = value;
      return next;
    });
    applyCountryFromUrl(value);
  }

  return (
    <AdminActionForm
      action={action}
      className="max-w-2xl space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      successMessage="Konsolosluk başarıyla içe aktarıldı."
    >
      <div>
        <p className="text-sm font-medium text-slate-700">EAGVS konsolosluk linkleri</p>
        <p className="mt-1 text-xs text-slate-500">
          En fazla {EAGVS_IMPORT_URL_SLOTS} link. H1 başlık ad olur; harita embed ve adres otomatik çıkarılır.
        </p>
        <div className="mt-2 space-y-3">
          {urls.map((url, index) => (
            <label key={index} className="block">
              <span className="text-xs font-medium text-slate-500">Link {index + 1}</span>
              <input
                name="urls"
                type="url"
                value={url}
                placeholder="https://www.eagvs.com/avusturya/ankara-buyukelciligi"
                className={inputClass}
                onChange={(event) => handleUrlChange(index, event.target.value)}
                onPaste={(event) => {
                  const pasted = event.clipboardData.getData("text");
                  window.setTimeout(() => handleUrlChange(index, pasted), 0);
                }}
                onBlur={(event) => applyCountryFromUrl(event.target.value)}
              />
            </label>
          ))}
        </div>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Ülke</span>
        <select
          name="countryId"
          value={countryId}
          onChange={(event) => {
            setCountryId(event.target.value);
            setCountryHint(null);
          }}
          className={inputClass}
        >
          <option value="">Linkten otomatik seçilir</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>{country.name}</option>
          ))}
        </select>
        {countryHint ? (
          <span className="mt-1.5 block text-xs font-medium text-csg-blue">{countryHint}</span>
        ) : null}
      </label>

      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        <p className="font-medium text-slate-800">Otomatik alanlar</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>İlk başlık (H1): konsolosluk adı ve banner başlığı</li>
          <li>İçerik bölümleri: sayfadaki başlıklar ve HTML içerik</li>
          <li>Harita: Google Maps iframe src adresi</li>
          <li>Adres: tablodaki &quot;Adres&quot; satırından metin</li>
        </ul>
      </div>

      <AdminSubmitButton loadingLabel="İçe aktarılıyor…">
        İçe Aktar
      </AdminSubmitButton>
    </AdminActionForm>
  );
}
