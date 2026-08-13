import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ContactCTA } from "@/components/domain/ContactCTA";
import { ServiceCard } from "@/components/domain/ServiceCard";
import { DocumentList } from "@/components/domain/DocumentList";
import { FeeTable } from "@/components/domain/FeeTable";
import { FaqAccordion } from "@/components/domain/FaqAccordion";
import { ServiceDetailContent } from "@/components/domain/ServiceDetailContent";
import { ServiceTableOfContents } from "@/components/domain/ServiceTableOfContents";
import { ServicePageHero } from "@/components/domain/ServicePageHero";
import { CountryCategoryPanel } from "@/components/country/CountryCategoryPanel";
import { getServiceSectionNavItems } from "@/lib/service-page";
import {
  filterPopulatedCountryCategories,
  mapCategoriesForCountryPanel,
} from "@/lib/country-page/category-panel";
import { findCategoriesWithCountryServices } from "@/lib/repositories/category.repository";
import { getSiteSettings } from "@/lib/settings";
import {
  resolveCountryPath,
  loadCategoryPageData,
  buildCategoryPath,
  buildServicePath,
} from "@/lib/services/path-resolver.service";
import { findPublishedArticlesByServiceId } from "@/lib/repositories/article.repository";
import { findServiceByCountrySlug } from "@/lib/repositories/service.repository";
import { RelatedGuidesSection } from "@/components/domain/RelatedGuidesSection";
import { findCountryBySlug } from "@/lib/repositories/country.repository";
import {
  buildEntityMetadata,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  siteUrl,
} from "@/lib/services/seo.service";
import { SeoEntityType } from "@/generated/prisma/client";

type Props = { params: Promise<{ countrySlug: string; path: string[] }> };

export async function generateMetadata({ params }: Props) {
  const { countrySlug, path } = await params;
  const resolved = await resolveCountryPath(countrySlug, path);
  if (resolved.type === "not_found") return {};

  if (resolved.type === "service") {
    const country = await findCountryBySlug(countrySlug);
    if (!country) return {};
    const service = await findServiceByCountrySlug(country.id, resolved.serviceSlug);
    if (!service) return {};
    return buildEntityMetadata({
      entityType: SeoEntityType.SERVICE,
      entityId: service.id,
      path: buildServicePath(countrySlug, service.slug),
      fallbackTitle: service.name,
      fallbackDescription: service.shortDescription ?? undefined,
    });
  }

  const data = await loadCategoryPageData(countrySlug, path);
  if (!data) return {};
  return buildEntityMetadata({
    entityType: SeoEntityType.CATEGORY,
    entityId: data.category.id,
    path: buildCategoryPath(countrySlug, [data.category.slug]),
    fallbackTitle: data.category.name,
    fallbackDescription: data.category.shortDescription ?? undefined,
  });
}

export default async function CountryPathPage({ params }: Props) {
  const { countrySlug, path } = await params;
  const resolved = await resolveCountryPath(countrySlug, path);
  const settings = await getSiteSettings();

  if (resolved.type === "not_found") notFound();

  if (resolved.type === "service") {
    const country = await findCountryBySlug(countrySlug);
    if (!country) notFound();
    const service = await findServiceByCountrySlug(country.id, resolved.serviceSlug);
    if (!service) notFound();

    const relatedGuides = await findPublishedArticlesByServiceId(service.id);

    const minFee = service.fees.length
      ? service.fees.reduce((min, f) =>
          Number(f.amount) < Number(min.amount) ? f : min,
        service.fees[0])
      : null;

    const generalDocs = service.serviceDocuments.filter((d) => !d.applicantProfileId);
    const profileDocs = service.serviceDocuments.filter((d) => d.applicantProfileId);

    const breadcrumbItems = [
      { label: "Anasayfa", href: "/" },
      { label: country.name, href: `/${countrySlug}` },
      { label: service.name },
    ];

    const jsonLd = [
      buildBreadcrumbJsonLd(
        breadcrumbItems.map((b) => ({
          name: b.label,
          url: b.href ? `${siteUrl}${b.href}` : `${siteUrl}/${countrySlug}/${service.slug}`,
        })),
      ),
      buildFaqJsonLd(service.faqs),
    ].filter(Boolean);

    const heroTitle = service.heroTitle?.trim() || service.name;
    const heroSubtitle =
      service.heroSubtitle?.trim() || service.shortDescription;

    const sectionNav = getServiceSectionNavItems(
      service.sectionsJson,
      service.sections,
    );

    const countryCategories = await findCategoriesWithCountryServices(country.id);
    const panelCategories = filterPopulatedCountryCategories(
      mapCategoriesForCountryPanel(countryCategories),
    );

    const showSidebar = sectionNav.length > 0 || panelCategories.length > 0;

    return (
      <>
        <ServicePageHero
          heroImage={service.heroImage}
          title={heroTitle}
          subtitle={heroSubtitle}
          badge={service.category.name}
          quickInfo={{
            processingTime: service.processingTime,
            requiresAppointment: service.requiresAppointment,
            feeAmount: minFee?.amount.toString(),
            feeCurrency: minFee?.currency,
          }}
        />

        <div className="site-container py-10">
          {jsonLd.map((ld, i) => (
            <script
              key={i}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
            />
          ))}

          <Breadcrumb items={breadcrumbItems} />

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_280px] lg:items-start">
            <div>
              <ServiceDetailContent
                sectionsJson={service.sectionsJson}
                legacySections={service.sections}
                featureImage1={service.featureImage1}
                featureImage1Title={service.featureImage1Title}
                featureImage1Text={service.featureImage1Text}
                featureImage2={service.featureImage2}
                featureImage2Title={service.featureImage2Title}
                featureImage2Text={service.featureImage2Text}
              />

              {generalDocs.length > 0 && (
                <section className="mt-12">
                  <h2 className="text-xl font-semibold text-slate-900">Gerekli evraklar</h2>
                  <div className="mt-4">
                    <DocumentList documents={generalDocs} />
                  </div>
                </section>
              )}

              {profileDocs.length > 0 && (
                <section className="mt-8">
                  <DocumentList documents={profileDocs} title="Profil bazlı evraklar" />
                </section>
              )}

              {service.fees.length > 0 && (
                <section className="mt-12">
                  <h2 className="text-xl font-semibold text-slate-900">Ücretler</h2>
                  <div className="mt-4">
                    <FeeTable fees={service.fees} />
                  </div>
                </section>
              )}

              {service.faqs.length > 0 && (
                <section className="mt-12">
                  <h2 className="text-xl font-semibold text-slate-900">Sık sorulan sorular</h2>
                  <div className="mt-4">
                    <FaqAccordion items={service.faqs} />
                  </div>
                </section>
              )}

              <RelatedGuidesSection guides={relatedGuides} />

              <div className="mt-12">
                <ContactCTA
                  settings={settings}
                  context={`${country.name} - ${service.name}`}
                  title={`${service.name} için uzman danışmanlık`}
                  subtitle="Online başvuru veya belge yükleme yok. WhatsApp veya telefon ile doğrudan uzman ekibimize ulaşın."
                  variant="country"
                />
              </div>
            </div>

            {showSidebar && (
              <aside
                className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100dvh-var(--site-header-height)-2rem)]"
              >
                {sectionNav.length > 0 && (
                  <ServiceTableOfContents items={sectionNav} />
                )}
                {panelCategories.length > 0 && (
                  <div className="service-sidebar-panel min-h-0 flex-1">
                    <CountryCategoryPanel
                      countrySlug={countrySlug}
                      categories={panelCategories}
                    />
                  </div>
                )}
              </aside>
            )}
          </div>
        </div>
      </>
    );
  }

  const data = await loadCategoryPageData(countrySlug, path);
  if (!data) notFound();

  const breadcrumbItems = [
    { label: "Anasayfa", href: "/" },
    { label: data.country.name, href: `/${countrySlug}` },
    { label: data.category.name },
  ];

  return (
    <div className="site-container py-10">
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
        {data.category.name}
      </h1>
      {data.category.shortDescription && (
        <p className="mt-3 text-slate-600">{data.category.shortDescription}</p>
      )}

      {data.services.length > 0 ? (
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {data.services.map((s) => (
            <ServiceCard
              key={s.id}
              name={s.name}
              slug={s.slug}
              countrySlug={countrySlug}
              shortDescription={s.shortDescription}
              processingTime={s.processingTime}
            />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-sm text-slate-500">
          Bu kategoride {data.country.name} için henüz hizmet eklenmemiş.
        </p>
      )}

      <div className="mt-12">
        <ContactCTA settings={settings} context={data.category.name} />
      </div>
    </div>
  );
}
