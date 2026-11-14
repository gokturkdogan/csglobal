import type { SiteSettingsMap } from "@/lib/site-settings.shared";
import { normalizeLinkUrl } from "@/lib/rich-text";

export const DEFAULT_FIXED_ABOUT_TITLE = "İsmail Yılmaz";

export const DEFAULT_FIXED_ABOUT_TEXT =
  "Çankaya Üniversitesi İktisadi ve İdari Bilimler Fakültesi'nde %100 İngilizce eğitim alarak lisans eğitimini %75 burs ile tamamlamıştır. Hâlihazırda kurucusu olduğu Çankaya Danışmanlık ve Global Consultancy Solutions bünyesinde alanında uzman ekibiyle birlikte faaliyet göstermektedir. Türkiye'de yaşamak isteyen yabancıların oturma ve çalışma izni başvuru süreçlerini vb. aynı zamanda Türk vatandaşlarının yurt dışı vize başvuru süreçlerini profesyonel bir biçimde yönetmektedir.";

export type FixedAboutContent = {
  title: string;
  text: string;
  imageUrl: string;
  linkedInUrl: string;
};

export function resolveFixedAbout(
  settings: Pick<
    SiteSettingsMap,
    "fixedAboutTitle" | "fixedAboutText" | "fixedAboutImage" | "fixedAboutLinkedInUrl"
  >,
): FixedAboutContent {
  return {
    title: settings.fixedAboutTitle?.trim() || DEFAULT_FIXED_ABOUT_TITLE,
    text: settings.fixedAboutText?.trim() || DEFAULT_FIXED_ABOUT_TEXT,
    imageUrl: settings.fixedAboutImage?.trim() ?? "",
    linkedInUrl: normalizeLinkUrl(settings.fixedAboutLinkedInUrl?.trim() ?? "") ?? "",
  };
}

export function shouldShowFixedAbout(content: FixedAboutContent): boolean {
  return Boolean(content.title.trim() || content.text.trim() || content.imageUrl);
}