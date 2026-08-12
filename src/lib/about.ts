import { getSiteSettings } from "@/lib/settings";
import type { SiteSettingsMap } from "@/lib/site-settings.shared";
import { siteImages } from "@/lib/media";
import { optimizeCloudinaryDeliveryUrl } from "@/lib/media";

export const aboutPageSeo = {
  title: "Hakkımızda",
  description:
    "CSGLOBAL: vize, oturum ve göçmenlik süreçlerinde uzman danışmanlık. Vizyonumuz, misyonumuz ve neden binlerce danışanımız bizi tercih ediyor: şeffaf süreç, doğrudan uzman desteği.",
};

export type AboutValueItem = {
  title: string;
  description: string;
};

export type AboutWhyUsItem = { title: string; description: string };
export type AboutStat = { label: string; value: string };

/** Panelden düzenlenen alanlar */
export type AboutPageEditable = {
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  whoWeAreTitle: string;
  whoWeAreLead: string;
  whoWeAreParagraphs: string[];
  whoWeAreImage: string;
  visionTitle: string;
  visionText: string;
  missionTitle: string;
  missionText: string;
  valuesTitle: string;
  valuesSubtitle: string;
  valuesSectionImage: string;
  valuesItems: AboutValueItem[];
};

export type AboutPageContent = AboutPageEditable & {
  whyUs: {
    title: string;
    subtitle: string;
    items: AboutWhyUsItem[];
  };
  stats: AboutStat[];
  cta: { title: string; subtitle: string };
};

const defaultWhyUs: AboutPageContent["whyUs"] = {
  title: "Neden CSGLOBAL?",
  subtitle:
    "Vize danışmanlığında güven, şeffaflık ve uzmanlık bir arada. İşte bizi farklı kılan temel nedenler.",
  items: [
    {
      title: "Uzman danışman kadrosu",
      description:
        "Alanında deneyimli danışmanlar; ülke, vize türü ve profilinize göre kişiselleştirilmiş yol haritası.",
    },
    {
      title: "Şeffaf süreç",
      description:
        "Gizli ücret yok, belirsiz vaat yok. Süreç, belgeler ve maliyetler baştan netleştirilir.",
    },
    {
      title: "Doğrudan iletişim",
      description:
        "Online başvuru paneli veya belge yükleme zorunluluğu olmadan WhatsApp ve telefonla uzman desteği.",
    },
    {
      title: "Güncel içerik",
      description:
        "Ülke bazlı rehberler ve prosedür bilgileri düzenli güncellenir; mevzuat değişimlerine hızlı uyum.",
    },
  ],
};

const defaultStats: AboutStat[] = [
  { label: "Yıllık deneyim", value: "15+" },
  { label: "Ülke rehberi", value: "20+" },
  { label: "Vize kategorisi", value: "50+" },
  { label: "Danışan memnuniyeti", value: "%98" },
];

const defaultCta = {
  title: "Sürecinizi birlikte planlayalım",
  subtitle:
    "Hedef ülkeniz ve vize türünüz için ücretsiz ön değerlendirme. Uzman danışmanımız size uygun yol haritasını çıkarır.",
};

const defaultValuesItems: AboutValueItem[] = [
  {
    title: "Güvenilirlik",
    description:
      "Söylediğimizin arkasında dururuz; süreç ve sonuçlar gerçekçi beklentilerle yönetilir.",
  },
  {
    title: "Şeffaflık",
    description: "Ücretler, süreler ve riskler açıkça paylaşılır; sürpriz maliyet yok.",
  },
  {
    title: "Uzmanlık",
    description:
      "Ülke ve vize türü bazında derinlemesine bilgi; genel geçer tavsiyelerden kaçınırız.",
  },
  {
    title: "Erişilebilirlik",
    description:
      "WhatsApp ve telefon üzerinden hızlı yanıt; karmaşık formlarla zaman kaybetmezsiniz.",
  },
];

export const defaultAboutPageEditable: AboutPageEditable = {
  heroBadge: "Kurumsal kimlik",
  heroTitle: "Hakkımızda",
  heroSubtitle:
    "CSGLOBAL, vize ve göçmenlik danışmanlığında güvenilir, şeffaf ve insan odaklı bir yol haritası sunar. Online başvuru veya belge yükleme yok; doğrudan uzman ekibimizle ilerlersiniz.",
  heroImage: "",
  whoWeAreTitle: "Biz Kimiz?",
  whoWeAreLead:
    "Türkiye merkezli bir vize ve göçmenlik danışmanlık markası olarak, bireyler ve kurumlar için uluslararası hareketlilik süreçlerini sadeleştiriyoruz.",
  whoWeAreParagraphs: [
    "CSGLOBAL, yılların deneyimi ve güncel mevzuat takibiyle Schengen, ABD, İngiltere ve daha birçok ülke için vize, oturum ve çalışma izni süreçlerinde profesyonel rehberlik sunar.",
    "Her danışanımızın profili farklıdır; bu yüzden standart paketler yerine kişiye ve hedef ülkeye özel strateji geliştiririz. Sürecin her adımında ne yapmanız gerektiğini açıkça söyleriz; gizli maliyet veya belirsiz vaat yok.",
    "Web sitemizdeki ülke rehberleri, güncel prosedürler ve uzman yorumlarıyla bilgiyi şeffaf paylaşırız; danışmanlık ise WhatsApp ve telefon üzerinden doğrudan uzmanlarımızla devam eder.",
  ],
  whoWeAreImage: "",
  visionTitle: "Vizyonumuz",
  visionText:
    "Türkiye'den dünyaya açılan her birey ve işletmenin, vize ve göçmenlik süreçlerinde güvenilir, erişilebilir ve şeffaf danışmanlıkla yanında olmak. Karmaşık bürokrasiyi anlaşılır adımlara dönüştürerek global mobiliteyi herkes için ulaşılabir kılmak.",
  missionTitle: "Misyonumuz",
  missionText:
    "Doğru belge, doğru zamanlama ve doğru stratejiyle danışanlarımızın hedef ülkeye güvenle ulaşmasını sağlamak. Mevzuat değişikliklerini yakından takip ederek, her aşamada net iletişim ve uzman desteği sunmak.",
  valuesTitle: "Değerlerimiz",
  valuesSubtitle: "Her danışanlık sürecinde rehber aldığımız ilkeler.",
  valuesSectionImage: "",
  valuesItems: defaultValuesItems,
};

export function resolveAboutHeroImage(url: string): string {
  const trimmed = url?.trim();
  if (trimmed) return optimizeCloudinaryDeliveryUrl(trimmed);
  return siteImages.aboutHero;
}

export function resolveAboutWhoWeAreImage(url: string): string {
  const trimmed = url?.trim();
  if (trimmed) return trimmed;
  return siteImages.office;
}

export function resolveAboutValuesSectionImage(url: string): string {
  const trimmed = url?.trim();
  if (trimmed) return trimmed;
  return siteImages.conference;
}

function normalizeValuesItems(items: AboutValueItem[] | undefined): AboutValueItem[] {
  const source = items ?? [];
  return Array.from({ length: 4 }, (_, i) => {
    const item = source[i];
    const fallback = defaultValuesItems[i];
    return {
      title: item?.title?.trim() || fallback?.title || "",
      description: item?.description?.trim() || fallback?.description || "",
    };
  });
}

export function parseAboutPageEditableFromSettings(
  settings: SiteSettingsMap,
): AboutPageEditable {
  if (!settings.aboutPageJson?.trim()) {
    return { ...defaultAboutPageEditable, valuesItems: [...defaultValuesItems] };
  }

  try {
    const parsed = JSON.parse(settings.aboutPageJson) as Partial<AboutPageEditable>;
    return {
      heroBadge: parsed.heroBadge?.trim() || defaultAboutPageEditable.heroBadge,
      heroTitle: parsed.heroTitle?.trim() || defaultAboutPageEditable.heroTitle,
      heroSubtitle: parsed.heroSubtitle?.trim() || defaultAboutPageEditable.heroSubtitle,
      heroImage: parsed.heroImage?.trim() || "",
      whoWeAreTitle: parsed.whoWeAreTitle?.trim() || defaultAboutPageEditable.whoWeAreTitle,
      whoWeAreLead: parsed.whoWeAreLead?.trim() || defaultAboutPageEditable.whoWeAreLead,
      whoWeAreParagraphs:
        parsed.whoWeAreParagraphs?.filter((p) => p?.trim()) ||
        defaultAboutPageEditable.whoWeAreParagraphs,
      whoWeAreImage: parsed.whoWeAreImage?.trim() || "",
      visionTitle: parsed.visionTitle?.trim() || defaultAboutPageEditable.visionTitle,
      visionText: parsed.visionText?.trim() || defaultAboutPageEditable.visionText,
      missionTitle: parsed.missionTitle?.trim() || defaultAboutPageEditable.missionTitle,
      missionText: parsed.missionText?.trim() || defaultAboutPageEditable.missionText,
      valuesTitle: parsed.valuesTitle?.trim() || defaultAboutPageEditable.valuesTitle,
      valuesSubtitle:
        parsed.valuesSubtitle?.trim() || defaultAboutPageEditable.valuesSubtitle,
      valuesSectionImage: parsed.valuesSectionImage?.trim() || "",
      valuesItems: normalizeValuesItems(parsed.valuesItems),
    };
  } catch {
    return { ...defaultAboutPageEditable, valuesItems: [...defaultValuesItems] };
  }
}

export function buildAboutPageContent(editable: AboutPageEditable): AboutPageContent {
  return {
    ...editable,
    whyUs: defaultWhyUs,
    stats: defaultStats,
    cta: defaultCta,
  };
}

export async function getAboutPageContent(): Promise<AboutPageContent> {
  const settings = await getSiteSettings();
  const editable = parseAboutPageEditableFromSettings(settings);
  return buildAboutPageContent(editable);
}

export function serializeAboutPageEditable(editable: AboutPageEditable): string {
  return JSON.stringify({
    ...editable,
    valuesItems: normalizeValuesItems(editable.valuesItems),
  });
}

export function paragraphsToText(paragraphs: string[]): string {
  return paragraphs.join("\n\n");
}

export function textToParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}
