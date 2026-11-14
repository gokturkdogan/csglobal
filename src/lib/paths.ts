/** Ülke listesi (Vize danışmanlık); eski URL: /ulkeler */
export const VIZE_CONSULTANCY_LIST_PATH = "/vize-danismanlik";
export const VIZE_CONSULTANCY_LIST_SITE_PAGE_SLUG = "vize-danismanlik";
export const LEGACY_COUNTRIES_LIST_PATH = "/ulkeler";

export function buildBlogPath(slug: string) {
  return `/bloglar/${slug}`;
}

export function buildBlogListPath() {
  return "/bloglar";
}

export function buildVisaProgramPath(countrySlug: string, programSlug: string) {
  return `/${countrySlug}/${programSlug}`;
}

/** @deprecated buildVisaProgramPath kullanın */
export function buildServicePath(countrySlug: string, serviceSlug: string) {
  return buildVisaProgramPath(countrySlug, serviceSlug);
}

export function buildConsulatePath(countrySlug: string, consulateSlug: string) {
  return `/${countrySlug}/konsolosluklar/${consulateSlug}`;
}

export function buildCategoryPath(countrySlug: string, segments: string[]) {
  return `/${countrySlug}/${segments.join("/")}`;
}
