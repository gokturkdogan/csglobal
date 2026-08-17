import type { Metadata } from "next";
import type { SeoEntityType } from "@/generated/prisma/client";
import { findSeoMetadata } from "@/lib/repositories/seo.repository";
import { getSiteSettings } from "@/lib/settings";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://csglobal.com";

export function parseStructuredDataJsonLd(raw: string | null | undefined): Record<string, unknown>[] {
  if (!raw?.trim()) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
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
}: {
  entityType: SeoEntityType;
  entityId: string;
  path: string;
  fallbackTitle: string;
  fallbackDescription?: string;
}): Promise<Metadata> {
  const settings = await getSiteSettings();
  const seo = await findSeoMetadata(entityType, entityId);

  const title = seo?.metaTitle ?? fallbackTitle;
  const fullTitle = title.includes(settings.siteName)
    ? title
    : `${title} | ${settings.siteName}`;
  const description =
    seo?.metaDescription ?? fallbackDescription ?? settings.siteDescription;
  const url = seo?.canonicalUrl ?? `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const ogTitle = seo?.ogTitle ?? fullTitle;
  const ogDescription = seo?.ogDescription ?? description;
  const ogImages = seo?.ogImage ? [{ url: seo.ogImage }] : undefined;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url,
      siteName: settings.siteName,
      locale: "tr_TR",
      type: "website",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: seo?.ogImage ? [seo.ogImage] : undefined,
    },
    robots: {
      index: seo?.robotsIndex ?? true,
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

export { siteUrl };
