import { normalizeRichTextContent } from "@/lib/rich-text";
import { optimizeCloudinaryDeliveryUrl, siteImages } from "@/lib/media";

export const SERVICE_SECTIONS_MAX = 15;
export const SERVICE_HERO_CROP_ASPECT = 3.2;
export const SERVICE_FEATURE_TITLE_MAX = 35;
export const SERVICE_FEATURE_TEXT_MAX = 450;

export type ServiceContentSection = {
  title: string;
  content: string;
};

export type ServiceDisplaySection = ServiceContentSection & {
  slug: string;
  isMarkdown?: boolean;
};

export type ServiceSectionNavItem = {
  slug: string;
  title: string;
};

type LegacyServiceSection = {
  title: string;
  slug: string;
  content: string;
};

export function serviceSectionDomId(index: number): string {
  return `service-section-${index}`;
}

export function resolveServiceDisplaySections(
  sectionsJson: string | null | undefined,
  legacySections: LegacyServiceSection[] = [],
): ServiceDisplaySection[] {
  const fromJson = parseServiceSectionsJson(sectionsJson);
  if (fromJson.length > 0) {
    return fromJson.map((section, index) => ({
      ...section,
      slug: serviceSectionDomId(index),
      isMarkdown: false,
    }));
  }

  return legacySections.map((section, index) => ({
    title: section.title,
    content: section.content,
    slug: section.slug?.trim() || serviceSectionDomId(index),
    isMarkdown: true,
  }));
}

export function getServiceSectionNavItems(
  sectionsJson: string | null | undefined,
  legacySections: LegacyServiceSection[] = [],
): ServiceSectionNavItem[] {
  return resolveServiceDisplaySections(sectionsJson, legacySections).map(
    (section) => ({
      slug: section.slug,
      title: section.title,
    }),
  );
}

export function parseServiceSectionsJson(json: string | null | undefined): ServiceContentSection[] {
  if (!json?.trim()) return [];
  try {
    const parsed = JSON.parse(json) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const record = item as { title?: unknown; content?: unknown };
        const title = typeof record.title === "string" ? record.title.trim() : "";
        const content = normalizeRichTextContent(
          typeof record.content === "string" ? record.content : "",
        );
        if (!title || !content) return null;
        return { title, content };
      })
      .filter((item): item is ServiceContentSection => item !== null)
      .slice(0, SERVICE_SECTIONS_MAX);
  } catch {
    return [];
  }
}

export function serializeServiceSections(sections: ServiceContentSection[]): string {
  const valid = sections
    .map((section) => ({
      title: section.title.trim(),
      content: normalizeRichTextContent(section.content) ?? "",
    }))
    .filter((section) => section.title && section.content)
    .slice(0, SERVICE_SECTIONS_MAX);

  return JSON.stringify(valid);
}

export function resolveServiceHeroImage(url: string | null | undefined): string {
  const trimmed = url?.trim();
  if (trimmed) return optimizeCloudinaryDeliveryUrl(trimmed);
  return siteImages.countryDetailHero;
}

export function resolveServiceFeatureImage(url: string | null | undefined): string | null {
  const trimmed = url?.trim();
  return trimmed || null;
}

export function normalizeServiceFeatureTitle(value: string | null | undefined): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, SERVICE_FEATURE_TITLE_MAX);
}

export function normalizeServiceFeatureText(value: string | null | undefined): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, SERVICE_FEATURE_TEXT_MAX);
}

export const serviceHeroImageClassName =
  "object-cover object-center md:object-[center_30%]";
