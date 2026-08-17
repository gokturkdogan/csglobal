import type { SeoEntityType } from "@/generated/prisma/client";
import { upsertSeoMetadata } from "@/lib/repositories/seo.repository";

export function parseSeoFormData(formData: FormData) {
  const metaTitle = ((formData.get("seoMetaTitle") as string) || "").trim();
  const metaDescription = ((formData.get("seoMetaDescription") as string) || "").trim();
  const canonicalUrl = ((formData.get("seoCanonicalUrl") as string) || "").trim();
  const ogImage = ((formData.get("seoOgImage") as string) || "").trim();
  const structuredData = ((formData.get("seoStructuredData") as string) || "").trim();
  const robotsIndex = formData.get("seoRobotsIndex") === "on";
  const robotsFollow = formData.get("seoRobotsFollow") === "on";

  const hasAny =
    metaTitle.length > 0 ||
    metaDescription.length > 0 ||
    canonicalUrl.length > 0 ||
    ogImage.length > 0 ||
    structuredData.length > 0 ||
    !robotsIndex ||
    !robotsFollow;

  return {
    metaTitle,
    metaDescription,
    canonicalUrl,
    ogImage,
    structuredData,
    robotsIndex,
    robotsFollow,
    hasAny,
  };
}

export async function upsertSeoFromForm(
  formData: FormData,
  entityType: SeoEntityType,
  entityId: string,
) {
  const parsed = parseSeoFormData(formData);
  if (!parsed.hasAny) return;

  if (parsed.structuredData) {
    try {
      JSON.parse(parsed.structuredData);
    } catch {
      throw new Error("Yapısal veri geçerli JSON değil.");
    }
  }

  await upsertSeoMetadata({
    entityType,
    entityId,
    metaTitle: parsed.metaTitle || null,
    metaDescription: parsed.metaDescription || null,
    canonicalUrl: parsed.canonicalUrl || null,
    ogTitle: parsed.metaTitle || null,
    ogDescription: parsed.metaDescription || null,
    ogImage: parsed.ogImage || null,
    robotsIndex: parsed.robotsIndex,
    robotsFollow: parsed.robotsFollow,
    structuredData: parsed.structuredData || null,
  });
}
