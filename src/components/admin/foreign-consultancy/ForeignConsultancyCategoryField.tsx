"use client";

import {
  FOREIGN_CONSULTANCY_CATEGORY_VALUES,
  FOREIGN_CONSULTANCY_CATEGORY_LABELS,
  type ForeignConsultancyCategoryValue,
} from "@/lib/foreign-consultancy-categories";

const selectClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition focus:border-csg-blue focus:outline-none focus:ring-2 focus:ring-csg-blue/20";

export function ForeignConsultancyCategoryField({
  initialCategory,
}: {
  initialCategory?: ForeignConsultancyCategoryValue;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">Kategori</span>
      <select
        name="category"
        required
        defaultValue={initialCategory ?? ""}
        className={selectClass}
      >
        <option value="" disabled>Kategori seçin</option>
        {FOREIGN_CONSULTANCY_CATEGORY_VALUES.map((category) => (
          <option key={category} value={category}>
            {FOREIGN_CONSULTANCY_CATEGORY_LABELS[category]}
          </option>
        ))}
      </select>
      <p className="mt-1 text-xs text-slate-500">
        Yalnızca oturma izni veya çalışma izni seçilebilir.
      </p>
    </label>
  );
}
