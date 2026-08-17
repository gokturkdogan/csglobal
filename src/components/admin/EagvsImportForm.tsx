"use client";

import { useState } from "react";
import type { AdminActionResult } from "@/lib/admin-action-result";
import {
  EAGVS_IMPORT_URL_SLOTS,
  matchCategoryIdFromEagvsUrl,
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

type CategoryOption = {
  id: string;
  name: string;
  slug: string;
};

type Props = {
  countries: CountryOption[];
  categories: CategoryOption[];
  action: (formData: FormData) => Promise<AdminActionResult>;
};

export function EagvsImportForm({ countries, categories, action }: Props) {
  const [urls, setUrls] = useState<string[]>(
    Array.from({ length: EAGVS_IMPORT_URL_SLOTS }, () => ""),
  );
  const [countryId, setCountryId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [countryHint, setCountryHint] = useState<string | null>(null);
  const [categoryHint, setCategoryHint] = useState<string | null>(null);
  const [categoryManual, setCategoryManual] = useState(false);

  function applyMetadataFromUrl(url: string, updateCategory: boolean) {
    const trimmed = url.trim();
    if (!trimmed) return;

    const countrySlug = matchCountrySlugFromEagvsUrl(trimmed, countries.map((c) => c.slug));
    if (countrySlug) {
      const country = countries.find((c) => c.slug === countrySlug);
      if (country) {
        setCountryId(country.id);
        setCountryHint(`${country.name} linkten seçildi.`);
      }
    }

    if (updateCategory && !categoryManual) {
      const matchedCategoryId = matchCategoryIdFromEagvsUrl(trimmed, categories);
      if (matchedCategoryId) {
        const category = categories.find((c) => c.id === matchedCategoryId);
        if (category) {
          setCategoryId(matchedCategoryId);
          setCategoryHint(`${category.name} linkten seçildi.`);
        }
      }
    }
  }

  function handleUrlChange(index: number, value: string) {
    setUrls((current) => {
      const next = [...current];
      next[index] = value;
      return next;
    });
    applyMetadataFromUrl(value, true);
  }

  return (
    <AdminActionForm
      action={action}
      className="max-w-2xl space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      successMessage="Program başarıyla içe aktarıldı."
    >
      <input type="hidden" name="contentType" value="program" />

      <div>
        <p className="text-sm font-medium text-slate-700">EAGVS sayfa linkleri</p>
        <p className="mt-1 text-xs text-slate-500">
          En fazla {EAGVS_IMPORT_URL_SLOTS} link. Ülke ve kategori ilk dolu linkten otomatik seçilir.
        </p>
        <div className="mt-2 space-y-3">
          {urls.map((url, index) => (
            <label key={index} className="block">
              <span className="text-xs font-medium text-slate-500">Link {index + 1}</span>
              <input
                name="urls"
                type="url"
                value={url}
                placeholder="https://www.eagvs.com/avusturya-vizesi/..."
                className={inputClass}
                onChange={(event) => handleUrlChange(index, event.target.value)}
                onPaste={(event) => {
                  const pasted = event.clipboardData.getData("text");
                  window.setTimeout(() => handleUrlChange(index, pasted), 0);
                }}
                onBlur={(event) => applyMetadataFromUrl(event.target.value, true)}
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

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Kategori</span>
        <select
          name="categoryId"
          value={categoryId}
          onChange={(event) => {
            setCategoryId(event.target.value);
            setCategoryManual(true);
            setCategoryHint(null);
          }}
          className={inputClass}
        >
          <option value="">Linkten otomatik seçilir</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <input type="hidden" name="categoryManual" value={categoryManual ? "on" : ""} />
        {categoryHint ? (
          <span className="mt-1.5 block text-xs font-medium text-csg-blue">{categoryHint}</span>
        ) : null}
      </label>

      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        <p className="font-medium text-slate-800">Notlar</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>Her link vize programı olarak kaydedilir.</li>
          <li>Her link için ülke ve kategori URL üzerinden ayrı eşleşir.</li>
          <li>Formdaki kategori, linkte eşleşme yoksa yedek olarak kullanılır.</li>
          <li>H1 başlık ve H2/H3/H4 bölümler olduğu gibi aktarılır.</li>
          <li>Rehber içerikleri için EAGVS Blog İçe Aktarma sayfasını kullanın.</li>
        </ul>
      </div>

      <AdminSubmitButton loadingLabel="İçe aktarılıyor…">
        İçe Aktar
      </AdminSubmitButton>
    </AdminActionForm>
  );
}
