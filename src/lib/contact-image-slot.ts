import { buildHerosImagePublicId } from "@/lib/cloudinary/heros-folder";

/**
 * İletişim hero kırpma oranı — içerik tabanlı hero yüksekliğine göre (~1280×400px görünüm).
 * 21:9 yerine daha kısa banner; sitedeki hero kutusuyla uyumlu.
 */
export const CONTACT_HERO_CROP_ASPECT = 3.2;

export const contactHeroImageClassName =
  "object-cover object-[left_center] md:object-[20%_35%]";

/** İletişim hero — Cloudinary Heros/contact-hero (yükleme = replace). */
export const contactHeroImageSlot = {
  publicId: buildHerosImagePublicId("contact-hero"),
  label: "İletişim hero görseli",
  aspectRatio: CONTACT_HERO_CROP_ASPECT,
  cropHint:
    "İletişim hero alanı (~3.2:1). Görseli sürükleyip yakınlaştırarak hangi bölümün görüneceğini seçin.",
};

export function contactHeroDeliveryUrl(): string {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "ulnb2wjo";
  return `https://res.cloudinary.com/${cloud}/image/upload/${contactHeroImageSlot.publicId}`;
}
