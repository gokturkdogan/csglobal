"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  parseLocaleFeatureMediaOverlay,
  serializeLocaleFeatureMediaOverlay,
} from "@/lib/i18n/foreign-consultancy/feature-media";
import {
  isForeignConsultancyFieldFilledForLocale,
  isForeignConsultancyTranslationFieldFilled,
  parseForeignConsultancyTranslationsJson,
  serializeForeignConsultancyTranslations,
  type ForeignConsultancyTranslatableFields,
  type ForeignConsultancyTranslations,
} from "@/lib/i18n/foreign-consultancy/translations";
import type { ServiceFeatureMediaPayload } from "@/lib/service-feature-media";
import {
  FOREIGN_CONSULTANCY_LOCALES,
  type ForeignConsultancyLocale,
} from "@/lib/i18n/foreign-consultancy/locales";

type ContextValue = {
  translations: ForeignConsultancyTranslations;
  setTranslationField: (
    locale: Exclude<ForeignConsultancyLocale, "tr">,
    field: keyof ForeignConsultancyTranslatableFields,
    value: string,
  ) => void;
  getTranslationField: (
    locale: Exclude<ForeignConsultancyLocale, "tr">,
    field: keyof ForeignConsultancyTranslatableFields,
  ) => string;
  isFieldFilled: (
    locale: ForeignConsultancyLocale,
    field: keyof ForeignConsultancyTranslatableFields,
    trValue?: string | null,
  ) => boolean;
  setSectionsJsonForLocale: (
    locale: ForeignConsultancyLocale,
    sectionsJson: string,
  ) => void;
  getSectionsJsonForLocale: (locale: ForeignConsultancyLocale) => string;
  getFeatureMediaOverlayForLocale: (
    locale: Exclude<ForeignConsultancyLocale, "tr">,
  ) => ServiceFeatureMediaPayload;
  setFeatureMediaOverlayForLocale: (
    locale: Exclude<ForeignConsultancyLocale, "tr">,
    payload: ServiceFeatureMediaPayload,
  ) => void;
  updateFeatureMediaTranslation: (
    locale: Exclude<ForeignConsultancyLocale, "tr">,
    kind: "image" | "video",
    url: string,
    field: "title" | "text",
    value: string,
  ) => void;
};

const ForeignConsultancyTranslationsContext = createContext<ContextValue | null>(null);

export function ForeignConsultancyTranslationsProvider({
  initialTranslationsJson,
  children,
}: {
  initialTranslationsJson?: string | null;
  children: ReactNode;
}) {
  const [translations, setTranslations] = useState<ForeignConsultancyTranslations>(() =>
    parseForeignConsultancyTranslationsJson(initialTranslationsJson),
  );

  const setTranslationField = useCallback(
    (
      locale: Exclude<ForeignConsultancyLocale, "tr">,
      field: keyof ForeignConsultancyTranslatableFields,
      value: string,
    ) => {
      setTranslations((prev) => {
        if (prev[locale]?.[field] === value) return prev;
        const nextLocaleFields = { ...(prev[locale] ?? {}), [field]: value };
        const cleanedEntries = Object.entries(nextLocaleFields).filter(([key, fieldValue]) => {
          if (key === "sectionsJson" || key === "featureMediaJson") {
            return typeof fieldValue === "string" && fieldValue.trim().length > 0;
          }
          return isForeignConsultancyTranslationFieldFilled(fieldValue as string);
        });

        if (cleanedEntries.length === 0) {
          const { [locale]: _removed, ...rest } = prev;
          return rest;
        }

        return {
          ...prev,
          [locale]: Object.fromEntries(cleanedEntries) as ForeignConsultancyTranslatableFields,
        };
      });
    },
    [],
  );

  const getTranslationField = useCallback(
    (
      locale: Exclude<ForeignConsultancyLocale, "tr">,
      field: keyof ForeignConsultancyTranslatableFields,
    ) => translations[locale]?.[field] ?? "",
    [translations],
  );

  const isFieldFilled = useCallback(
    (
      locale: ForeignConsultancyLocale,
      field: keyof ForeignConsultancyTranslatableFields,
      trValue?: string | null,
    ) => isForeignConsultancyFieldFilledForLocale(locale, field, trValue, translations),
    [translations],
  );

  const setSectionsJsonForLocale = useCallback(
    (locale: ForeignConsultancyLocale, sectionsJson: string) => {
      if (locale === "tr") return;
      setTranslationField(locale, "sectionsJson", sectionsJson);
    },
    [setTranslationField],
  );

  const getSectionsJsonForLocale = useCallback(
    (locale: ForeignConsultancyLocale) => {
      if (locale === "tr") return "";
      return translations[locale]?.sectionsJson ?? "";
    },
    [translations],
  );

  const getFeatureMediaOverlayForLocale = useCallback(
    (locale: Exclude<ForeignConsultancyLocale, "tr">) =>
      parseLocaleFeatureMediaOverlay(translations[locale]?.featureMediaJson),
    [translations],
  );

  const setFeatureMediaOverlayForLocale = useCallback(
    (locale: Exclude<ForeignConsultancyLocale, "tr">, payload: ServiceFeatureMediaPayload) => {
      const serialized = serializeLocaleFeatureMediaOverlay(payload);
      const existing = translations[locale]?.featureMediaJson ?? null;
      if (serialized) {
        if (existing === serialized) return;
        setTranslationField(locale, "featureMediaJson", serialized);
        return;
      }
      if (!existing) return;
      setTranslations((prev) => {
          const nextLocale = { ...(prev[locale] ?? {}) };
          delete nextLocale.featureMediaJson;
          const cleanedEntries = Object.entries(nextLocale).filter(([key, fieldValue]) => {
            if (key === "sectionsJson" || key === "featureMediaJson") {
              return typeof fieldValue === "string" && fieldValue.trim().length > 0;
            }
            return isForeignConsultancyTranslationFieldFilled(fieldValue as string);
          });
          if (cleanedEntries.length === 0) {
            const { [locale]: _removed, ...rest } = prev;
            return rest;
          }
          return { ...prev, [locale]: Object.fromEntries(cleanedEntries) };
        });
    },
    [setTranslationField, translations],
  );

  const updateFeatureMediaTranslation = useCallback(
    (
      locale: Exclude<ForeignConsultancyLocale, "tr">,
      kind: "image" | "video",
      url: string,
      field: "title" | "text",
      value: string,
    ) => {
      const trimmedUrl = url.trim();
      if (!trimmedUrl) return;
      const current = getFeatureMediaOverlayForLocale(locale);
      const listKey = kind === "image" ? "images" : "videos";
      const rows = [...current[listKey]];
      const index = rows.findIndex((row) => row.url === trimmedUrl);
      if (index === -1) {
        rows.push({
          url: trimmedUrl,
          title: field === "title" ? value : "",
          text: field === "text" ? value : "",
        });
      } else {
        rows[index] = { ...rows[index], [field]: value };
      }
      const next = { ...current, [listKey]: rows };
      setFeatureMediaOverlayForLocale(locale, next);
    },
    [getFeatureMediaOverlayForLocale, setFeatureMediaOverlayForLocale],
  );

  const serialized = useMemo(
    () => serializeForeignConsultancyTranslations(translations) ?? "",
    [translations],
  );

  const value = useMemo(
    () => ({
      translations,
      setTranslationField,
      getTranslationField,
      isFieldFilled,
      setSectionsJsonForLocale,
      getSectionsJsonForLocale,
      getFeatureMediaOverlayForLocale,
      setFeatureMediaOverlayForLocale,
      updateFeatureMediaTranslation,
    }),
    [
      translations,
      setTranslationField,
      getTranslationField,
      isFieldFilled,
      setSectionsJsonForLocale,
      getSectionsJsonForLocale,
      getFeatureMediaOverlayForLocale,
      setFeatureMediaOverlayForLocale,
      updateFeatureMediaTranslation,
    ],
  );

  return (
    <ForeignConsultancyTranslationsContext.Provider value={value}>
      <input type="hidden" name="translationsJson" value={serialized} readOnly />
      {children}
    </ForeignConsultancyTranslationsContext.Provider>
  );
}

export function useForeignConsultancyTranslations() {
  const context = useContext(ForeignConsultancyTranslationsContext);
  if (!context) {
    throw new Error(
      "useForeignConsultancyTranslations must be used within ForeignConsultancyTranslationsProvider",
    );
  }
  return context;
}

export function useForeignConsultancyFieldLocale(
  field: keyof ForeignConsultancyTranslatableFields,
  trValue?: string | null,
) {
  const { isFieldFilled } = useForeignConsultancyTranslations();
  const [activeLocale, setActiveLocale] = useState<ForeignConsultancyLocale>("tr");

  const filledLocales = useMemo(
    () =>
      Object.fromEntries(
        FOREIGN_CONSULTANCY_LOCALES.map((locale) => [
          locale,
          isFieldFilled(locale, field, trValue),
        ]),
      ) as Partial<Record<ForeignConsultancyLocale, boolean>>,
    [field, isFieldFilled, trValue],
  );

  return { activeLocale, setActiveLocale, filledLocales };
}
