"use client";

import { useTransition } from "react";
import { setForeignConsultancyLocale } from "@/lib/i18n/foreign-consultancy/actions";
import { getForeignConsultancyMessages } from "@/lib/i18n/foreign-consultancy";
import {
  FOREIGN_CONSULTANCY_LOCALES,
  FOREIGN_CONSULTANCY_LOCALE_LABELS,
  type ForeignConsultancyLocale,
} from "@/lib/i18n/foreign-consultancy/locales";

type Props = {
  locale: ForeignConsultancyLocale;
};

export function ForeignConsultancyLanguageSwitcher({ locale }: Props) {
  const [isPending, startTransition] = useTransition();
  const messages = getForeignConsultancyMessages(locale);

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <span className="text-xs font-medium text-slate-500">{messages.languageSwitcher.label}</span>
      <div
        className="inline-flex flex-wrap gap-1 rounded-lg border border-slate-200 bg-white p-1 shadow-sm"
        role="group"
        aria-label={messages.languageSwitcher.label}
      >
        {FOREIGN_CONSULTANCY_LOCALES.map((item) => {
          const isActive = item === locale;

          return (
            <button
              key={item}
              type="button"
              disabled={isPending || isActive}
              aria-current={isActive ? "true" : undefined}
              onClick={() => {
                if (item === locale) return;
                startTransition(() => setForeignConsultancyLocale(item));
              }}
              className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition ${
                isActive
                  ? "bg-csg-blue text-white"
                  : "text-slate-600 hover:bg-slate-50 hover:text-csg-blue disabled:opacity-60"
              }`}
            >
              {FOREIGN_CONSULTANCY_LOCALE_LABELS[item]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
