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
  isForeignConsultancyFieldFilledForLocale,
  isForeignConsultancyTranslationFieldFilled,
  parseForeignConsultancyTranslationsJson,
  serializeForeignConsultancyTranslations,
  type ForeignConsultancyTranslatableFields,
  type ForeignConsultancyTranslations,
} from "@/lib/i18n/foreign-consultancy/translations";
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
        const nextLocaleFields = { ...(prev[locale] ?? {}), [field]: value };
        const cleanedEntries = Object.entries(nextLocaleFields).filter(([key, fieldValue]) => {
          if (key === "sectionsJson") {
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
    }),
    [
      translations,
      setTranslationField,
      getTranslationField,
      isFieldFilled,
      setSectionsJsonForLocale,
      getSectionsJsonForLocale,
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
