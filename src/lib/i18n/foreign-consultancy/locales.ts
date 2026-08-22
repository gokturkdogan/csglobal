export const FOREIGN_CONSULTANCY_LOCALES = ["tr", "en", "ar", "ru", "fa"] as const;

export type ForeignConsultancyLocale = (typeof FOREIGN_CONSULTANCY_LOCALES)[number];

export const FOREIGN_CONSULTANCY_DEFAULT_LOCALE: ForeignConsultancyLocale = "tr";

export const FOREIGN_CONSULTANCY_LOCALE_COOKIE = "fc_locale";

export const FOREIGN_CONSULTANCY_LOCALE_LABELS: Record<ForeignConsultancyLocale, string> = {
  tr: "Türkçe",
  en: "English",
  ar: "العربية",
  ru: "Русский",
  fa: "فارسی",
};

export function isForeignConsultancyLocale(value: string): value is ForeignConsultancyLocale {
  return (FOREIGN_CONSULTANCY_LOCALES as readonly string[]).includes(value);
}

export function isRtlForeignConsultancyLocale(locale: ForeignConsultancyLocale): boolean {
  return locale === "ar" || locale === "fa";
}
