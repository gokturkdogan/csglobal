import { SERVICE_HERO_CROP_ASPECT } from "@/lib/service-page";
import { buildCountryImagePublicId } from "@/lib/cloudinary/countries-folder";

export const COUNTRY_ITEM_CROP_ASPECT = 6 / 4;

export function countryHeroImageSlot(slug: string) {
  return {
    publicId: buildCountryImagePublicId(slug, "hero"),
    label: "Hero görseli",
    aspectRatio: SERVICE_HERO_CROP_ASPECT,
    cropHint:
      "Üst banner alanı (~3.2:1). Bu ülkeye bağlı hizmet, rehber, konsolosluk ve ülke detay hero alanında kullanılır.",
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
