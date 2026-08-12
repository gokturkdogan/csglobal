import { findCountryBySlug } from "@/lib/repositories/country.repository";
import { findServiceByCountrySlug } from "@/lib/repositories/service.repository";
import { getCategoryBranch, getCategoryChildrenWithServices } from "./category-tree.service";
import { buildCategoryPath, buildServicePath } from "@/lib/paths";

export { buildCategoryPath, buildServicePath };

export type ResolvedPath =
  | { type: "service"; countrySlug: string; serviceSlug: string }
  | { type: "category"; countrySlug: string; segments: string[] }
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

  const { leaf } = await getCategoryBranch(country.id, pathSegments);
  if (leaf) {
    return { type: "category", countrySlug, segments: pathSegments };
  }

  return { type: "not_found" };
}

export async function loadCategoryPageData(countrySlug: string, segments: string[]) {
  const country = await findCountryBySlug(countrySlug);
  if (!country) return null;

  const { categories, leaf } = await getCategoryBranch(country.id, segments);
  if (!leaf) return null;

  const { children, services } = await getCategoryChildrenWithServices(leaf.id);
  if (children.length === 0 && services.length === 0) return null;

  return { country, categories, category: leaf, children, services };
}
