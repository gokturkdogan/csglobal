"use client";

import { useState } from "react";
import type { AdminActionResult } from "@/lib/admin-action-result";
import { matchCountrySlugFromEagvsUrl } from "@/lib/eagvs-scrape";
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

export function EagvsCountrySyncForm({ countries, action }: Props) {
  const [url, setUrl] = useState("");
  const [countryId, setCountryId] = useState("");
  const [countryHint, setCountryHint] = useState<string | null>(null);

  function applyCountryFromUrl(value: string) {
    const slug = matchCountrySlugFromEagvsUrl(value, countries.map((c) => c.slug));
    if (!slug) return;

    const country = countries.find((c) => c.slug === slug);
    if (!country) {
      setCountryHint("URL üzerinden ülke tanındı ancak sistemde eşleşen kayıt yok.");
      return;
    }

    setCountryId(country.id);
    setCountryHint(`${country.name} linkten seçildi.`);
  }

  return (
    <AdminActionForm
      action={action}
      className="max-w-2xl space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      successMessage="Ülke senkronizasyonu tamamlandı."
    >
      <div>
        <label className="block text-sm font-medium text-slate-700">
          EAGVS ülke ana sayfa linki
        </label>
        <p className="mt-1 text-xs text-slate-500">
          Örnek: https://www.eagvs.com/avusturya-vizesi. Sol paneldeki tüm linkler vize programı
          olarak aktarılır; mevcut programlar atlanır, eksikler eklenir.
        </p>
        <input
          name="url"
          type="url"
          required
          value={url}
          placeholder="https://www.eagvs.com/avusturya-vizesi"
          className={inputClass}
          onChange={(event) => {
            setUrl(event.target.value);
            applyCountryFromUrl(event.target.value);
          }}
          onPaste={(event) => {
            const pasted = event.clipboardData.getData("text");
            window.setTimeout(() => applyCountryFromUrl(pasted), 0);
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Ülke</label>
        <p className="mt-1 text-xs text-slate-500">
          Linkten otomatik seçilir; gerekirse manuel değiştirin.
        </p>
        <select
          name="countryId"
          value={countryId}
          required
          className={inputClass}
          onChange={(event) => {
            setCountryId(event.target.value);
            setCountryHint(null);
          }}
        >
          <option value="">Ülke seçin</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
        {countryHint ? (
          <p className="mt-1 text-xs text-csg-blue">{countryHint}</p>
        ) : null}
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
        <p className="font-medium text-slate-700">Senkron kapsamı</p>
        <ul className="mt-2 list-disc space-y-1 pl-4">
          <li>Ülke detay bölümleri güncellenir; diğer ülke alanlarına dokunulmaz.</li>
          <li>Sol paneldeki her link vize programı olarak eklenir (sol menüde görünür).</li>
          <li>Aynı slug veya aynı isimle kayıtlı programlar atlanır; duplicate oluşturulmaz.</li>
          <li>Kategori yoksa otomatik oluşturulur; sayfa sidebar ve breadcrumb ile eşleştirilir.</li>
          <li>Dilekçe ve Formlar grubundaki PDF/dökümanlar indirilir, ülkeye eklenir ve sol menüde gösterilir.</li>
          <li>Aynı dosya adı veya eşleşen dökümanlar atlanır; yalnızca eksikler indirilir.</li>
          <li>Konsolosluk linkleri senkron kapsamı dışındadır; mevcut kayıtlara dokunulmaz.</li>
        </ul>
      </div>

      <AdminSubmitButton loadingLabel="Senkronize ediliyor...">
        Ülkeyi senkronize et
      </AdminSubmitButton>
    </AdminActionForm>
  );
}
