/** Cloudinary Home klasörü — aynı public_id ile yükleme = görseli değiştirir (yeni dosya oluşturmaz). */
export const HOMEPAGE_CLOUDINARY_FOLDER = "Home";

export const homepageImageSlots = {
  heroImage: {
    publicId: "Home/hero",
    label: "Hero banner",
  },
  aboutImage: {
    publicId: "Home/about",
    label: "Hakkımızda görseli",
  },
  ctaBannerImage: {
    publicId: "Home/cta-banner",
    label: "Alt CTA banner",
  },
  seoBlock0: {
    publicId: "Home/seo-1",
    label: "SEO blok 1 görseli",
  },
  seoBlock1: {
    publicId: "Home/seo-2",
    label: "SEO blok 2 görseli",
  },
  seoBlock2: {
    publicId: "Home/seo-3",
    label: "SEO blok 3 görseli",
  },
} as const;

export type HomepageImageSlotKey = keyof typeof homepageImageSlots;

export function seoBlockImageSlotKey(index: number): HomepageImageSlotKey | null {
  const keys: HomepageImageSlotKey[] = ["seoBlock0", "seoBlock1", "seoBlock2"];
  return keys[index] ?? null;
}

export function cloudinaryDeliveryUrl(publicId: string): string {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "ulnb2wjo";
  return `https://res.cloudinary.com/${cloud}/image/upload/${publicId}`;
}
