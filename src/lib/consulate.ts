import { normalizeRichTextContent } from "@/lib/rich-text";
import { optimizeCloudinaryDeliveryUrl } from "@/lib/media";
import { siteImages } from "@/lib/media";

export const CONSULATE_SECTIONS_MAX = 15;
export const CONSULATE_HERO_CROP_ASPECT = 3.2;

export type ConsulateSection = {
  title: string;
  content: string;
};

export function parseConsulateSectionsJson(
  json: string | null | undefined,
): ConsulateSection[] {
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
      .filter((item): item is ConsulateSection => item !== null)
      .slice(0, CONSULATE_SECTIONS_MAX);
  } catch {
    return [];
  }
}

export function serializeConsulateSections(sections: ConsulateSection[]): string {
  const valid = sections
    .map((section) => ({
      title: section.title.trim(),
      content: normalizeRichTextContent(section.content) ?? "",
    }))
    .filter((section) => section.title && section.content)
    .slice(0, CONSULATE_SECTIONS_MAX);

  return JSON.stringify(valid);
}

export function resolveConsulateHeroImage(url: string | null | undefined): string {
  const trimmed = url?.trim();
  if (trimmed) return optimizeCloudinaryDeliveryUrl(trimmed);
  return siteImages.article;
}

export const consulateHeroImageClassName =
  "object-cover object-center md:object-[center_30%]";
