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
