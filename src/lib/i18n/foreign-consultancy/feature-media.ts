import type { ForeignConsultancyLocale } from "@/lib/i18n/foreign-consultancy/locales";
import {
  FOREIGN_CONSULTANCY_TRANSLATION_LOCALES,
  parseForeignConsultancyTranslationsJson,
  resolveForeignConsultancyLocalizedRecord,
  type ForeignConsultancyTranslations,
} from "@/lib/i18n/foreign-consultancy/translations";
import type { FeatureMediaLegacyFields } from "@/lib/service-detail-blocks";
import {
  type ServiceFeatureMediaPayload,
  normalizeServiceFeatureText,
  normalizeServiceFeatureTitle,
  parseFeatureMediaJson,
  serializeFeatureMediaJson,
} from "@/lib/service-feature-media";

export type ForeignConsultancyFeatureMediaSource = FeatureMediaLegacyFields & {
  featureMediaJson?: string | null;
  translationsJson?: string | null;
};

export function parseLocaleFeatureMediaOverlay(
  json: string | null | undefined,
): ServiceFeatureMediaPayload {
  if (!json?.trim()) return { images: [], videos: [] };
  try {
    const parsed = JSON.parse(json) as unknown;
    if (!parsed || typeof parsed !== "object") return { images: [], videos: [] };
    const record = parsed as { images?: unknown; videos?: unknown };
    const readRows = (rows: unknown) =>
      Array.isArray(rows)
        ? rows
            .map((item) => {
              if (!item || typeof item !== "object") return null;
              const row = item as { url?: unknown; title?: unknown; text?: unknown };
              const url = typeof row.url === "string" ? row.url.trim() : "";
              if (!url) return null;
              const title =
                normalizeServiceFeatureTitle(typeof row.title === "string" ? row.title : "") ?? "";
              const text =
                normalizeServiceFeatureText(typeof row.text === "string" ? row.text : "") ?? "";
              if (!title && !text) return null;
              return { url, title, text };
            })
            .filter((item): item is { url: string; title: string; text: string } => item !== null)
        : [];
    return {
      images: readRows(record.images),
      videos: readRows(record.videos),
    };
  } catch {
    return { images: [], videos: [] };
  }
}

export function serializeLocaleFeatureMediaOverlay(payload: ServiceFeatureMediaPayload): string | null {
  const images = payload.images
    .filter((row) => row.url.trim() && (row.title.trim() || row.text.trim()))
    .map((row) => ({
      url: row.url.trim(),
      title: normalizeServiceFeatureTitle(row.title) ?? "",
      text: normalizeServiceFeatureText(row.text) ?? "",
    }));
  const videos = payload.videos
    .filter((row) => row.url.trim() && (row.title.trim() || row.text.trim()))
    .map((row) => ({
      url: row.url.trim(),
      title: normalizeServiceFeatureTitle(row.title) ?? "",
      text: normalizeServiceFeatureText(row.text) ?? "",
    }));
  if (images.length === 0 && videos.length === 0) return null;
  return JSON.stringify({ images, videos });
}

function overlayByUrl(
  trRows: ServiceFeatureMediaPayload["images"],
  localeRows: ServiceFeatureMediaPayload["images"],
): ServiceFeatureMediaPayload["images"] {
  const localeByUrl = new Map(localeRows.map((row) => [row.url, row]));
  return trRows.map((trRow) => {
    const localized = localeByUrl.get(trRow.url);
    if (!localized) return trRow;
    return {
      ...trRow,
      title: localized.title.trim() ? localized.title : trRow.title,
      text: localized.text.trim() ? localized.text : trRow.text,
    };
  });
}

function applyLegacyImageTitleOverrides(
  images: ServiceFeatureMediaPayload["images"],
  legacy: FeatureMediaLegacyFields,
): ServiceFeatureMediaPayload["images"] {
  const overrides: { url?: string | null; title?: string | null; text?: string | null }[] = [
    {
      url: legacy.featureImage1,
      title: legacy.featureImage1Title,
      text: legacy.featureImage1Text,
    },
    {
      url: legacy.featureImage2,
      title: legacy.featureImage2Title,
      text: legacy.featureImage2Text,
    },
  ];

  return images.map((row) => {
    const match = overrides.find((entry) => entry.url && entry.url === row.url);
    if (!match) return row;
    return {
      ...row,
      title: match.title?.trim() ? match.title : row.title,
      text: match.text?.trim() ? match.text : row.text,
    };
  });
}

export function mergeTrFeatureMediaWithLocaleOverlay(
  trPayload: ServiceFeatureMediaPayload,
  localeOverlay: ServiceFeatureMediaPayload,
): ServiceFeatureMediaPayload {
  return {
    images: overlayByUrl(trPayload.images, localeOverlay.images),
    videos: overlayByUrl(trPayload.videos, localeOverlay.videos),
  };
}

export function resolveForeignConsultancyDisplayFeatureMedia(
  source: ForeignConsultancyFeatureMediaSource,
  locale: ForeignConsultancyLocale,
): { featureMediaJson: string | null; legacy: FeatureMediaLegacyFields } {
  const trLegacy: FeatureMediaLegacyFields = {
    featureMediaJson: source.featureMediaJson,
    featureImage1: source.featureImage1,
    featureImage1Title: source.featureImage1Title,
    featureImage1Text: source.featureImage1Text,
    featureImage2: source.featureImage2,
    featureImage2Title: source.featureImage2Title,
    featureImage2Text: source.featureImage2Text,
  };

  const trPayload = parseFeatureMediaJson(source.featureMediaJson, trLegacy);

  if (locale === "tr") {
    const json =
      trPayload.images.length > 0 || trPayload.videos.length > 0
        ? serializeFeatureMediaJson(trPayload)
        : null;
    return { featureMediaJson: json, legacy: trLegacy };
  }

  const localized = resolveForeignConsultancyLocalizedRecord(source, locale);
  const translations = parseForeignConsultancyTranslationsJson(source.translationsJson);
  const localeOverlay = parseLocaleFeatureMediaOverlay(
    translations[locale as keyof typeof translations]?.featureMediaJson,
  );

  let merged = mergeTrFeatureMediaWithLocaleOverlay(trPayload, localeOverlay);

  merged = {
    images: applyLegacyImageTitleOverrides(merged.images, {
      featureImage1: source.featureImage1,
      featureImage1Title: localized.featureImage1Title,
      featureImage1Text: localized.featureImage1Text,
      featureImage2: source.featureImage2,
      featureImage2Title: localized.featureImage2Title,
      featureImage2Text: localized.featureImage2Text,
    }),
    videos: merged.videos,
  };

  const displayLegacy: FeatureMediaLegacyFields = {
    featureImage1: source.featureImage1,
    featureImage1Title: localized.featureImage1Title,
    featureImage1Text: localized.featureImage1Text,
    featureImage2: source.featureImage2,
    featureImage2Title: localized.featureImage2Title,
    featureImage2Text: localized.featureImage2Text,
  };

  const json =
    merged.images.length > 0 || merged.videos.length > 0
      ? serializeFeatureMediaJson(merged)
      : null;

  return { featureMediaJson: json, legacy: displayLegacy };
}

export function pruneLocaleFeatureMediaOverlay(
  trPayload: ServiceFeatureMediaPayload,
  localeOverlay: ServiceFeatureMediaPayload,
): ServiceFeatureMediaPayload {
  const imageUrls = new Set(trPayload.images.map((row) => row.url));
  const videoUrls = new Set(trPayload.videos.map((row) => row.url));
  return {
    images: localeOverlay.images.filter((row) => imageUrls.has(row.url)),
    videos: localeOverlay.videos.filter((row) => videoUrls.has(row.url)),
  };
}

/** Kayıtta: artık kullanılmayan medya URL çevirilerini temizler. */
export function pruneForeignConsultancyTranslationsFeatureMedia(
  translations: ForeignConsultancyTranslations,
  trPayload: ServiceFeatureMediaPayload,
): ForeignConsultancyTranslations {
  const next: ForeignConsultancyTranslations = { ...translations };

  for (const locale of FOREIGN_CONSULTANCY_TRANSLATION_LOCALES) {
    const localeFields = next[locale];
    if (!localeFields?.featureMediaJson?.trim()) continue;

    const overlay = parseLocaleFeatureMediaOverlay(localeFields.featureMediaJson);
    const pruned = pruneLocaleFeatureMediaOverlay(trPayload, overlay);
    const serialized = serializeLocaleFeatureMediaOverlay(pruned);

    if (serialized) {
      next[locale] = { ...localeFields, featureMediaJson: serialized };
      continue;
    }

    const { featureMediaJson: _removed, ...rest } = localeFields;
    if (Object.keys(rest).length > 0) {
      next[locale] = rest;
    } else {
      delete next[locale];
    }
  }

  return next;
}