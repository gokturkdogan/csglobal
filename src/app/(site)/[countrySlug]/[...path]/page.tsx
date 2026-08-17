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
import { loadCountryCategoryPanelData } from "@/lib/country-page/load-category-panel";
import { getSiteSettings } from "@/lib/settings";
import {
  resolveCountryPath,
  loadCategoryPageData,
  buildCategoryPath,
  buildVisaProgramPath,
} from "@/lib/services/path-resolver.service";
import { findPublishedProgramsByCountryId } from "@/lib/repositories/visa-program.repository";
import { findVisaProgramByCountryAndSlug } from "@/lib/repositories/visa-program.repository";
import { RelatedProgramsSection } from "@/components/domain/RelatedProgramsSection";
import { resolveServicePageHeroImage } from "@/lib/country-item-image";
import { findCountryBySlug } from "@/lib/repositories/country.repository";
import {
  buildEntityMetadata,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  findEntityStructuredDataJsonLd,
  siteUrl,
} from "@/lib/services/seo.service";
import { SeoEntityType } from "@/generated/prisma/client";

type Props = { params: Promise<{ countrySlug: string; path: string[] }> };

export async function generateMetadata({ params }: Props) {
  const { countrySlug, path } = await params;
  const resolved = await resolveCountryPath(countrySlug, path);
  if (resolved.type === "not_found") return {};

  if (resolved.type === "program") {
    const country = await findCountryBySlug(countrySlug);
    if (!country) return {};
    const program = await findVisaProgramByCountryAndSlug(country.id, resolved.programSlug);
    if (!program) return {};
    return buildEntityMetadata({
      entityType: SeoEntityType.VISA_PROGRAM,
      entityId: program.id,
      path: buildVisaProgramPath(countrySlug, program.slug),
      fallbackTitle: program.name,
      fallbackDescription: program.shortDescription ?? program.excerpt ?? undefined,
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

  if (resolved.type === "program") {
    const country = await findCountryBySlug(countrySlug);
    if (!country) notFound();
    const program = await findVisaProgramByCountryAndSlug(country.id, resolved.programSlug);
    if (!program) notFound();

    const [countryPrograms, panelData, seoStructuredData] = await Promise.all([
      findPublishedProgramsByCountryId(country.id),
      loadCountryCategoryPanelData(country.id, countrySlug),
      findEntityStructuredDataJsonLd(SeoEntityType.VISA_PROGRAM, program.id),
    ]);
    const { panelCategories, consulates, documents } = panelData;

    const minFee = program.fees.length
      ? program.fees.reduce((min, f) =>
          Number(f.amount) < Number(min.amount) ? f : min,
        program.fees[0])
      : null;

    const generalDocs = program.programDocuments.filter((d) => !d.applicantProfileId);
    const profileDocs = program.programDocuments.filter((d) => d.applicantProfileId);

    const breadcrumbItems = [
      { label: "Anasayfa", href: "/" },
      { label: country.name, href: `/${countrySlug}` },
      { label: program.name },
    ];

    const jsonLd = [
      buildBreadcrumbJsonLd(
        breadcrumbItems.map((b) => ({
          name: b.label,
          url: b.href ? `${siteUrl}${b.href}` : `${siteUrl}/${countrySlug}/${program.slug}`,
        })),
      ),
      buildFaqJsonLd(program.faqs),
      ...seoStructuredData,
    ].filter(Boolean);

    const heroTitle = program.heroTitle?.trim() || program.name;
    const heroSubtitle =
      program.heroSubtitle?.trim() || program.shortDescription || program.excerpt;

    const sectionNav = getServiceSectionNavItems(
      program.sectionsJson,
      program.sections,
    );

    const showTocSidebar = sectionNav.length > 0;

    const contentGridClass = showTocSidebar
      ? "mt-8 grid gap-6 lg:grid-cols-[minmax(240px,280px)_minmax(0,1fr)_minmax(0,240px)] lg:items-start"
      : "mt-8 grid gap-6 lg:grid-cols-[minmax(240px,280px)_minmax(0,1fr)] lg:items-start";

    const tocStickyClass =
      "lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100dvh-var(--site-header-height)-2rem)] lg:overflow-y-auto";

    const categoryLabel =
      program.category?.name ??
      program.categoryLinks[0]?.category?.name ??
      "Vize programı";

    return (
      <>
        <ServicePageHero
          heroImage={resolveServicePageHeroImage(country.heroImage)}
          title={heroTitle}
          subtitle={heroSubtitle}
          badge={categoryLabel}
          quickInfo={{
            processingTime: program.processingTime,
            requiresAppointment: program.requiresAppointment,
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

          <div className={contentGridClass}>
            <aside className="order-2 country-panel-sticky min-w-0 lg:order-1 lg:z-30 lg:self-start">
              <CountryCategoryPanel
                countrySlug={countrySlug}
                categories={panelCategories}
                consulates={consulates}
                documents={documents}
              />
            </aside>

            <div className="order-1 min-w-0 lg:order-2">
              <ServiceDetailContent
                sectionsJson={program.sectionsJson}
                legacySections={program.sections}
                featureImage1={program.featureImage1}
                featureImage1Title={program.featureImage1Title}
                featureImage1Text={program.featureImage1Text}
                featureImage2={program.featureImage2}
                featureImage2Title={program.featureImage2Title}
                featureImage2Text={program.featureImage2Text}
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

              {program.fees.length > 0 && (
                <section className="mt-12">
                  <h2 className="text-xl font-semibold text-slate-900">Ücretler</h2>
                  <div className="mt-4">
                    <FeeTable fees={program.fees} />
                  </div>
                </section>
              )}

              {program.faqs.length > 0 && (
                <section className="mt-12">
                  <h2 className="text-xl font-semibold text-slate-900">Sık sorulan sorular</h2>
                  <div className="mt-4">
                    <FaqAccordion items={program.faqs} />
                  </div>
                </section>
              )}

              <RelatedProgramsSection
                programs={countryPrograms.filter((p) => p.id !== program.id)}
                countryName={country.name}
                countrySlug={countrySlug}
                countryItemImage={country.itemImage}
              />

              <div className="mt-12">
                <ContactCTA
                  settings={settings}
                  context={`${country.name} - ${program.name}`}
                  title={`${program.name} için uzman danışmanlık`}
                  subtitle="Online başvuru veya belge yükleme yok. WhatsApp veya telefon ile doğrudan uzman ekibimize ulaşın."
                  variant="country"
                />
              </div>
            </div>

            {showTocSidebar && (
              <aside className={`order-3 min-w-0 lg:order-3 ${tocStickyClass}`}>
                <ServiceTableOfContents items={sectionNav} />
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

      {data.programs.length > 0 ? (
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {data.programs.map((p) => (
            <ServiceCard
              key={p.id}
              name={p.name}
              slug={p.slug}
              countrySlug={countrySlug}
              shortDescription={p.shortDescription}
              processingTime={p.processingTime}
            />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-sm text-slate-500">
          Bu kategoride {data.country.name} için henüz program eklenmemiş.
        </p>
      )}

      <div className="mt-12">
        <ContactCTA settings={settings} context={data.category.name} />
      </div>
    </div>
  );
}
