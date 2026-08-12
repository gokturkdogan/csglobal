import { siteImages } from "@/lib/media";
import type { SiteSettingsMap } from "@/lib/site-settings.shared";

export type HomeStat = { label: string; value: string };
export type HomeWhyUsItem = { title: string; description: string };
export type HomeProcessStep = { step: string; title: string; description: string };
export type HomeSeoBlock = {
  title: string;
  content: string;
  image?: string;
  linkHref?: string;
  linkLabel?: string;
};
export type HomeServiceArea = {
  title: string;
  description: string;
  href: string;
};

export type HomepageContent = {
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  aboutTitle: string;
  aboutText: string;
  aboutImage: string;
  stats: HomeStat[];
  whyUsTitle: string;
  whyUsItems: HomeWhyUsItem[];
  processTitle: string;
  processSteps: HomeProcessStep[];
  servicesTitle: string;
  servicesSubtitle: string;
  countriesTitle: string;
  articlesTitle: string;
  ctaBannerTitle: string;
  ctaBannerSubtitle: string;
  ctaBannerImage: string;
  seoTitle: string;
  seoDescription: string;
  seoIntroTitle: string;
  seoIntroParagraphs: string[];
  seoBlocksTitle: string;
  seoBlocks: HomeSeoBlock[];
  serviceAreasTitle: string;
  serviceAreasSubtitle: string;
  serviceAreas: HomeServiceArea[];
  faqTitle: string;
  faqSubtitle: string;
};

const defaultWhyUs: HomeWhyUsItem[] = [
  {
    title: "Uzman danışmanlık",
    description: "Her ülke ve hizmet için güncel, doğrulanmış bilgi ve süreç desteği.",
  },
  {
    title: "Şeffaf süreç",
    description: "Evrak, ücret ve süre bilgileri net; gizli maliyet yok.",
  },
  {
    title: "Hızlı iletişim",
    description: "WhatsApp ve telefon ile doğrudan uzman ekibe ulaşın.",
  },
  {
    title: "Güvenilir kaynak",
    description: "İçerikler admin panelden yönetilir; her ülke için özel yapı.",
  },
];

const defaultProcess: HomeProcessStep[] = [
  {
    step: "01",
    title: "Hizmeti seçin",
    description: "Ülke ve vize türünü inceleyin; gereksinimleri okuyun.",
  },
  {
    step: "02",
    title: "Danışmanlık alın",
    description: "WhatsApp veya telefon ile uzmanımızla görüşün.",
  },
  {
    step: "03",
    title: "Evrakları hazırlayın",
    description: "Listelenen belgeleri eksiksiz toplayın.",
  },
  {
    step: "04",
    title: "Başvurunuzu tamamlayın",
    description: "Randevu ve başvuru adımlarında yanınızdayız.",
  },
];

const defaultStats: HomeStat[] = [
  { label: "Ülke", value: "20+" },
  { label: "Hizmet", value: "100+" },
  { label: "Deneyim", value: "15 yıl" },
  { label: "Memnuniyet", value: "98%" },
];

const defaultSeoIntroParagraphs = [
  "CSGLOBAL, vize, oturum izni, çalışma izni ve vatandaşlık süreçlerinde kurumsal danışmanlık sunar. Her ülkenin farklı başvuru kuralları, evrak listeleri ve ücret yapıları tek bir çatı altında, güncel ve şeffaf biçimde paylaşılır.",
  "Schengen ülkeleri, ABD, İngiltere, Kanada ve daha birçok destinasyon için turistik vize, ticari vize, öğrenci oturumu, aile birleşimi ve nitelikli çalışan programları hakkında detaylı rehberler sunuyoruz. Online başvuru veya belge yükleme yok; sürecinizi uzman danışmanlarımızla WhatsApp ve telefon üzerinden yönetirsiniz.",
];

const defaultSeoBlocks: HomeSeoBlock[] = [
  {
    title: "Schengen ve kısa süreli vizeler",
    content:
      "Turistik, ticari, transit ve aile ziyareti vizeleri için ülkeye özel evrak listeleri, konsolosluk ücretleri ve ortalama sonuçlanma süreleri. Almanya, Fransa, İtalya ve tüm Schengen bölgesi için güncel bilgiler.",
    image: siteImages.travel,
    linkHref: "/ulkeler",
    linkLabel: "Vize hizmetlerini incele",
  },
  {
    title: "Oturum ve çalışma izni",
    content:
      "Uzun süreli oturum, aile birleşimi, öğrenci oturumu, mavi kart ve nitelikli çalışan programları. Her ülkenin farklı kategori yapısı dinamik olarak yönetilir; boş veya kapalı kategoriler sitede gösterilmez.",
    image: siteImages.office,
    linkHref: "/ulkeler",
    linkLabel: "Oturum ve çalışma izinleri",
  },
  {
    title: "Vatandaşlık ve uzun vadeli planlama",
    content:
      "Vatandaşlık başvurusu, çifte vatandaşlık ve uzun vadeli göçmenlik planları için ülke bazlı rehberler. Süreç, şartlar ve gerekli belgeler admin panelden güncellenir.",
    image: siteImages.ctaBanner,
    linkHref: "/rehber",
    linkLabel: "Rehber yazılarını oku",
  },
];

const defaultServiceAreas: HomeServiceArea[] = [
  {
    title: "Vizeler",
    description: "Turistik, ticari, transit ve özel amaçlı kısa süreli vizeler.",
    href: "/ulkeler",
  },
  {
    title: "Oturma izni",
    description: "Aile birleşimi, öğrenci oturumu ve uzun süreli ikamet.",
    href: "/ulkeler",
  },
  {
    title: "Çalışma izni",
    description: "Mavi kart, nitelikli çalışan ve iş arama izinleri.",
    href: "/ulkeler",
  },
  {
    title: "Vatandaşlık",
    description: "Vatandaşlık başvurusu ve çifte vatandaşlık süreçleri.",
    href: "/ulkeler",
  },
];

function parseJson<T>(raw: string | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function resolveHeroImage(url: string | undefined): string {
  const trimmed = url?.trim();
  if (!trimmed) return siteImages.hero;
  if (trimmed.includes("/images/hero-banner")) return siteImages.hero;
  if (trimmed.includes("images.unsplash.com")) return siteImages.hero;
  // Home/hero henüz yüklenmemiş olabilir — kırık URL yerine bilinen banner
  if (/\/Home\/hero(\.[a-z]+)?$/i.test(trimmed) && !trimmed.includes("/v")) {
    return siteImages.hero;
  }
  const legacyIds = [
    "photo-1436491865332",
    "photo-1521737711862",
    "photo-1540962351504",
  ];
  if (legacyIds.some((id) => trimmed.includes(id))) return siteImages.hero;
  return trimmed;
}

export function buildHomepageContent(settings: SiteSettingsMap): HomepageContent {
  return {
    heroBadge: settings.homeHeroBadge || "Kurumsal vize danışmanlığı",
    heroTitle:
      settings.homeHeroTitle || "Vize ve göçmenlik süreçlerinizi güvenle yönetin",
    heroSubtitle:
      settings.homeHeroSubtitle ||
      "Ülke bazlı vize, oturum, çalışma izni ve vatandaşlık bilgileri. Uzman danışmanlık için doğrudan iletişim.",
    heroImage: resolveHeroImage(settings.homeHeroImage),
    heroCtaPrimary: settings.homeHeroCtaPrimary || "Ülkeleri incele",
    heroCtaSecondary: settings.homeHeroCtaSecondary || "Danışmanlık al",
    aboutTitle: settings.homeAboutTitle || "CSGLOBAL ile güvenilir göçmenlik danışmanlığı",
    aboutText:
      settings.homeAboutText ||
      "CSGLOBAL, vize ve göçmenlik süreçlerinde kurumsal danışmanlık sunar. Her ülkenin farklı kategori yapısı dinamik olarak yönetilir; evrak, ücret ve süre bilgileri şeffaf şekilde paylaşılır.",
    aboutImage: settings.homeAboutImage || siteImages.about,
    stats: parseJson(settings.homeStatsJson, defaultStats),
    whyUsTitle: settings.homeWhyUsTitle || "Neden CSGLOBAL?",
    whyUsItems: parseJson(settings.homeWhyUsJson, defaultWhyUs),
    processTitle: settings.homeProcessTitle || "Nasıl çalışır?",
    processSteps: parseJson(settings.homeProcessJson, defaultProcess),
    servicesTitle: settings.homeServicesTitle || "Öne çıkan hizmetler",
    servicesSubtitle:
      settings.homeServicesSubtitle ||
      "En çok talep edilen vize ve oturum hizmetleri. Masaüstünde 6 hizmet görünür; fazlası için okları kullanın.",
    countriesTitle: settings.homeCountriesTitle || "Popüler ülkeler",
    articlesTitle: settings.homeArticlesTitle || "Son rehberler",
    ctaBannerTitle:
      settings.homeCtaBannerTitle || "Sürecinizi birlikte planlayalım",
    ctaBannerSubtitle:
      settings.homeCtaBannerSubtitle ||
      "Online başvuru yok — uzman danışmanımızla doğrudan iletişime geçin.",
    ctaBannerImage: settings.homeCtaBannerImage || siteImages.ctaBanner,
    seoTitle: settings.homeSeoTitle || "",
    seoDescription:
      settings.homeSeoDescription ||
      "Vize, oturum izni, çalışma izni ve vatandaşlık danışmanlığı. Ülke bazlı güncel evrak, ücret ve süre bilgileri. CSGLOBAL ile güvenilir göçmenlik rehberi.",
    seoIntroTitle:
      settings.homeSeoIntroTitle ||
      "Türkiye’den dünyaya: vize ve göçmenlik bilgi platformu",
    seoIntroParagraphs: parseJson(
      settings.homeSeoIntroJson,
      defaultSeoIntroParagraphs,
    ),
    seoBlocksTitle: settings.homeSeoBlocksTitle || "Hizmet alanlarımız",
    seoBlocks: parseJson(settings.homeSeoBlocksJson, defaultSeoBlocks),
    serviceAreasTitle:
      settings.homeServiceAreasTitle || "Vize ve göçmenlik hizmet grupları",
    serviceAreasSubtitle:
      settings.homeServiceAreasSubtitle ||
      "İhtiyacınıza uygun kategoriyi seçin; ülke sayfasında detaylı evrak ve ücret bilgilerine ulaşın.",
    serviceAreas: parseJson(settings.homeServiceAreasJson, defaultServiceAreas),
    faqTitle: settings.homeFaqTitle || "Sık sorulan sorular",
    faqSubtitle:
      settings.homeFaqSubtitle ||
      "Vize ve danışmanlık süreci hakkında en çok sorulan konular.",
  };
}

/** Admin görsel düzenleyici → site_settings kayıtları */
export function serializeHomepageToSettings(content: HomepageContent): Record<string, string> {
  return {
    homeHeroBadge: content.heroBadge,
    homeHeroTitle: content.heroTitle,
    homeHeroSubtitle: content.heroSubtitle,
    homeHeroImage: content.heroImage,
    homeHeroCtaPrimary: content.heroCtaPrimary,
    homeHeroCtaSecondary: content.heroCtaSecondary,
    homeAboutTitle: content.aboutTitle,
    homeAboutText: content.aboutText,
    homeAboutImage: content.aboutImage,
    homeStatsJson: JSON.stringify(content.stats),
    homeWhyUsTitle: content.whyUsTitle,
    homeWhyUsJson: JSON.stringify(content.whyUsItems),
    homeProcessTitle: content.processTitle,
    homeProcessJson: JSON.stringify(content.processSteps),
    homeServicesTitle: content.servicesTitle,
    homeServicesSubtitle: content.servicesSubtitle,
    homeCountriesTitle: content.countriesTitle,
    homeArticlesTitle: content.articlesTitle,
    homeCtaBannerTitle: content.ctaBannerTitle,
    homeCtaBannerSubtitle: content.ctaBannerSubtitle,
    homeCtaBannerImage: content.ctaBannerImage,
    homeSeoTitle: content.seoTitle,
    homeSeoDescription: content.seoDescription,
    homeSeoIntroTitle: content.seoIntroTitle,
    homeSeoIntroJson: JSON.stringify(content.seoIntroParagraphs),
    homeSeoBlocksTitle: content.seoBlocksTitle,
    homeSeoBlocksJson: JSON.stringify(content.seoBlocks),
    homeServiceAreasTitle: content.serviceAreasTitle,
    homeServiceAreasSubtitle: content.serviceAreasSubtitle,
    homeServiceAreasJson: JSON.stringify(content.serviceAreas),
    homeFaqTitle: content.faqTitle,
    homeFaqSubtitle: content.faqSubtitle,
  };
}
