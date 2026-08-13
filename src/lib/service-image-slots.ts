import { SERVICE_HERO_CROP_ASPECT } from "@/lib/service-page";
import { buildServiceImagePublicId } from "@/lib/cloudinary/services-folder";

export function serviceHeroImageSlot(slug: string) {
  return {
    publicId: buildServiceImagePublicId(slug, "hero"),
    label: "Hizmet banner görseli",
    aspectRatio: SERVICE_HERO_CROP_ASPECT,
    cropHint:
      "Banner alanı (~3.2:1). Görseli sürükleyip yakınlaştırarak hangi bölümün görüneceğini seçin.",
  };
}

export function serviceFeatureImageSlot(slug: string, index: 1 | 2) {
  const asset = index === 1 ? "feature-1" : "feature-2";
  return {
    publicId: buildServiceImagePublicId(slug, asset),
    label: `Görsel alan ${index}`,
    aspectRatio: 4 / 3,
    cropHint: `Görsel alan ${index} için 4:3 kırpma.`,
  };
}
