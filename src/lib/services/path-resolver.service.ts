import { findCountryBySlug } from "@/lib/repositories/country.repository";
import { findCategoryBySlug } from "@/lib/repositories/category.repository";
import { findVisaProgramSlugExists } from "@/lib/repositories/visa-program.repository";
import { buildCategoryPath, buildVisaProgramPath } from "@/lib/paths";

export { buildCategoryPath, buildVisaProgramPath, buildServicePath } from "@/lib/paths";

export type ResolvedPath =
  | { type: "program"; countrySlug: string; programSlug: string }
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
  const program = await findVisaProgramSlugExists(country.id, lastSegment);
  if (program) {
    return { type: "program", countrySlug, programSlug: lastSegment };
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

  const { findProgramsByCountryAndCategory } = await import(
    "@/lib/repositories/visa-program.repository"
  );
  const programs = await findProgramsByCountryAndCategory(country.id, category.id);

  return { country, category, programs };
}
