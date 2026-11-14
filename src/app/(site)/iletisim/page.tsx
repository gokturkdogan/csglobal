import { notFound } from "next/navigation";
import { ContactPageHero } from "@/components/domain/ContactPageHero";
import {
  ContactInfoCards,
  ContactWhatsAppBanner,
} from "@/components/domain/ContactPageContent";
import { ContactMapSection } from "@/components/domain/ContactMapSection";
import { optimizeCloudinaryDeliveryUrl, siteImages } from "@/lib/media";
import { findSitePageBySlug } from "@/lib/repositories/site.repository";
import { getSiteSettings } from "@/lib/settings";
import { buildEntityMetadata } from "@/lib/services/seo.service";
import { SeoEntityType } from "@/generated/prisma/client";
import { STATIC_PAGE_SEO } from "@/lib/static-page-seo";

export async function generateMetadata() {
  const page = await findSitePageBySlug("iletisim");
  if (!page) return {};
  return buildEntityMetadata({
    entityType: SeoEntityType.SITE_PAGE,
    entityId: page.id,
    path: "/iletisim",
    fallbackTitle: STATIC_PAGE_SEO.iletisim.title,
    fallbackDescription: STATIC_PAGE_SEO.iletisim.description,
  });
}

export default async function ContactPage() {
  const page = await findSitePageBySlug("iletisim");
  if (!page) notFound();

  const settings = await getSiteSettings();

  const heroImage = settings.contactHeroImage?.trim()
    ? optimizeCloudinaryDeliveryUrl(settings.contactHeroImage.trim())
    : siteImages.contactHero;

  const mapEmbedUrl = settings.contactMapEmbedUrl?.trim() || undefined;
  const addressLabel = settings.address?.trim() || undefined;

  return (
    <>
      <ContactPageHero
        heroImage={heroImage}
        title={page.title}
        subtitle={page.content}
      />

      <div className="contact-page-main border-b border-slate-200/60">
        <div className="site-container py-10 md:py-14">
          <ContactWhatsAppBanner settings={settings} />

          <div className="mt-10 md:mt-12">
            <div className="mb-6 md:mb-8">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                Diğer iletişim kanalları
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
                Telefon, e-posta veya WhatsApp üzerinden bize ulaşabilirsiniz.
              </p>
            </div>
            <ContactInfoCards settings={settings} includeWhatsApp />
          </div>

          <ContactMapSection embedUrl={mapEmbedUrl} addressLabel={addressLabel} />
        </div>
      </div>
    </>
  );
}
