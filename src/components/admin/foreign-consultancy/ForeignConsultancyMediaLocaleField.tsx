"use client";

import { useMemo, useState } from "react";
import { LocaleFieldTabs } from "@/components/admin/foreign-consultancy/LocaleFieldTabs";
import { useForeignConsultancyTranslations } from "@/components/admin/foreign-consultancy/ForeignConsultancyTranslationsProvider";
import type { ForeignConsultancyLocale } from "@/lib/i18n/foreign-consultancy/locales";
import { FOREIGN_CONSULTANCY_TRANSLATION_LOCALES } from "@/lib/i18n/foreign-consultancy/translations";
import {
  SERVICE_FEATURE_TEXT_MAX,
  SERVICE_FEATURE_TITLE_MAX,
} from "@/lib/service-constants";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-csg-blue focus:outline-none focus:ring-2 focus:ring-csg-blue/20";

const textareaClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-csg-blue focus:outline-none focus:ring-2 focus:ring-csg-blue/20";

type Props = {
  label: string;
  kind: "image" | "video";
  url: string;
  field: "title" | "text";
  trValue: string;
  onTrChange: (value: string) => void;
  multiline?: boolean;
};

function getLocaleFieldValue(
  locale: Exclude<ForeignConsultancyLocale, "tr">,
  kind: "image" | "video",
  url: string,
  field: "title" | "text",
  getOverlay: ReturnType<typeof useForeignConsultancyTranslations>["getFeatureMediaOverlayForLocale"],
): string {
  const list = kind === "image" ? getOverlay(locale).images : getOverlay(locale).videos;
  return list.find((row) => row.url === url)?.[field] ?? "";
}

export function ForeignConsultancyMediaLocaleField({
  label,
  kind,
  url,
  field,
  trValue,
  onTrChange,
  multiline = false,
}: Props) {
  const { getFeatureMediaOverlayForLocale, updateFeatureMediaTranslation } =
    useForeignConsultancyTranslations();
  const [activeLocale, setActiveLocale] = useState<ForeignConsultancyLocale>("tr");

  const maxLength = field === "title" ? SERVICE_FEATURE_TITLE_MAX : SERVICE_FEATURE_TEXT_MAX;
  const trimmedUrl = url.trim();
  const canTranslate = trimmedUrl.length > 0;

  const filledLocales = useMemo(() => {
    const map: Partial<Record<ForeignConsultancyLocale, boolean>> = {
      tr: Boolean(trValue.trim()),
    };
    for (const locale of FOREIGN_CONSULTANCY_TRANSLATION_LOCALES) {
      const value = getLocaleFieldValue(locale, kind, trimmedUrl, field, getFeatureMediaOverlayForLocale);
      map[locale] = Boolean(value.trim());
    }
    return map;
  }, [field, getFeatureMediaOverlayForLocale, kind, trValue, trimmedUrl]);

  const localeValue =
    activeLocale === "tr"
      ? trValue
      : getLocaleFieldValue(
          activeLocale,
          kind,
          trimmedUrl,
          field,
          getFeatureMediaOverlayForLocale,
        );

  return (
    <div className="block space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        {canTranslate && (
          <LocaleFieldTabs
            activeLocale={activeLocale}
            onLocaleChange={setActiveLocale}
            filledLocales={filledLocales}
            compact
          />
        )}
      </div>

      {!canTranslate ? (
        <p className="text-xs text-slate-500">Çeviri sekmeleri için önce görsel veya video yükleyin.</p>
      ) : activeLocale === "tr" ? (
        multiline ? (
          <textarea
            value={trValue}
            maxLength={maxLength}
            rows={4}
            onChange={(e) => onTrChange(e.target.value)}
            className={textareaClass}
          />
        ) : (
          <input
            type="text"
            value={trValue}
            maxLength={maxLength}
            onChange={(e) => onTrChange(e.target.value)}
            className={inputClass}
          />
        )
      ) : multiline ? (
        <textarea
          value={localeValue}
          maxLength={maxLength}
          rows={4}
          placeholder="Boş bırakırsanız Türkçe gösterilir"
          onChange={(e) =>
            updateFeatureMediaTranslation(activeLocale, kind, trimmedUrl, field, e.target.value)
          }
          className={textareaClass}
        />
      ) : (
        <input
          type="text"
          value={localeValue}
          maxLength={maxLength}
          placeholder="Boş bırakırsanız Türkçe gösterilir"
          onChange={(e) =>
            updateFeatureMediaTranslation(activeLocale, kind, trimmedUrl, field, e.target.value)
          }
          className={inputClass}
        />
      )}

      <span className="block text-xs font-medium tabular-nums text-slate-400">
        {(activeLocale === "tr" ? trValue : localeValue).length}/{maxLength}
      </span>
    </div>
  );
}