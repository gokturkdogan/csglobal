/** Cloudinary Home klasörü: aynı public_id ile yükleme = görseli değiştirir (yeni dosya oluşturmaz). */
import {
  HOMEPAGE_CLOUDINARY_FOLDER,
  buildHomeImagePublicId,
} from "@/lib/cloudinary/home-folder";

export { HOMEPAGE_CLOUDINARY_FOLDER };

export type HomepageImageSlotConfig = {
  publicId: string;
  label: string;
  /** Yükleme öncesi sabit kırpma oranı (genişlik / yükseklik) */
  aspectRatio: number;
  cropHint: string;
};

export const homepageImageSlots = {
  heroImage: {
    publicId: buildHomeImagePublicId("hero"),
    label: "Hero banner",
    aspectRatio: 21 / 9,
    cropHint:
      "Geniş hero alanı (21:9). Görseli sürükleyip yakınlaştırarak hangi bölümün görüneceğini seçin.",
  },
  aboutImage: {
    publicId: buildHomeImagePublicId("about"),
    label: "Hakkımızda görseli",
    aspectRatio: 4 / 3,
    cropHint:
      "Hakkımızda kutusu 4:3 oranında. Görselin hangi kısmının kutuda görüneceğini ayarlayın.",
  },
  ctaBannerImage: {
    publicId: buildHomeImagePublicId("cta-banner"),
    label: "Alt CTA banner",
    aspectRatio: 21 / 9,
    cropHint:
      "Alt CTA şeridi geniş banner (21:9). Görseli konumlandırıp kırpın.",
  },
  seoBlock0: {
    publicId: buildHomeImagePublicId("seo-1"),
    label: "SEO blok 1 görseli",
    aspectRatio: 4 / 3,
    cropHint: "SEO blok görseli 4:3. Kırpma alanını sürükleyerek konumlandırın.",
  },
  seoBlock1: {
    publicId: buildHomeImagePublicId("seo-2"),
    label: "SEO blok 2 görseli",
    aspectRatio: 4 / 3,
    cropHint: "SEO blok görseli 4:3. Kırpma alanını sürükleyerek konumlandırın.",
  },
  seoBlock2: {
    publicId: buildHomeImagePublicId("seo-3"),
    label: "SEO blok 3 görseli",
    aspectRatio: 4 / 3,
    cropHint: "SEO blok görseli 4:3. Kırpma alanını sürükleyerek konumlandırın.",
  },
} satisfies Record<string, HomepageImageSlotConfig>;

export type HomepageImageSlotKey = keyof typeof homepageImageSlots;

export function seoBlockImageSlotKey(index: number): HomepageImageSlotKey | null {
  const keys: HomepageImageSlotKey[] = ["seoBlock0", "seoBlock1", "seoBlock2"];
  return keys[index] ?? null;
}

export function cloudinaryDeliveryUrl(publicId: string): string {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "ulnb2wjo";
  return `https://res.cloudinary.com/${cloud}/image/upload/${publicId}`;
}
