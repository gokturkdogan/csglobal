import { normalizeRichTextContent } from "@/lib/rich-text";
import { optimizeCloudinaryDeliveryUrl } from "@/lib/media";
import { siteImages } from "@/lib/media";

export const GUIDE_HERO_CROP_ASPECT = 3.2;
export const GUIDE_FEATURE_IMAGE_TITLE_MAX = 35;
export const GUIDE_FEATURE_IMAGE_TEXT_MAX = 450;

export type GuideSection = {
  title: string;
  content: string;
};

export type GuideDisplaySection = GuideSection & {
  slug: string;
};

export type GuideSectionNavItem = {
  slug: string;
  title: string;
};

export function guideSectionDomId(index: number): string {
  return `guide-section-${index}`;
}

export function resolveGuideDisplaySections(
  json: string | null | undefined,
): GuideDisplaySection[] {
  return parseGuideSectionsJson(json).map((section, index) => ({
    ...section,
    slug: guideSectionDomId(index),
  }));
}

export function getGuideSectionNavItems(
  json: string | null | undefined,
): GuideSectionNavItem[] {
  return resolveGuideDisplaySections(json).map((section) => ({
    slug: section.slug,
    title: section.title,
  }));
}

export function parseGuideSectionsJson(json: string | null | undefined): GuideSection[] {
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
      .filter((item): item is GuideSection => item !== null);
  } catch {
    return [];
  }
}

export function serializeGuideSections(sections: GuideSection[]): string {
  const valid = sections
    .map((section) => ({
      title: section.title.trim(),
      content: normalizeRichTextContent(section.content) ?? "",
    }))
    .filter((section) => section.title && section.content);

  return JSON.stringify(valid);
}

export function resolveGuideHeroImage(url: string | null | undefined): string {
  const trimmed = url?.trim();
  if (trimmed) return optimizeCloudinaryDeliveryUrl(trimmed);
  return siteImages.article;
}

export function resolveGuideFeatureImage(url: string | null | undefined): string | null {
  const trimmed = url?.trim();
  return trimmed || null;
}

export function resolveGuideCardImage(): string {
  return siteImages.article;
}

export function normalizeGuideFeatureImageTitle(
  value: string | null | undefined,
): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, GUIDE_FEATURE_IMAGE_TITLE_MAX);
}

export function normalizeGuideFeatureImageText(
  value: string | null | undefined,
): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, GUIDE_FEATURE_IMAGE_TEXT_MAX);
}

export const guideHeroImageClassName =
  "object-cover object-center md:object-[center_30%]";
