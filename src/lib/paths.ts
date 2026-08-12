export function buildServicePath(countrySlug: string, serviceSlug: string) {
  return `/${countrySlug}/${serviceSlug}`;
}

export function buildCategoryPath(countrySlug: string, segments: string[]) {
  return `/${countrySlug}/${segments.join("/")}`;
}
