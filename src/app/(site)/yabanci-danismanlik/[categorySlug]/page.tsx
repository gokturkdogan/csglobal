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
  shouldUseForeignConsultancyStaticCopy,
} from "@/lib/i18n/foreign-consultancy";
import { getForeignConsultancyLocale } from "@/lib/i18n/foreign-consultancy/server";
import {
  hasForeignConsultancyLocaleTranslation,
  resolveForeignConsultancyLocalizedRecord,
} from "@/lib/i18n/foreign-consultancy/translations";
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
import { type ForeignConsultancyCategoryValue } from "@/lib/foreign-consultancy-categories";
import { SeoEntityType } from "@/generated/prisma/client";

type Props = { params: Promise<{ categorySlug: string }> };

export async function generateMetadata({ params }: Props) {
  const { categorySlug } = await params;
  const locale = await getForeignConsultancyLocale();
  const messages = getForeignConsultancyMessages(locale);
  const categoryMessages = getForeignConsultancyCategoryMessages(messages, categorySlug);
  const option = getForeignConsultancyOption(categorySlug);
  if (!option) return {};

  const page = await findForeignConsultancyCategoryPageByCategorySlug(categorySlug);
  const useStaticCopy = shouldUseForeignConsultancyStaticCopy(locale) && !page;

  if (useStaticCopy || !page) {
    return buildEntityMetadata({
      entityType: SeoEntityType.SITE_PAGE,
      entityId: `yabanci-danismanlik-${categorySlug}`,
      path: buildForeignConsultancyCategoryPath(categorySlug),
      fallbackTitle: `${categoryMessages.title} | ${messages.common.foreignConsultancy}`,
      fallbackDescription: categoryMessages.description,
    });
  }

  return buildEntityMetadata({
    entityType: SeoEntityType.FOREIGN_CONSULTANCY_CATEGORY,
    entityId: page.id,
    path: buildForeignConsultancyCategoryPath(categorySlug),
    fallbackTitle: `${resolveForeignConsultancyLocalizedRecord(page, locale).name ?? page.name} | ${messages.common.foreignConsultancy}`,
    fallbackDescription:
      resolveForeignConsultancyLocalizedRecord(page, locale).shortDescription ??
      resolveForeignConsultancyLocalizedRecord(page, locale).excerpt ??
      categoryMessages.description,
  });
}

export default async function ForeignConsultancyCategoryPage({ params }: Props) {
  const { categorySlug } = await params;
  const option = getForeignConsultancyOption(categorySlug);
  if (!option) notFound();

  const locale = await getForeignConsultancyLocale();
  const messages = getForeignConsultancyMessages(locale);
  const categoryMessages = getForeignConsultancyCategoryMessages(messages, categorySlug);

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

  const displayPage = categoryPage?.isActive ? categoryPage : null;
  const localizedPage = displayPage
    ? resolveForeignConsultancyLocalizedRecord(displayPage, locale)
    : null;
  const categoryLabel =
    localizedPage?.name?.trim() || categoryMessages.title;
  const showTranslationNotice =
    locale !== "tr" &&
    Boolean(displayPage) &&
    !hasForeignConsultancyLocaleTranslation(displayPage!, locale);

  const breadcrumbItems = [
    { label: messages.common.home, href: "/" },
    { label: messages.common.foreignConsultancy, href: FOREIGN_CONSULTANCY_BASE_PATH },
    { label: categoryLabel },
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

  const heroTitle =
    localizedPage?.heroTitle?.trim() ||
    localizedPage?.name?.trim() ||
    categoryLabel;
  const heroSubtitle =
    localizedPage?.heroSubtitle?.trim() ||
    localizedPage?.shortDescription ||
    localizedPage?.excerpt ||
    categoryMessages.description;

  const sectionNav = getServiceSectionNavItems(localizedPage?.sectionsJson ?? null, []);
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

  const contactName = categoryLabel;

  return (
    <>
      <ServicePageHero
        heroImage={heroImage}
        title={heroTitle}
        subtitle={heroSubtitle}
        badge={categoryLabel}
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
                items={contents.map((item) => {
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

          <div className="order-1 min-w-0 lg:order-2">
            {showTranslationNotice && (
              <ForeignConsultancyTranslationNotice messages={messages} />
            )}

            {displayPage && localizedPage ? (
              <ServiceDetailContent
                sectionsJson={localizedPage.sectionsJson}
                legacySections={[]}
                featureImage1={displayPage.featureImage1}
                featureImage1Title={localizedPage.featureImage1Title}
                featureImage1Text={localizedPage.featureImage1Text}
                featureImage2={displayPage.featureImage2}
                featureImage2Title={localizedPage.featureImage2Title}
                featureImage2Text={localizedPage.featureImage2Text}
                featureImage1Priority
              />
            ) : (
              <p className="text-base leading-relaxed text-slate-600 md:text-lg">
                {categoryMessages.description}
              </p>
            )}

            <div className="mt-12">
              <ContactCTA
                settings={settings}
                title={buildForeignConsultancyContactTitle(messages, contactName)}
                subtitle={messages.common.contactSubtitle}
                context={contactName}
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
