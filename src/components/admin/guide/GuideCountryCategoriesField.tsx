"use client";

import { useMemo, useState } from "react";

export type GuideCategoryOption = {
  id: string;
  name: string;
  isActive: boolean;
};

type Props = {
  countries: Array<{ id: string; name: string }>;
  categories: GuideCategoryOption[];
  initialCountryId: string;
  initialCategoryIds: string[];
  initialShowInCategoryPanel?: boolean;
};

const selectClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition focus:border-csg-blue focus:outline-none focus:ring-2 focus:ring-csg-blue/20";

export function GuideCountryCategoriesField({
  countries,
  categories,
  initialCountryId,
  initialCategoryIds,
  initialShowInCategoryPanel = false,
}: Props) {
  const [countryId, setCountryId] = useState(initialCountryId);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(initialCategoryIds),
  );

  const countryCategories = useMemo(() => categories, [categories]);

  const toggleCategory = (categoryId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const onCountryChange = (nextCountryId: string) => {
    setCountryId(nextCountryId);
  };

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Ülke</span>
        <select
          name="countryId"
          required
          value={countryId}
          onChange={(e) => onCountryChange(e.target.value)}
          className={selectClass}
        >
          <option value="" disabled>Ülke seçin</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>{country.name}</option>
          ))}
        </select>
        <p className="mt-1 text-xs text-slate-500">
          Her rehber tek bir ülkeye bağlıdır.
        </p>
      </label>

      <div className="block">
        <span className="text-sm font-medium text-slate-700">
          İlgili hizmet kategorileri (opsiyonel)
        </span>
        <p className="mt-1 text-xs text-slate-500">
          Tüm hizmet kategorileri listelenir (pasif veya hizmeti olmayanlar dahil).
          Sol panelde ilgili kategori altında gösterilir.
        </p>

        {!countryId && (
          <p className="mt-3 text-sm text-slate-500">Önce ülke seçin.</p>
        )}

        {countryId && countryCategories.length === 0 && (
          <p className="mt-3 text-sm text-slate-500">
            Sistemde kategori tanımlı değil.
          </p>
        )}

        {countryId && countryCategories.length > 0 && (
          <div className="mt-3 max-h-64 space-y-2 overflow-y-auto rounded-lg border border-slate-200 bg-white p-3">
            {countryCategories.map((category) => {
              const checked = selectedIds.has(category.id);
              return (
                <label
                  key={category.id}
                  className="flex cursor-pointer items-start gap-3 rounded-md px-2 py-2 hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    name="categoryIds"
                    value={category.id}
                    checked={checked}
                    onChange={() => toggleCategory(category.id)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-csg-blue focus:ring-csg-blue/30"
                  />
                  <span className="min-w-0 text-sm font-medium text-slate-900">
                    {category.name}
                    {!category.isActive && (
                      <span className="ml-1.5 text-xs font-normal text-slate-500">
                        (pasif)
                      </span>
                    )}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-3">
        <input
          type="checkbox"
          name="showInCategoryPanel"
          defaultChecked={initialShowInCategoryPanel}
          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-csg-blue focus:ring-csg-blue/30"
        />
        <span className="min-w-0">
          <span className="block text-sm font-medium text-slate-900">
            Ülke sayfasında hizmet kategorisinde göster
          </span>
          <span className="mt-1 block text-xs leading-relaxed text-slate-500">
            Bağlı kategorilerde sol panelde listelenir. Aynı kategoride yalnızca
            bir kez görünür.
          </span>
        </span>
      </label>
    </div>
  );
}
