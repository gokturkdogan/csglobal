import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ContactCTA } from "@/components/domain/ContactCTA";
import { ContactMapSection } from "@/components/domain/ContactMapSection";
import { ConsulateDetailContent } from "@/components/domain/ConsulateDetailContent";
import { ConsulatePageHero } from "@/components/domain/ConsulatePageHero";
import { ServiceTableOfContents } from "@/components/domain/ServiceTableOfContents";
import {
  buildConsulatePath,
} from "@/lib/paths";
import { getGuideSectionNavItems } from "@/lib/guide";
import {
  findConsulateByCountryAndSlug,
} from "@/lib/repositories/consulate.repository";
import { getSiteSettings } from "@/lib/settings";
import { buildEntityMetadata } from "@/lib/services/seo.service";
import { resolveConsulatePageHeroImage } from "@/lib/country-item-image";
import { SeoEntityType } from "@/generated/prisma/client";

type Props = {
  params: Promise<{ countrySlug: string; consulateSlug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { countrySlug, consulateSlug } = await params;
  const consulate = await findConsulateByCountryAndSlug(
    countrySlug,
    consulateSlug,
  );
  if (!consulate) return {};

  return buildEntityMetadata({
    entityType: SeoEntityType.CONSULATE,
    entityId: consulate.id,
    path: buildConsulatePath(countrySlug, consulateSlug),
    fallbackTitle: consulate.name,
    fallbackDescription: consulate.mapAddress ?? undefined,
  });
}

export default async function ConsulateDetailPage({ params }: Props) {
  const { countrySlug, consulateSlug } = await params;
  const consulate = await findConsulateByCountryAndSlug(
    countrySlug,
    consulateSlug,
  );
  if (!consulate) notFound();

  const settings = await getSiteSettings();
  const heroTitle = consulate.heroTitle?.trim() || consulate.name;
  const mapEmbedUrl = consulate.mapEmbedUrl?.trim();
  const mapAddress = consulate.mapAddress?.trim();
  const sectionNav = getGuideSectionNavItems(consulate.sectionsJson);
  const showSidebar = sectionNav.length > 0;

  return (
    <>
      <ConsulatePageHero
        heroImage={resolveConsulatePageHeroImage(consulate.country.heroImage)}
        title={heroTitle}
        badge={consulate.country.name}
      />

      <div className="site-container py-10 md:py-14">
        <Breadcrumb
          items={[
            { label: "Anasayfa", href: "/" },
            { label: consulate.country.name, href: `/${consulate.country.slug}` },
            { label: consulate.name },
          ]}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_280px] lg:items-start">
          <div className="min-w-0">
            <ConsulateDetailContent sectionsJson={consulate.sectionsJson} />

            {mapEmbedUrl && (
              <ContactMapSection
                embedUrl={mapEmbedUrl}
                title="Konum"
                description=""
                addressLabel={mapAddress || consulate.name}
              />
            )}

            {!mapEmbedUrl && mapAddress && (
              <section className="mt-10 md:mt-12">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                  Konum
                </h2>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  {mapAddress}
                </p>
              </section>
            )}

            <div className="mt-12">
              <ContactCTA
                settings={settings}
                context={`${consulate.country.name} konsolosluk danışmanlığı`}
                title={`${consulate.name} için uzman danışmanlık`}
                subtitle="Online başvuru veya belge yükleme yok. WhatsApp veya telefon ile doğrudan uzman ekibimize ulaşın."
                variant="country"
              />
            </div>
          </div>

          {showSidebar && (
            <aside
              className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100dvh-var(--site-header-height)-2rem)]"
            >
              <ServiceTableOfContents items={sectionNav} />
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
