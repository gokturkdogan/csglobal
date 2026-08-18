import { ForeignConsultancyOptions } from "@/components/domain/ForeignConsultancyOptions";
import { ContactPageHero } from "@/components/domain/ContactPageHero";
import { optimizeCloudinaryDeliveryUrl, siteImages } from "@/lib/media";
import { findSitePageBySlug } from "@/lib/repositories/site.repository";
import { getSiteSettings } from "@/lib/settings";
import { buildEntityMetadata } from "@/lib/services/seo.service";
import { SeoEntityType } from "@/generated/prisma/client";

const PAGE_SLUG = "yabanci-danismanlik";
const PAGE_PATH = "/yabanci-danismanlik";

const FALLBACK_TITLE = "Yabancı Danışmanlık";
const FALLBACK_DESCRIPTION =
  "Türkiye'de çalışma izni, oturum izni ve yabancı personel süreçleri için kurumsal danışmanlık. CSGLOBAL uzman ekibiyle doğrudan iletişim.";

const FALLBACK_CONTENT =
  "Türkiye'de yabancı personel ve ikamet süreçleriniz için danışmanlık alın. Aşağıdan oturma izni veya çalışma izni seçeneğini seçerek devam edin.";

export async function generateMetadata() {
  const page = await findSitePageBySlug(PAGE_SLUG);
  if (!page) {
    return buildEntityMetadata({
      entityType: SeoEntityType.SITE_PAGE,
      entityId: PAGE_SLUG,
      path: PAGE_PATH,
      fallbackTitle: FALLBACK_TITLE,
      fallbackDescription: FALLBACK_DESCRIPTION,
    });
  }

  return buildEntityMetadata({
    entityType: SeoEntityType.SITE_PAGE,
    entityId: page.id,
    path: PAGE_PATH,
    fallbackTitle: page.title,
    fallbackDescription: page.content?.trim() || FALLBACK_DESCRIPTION,
  });
}

export default async function ForeignConsultancyPage() {
  const page = await findSitePageBySlug(PAGE_SLUG);
  const settings = await getSiteSettings();

  const heroImage = settings.contactHeroImage?.trim()
    ? optimizeCloudinaryDeliveryUrl(settings.contactHeroImage.trim())
    : siteImages.countryDetailHero;

  const title = page?.title || FALLBACK_TITLE;
  const content = page?.content?.trim() || FALLBACK_CONTENT;

  return (
    <>
      <ContactPageHero heroImage={heroImage} title={title} subtitle={content} />

      <section className="border-b border-slate-200/60 bg-white">
        <div className="site-container py-12 md:py-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">Sürecinizi seçin</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">{content}</p>
          </div>
          <div className="mt-10">
            <ForeignConsultancyOptions />
          </div>
        </div>
      </section>
    </>
  );
}
