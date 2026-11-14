import { normalizeRichTextContent } from "@/lib/rich-text";
import { optimizeCloudinaryDeliveryUrl, siteImages } from "@/lib/media";
import { normalizePageSortOrder } from "@/lib/service-constants";
export { SERVICE_HERO_CROP_ASPECT } from "@/lib/service-constants";
export {
  SERVICE_FEATURE_TITLE_MAX,
  SERVICE_FEATURE_TEXT_MAX,
  SERVICE_FEATURE_MEDIA_MAX_PER_KIND,
  type ServiceFeatureMediaKind,
  type ServiceFeatureMediaItem,
  type ServiceFeatureMediaPayload,
  normalizeServiceFeatureTitle,
  normalizeServiceFeatureText,
  legacyFeatureMediaFromProgram,
  parseFeatureMediaJson,
  serializeFeatureMediaJson,
  featureMediaToDisplayItems,
  syncLegacyFeatureImagesFromMedia,
} from "@/lib/service-feature-media";

export type ServiceContentSection = {
  title: string;
  content: string;
  /** Sayfa sırası; parse/serialize sırasında yoksa otomatik atanır */
  sortOrder?: number;
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
    sortOrder: index + 1,
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
    const sections = parsed
      .map((item, index) => {
        if (!item || typeof item !== "object") return null;
        const record = item as {
          title?: unknown;
          content?: unknown;
          sortOrder?: unknown;
        };
        const title = typeof record.title === "string" ? record.title.trim() : "";
        const content = normalizeRichTextContent(
          typeof record.content === "string" ? record.content : "",
        );
        if (!title || !content) return null;
        return {
          title,
          content,
          sortOrder: normalizePageSortOrder(record.sortOrder, index + 1),
        };
      })
      .filter((item) => item !== null);

    const indexed = sections.map((section, index) => ({ section, index }));
    indexed.sort(
      (a, b) =>
        (a.section.sortOrder ?? 0) - (b.section.sortOrder ?? 0) || a.index - b.index,
    );
    return indexed.map(({ section }) => section);
  } catch {
    return [];
  }
}

export function serializeServiceSections(sections: ServiceContentSection[]): string {
  const valid = sections
    .map((section, index) => ({
      title: section.title.trim(),
      content: normalizeRichTextContent(section.content) ?? "",
      sortOrder: normalizePageSortOrder(section.sortOrder, index + 1),
    }))
    .filter((section) => section.title && section.content);

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

export const serviceHeroImageClassName =
  "object-cover object-center md:object-[center_30%]";