"use client";

import type { ReactNode } from "react";
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
  trInput?: ReactNode;
  required?: boolean;
  hint?: string;
  placeholder?: string;
  type?: string;
  maxLength?: number;
};

export function LocalizedAdminField({
  label,
  field,
  trName,
  trValue,
  trInput,
  required,
  hint,
  placeholder,
  type = "text",
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
        trInput ?? (
          <input
            name={trName}
            type={type}
            defaultValue={trValue ?? ""}
            required={required}
            placeholder={placeholder}
            maxLength={maxLength}
            className={inputClass}
          />
        )
      ) : (
        <input
          type={type}
          value={getTranslationField(activeLocale, field)}
          onChange={(event) => setTranslationField(activeLocale, field, event.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className={inputClass}
        />
      )}

      {hint && <span className="block text-xs text-slate-500">{hint}</span>}
    </div>
  );
}
