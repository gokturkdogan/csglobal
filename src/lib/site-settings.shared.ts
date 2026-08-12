export type SiteSettingsMap = {
  siteName: string;
  siteDescription: string;
  whatsappNumber: string;
  whatsappMessage: string;
  contactPhone: string;
  contactEmail: string;
  address: string;
  contactHeroImage: string;
  contactMapEmbedUrl: string;
  aboutPageJson: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  headerLogoUrl: string;
  homeHeroBadge: string;
  homeHeroTitle: string;
  homeHeroSubtitle: string;
  homeHeroImage: string;
  homeHeroCtaPrimary: string;
  homeHeroCtaSecondary: string;
  homeAboutTitle: string;
  homeAboutText: string;
  homeAboutImage: string;
  homeStatsJson: string;
  homeWhyUsTitle: string;
  homeWhyUsJson: string;
  homeProcessTitle: string;
  homeProcessJson: string;
  homeServicesTitle: string;
  homeServicesSubtitle: string;
  homeCountriesTitle: string;
  homeArticlesTitle: string;
  homeCtaBannerTitle: string;
  homeCtaBannerSubtitle: string;
  homeCtaBannerImage: string;
  homeSeoTitle: string;
  homeSeoDescription: string;
  homeSeoIntroTitle: string;
  homeSeoIntroJson: string;
  homeSeoBlocksTitle: string;
  homeSeoBlocksJson: string;
  homeServiceAreasTitle: string;
  homeServiceAreasSubtitle: string;
  homeServiceAreasJson: string;
  homeFaqTitle: string;
  homeFaqSubtitle: string;
  homeFaqJson: string;
};

export const defaultSiteSettings: SiteSettingsMap = {
  siteName: "CSGLOBAL",
  siteDescription:
    "Vize, oturum ve pasaport işlemleri için profesyonel danışmanlık hizmeti.",
  whatsappNumber: "902129635014",
  whatsappMessage:
    "Merhaba, CSGLOBAL web sitesinden ulaşıyorum. Vize işlemlerim konusunda profesyonel destek almak istiyorum.",
  contactPhone: "+90 212 963 03 43",
  contactEmail: "info@csglobal.com",
  address: "İstanbul, Türkiye",
  contactHeroImage: "",
  contactMapEmbedUrl: "",
  aboutPageJson: "",
  facebookUrl: "",
  instagramUrl: "",
  twitterUrl: "",
  headerLogoUrl: "",
  homeHeroBadge: "",
  homeHeroTitle: "",
  homeHeroSubtitle: "",
  homeHeroImage: "",
  homeHeroCtaPrimary: "",
  homeHeroCtaSecondary: "",
  homeAboutTitle: "",
  homeAboutText: "",
  homeAboutImage: "",
  homeStatsJson: "",
  homeWhyUsJson: "",
  homeWhyUsTitle: "",
  homeProcessTitle: "",
  homeProcessJson: "",
  homeServicesTitle: "",
  homeServicesSubtitle: "",
  homeCountriesTitle: "",
  homeArticlesTitle: "",
  homeCtaBannerTitle: "",
  homeCtaBannerSubtitle: "",
  homeCtaBannerImage: "",
  homeSeoTitle: "",
  homeSeoDescription: "",
  homeSeoIntroTitle: "",
  homeSeoIntroJson: "",
  homeSeoBlocksTitle: "",
  homeSeoBlocksJson: "",
  homeServiceAreasTitle: "",
  homeServiceAreasSubtitle: "",
  homeServiceAreasJson: "",
  homeFaqTitle: "",
  homeFaqSubtitle: "",
  homeFaqJson: "",
};

export function buildWhatsAppUrl(number: string, message: string): string {
  const clean = number.replace(/\D/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}
