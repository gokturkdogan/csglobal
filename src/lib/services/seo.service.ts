import type { Metadata } from "next";
import type { SeoEntityType } from "@/generated/prisma/client";
import { findSeoMetadata } from "@/lib/repositories/seo.repository";
import { optimizeCloudinaryDeliveryUrl, siteImages } from "@/lib/media";
import { getSiteSettings } from "@/lib/settings";
import { getPublicSiteUrl } from "@/lib/site-url";

/** Sonunda "/" olmayan, normalize edilmiş site kök adresi (NEXT_PUBLIC_SITE_URL). */
const siteUrl = getPublicSiteUrl();
const siteOrigin = new URL(siteUrl).origin;

/**
 * Asla canonical/JSON-LD içinde görünmemesi gereken geliştirme / önizleme origin'leri.
 * Eski kayıtlarda (seed, admin) bu adresler mutlak URL olarak saklanmış olabilir.
 */
const NON_PRODUCTION_ORIGIN_RE =
  /https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?|https?:\/\/[a-z0-9-]+\.vercel\.app/gi;

function normalizeSitePath(path: string): string {
  const trimmed = path.trim();
  if (!trimmed || trimmed === "/") return "/";
  const withSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  const collapsed = withSlash.replace(/\/{2,}/g, "/");
  return collapsed.length > 1 ? collapsed.replace(/\/+$/, "") : collapsed;
}

/** Site yolu → mutlak canonical URL (her zaman NEXT_PUBLIC_SITE_URL üzerinden). */
export function buildCanonicalUrl(path: string): string {
  const normalized = normalizeSitePath(path);
  return normalized === "/" ? `${siteUrl}/` : `${siteUrl}${normalized}`;
}

/**
 * Canonical çözümleme: varsayılan olarak sayfanın kendi yolu kullanılır.
 * DB override yalnızca site yolu ("/almanya/x") veya aynı origin'e ait mutlak URL ise dikkate alınır;
 * localhost / *.vercel.app / başka domain içeren eski kayıtlar yok sayılır.
 */
export function resolveCanonicalUrl(override: string | null | undefined, path: string): string {
  const value = override?.trim();
  if (!value) return buildCanonicalUrl(path);
  if (value.startsWith("/")) return buildCanonicalUrl(value);
  try {
    const parsed = new URL(value);
    if (parsed.origin === siteOrigin) return buildCanonicalUrl(parsed.pathname);
  } catch {
    // geçersiz değer: sayfa yoluna düş
  }
  return buildCanonicalUrl(path);
}

/** Sosyal önizleme için varsayılan OG görseli (1200px genişlik). */
export const defaultOgImageUrl = optimizeCloudinaryDeliveryUrl(siteImages.hero, 1200);

export function parseStructuredDataJsonLd(raw: string | null | undefined): Record<string, unknown>[] {
  if (!raw?.trim()) return [];
  try {
    // Eski kayıtlardaki localhost / vercel.app adreslerini canlı site adresine çevir.
    const parsed = JSON.parse(raw.replace(NON_PRODUCTION_ORIGIN_RE, siteUrl)) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (item): item is Record<string, unknown> =>
          item !== null && typeof item === "object" && !Array.isArray(item),
      );
    }
    if (parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)) {
      return [parsed as Record<string, unknown>];
    }
    return [];
  } catch {
    return [];
  }
}

export async function findEntityStructuredDataJsonLd(
  entityType: SeoEntityType,
  entityId: string,
): Promise<Record<string, unknown>[]> {
  const seo = await findSeoMetadata(entityType, entityId);
  return parseStructuredDataJsonLd(seo?.structuredData);
}

export async function buildEntityMetadata({
  entityType,
  entityId,
  path,
  fallbackTitle,
  fallbackDescription,
  openGraphType = "website",
  publishedTime,
  preferredTitle,
  preferredDescription,
  forceNoIndex = false,
}: {
  entityType: SeoEntityType;
  entityId: string;
  path: string;
  fallbackTitle: string;
  fallbackDescription?: string;
  openGraphType?: "website" | "article";
  publishedTime?: string | null;
  /** Başka bir admin ekranından yönetilen başlık (ör. anasayfa editörü); seo_metadata kaydından önceliklidir. */
  preferredTitle?: string | null;
  /** Başka bir admin ekranından yönetilen açıklama; seo_metadata kaydından önceliklidir. */
  preferredDescription?: string | null;
  /** true ise seo_metadata ayarından bağımsız olarak noindex verilir (follow korunur). */
  forceNoIndex?: boolean;
}): Promise<Metadata> {
  const settings = await getSiteSettings();
  const seo = await findSeoMetadata(entityType, entityId);

  const titleOverride = preferredTitle?.trim() || null;
  const descriptionOverride = preferredDescription?.trim() || null;

  const rawTitle = titleOverride ?? seo?.metaTitle ?? fallbackTitle;
  const siteSuffix = ` | ${settings.siteName}`;
  const fullTitle = rawTitle.includes(settings.siteName)
    ? rawTitle
    : `${rawTitle}${siteSuffix}`;
  const description =
    descriptionOverride ??
    seo?.metaDescription ??
    fallbackDescription ??
    settings.siteDescription;
  const url = resolveCanonicalUrl(seo?.canonicalUrl, path);
  const ogTitle = titleOverride ? fullTitle : (seo?.ogTitle ?? fullTitle);
  const ogDescription = descriptionOverride ? description : (seo?.ogDescription ?? description);
  const ogImageUrl = seo?.ogImage ?? defaultOgImageUrl;
  const ogImages = [{ url: ogImageUrl }];

  const titleMetadata: Metadata["title"] = rawTitle.includes(settings.siteName)
    ? { absolute: fullTitle }
    : rawTitle;

  return {
    title: titleMetadata,
    description,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url,
      siteName: settings.siteName,
      locale: "tr_TR",
      type: openGraphType,
      publishedTime: openGraphType === "article" ? publishedTime ?? undefined : undefined,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [ogImageUrl],
    },
    robots: {
      index: forceNoIndex ? false : (seo?.robotsIndex ?? true),
      follow: seo?.robotsFollow ?? true,
    },
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildFaqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  if (faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function buildOrganizationJsonLd(settings: {
  siteName: string;
  contactPhone: string;
  contactEmail: string;
  address: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.siteName,
    url: siteUrl,
    telephone: settings.contactPhone,
    email: settings.contactEmail,
    address: settings.address,
  };
}

export function buildWebSiteJsonLd(settings: { siteName: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.siteName,
    url: siteUrl,
  };
}

export { siteUrl };
