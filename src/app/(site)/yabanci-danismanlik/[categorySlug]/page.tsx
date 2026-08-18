import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ContactCTA } from "@/components/domain/ContactCTA";
import { ForeignConsultancyContentsPanel } from "@/components/domain/ForeignConsultancyContentsPanel";
import { ServiceDetailContent } from "@/components/domain/ServiceDetailContent";
import { ServicePageHero } from "@/components/domain/ServicePageHero";
import { ServiceTableOfContents } from "@/components/domain/ServiceTableOfContents";
import { optimizeCloudinaryDeliveryUrl, siteImages } from "@/lib/media";
import {
  findActiveForeignConsultancyContentsByCategorySlug,
  findForeignConsultancyCategoryPageByCategorySlug,
} from "@/lib/repositories/foreign-consultancy.repository";
import { getSiteSettings } from "@/lib/settings";
import { getServiceSectionNavItems } from "@/lib/service-page";
import {
  buildEntityMetadata,
  buildBreadcrumbJsonLd,
  findEntityStructuredDataJsonLd,
  siteUrl,
} from "@/lib/services/seo.service";
import {
  FOREIGN_CONSULTANCY_BASE_PATH,
  buildForeignConsultancyCategoryPath,
  getForeignConsultancyOption,
} from "@/lib/foreign-consultancy";
import {
  getForeignConsultancyCategoryLabel,
  type ForeignConsultancyCategoryValue,
} from "@/lib/foreign-consultancy-categories";
import { SeoEntityType } from "@/generated/prisma/client";

type Props = { params: Promise<{ categorySlug: string }> };

export async function generateMetadata({ params }: Props) {
  const { categorySlug } = await params;
  const option = getForeignConsultancyOption(categorySlug);
  if (!option) return {};

  const page = await findForeignConsultancyCategoryPageByCategorySlug(categorySlug);
  if (!page) {
    return buildEntityMetadata({
      entityType: SeoEntityType.SITE_PAGE,
      entityId: `yabanci-danismanlik-${categorySlug}`,
      path: buildForeignConsultancyCategoryPath(categorySlug),
      fallbackTitle: `${option.title} | Yabancı Danışmanlık`,
      fallbackDescription: option.description,
    });
  }

  return buildEntityMetadata({
    entityType: SeoEntityType.FOREIGN_CONSULTANCY_CATEGORY,
    entityId: page.id,
    path: buildForeignConsultancyCategoryPath(categorySlug),
    fallbackTitle: page.name,
    fallbackDescription: page.shortDescription ?? page.excerpt ?? option.description,
  });
}

export default async function ForeignConsultancyCategoryPage({ params }: Props) {
  const { categorySlug } = await params;
  const option = getForeignConsultancyOption(categorySlug);
  if (!option) notFound();

  const settings = await getSiteSettings();
  const heroImage = settings.contactHeroImage?.trim()
    ? optimizeCloudinaryDeliveryUrl(settings.contactHeroImage.trim())
    : siteImages.countryDetailHero;

  const categoryPage = await findForeignConsultancyCategoryPageByCategorySlug(categorySlug);
  const contents = await findActiveForeignConsultancyContentsByCategorySlug(categorySlug);
  const seoStructuredData = categoryPage
    ? await findEntityStructuredDataJsonLd(
        SeoEntityType.FOREIGN_CONSULTANCY_CATEGORY,
        categoryPage.id,
      )
    : [];

  const categoryLabel = getForeignConsultancyCategoryLabel(option.category);
  const displayPage = categoryPage?.isActive ? categoryPage : null;

  const breadcrumbItems = [
    { label: "Anasayfa", href: "/" },
    { label: "Yabancı Danışmanlık", href: FOREIGN_CONSULTANCY_BASE_PATH },
    { label: displayPage?.name ?? categoryLabel },
  ];

  const categoryPath = buildForeignConsultancyCategoryPath(categorySlug);

  const jsonLd = [
    buildBreadcrumbJsonLd(
      breadcrumbItems.map((item) => ({
        name: item.label,
        url: item.href ? `${siteUrl}${item.href}` : `${siteUrl}${categoryPath}`,
      })),
    ),
    ...seoStructuredData,
  ].filter(Boolean);

  const heroTitle = displayPage?.heroTitle?.trim() || displayPage?.name || option.title;
  const heroSubtitle =
    displayPage?.heroSubtitle?.trim() ||
    displayPage?.shortDescription ||
    displayPage?.excerpt ||
    option.description;

  const sectionNav = getServiceSectionNavItems(displayPage?.sectionsJson ?? null, []);
  const showTocSidebar = sectionNav.length > 0;
  const showLeftPanel = contents.length > 0;

  const contentGridClass = showLeftPanel
    ? showTocSidebar
      ? "mt-8 grid gap-6 lg:grid-cols-[minmax(240px,280px)_minmax(0,1fr)_minmax(0,240px)] lg:items-start"
      : "mt-8 grid gap-6 lg:grid-cols-[minmax(240px,280px)_minmax(0,1fr)] lg:items-start"
    : showTocSidebar
      ? "mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,240px)] lg:items-start"
      : "mt-8";

  const tocStickyClass =
    "lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100dvh-var(--site-header-height)-2rem)] lg:overflow-y-auto";

  return (
    <>
      <ServicePageHero
        heroImage={heroImage}
        title={heroTitle}
        subtitle={heroSubtitle}
        badge={categoryLabel}
      />

      <div className="site-container py-10">
        {jsonLd.map((ld, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
          />
        ))}

        <Breadcrumb items={breadcrumbItems} />

        <div className={contentGridClass}>
          {showLeftPanel && (
            <aside className="order-2 country-panel-sticky min-w-0 lg:order-1 lg:z-30 lg:self-start">
              <ForeignConsultancyContentsPanel
                categorySlug={categorySlug}
                items={contents.map((item) => ({
                  id: item.id,
                  name: item.name,
                  slug: item.slug,
                  category: item.category as ForeignConsultancyCategoryValue,
                }))}
              />
            </aside>
          )}

          <div className="order-1 min-w-0 lg:order-2">
            {displayPage ? (
              <ServiceDetailContent
                sectionsJson={displayPage.sectionsJson}
                legacySections={[]}
                featureImage1={displayPage.featureImage1}
                featureImage1Title={displayPage.featureImage1Title}
                featureImage1Text={displayPage.featureImage1Text}
                featureImage2={displayPage.featureImage2}
                featureImage2Title={displayPage.featureImage2Title}
                featureImage2Text={displayPage.featureImage2Text}
                featureImage1Priority
              />
            ) : (
              <p className="text-base leading-relaxed text-slate-600 md:text-lg">
                {option.description}
              </p>
            )}

            <div className="mt-12">
              <ContactCTA
                settings={settings}
                title={`${categoryLabel} için iletişime geçin`}
                subtitle="Başvuru sürecinizi uzman danışmanlarımızla planlayın. Online başvuru yok."
                context={categoryLabel}
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
