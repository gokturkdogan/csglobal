import {
  SERVICE_FEATURE_MEDIA_MAX_PER_KIND,
  SERVICE_FEATURE_TEXT_MAX,
  SERVICE_FEATURE_TITLE_MAX,
  normalizePageSortOrder,
} from "@/lib/service-constants";

export {
  SERVICE_FEATURE_MEDIA_MAX_PER_KIND,
  SERVICE_FEATURE_TEXT_MAX,
  SERVICE_FEATURE_TITLE_MAX,
} from "@/lib/service-constants";

export type ServiceFeatureMediaKind = "image" | "video";

export type ServiceFeatureMediaEntry = {
  url: string;
  title: string;
  text: string;
  sortOrder?: number;
};

export type ServiceFeatureMediaItem = ServiceFeatureMediaEntry & {
  kind: ServiceFeatureMediaKind;
};

export type ServiceFeatureMediaPayload = {
  images: ServiceFeatureMediaEntry[];
  videos: ServiceFeatureMediaEntry[];
};

export function normalizeServiceFeatureTitle(value: string | null | undefined): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, SERVICE_FEATURE_TITLE_MAX);
}

export function normalizeServiceFeatureText(value: string | null | undefined): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, SERVICE_FEATURE_TEXT_MAX);
}

function normalizeFeatureMediaEntry(
  url: unknown,
  title: unknown,
  text: unknown,
  sortOrder: unknown,
  sortFallback: number,
): ServiceFeatureMediaEntry | null {
  const trimmedUrl = typeof url === "string" ? url.trim() : "";
  if (!trimmedUrl) return null;
  const normalizedTitle = normalizeServiceFeatureTitle(
    typeof title === "string" ? title : "",
  );
  const normalizedText = normalizeServiceFeatureText(typeof text === "string" ? text : "");
  if (!normalizedTitle && !normalizedText) return null;
  const order =
    sortOrder === undefined || sortOrder === null || sortOrder === ""
      ? undefined
      : normalizePageSortOrder(sortOrder, sortFallback);
  return {
    url: trimmedUrl,
    title: normalizedTitle ?? "",
    text: normalizedText ?? "",
    ...(order !== undefined ? { sortOrder: order } : {}),
  };
}

export function legacyFeatureMediaFromProgram(program: {
  featureImage1?: string | null;
  featureImage1Title?: string | null;
  featureImage1Text?: string | null;
  featureImage2?: string | null;
  featureImage2Title?: string | null;
  featureImage2Text?: string | null;
}): ServiceFeatureMediaPayload {
  const images: ServiceFeatureMediaPayload["images"] = [];
  const pushLegacy = (
    url?: string | null,
    title?: string | null,
    text?: string | null,
  ) => {
    const entry = normalizeFeatureMediaEntry(url, title, text, undefined, images.length + 1);
    if (entry) images.push(entry);
  };
  pushLegacy(program.featureImage1, program.featureImage1Title, program.featureImage1Text);
  pushLegacy(program.featureImage2, program.featureImage2Title, program.featureImage2Text);
  return { images, videos: [] };
}

export function parseFeatureMediaJson(
  json: string | null | undefined,
  legacy?: Parameters<typeof legacyFeatureMediaFromProgram>[0],
): ServiceFeatureMediaPayload {
  if (!json?.trim()) {
    return legacy ? legacyFeatureMediaFromProgram(legacy) : { images: [], videos: [] };
  }
  try {
    const parsed = JSON.parse(json) as unknown;
    if (!parsed || typeof parsed !== "object") {
      return legacy ? legacyFeatureMediaFromProgram(legacy) : { images: [], videos: [] };
    }
    const record = parsed as {
      images?: unknown;
      videos?: unknown;
    };

    const images = Array.isArray(record.images)
      ? record.images
          .map((item, index) => {
            if (!item || typeof item !== "object") return null;
            const row = item as {
              url?: unknown;
              title?: unknown;
              text?: unknown;
              sortOrder?: unknown;
            };
            return normalizeFeatureMediaEntry(
              row.url,
              row.title,
              row.text,
              row.sortOrder,
              index + 1,
            );
          })
          .filter((item): item is ServiceFeatureMediaEntry => item !== null)
          .slice(0, SERVICE_FEATURE_MEDIA_MAX_PER_KIND)
      : [];

    const videos = Array.isArray(record.videos)
      ? record.videos
          .map((item, index) => {
            if (!item || typeof item !== "object") return null;
            const row = item as {
              url?: unknown;
              title?: unknown;
              text?: unknown;
              sortOrder?: unknown;
            };
            return normalizeFeatureMediaEntry(
              row.url,
              row.title,
              row.text,
              row.sortOrder,
              images.length + index + 1,
            );
          })
          .filter((item): item is ServiceFeatureMediaEntry => item !== null)
          .slice(0, SERVICE_FEATURE_MEDIA_MAX_PER_KIND)
      : [];

    if (images.length === 0 && videos.length === 0 && legacy) {
      return legacyFeatureMediaFromProgram(legacy);
    }

    return { images, videos };
  } catch {
    return legacy ? legacyFeatureMediaFromProgram(legacy) : { images: [], videos: [] };
  }
}

export function serializeFeatureMediaJson(payload: ServiceFeatureMediaPayload): string {
  const images = payload.images
    .slice(0, SERVICE_FEATURE_MEDIA_MAX_PER_KIND)
    .map((item, index) => ({
      url: item.url.trim(),
      title: normalizeServiceFeatureTitle(item.title) ?? "",
      text: normalizeServiceFeatureText(item.text) ?? "",
      sortOrder: normalizePageSortOrder(item.sortOrder, index + 1),
    }))
    .filter((item) => item.url && (item.title || item.text));

  const videos = payload.videos
    .slice(0, SERVICE_FEATURE_MEDIA_MAX_PER_KIND)
    .map((item, index) => ({
      url: item.url.trim(),
      title: normalizeServiceFeatureTitle(item.title) ?? "",
      text: normalizeServiceFeatureText(item.text) ?? "",
      sortOrder: normalizePageSortOrder(item.sortOrder, payload.images.length + index + 1),
    }))
    .filter((item) => item.url && (item.title || item.text));

  return JSON.stringify({ images, videos });
}

export function featureMediaToDisplayItems(
  payload: ServiceFeatureMediaPayload,
): ServiceFeatureMediaItem[] {
  return [
    ...payload.images.map((item) => ({ ...item, kind: "image" as const })),
    ...payload.videos.map((item) => ({ ...item, kind: "video" as const })),
  ];
}

export function syncLegacyFeatureImagesFromMedia(payload: ServiceFeatureMediaPayload): {
  featureImage1: string | null;
  featureImage1Title: string | null;
  featureImage1Text: string | null;
  featureImage2: string | null;
  featureImage2Title: string | null;
  featureImage2Text: string | null;
} {
  const first = payload.images[0];
  const second = payload.images[1];
  return {
    featureImage1: first?.url ?? null,
    featureImage1Title: first ? normalizeServiceFeatureTitle(first.title) : null,
    featureImage1Text: first ? normalizeServiceFeatureText(first.text) : null,
    featureImage2: second?.url ?? null,
    featureImage2Title: second ? normalizeServiceFeatureTitle(second.title) : null,
    featureImage2Text: second ? normalizeServiceFeatureText(second.text) : null,
  };
}