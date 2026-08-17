import { optimizeCloudinaryDeliveryUrl, siteImages } from "@/lib/media";

export function resolveCountryHeroImageUrl(
  countryHeroImage: string | null | undefined,
): string | null {
  const trimmed = countryHeroImage?.trim();
  if (!trimmed) return null;
  return optimizeCloudinaryDeliveryUrl(trimmed);
}

export function resolveCountryItemCardImage(
  countryItemImage: string | null | undefined,
): string | null {
  const trimmed = countryItemImage?.trim();
  if (!trimmed) return null;
  return optimizeCloudinaryDeliveryUrl(trimmed, 1200);
}

export function resolveCountryPageHeroImage(
  countryHeroImage: string | null | undefined,
): string {
  const country = resolveCountryHeroImageUrl(countryHeroImage);
  if (country) return country;
  return siteImages.countryDetailHero;
}

export function resolveServicePageHeroImage(
  countryHeroImage: string | null | undefined,
): string {
  return resolveCountryPageHeroImage(countryHeroImage);
}

export function resolveGuidePageHeroImage(
  countryHeroImage: string | null | undefined,
): string {
  const country = resolveCountryHeroImageUrl(countryHeroImage);
  if (country) return country;
  return siteImages.article;
}

export function resolveConsulatePageHeroImage(
  countryHeroImage: string | null | undefined,
): string {
  const country = resolveCountryHeroImageUrl(countryHeroImage);
  if (country) return country;
  return siteImages.article;
}

export function resolveCountryGridItemImage(
  countryItemImage: string | null | undefined,
): string {
  const country = resolveCountryItemCardImage(countryItemImage);
  if (country) return country;
  return siteImages.country;
}

export function resolveServiceCardImage(
  countryItemImage: string | null | undefined,
): string {
  const country = resolveCountryItemCardImage(countryItemImage);
  if (country) return country;
  return siteImages.travel;
}

export function resolveArticleCardImage(
  countryItemImage: string | null | undefined,
): string {
  const country = resolveCountryItemCardImage(countryItemImage);
  if (country) return country;
  return siteImages.article;
}

/** Blog kartı: ülke item görseli veya varsayılan hero banner. */
export function resolveBlogCardImage(
  countryItemImage: string | null | undefined,
): string {
  const country = resolveCountryItemCardImage(countryItemImage);
  if (country) return country;
  return siteImages.blogCardDefault;
}

/** Blog detay hero: ülke hero görseli; ülke yoksa varsayılan hero banner. */
export function resolveBlogPageHeroImage(
  country: { heroImage?: string | null } | null | undefined,
): string {
  if (!country) return siteImages.blogCardDefault;
  const hero = resolveCountryHeroImageUrl(country.heroImage);
  if (hero) return hero;
  return siteImages.article;
}
