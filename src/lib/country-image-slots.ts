import { buildCountryImagePublicId } from "@/lib/cloudinary/countries-folder";
import { SERVICE_HERO_CROP_ASPECT } from "@/lib/service-constants";

export const COUNTRY_ITEM_CROP_ASPECT = 6 / 4;

export function countryHeroImageSlot(slug: string) {
  return {
    publicId: buildCountryImagePublicId(slug, "hero"),
    label: "Hero görseli",
    aspectRatio: SERVICE_HERO_CROP_ASPECT,
    cropHint:
      "Üst banner alanı (~3.2:1). Bu ülkeye bağlı program, rehber, konsolosluk ve ülke detay hero alanında kullanılır.",
  };
}

export function countryItemImageSlot(slug: string) {
  return {
    publicId: buildCountryImagePublicId(slug, "item"),
    label: "Item görseli",
    aspectRatio: COUNTRY_ITEM_CROP_ASPECT,
    cropHint:
      "Kart ve liste kapak görseli (6:4). Bu ülkeye bağlı tüm kart ve liste önizlemelerinde kullanılır.",
  };
}

export function countryFeatureDynamicImageSlot(slug: string, index: number) {
  return {
    publicId: buildCountryImagePublicId(slug, `feature-image-${index}`),
    label: `Görsel alan ${index}`,
    aspectRatio: 4 / 3,
    cropHint: `Görsel alan ${index} için 4:3 kırpma.`,
  };
}

export function countryFeatureVideoSlot(slug: string, index: number) {
  return {
    publicId: buildCountryImagePublicId(slug, `feature-video-${index}`),
    label: `Video alan ${index}`,
    aspectRatio: 16 / 9,
    cropHint: `Video alan ${index} için 16:9 önerilir.`,
  };
}