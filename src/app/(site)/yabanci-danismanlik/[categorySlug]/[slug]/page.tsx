import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ContactCTA } from "@/components/domain/ContactCTA";
import {
  buildForeignConsultancyContactTitle,
  ForeignConsultancyContentsPanel,
} from "@/components/domain/ForeignConsultancyContentsPanel";
import { ServiceDetailContent } from "@/components/domain/ServiceDetailContent";
import { ServicePageHero } from "@/components/domain/ServicePageHero";
import { ServiceTableOfContents } from "@/components/domain/ServiceTableOfContents";
import { ForeignConsultancyTranslationNotice } from "@/components/foreign-consultancy/ForeignConsultancyTranslationNotice";
import {
  getForeignConsultancyCategoryMessages,
  getForeignConsultancyMessages,
} from "@/lib/i18n/foreign-consultancy";
import { getForeignConsultancyLocale } from "@/lib/i18n/foreign-consultancy/server";
import {
  hasForeignConsultancyLocaleTranslation,
  resolveForeignConsultancyLocalizedRecord,
} from "@/lib/i18n/foreign-consultancy/translations";
import { optimizeCloudinaryDeliveryUrl, siteImages } from "@/lib/media";
import {
  findActiveForeignConsultancyContentsByCategorySlug,
  findForeignConsultancyContentBySlug,
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
  buildForeignConsultancyContentPath,
  getForeignConsultancyOption,
} from "@/lib/foreign-consultancy";
import {
  foreignConsultancyCategoryToSlug,
  foreignConsultancySlugToCategory,
  type ForeignConsultancyCategoryValue,
} from "@/lib/foreign-consultancy-categories";
import { SeoEntityType } from "@/generated/prisma/client";

type Props = { params: Promise<{ categorySlug: string; slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { categorySlug, slug } = await params;
  const locale = await getForeignConsultancyLocale();
  const content = await findForeignConsultancyContentBySlug(categorySlug, slug);
  if (!content) return {};

  const localized = resolveForeignConsultancyLocalizedRecord(content, locale);

  return buildEntityMetadata({
    entityType: SeoEntityType.FOREIGN_CONSULTANCY,
    entityId: content.id,
    path: buildForeignConsultancyContentPath(
      foreignConsultancyCategoryToSlug(content.category as ForeignConsultancyCategoryValue),
      content.slug,
    ),
    fallbackTitle: localized.name ?? content.name,
    fallbackDescription: localized.shortDescription ?? localized.excerpt ?? undefined,
  });
}

export default async function ForeignConsultancyContentPage({ params }: Props) {
  const { categorySlug, slug } = await params;
  const option = getForeignConsultancyOption(categorySlug);
  if (!option) notFound();

  const content = await findForeignConsultancyContentBySlug(categorySlug, slug);
  if (!content) notFound();

  const locale = await getForeignConsultancyLocale();
  const messages = getForeignConsultancyMessages(locale);
  const categoryMessages = getForeignConsultancyCategoryMessages(messages, categorySlug);
  const localized = resolveForeignConsultancyLocalizedRecord(content, locale);

  const category = content.category as ForeignConsultancyCategoryValue;
  const categoryLabel = categoryMessages.title;
  const expectedCategory = foreignConsultancySlugToCategory(categorySlug);
  if (!expectedCategory || expectedCategory !== category) notFound();

  const settings = await getSiteSettings();
  const heroImage = settings.contactHeroImage?.trim()
    ? optimizeCloudinaryDeliveryUrl(settings.contactHeroImage.trim())
    : siteImages.countryDetailHero;

  const [categoryContents, seoStructuredData] = await Promise.all([
    findActiveForeignConsultancyContentsByCategorySlug(categorySlug),
    findEntityStructuredDataJsonLd(SeoEntityType.FOREIGN_CONSULTANCY, content.id),
  ]);

  const displayName = localized.name ?? content.name;
  const showTranslationNotice =
    locale !== "tr" && !hasForeignConsultancyLocaleTranslation(content, locale);

  const breadcrumbItems = [
    { label: messages.common.home, href: "/" },
    { label: messages.common.foreignConsultancy, href: FOREIGN_CONSULTANCY_BASE_PATH },
    { label: categoryLabel, href: buildForeignConsultancyCategoryPath(categorySlug) },
    { label: displayName },
  ];

  const contentPath = buildForeignConsultancyContentPath(
    foreignConsultancyCategoryToSlug(category),
    content.slug,
  );

  const jsonLd = [
    buildBreadcrumbJsonLd(
      breadcrumbItems.map((item) => ({
        name: item.label,
        url: item.href ? `${siteUrl}${item.href}` : `${siteUrl}${contentPath}`,
      })),
    ),
    ...seoStructuredData,
  ].filter(Boolean);

  const heroTitle = localized.heroTitle?.trim() || displayName;
  const heroSubtitle =
    localized.heroSubtitle?.trim() || localized.shortDescription || localized.excerpt;

  const sectionNav = getServiceSectionNavItems(localized.sectionsJson, []);
  const showTocSidebar = sectionNav.length > 0;
  const showLeftPanel = categoryContents.length > 0;

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
        quickInfo={{
          processingTime: localized.processingTime ?? content.processingTime,
          requiresAppointment: content.requiresAppointment,
        }}
        labels={messages.serviceHero}
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
                messages={messages}
                heading={messages.common.similarContents}
                subtitle={categoryLabel}
                currentSlug={content.slug}
                items={categoryContents.map((item) => {
                  const localizedItem = resolveForeignConsultancyLocalizedRecord(item, locale);
                  return {
                    id: item.id,
                    name: localizedItem.name ?? item.name,
                    slug: item.slug,
                    category: item.category as ForeignConsultancyCategoryValue,
                  };
                })}
              />
            </aside>
          )}

          <div className={`order-1 min-w-0 ${showLeftPanel ? "lg:order-2" : ""}`}>
            {showTranslationNotice && (
              <ForeignConsultancyTranslationNotice messages={messages} />
            )}

            <ServiceDetailContent
              sectionsJson={localized.sectionsJson}
              legacySections={[]}
              featureImage1={content.featureImage1}
              featureImage1Title={localized.featureImage1Title}
              featureImage1Text={localized.featureImage1Text}
              featureImage2={content.featureImage2}
              featureImage2Title={localized.featureImage2Title}
              featureImage2Text={localized.featureImage2Text}
            />

            <div className="mt-12">
              <ContactCTA
                settings={settings}
                title={buildForeignConsultancyContactTitle(messages, displayName)}
                subtitle={messages.common.contactSubtitle}
                context={displayName}
              />
            </div>
          </div>

          {showTocSidebar && (
            <aside className={`order-3 min-w-0 lg:order-3 ${tocStickyClass}`}>
              <ServiceTableOfContents items={sectionNav} labels={messages.tableOfContents} />
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
