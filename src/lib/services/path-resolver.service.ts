import { findCountryBySlug } from "@/lib/repositories/country.repository";
import { findCategoryBySlug } from "@/lib/repositories/category.repository";
import { findServiceByCountrySlug } from "@/lib/repositories/service.repository";
import { buildCategoryPath, buildServicePath } from "@/lib/paths";

export { buildCategoryPath, buildServicePath };

export type ResolvedPath =
  | { type: "service"; countrySlug: string; serviceSlug: string }
  | { type: "category"; countrySlug: string; categorySlug: string }
  | { type: "not_found" };

export async function resolveCountryPath(
  countrySlug: string,
  pathSegments: string[],
): Promise<ResolvedPath> {
  const country = await findCountryBySlug(countrySlug);
  if (!country) return { type: "not_found" };

  if (pathSegments.length === 0) {
    return { type: "not_found" };
  }

  const lastSegment = pathSegments[pathSegments.length - 1];
  const service = await findServiceByCountrySlug(country.id, lastSegment);
  if (service) {
    return { type: "service", countrySlug, serviceSlug: lastSegment };
  }

  if (pathSegments.length === 1) {
    const category = await findCategoryBySlug(pathSegments[0]);
    if (category) {
      return { type: "category", countrySlug, categorySlug: pathSegments[0] };
    }
  }

  return { type: "not_found" };
}

export async function loadCategoryPageData(
  countrySlug: string,
  pathSegments: string[],
) {
  if (pathSegments.length !== 1) return null;

  const country = await findCountryBySlug(countrySlug);
  if (!country) return null;

  const category = await findCategoryBySlug(pathSegments[0]);
  if (!category) return null;

  const { findServicesByCountryAndCategory } = await import(
    "@/lib/repositories/service.repository"
  );
  const services = await findServicesByCountryAndCategory(country.id, category.id);

  return { country, category, services };
}
