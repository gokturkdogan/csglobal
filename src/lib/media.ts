/** Site assets and verified remote fallbacks (Cloudinary Home klasörü). */
const CLOUD = "ulnb2wjo";

function homeAsset(name: string) {
  return `https://res.cloudinary.com/${CLOUD}/image/upload/Home/${name}`;
}

export const siteImages = {
  /** Mevcut Cloudinary banner; Home/hero yüklenene kadar varsayılan */
  hero: "https://res.cloudinary.com/ulnb2wjo/image/upload/v1786551822/banner-1.png",
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
  countriesHero:
    "https://res.cloudinary.com/ulnb2wjo/image/upload/v1786556358/countries-hero.png",
  /** Ülke detay sayfası hero */
  countryDetailHero:
    "https://res.cloudinary.com/ulnb2wjo/image/upload/v1786557153/country-detail-banner.png",
} as const;
