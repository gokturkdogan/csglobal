/** Site assets and verified remote fallbacks (Cloudinary Home klasörü). */
const CLOUD = "ulnb2wjo";

function homeAsset(name: string, width = 1200) {
  return optimizeCloudinaryDeliveryUrl(
    `https://res.cloudinary.com/${CLOUD}/image/upload/Home/${name}`,
    width,
  );
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

/** Favicon gibi PNG gerektiren uçlar için (WebP ImageResponse ile uyumsuz). */
export function optimizeCloudinaryPngUrl(url: string, width: number): string {
  if (!url.includes("res.cloudinary.com/") || !url.includes("/upload/")) {
    return url;
  }
  const marker = "/upload/";
  const uploadIdx = url.indexOf(marker);
  const rest = url.slice(uploadIdx + marker.length);
  if (/^(f_|q_|w_|c_|g_)/.test(rest)) return url;
  return `${url.slice(0, uploadIdx + marker.length)}f_png,q_auto,w_${width}/${rest}`;
}

export const siteImages = {
  /** Mevcut Cloudinary banner; Home/hero yüklenene kadar varsayılan */
  hero: optimizeCloudinaryDeliveryUrl(
    "https://res.cloudinary.com/ulnb2wjo/image/upload/v1786551822/banner-1.png",
    2560,
  ),
  headerLogo: optimizeCloudinaryDeliveryUrl(
    "https://res.cloudinary.com/ulnb2wjo/image/upload/v1786552142/header-logo-no-bg.png",
    512,
  ),
  about: homeAsset("about"),
  ctaBanner: homeAsset("cta-banner"),
  travel: homeAsset("seo-1"),
  /** Ülke kartı varsayılan kapak */
  countryItemCover: optimizeCloudinaryDeliveryUrl(
    "https://res.cloudinary.com/ulnb2wjo/image/upload/v1786556725/country-item-cover.png",
    800,
  ),
  country: optimizeCloudinaryDeliveryUrl(
    "https://res.cloudinary.com/ulnb2wjo/image/upload/v1786556725/country-item-cover.png",
    800,
  ),
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
  /** İletişim sayfası hero: Cloudinary Heros/contact-hero */
  contactHero: optimizeCloudinaryDeliveryUrl(
    `https://res.cloudinary.com/${CLOUD}/image/upload/Heros/contact-hero`,
  ),
  /** Hakkımızda hero: Heros/about-hero */
  aboutHero: optimizeCloudinaryDeliveryUrl(
    `https://res.cloudinary.com/${CLOUD}/image/upload/Heros/about-hero`,
  ),
  aboutWhoWeAre: optimizeCloudinaryDeliveryUrl(
    `https://res.cloudinary.com/${CLOUD}/image/upload/About/who-we-are`,
    1200,
  ),
  aboutValuesSection: optimizeCloudinaryDeliveryUrl(
    `https://res.cloudinary.com/${CLOUD}/image/upload/About/values-section`,
    1200,
  ),
  /** Rehber liste sayfası hero: Guides/list-hero */
  guidesListHero: optimizeCloudinaryDeliveryUrl(
    `https://res.cloudinary.com/${CLOUD}/image/upload/Guides/list-hero`,
  ),
  /** Ülkesi olmayan blog kartları kapak görseli */
  blogCardDefault: "/images/hero-banner.png",
} as const;
