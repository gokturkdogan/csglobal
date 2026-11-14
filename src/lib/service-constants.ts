/** Program / danışmanlık banner kırpma oranı (~3.2:1). */
export const SERVICE_HERO_CROP_ASPECT = 3.2;

export const SERVICE_FEATURE_TITLE_MAX = 35;
export const SERVICE_FEATURE_TEXT_MAX = 450;
export const SERVICE_FEATURE_MEDIA_MAX_PER_KIND = 10;

/** İçerik ve görsel/video bloklarının ortak sayfa sırası (1-99). */
export const SERVICE_PAGE_SORT_ORDER_MIN = 1;
export const SERVICE_PAGE_SORT_ORDER_MAX = 99;

export function normalizePageSortOrder(value: unknown, fallback: number): number {
  let n = fallback;
  if (typeof value === "number" && Number.isFinite(value)) {
    n = Math.floor(value);
  } else if (typeof value === "string" && value.trim()) {
    const parsed = Number.parseInt(value.trim(), 10);
    if (Number.isFinite(parsed)) n = parsed;
  }
  return Math.min(
    SERVICE_PAGE_SORT_ORDER_MAX,
    Math.max(SERVICE_PAGE_SORT_ORDER_MIN, n),
  );
}