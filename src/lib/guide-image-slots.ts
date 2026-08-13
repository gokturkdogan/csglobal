import { GUIDE_HERO_CROP_ASPECT } from "@/lib/guide";
import { buildGuideImagePublicId } from "@/lib/cloudinary/guides-folder";

export function guideHeroImageSlot(slug: string) {
  return {
    publicId: buildGuideImagePublicId(slug, "hero"),
    label: "Rehber hero görseli",
    aspectRatio: GUIDE_HERO_CROP_ASPECT,
    cropHint:
      "Hero alanı (~3.2:1). Görseli sürükleyip yakınlaştırarak hangi bölümün görüneceğini seçin.",
  };
}

export function guideFeatureImageSlot(slug: string) {
  return {
    publicId: buildGuideImagePublicId(slug, "feature"),
    label: "Öne çıkan görsel",
    aspectRatio: 4 / 3,
    cropHint: "İçerik bölümü görseli 4:3.",
  };
}
