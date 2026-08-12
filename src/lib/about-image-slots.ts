import { buildAboutImagePublicId } from "@/lib/cloudinary/about-folder";
import { buildHerosImagePublicId } from "@/lib/cloudinary/heros-folder";

/** İletişim hero ile aynı içerik tabanlı oran */
export const ABOUT_HERO_CROP_ASPECT = 3.2;

export const aboutHeroImageClassName =
  "object-cover object-center md:object-[center_30%]";

export const aboutHeroImageSlot = {
  publicId: buildHerosImagePublicId("about-hero"),
  label: "Hakkımızda hero görseli",
  aspectRatio: ABOUT_HERO_CROP_ASPECT,
  cropHint:
    "Hero alanı (~3.2:1). Görseli sürükleyip yakınlaştırarak hangi bölümün görüneceğini seçin.",
};

export const aboutWhoWeAreImageSlot = {
  publicId: buildAboutImagePublicId("who-we-are"),
  label: "Biz kimiz görseli",
  aspectRatio: 4 / 3,
  cropHint: "Biz kimiz bölümü 4:3. Görselin hangi kısmının görüneceğini ayarlayın.",
};

export const aboutValuesSectionImageSlot = {
  publicId: buildAboutImagePublicId("values-section"),
  label: "Değerlerimiz yan görsel",
  aspectRatio: 4 / 3,
  cropHint: "Değerlerimiz bölümü yan görsel 4:3.",
};

export const ABOUT_VALUES_COUNT = 4;
