import { GUIDE_HERO_CROP_ASPECT } from "@/lib/guide";
import {
  buildGuidesListHeroPublicId,
  GUIDES_LIST_HERO_ASSET,
} from "@/lib/cloudinary/guides-folder";

export const guidesListHeroImageClassName =
  "object-cover object-center md:object-[center_35%]";

/** Rehber liste sayfası hero: Cloudinary Guides/list-hero */
export const guidesListHeroImageSlot = {
  publicId: buildGuidesListHeroPublicId(),
  label: "Rehberlerimiz hero görseli",
  aspectRatio: GUIDE_HERO_CROP_ASPECT,
  cropHint:
    "Rehber liste hero alanı (~3.2:1). Görseli sürükleyip yakınlaştırarak hangi bölümün görüneceğini seçin.",
};

export function guidesListHeroDeliveryUrl(): string {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "ulnb2wjo";
  return `https://res.cloudinary.com/${cloud}/image/upload/${guidesListHeroImageSlot.publicId}`;
}

export { GUIDES_LIST_HERO_ASSET };
