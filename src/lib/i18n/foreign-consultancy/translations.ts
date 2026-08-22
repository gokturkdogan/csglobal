import {
  FOREIGN_CONSULTANCY_LOCALES,
  type ForeignConsultancyLocale,
} from "@/lib/i18n/foreign-consultancy/locales";

export const FOREIGN_CONSULTANCY_TRANSLATION_LOCALES = FOREIGN_CONSULTANCY_LOCALES.filter(
  (locale): locale is Exclude<ForeignConsultancyLocale, "tr"> => locale !== "tr",
);

export type ForeignConsultancyTranslationLocale =
  (typeof FOREIGN_CONSULTANCY_TRANSLATION_LOCALES)[number];

export type ForeignConsultancyTranslatableFields = {
  name?: string | null;
  excerpt?: string | null;
  shortDescription?: string | null;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  sectionsJson?: string | null;
  featureImage1Title?: string | null;
  featureImage1Text?: string | null;
  featureImage2Title?: string | null;
  featureImage2Text?: string | null;
  processingTime?: string | null;
};

export type ForeignConsultancyCategoryTranslatableFields = Omit<
  ForeignConsultancyTranslatableFields,
  "processingTime"
>;

export type ForeignConsultancyTranslations = Partial<
  Record<ForeignConsultancyTranslationLocale, ForeignConsultancyTranslatableFields>
>;

export type ForeignConsultancyLocalizedRecord = ForeignConsultancyTranslatableFields;

const TRANSLATABLE_FIELD_KEYS = [
  "name",
  "excerpt",
  "shortDescription",
  "heroTitle",
  "heroSubtitle",
  "sectionsJson",
  "featureImage1Title",
  "featureImage1Text",
  "featureImage2Title",
  "featureImage2Text",
  "processingTime",
] as const satisfies ReadonlyArray<keyof ForeignConsultancyTranslatableFields>;

function trimOrNull(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function normalizeLocaleFields(
  fields: ForeignConsultancyTranslatableFields | undefined,
): ForeignConsultancyTranslatableFields | undefined {
  if (!fields) return undefined;

  const normalized: ForeignConsultancyTranslatableFields = {};

  for (const key of TRANSLATABLE_FIELD_KEYS) {
    const value = fields[key];
    if (value === undefined) continue;

    if (key === "sectionsJson") {
      normalized.sectionsJson = trimOrNull(value);
      continue;
    }

    normalized[key] = trimOrNull(value);
  }

  return Object.keys(normalized).length > 0 ? normalized : undefined;
}

export function parseForeignConsultancyTranslationsJson(
  json: string | null | undefined,
): ForeignConsultancyTranslations {
  if (!json?.trim()) return {};

  try {
    const parsed = JSON.parse(json) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }

    const result: ForeignConsultancyTranslations = {};

    for (const locale of FOREIGN_CONSULTANCY_TRANSLATION_LOCALES) {
      const raw = (parsed as Record<string, unknown>)[locale];
      if (!raw || typeof raw !== "object" || Array.isArray(raw)) continue;

      const normalized = normalizeLocaleFields(raw as ForeignConsultancyTranslatableFields);
      if (normalized) {
        result[locale] = normalized;
      }
    }

    return result;
  } catch {
    return {};
  }
}

export function serializeForeignConsultancyTranslations(
  translations: ForeignConsultancyTranslations,
): string | null {
  const payload: ForeignConsultancyTranslations = {};

  for (const locale of FOREIGN_CONSULTANCY_TRANSLATION_LOCALES) {
    const normalized = normalizeLocaleFields(translations[locale]);
    if (normalized) {
      payload[locale] = normalized;
    }
  }

  return Object.keys(payload).length > 0 ? JSON.stringify(payload) : null;
}

export function isForeignConsultancyTranslationFieldFilled(
  value: string | null | undefined,
): boolean {
  return Boolean(value?.trim());
}

export function isForeignConsultancyFieldFilledForLocale(
  locale: ForeignConsultancyLocale,
  field: keyof ForeignConsultancyTranslatableFields,
  trValue: string | null | undefined,
  translations: ForeignConsultancyTranslations,
): boolean {
  if (locale === "tr") {
    return isForeignConsultancyTranslationFieldFilled(trValue);
  }

  const localized = translations[locale]?.[field];
  return isForeignConsultancyTranslationFieldFilled(localized);
}

type ResolveSource = ForeignConsultancyTranslatableFields & {
  translationsJson?: string | null;
};

export function resolveForeignConsultancyLocalizedRecord(
  source: ResolveSource,
  locale: ForeignConsultancyLocale,
): ForeignConsultancyLocalizedRecord {
  const translations = parseForeignConsultancyTranslationsJson(source.translationsJson);

  if (locale === "tr") {
    return {
      name: source.name,
      excerpt: source.excerpt,
      shortDescription: source.shortDescription,
      heroTitle: source.heroTitle,
      heroSubtitle: source.heroSubtitle,
      sectionsJson: source.sectionsJson,
      featureImage1Title: source.featureImage1Title,
      featureImage1Text: source.featureImage1Text,
      featureImage2Title: source.featureImage2Title,
      featureImage2Text: source.featureImage2Text,
      processingTime: source.processingTime,
    };
  }

  const localized = translations[locale] ?? {};

  return {
    name: localized.name ?? source.name,
    excerpt: localized.excerpt ?? source.excerpt,
    shortDescription: localized.shortDescription ?? source.shortDescription,
    heroTitle: localized.heroTitle ?? source.heroTitle,
    heroSubtitle: localized.heroSubtitle ?? source.heroSubtitle,
    sectionsJson: localized.sectionsJson ?? source.sectionsJson,
    featureImage1Title: localized.featureImage1Title ?? source.featureImage1Title,
    featureImage1Text: localized.featureImage1Text ?? source.featureImage1Text,
    featureImage2Title: localized.featureImage2Title ?? source.featureImage2Title,
    featureImage2Text: localized.featureImage2Text ?? source.featureImage2Text,
    processingTime: localized.processingTime ?? source.processingTime,
  };
}

export function hasForeignConsultancyLocaleTranslation(
  source: ResolveSource,
  locale: ForeignConsultancyLocale,
): boolean {
  if (locale === "tr") return true;

  const translations = parseForeignConsultancyTranslationsJson(source.translationsJson);
  const localized = translations[locale];
  if (!localized) return false;

  return TRANSLATABLE_FIELD_KEYS.some((field) =>
    isForeignConsultancyTranslationFieldFilled(localized[field]),
  );
}

export function parseForeignConsultancyTranslationsFromForm(
  raw: FormDataEntryValue | null,
): ForeignConsultancyTranslations {
  if (typeof raw !== "string" || !raw.trim()) return {};
  return parseForeignConsultancyTranslationsJson(raw);
}
