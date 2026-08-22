"use client";

import { LocaleFieldTabs } from "@/components/admin/foreign-consultancy/LocaleFieldTabs";
import {
  useForeignConsultancyFieldLocale,
  useForeignConsultancyTranslations,
} from "@/components/admin/foreign-consultancy/ForeignConsultancyTranslationsProvider";
import type { ForeignConsultancyTranslatableFields } from "@/lib/i18n/foreign-consultancy/translations";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-csg-blue focus:outline-none focus:ring-2 focus:ring-csg-blue/20";

type Props = {
  label: string;
  field: keyof ForeignConsultancyTranslatableFields;
  trName: string;
  trValue?: string | null;
  rows?: number;
  hint?: string;
  maxLength?: number;
};

export function LocalizedAdminTextArea({
  label,
  field,
  trName,
  trValue,
  rows = 4,
  hint,
  maxLength,
}: Props) {
  const { activeLocale, setActiveLocale, filledLocales } = useForeignConsultancyFieldLocale(
    field,
    trValue,
  );
  const { getTranslationField, setTranslationField } = useForeignConsultancyTranslations();

  return (
    <div className="block space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <LocaleFieldTabs
          activeLocale={activeLocale}
          onLocaleChange={setActiveLocale}
          filledLocales={filledLocales}
          compact
        />
      </div>

      {activeLocale === "tr" ? (
        <textarea
          name={trName}
          rows={rows}
          defaultValue={trValue ?? ""}
          maxLength={maxLength}
          className={inputClass}
        />
      ) : (
        <textarea
          rows={rows}
          value={getTranslationField(activeLocale, field)}
          onChange={(event) => setTranslationField(activeLocale, field, event.target.value)}
          maxLength={maxLength}
          className={inputClass}
        />
      )}

      {hint && <span className="block text-xs text-slate-500">{hint}</span>}
    </div>
  );
}
