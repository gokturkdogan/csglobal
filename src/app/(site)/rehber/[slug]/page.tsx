import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ContactCTA } from "@/components/domain/ContactCTA";
import { GuideDetailContent } from "@/components/domain/GuideDetailContent";
import { GuidePageHero } from "@/components/domain/GuidePageHero";
import { ServiceTableOfContents } from "@/components/domain/ServiceTableOfContents";
import { findArticleBySlug } from "@/lib/repositories/article.repository";
import { getGuideSectionNavItems } from "@/lib/guide";
import { getSiteSettings } from "@/lib/settings";
import { buildEntityMetadata } from "@/lib/services/seo.service";
import { SeoEntityType } from "@/generated/prisma/client";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = await findArticleBySlug(slug);
  if (!article) return {};

  return buildEntityMetadata({
    entityType: SeoEntityType.ARTICLE,
    entityId: article.id,
    path: `/rehber/${slug}`,
    fallbackTitle: article.title,
    fallbackDescription: article.excerpt ?? article.heroSubtitle ?? undefined,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await findArticleBySlug(slug);
  if (!article) notFound();

  const settings = await getSiteSettings();
  const heroTitle = article.heroTitle?.trim() || article.title;
  const heroSubtitle = article.heroSubtitle?.trim() || article.excerpt;
  const sectionNav = getGuideSectionNavItems(article.sectionsJson);
  const showSidebar = sectionNav.length > 0;

  return (
    <>
      <GuidePageHero
        heroImage={article.heroImage}
        title={heroTitle}
        subtitle={heroSubtitle}
        badge={article.country?.name ?? "Rehber"}
      />

      <div className="site-container py-10 md:py-14">
        <Breadcrumb
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "Rehber", href: "/rehber" },
            { label: article.title },
          ]}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_280px] lg:items-start">
          <div className="min-w-0">
            {article.publishedAt && (
              <time className="block text-sm text-slate-500">
                {new Date(article.publishedAt).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            )}

            <div className={article.publishedAt ? "mt-6" : ""}>
              <GuideDetailContent
                sectionsJson={article.sectionsJson}
                featureImage={article.featureImage}
                featureImageTitle={article.featureImageTitle}
                featureImageText={article.featureImageText}
              />
            </div>

            <div className="mt-12">
              <ContactCTA
                settings={settings}
                context={
                  article.country?.name
                    ? `${article.country.name} rehber danışmanlığı`
                    : "Rehber danışmanlığı"
                }
                title={
                  article.country?.name
                    ? `${article.country.name} için uzman danışmanlık`
                    : "Sürecinizi birlikte planlayalım"
                }
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
