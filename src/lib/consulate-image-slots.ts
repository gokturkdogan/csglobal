import { CONSULATE_HERO_CROP_ASPECT } from "@/lib/consulate";
import { buildConsulateImagePublicId } from "@/lib/cloudinary/consulates-folder";

export function consulateHeroImageSlot(slug: string) {
  return {
    publicId: buildConsulateImagePublicId(slug, "hero"),
    label: "Konsolosluk hero görseli",
    aspectRatio: CONSULATE_HERO_CROP_ASPECT,
    cropHint:
      "Hero alanı (~3.2:1). Görseli sürükleyip yakınlaştırarak hangi bölümün görüneceğini seçin.",
  };
}
