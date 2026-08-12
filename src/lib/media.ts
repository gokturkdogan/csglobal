/** Site assets and verified remote fallbacks (Cloudinary Home klasörü). */
const CLOUD = "ulnb2wjo";

function homeAsset(name: string) {
  return `https://res.cloudinary.com/${CLOUD}/image/upload/Home/${name}`;
}

/**
 * Büyük PNG hero'lar Next.js image optimizer'da timeout yapabilir.
 * Cloudinary üzerinde WebP/JPEG + genişlik sınırı ile hızlı teslimat.
 */
export function optimizeCloudinaryDeliveryUrl(url: string, width = 1920): string {
  if (!url.includes("res.cloudinary.com/") || !url.includes("/upload/")) {
    return url;
  }
  const marker = "/upload/";
  const uploadIdx = url.indexOf(marker);
  const rest = url.slice(uploadIdx + marker.length);
  if (/^(f_|q_|w_|c_|g_)/.test(rest)) return url;
  return `${url.slice(0, uploadIdx + marker.length)}f_auto,q_auto,w_${width}/${rest}`;
}

export const siteImages = {
  /** Mevcut Cloudinary banner; Home/hero yüklenene kadar varsayılan */
  hero: optimizeCloudinaryDeliveryUrl(
    "https://res.cloudinary.com/ulnb2wjo/image/upload/v1786551822/banner-1.png",
  ),
  headerLogo:
    "https://res.cloudinary.com/ulnb2wjo/image/upload/v1786552142/header-logo-no-bg.png",
  about: homeAsset("about"),
  ctaBanner: homeAsset("cta-banner"),
  travel: homeAsset("seo-1"),
  /** Ülke kartı varsayılan kapak */
  countryItemCover:
    "https://res.cloudinary.com/ulnb2wjo/image/upload/v1786556725/country-item-cover.png",
  country: "https://res.cloudinary.com/ulnb2wjo/image/upload/v1786556725/country-item-cover.png",
  article:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format",
  germany:
    "https://images.unsplash.com/photo-1587330979470-3595ac045ab0?w=800&q=80&auto=format",
  france:
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80&auto=format",
  conference:
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80&auto=format",
  office: homeAsset("seo-2"),
  /** Ülkeler sayfası hero */
  countriesHero: optimizeCloudinaryDeliveryUrl(
    "https://res.cloudinary.com/ulnb2wjo/image/upload/v1786556358/countries-hero.png",
  ),
  /** Ülke detay sayfası hero */
  countryDetailHero: optimizeCloudinaryDeliveryUrl(
    "https://res.cloudinary.com/ulnb2wjo/image/upload/v1786557153/country-detail-banner.png",
  ),
  /** İletişim sayfası hero — Cloudinary Heros/contact-hero */
  contactHero: optimizeCloudinaryDeliveryUrl(
    `https://res.cloudinary.com/${CLOUD}/image/upload/Heros/contact-hero`,
  ),
} as const;
