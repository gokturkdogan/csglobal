import { SERVICE_HERO_CROP_ASPECT } from "@/lib/service-constants";
import { buildServiceImagePublicId } from "@/lib/cloudinary/services-folder";

export function serviceHeroImageSlot(slug: string) {
  return {
    publicId: buildServiceImagePublicId(slug, "hero"),
    label: "Program banner görseli",
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

export function serviceFeatureDynamicImageSlot(slug: string, index: number) {
  return {
    publicId: buildServiceImagePublicId(slug, `feature-image-${index}`),
    label: `Görsel alan ${index}`,
    aspectRatio: 4 / 3,
    cropHint: `Görsel alan ${index} için 4:3 kırpma.`,
  };
}

export function serviceFeatureVideoSlot(slug: string, index: number) {
  return {
    publicId: buildServiceImagePublicId(slug, `feature-video-${index}`),
    label: `Video alan ${index}`,
    aspectRatio: 16 / 9,
    cropHint: `Video alan ${index} için 16:9 önerilir.`,
  };
}
