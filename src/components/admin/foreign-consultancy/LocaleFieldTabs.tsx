"use client";

import {
  FOREIGN_CONSULTANCY_LOCALES,
  FOREIGN_CONSULTANCY_LOCALE_LABELS,
  type ForeignConsultancyLocale,
} from "@/lib/i18n/foreign-consultancy/locales";

type Props = {
  activeLocale: ForeignConsultancyLocale;
  onLocaleChange: (locale: ForeignConsultancyLocale) => void;
  filledLocales: Partial<Record<ForeignConsultancyLocale, boolean>>;
  compact?: boolean;
};

export function LocaleFieldTabs({
  activeLocale,
  onLocaleChange,
  filledLocales,
  compact = false,
}: Props) {
  return (
    <div
      className={`inline-flex flex-wrap gap-1 rounded-lg border border-slate-200 bg-white p-1 ${compact ? "" : "shadow-sm"}`}
      role="tablist"
      aria-label="Dil seçimi"
    >
      {FOREIGN_CONSULTANCY_LOCALES.map((locale) => {
        const isActive = locale === activeLocale;
        const isFilled = filledLocales[locale];

        return (
          <button
            key={locale}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onLocaleChange(locale)}
            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${
              isActive
                ? "bg-csg-blue text-white"
                : "text-slate-600 hover:bg-slate-50 hover:text-csg-blue"
            }`}
          >
            <span>{FOREIGN_CONSULTANCY_LOCALE_LABELS[locale]}</span>
            {isFilled && (
              <span
                className={`inline-flex h-3.5 w-3.5 items-center justify-center rounded-full text-[9px] ${
                  isActive ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"
                }`}
                aria-hidden
              >
                ✓
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
