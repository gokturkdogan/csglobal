const DEFAULT_SITE_URL = "https://csglobal.com";

/** Ortak site adresi (NEXT_PUBLIC_SITE_URL). */
export function getPublicSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
  return raw.replace(/\/$/, "");
}

export function getPublicSiteOrigin(): string {
  try {
    return new URL(getPublicSiteUrl()).origin;
  } catch {
    return getPublicSiteUrl();
  }
}
