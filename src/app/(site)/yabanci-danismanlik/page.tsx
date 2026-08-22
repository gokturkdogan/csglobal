import { ForeignConsultancyOptions } from "@/components/domain/ForeignConsultancyOptions";
import { ContactPageHero } from "@/components/domain/ContactPageHero";
import {
  getForeignConsultancyMessages,
  shouldUseForeignConsultancyStaticCopy,
} from "@/lib/i18n/foreign-consultancy";
import { getForeignConsultancyLocale } from "@/lib/i18n/foreign-consultancy/server";
import { optimizeCloudinaryDeliveryUrl, siteImages } from "@/lib/media";
import { findSitePageBySlug } from "@/lib/repositories/site.repository";
import { getSiteSettings } from "@/lib/settings";
import { buildEntityMetadata } from "@/lib/services/seo.service";
import { SeoEntityType } from "@/generated/prisma/client";

const PAGE_SLUG = "yabanci-danismanlik";
const PAGE_PATH = "/yabanci-danismanlik";

export async function generateMetadata() {
  const locale = await getForeignConsultancyLocale();
  const messages = getForeignConsultancyMessages(locale);
  const page = await findSitePageBySlug(PAGE_SLUG);

  if (shouldUseForeignConsultancyStaticCopy(locale) || !page) {
    return buildEntityMetadata({
      entityType: SeoEntityType.SITE_PAGE,
      entityId: PAGE_SLUG,
      path: PAGE_PATH,
      fallbackTitle: messages.index.title,
      fallbackDescription: messages.index.description,
    });
  }

  return buildEntityMetadata({
    entityType: SeoEntityType.SITE_PAGE,
    entityId: page.id,
    path: PAGE_PATH,
    fallbackTitle: page.title,
    fallbackDescription: page.content?.trim() || messages.index.description,
  });
}

export default async function ForeignConsultancyPage() {
  const locale = await getForeignConsultancyLocale();
  const messages = getForeignConsultancyMessages(locale);
  const page = await findSitePageBySlug(PAGE_SLUG);
  const settings = await getSiteSettings();
  const useStaticCopy = shouldUseForeignConsultancyStaticCopy(locale);

  const heroImage = settings.contactHeroImage?.trim()
    ? optimizeCloudinaryDeliveryUrl(settings.contactHeroImage.trim())
    : siteImages.countryDetailHero;

  const title = useStaticCopy ? messages.index.title : page?.title || messages.index.title;
  const content = useStaticCopy
    ? messages.index.content
    : page?.content?.trim() || messages.index.content;

  return (
    <>
      <ContactPageHero heroImage={heroImage} title={title} subtitle={content} />

      <section className="border-b border-slate-200/60 bg-white">
        <div className="site-container py-12 md:py-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
              {messages.common.selectProcess}
            </h2>
            <p className="mt-3 text-slate-600 leading-relaxed">{content}</p>
          </div>
          <div className="mt-10">
            <ForeignConsultancyOptions messages={messages} />
          </div>
        </div>
      </section>
    </>
  );
}
