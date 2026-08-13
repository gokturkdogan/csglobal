export function buildServicePath(countrySlug: string, serviceSlug: string) {
  return `/${countrySlug}/${serviceSlug}`;
}

export function buildConsulatesListPath(countrySlug: string) {
  return `/${countrySlug}/konsolosluklar`;
}

export function buildConsulatePath(countrySlug: string, consulateSlug: string) {
  return `/${countrySlug}/konsolosluklar/${consulateSlug}`;
}

export function buildCategoryPath(countrySlug: string, segments: string[]) {
  return `/${countrySlug}/${segments.join("/")}`;
}
