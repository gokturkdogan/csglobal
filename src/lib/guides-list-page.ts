import { getSiteSettings } from "@/lib/settings";
import type { SiteSettingsMap } from "@/lib/site-settings.shared";
import { optimizeCloudinaryDeliveryUrl, siteImages } from "@/lib/media";
import { linkUrlForEditor } from "@/lib/rich-text";
import {
  findSitePageBySlug,
  findSitePageRecordBySlug,
} from "@/lib/repositories/site.repository";

export const guidesListPageSeo = {
  title: "Bloglar",
  description:
    "Vize, oturum ve göçmenlik süreçlerine dair CSGLOBAL blog yazıları ve rehber içerikler.",
};

export const BLOG_LIST_SITE_PAGE_SLUG = "bloglar";
const LEGACY_BLOG_LIST_SITE_PAGE_SLUG = "rehber";

export type GuidesListPageEditable = {
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  listIntro: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
};

export type GuidesListPageContent = GuidesListPageEditable;

const defaultEditable: GuidesListPageEditable = {
  heroBadge: "Blog",
  heroTitle: "Bloglarımız",
  heroSubtitle:
    "Vize, oturum ve göçmenlik süreçlerine dair güncel yazılar ve rehber içerikler.",
  heroImage: "",
  listIntro: "Ülke ve konu bazlı blog yazılarımızı inceleyin.",
  ctaTitle: "Ülkenize özel danışmanlık alın",
  ctaSubtitle:
    "Online başvuru veya belge yükleme yok. WhatsApp veya telefon ile doğrudan uzman ekibimize ulaşın.",
  ctaPrimaryLabel: "WhatsApp ile yazın",
  ctaSecondaryLabel: "İletişim",
  ctaSecondaryHref: "/iletisim",
};

export function defaultGuidesListPageEditable(): GuidesListPageEditable {
  return { ...defaultEditable, heroImage: "" };
}

function resolveHeroImage(url: string | undefined): string {
  const trimmed = url?.trim();
  if (trimmed) return optimizeCloudinaryDeliveryUrl(trimmed);
  return siteImages.guidesListHero;
}

export function parseGuidesListPageEditableFromSettings(
  settings: SiteSettingsMap,
): GuidesListPageEditable {
  const raw = settings.guidesListPageJson?.trim();
  if (!raw) return defaultGuidesListPageEditable();

  try {
    const parsed = JSON.parse(raw) as Partial<GuidesListPageEditable>;
    return {
      heroBadge: parsed.heroBadge?.trim() || defaultEditable.heroBadge,
      heroTitle: parsed.heroTitle?.trim() || defaultEditable.heroTitle,
      heroSubtitle: parsed.heroSubtitle?.trim() || defaultEditable.heroSubtitle,
      heroImage: parsed.heroImage?.trim() || "",
      listIntro: parsed.listIntro?.trim() || defaultEditable.listIntro,
      ctaTitle: parsed.ctaTitle?.trim() || defaultEditable.ctaTitle,
      ctaSubtitle: parsed.ctaSubtitle?.trim() || defaultEditable.ctaSubtitle,
      ctaPrimaryLabel: parsed.ctaPrimaryLabel?.trim() || defaultEditable.ctaPrimaryLabel,
      ctaSecondaryLabel:
        parsed.ctaSecondaryLabel?.trim() || defaultEditable.ctaSecondaryLabel,
      ctaSecondaryHref: linkUrlForEditor(
        parsed.ctaSecondaryHref?.trim() || defaultEditable.ctaSecondaryHref,
      ),
    };
  } catch {
    return defaultGuidesListPageEditable();
  }
}

export function serializeGuidesListPageEditable(
  editable: GuidesListPageEditable,
): string {
  return JSON.stringify(editable);
}

export function buildGuidesListPageContent(
  settings: SiteSettingsMap,
): GuidesListPageContent {
  const editable = parseGuidesListPageEditableFromSettings(settings);
  return {
    ...editable,
    heroImage: resolveHeroImage(editable.heroImage),
  };
}

export async function getGuidesListPageContent(): Promise<GuidesListPageContent> {
  const settings = await getSiteSettings();
  return buildGuidesListPageContent(settings);
}

export async function findBlogListSitePage() {
  const page = await findSitePageBySlug(BLOG_LIST_SITE_PAGE_SLUG);
  if (page) return page;
  return findSitePageBySlug(LEGACY_BLOG_LIST_SITE_PAGE_SLUG);
}

export async function findBlogListSitePageRecord() {
  const page = await findSitePageRecordBySlug(BLOG_LIST_SITE_PAGE_SLUG);
  if (page) return page;
  return findSitePageRecordBySlug(LEGACY_BLOG_LIST_SITE_PAGE_SLUG);
}
