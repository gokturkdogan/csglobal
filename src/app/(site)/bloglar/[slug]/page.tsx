import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ContactCTA } from "@/components/domain/ContactCTA";
import { ServiceDetailContent } from "@/components/domain/ServiceDetailContent";
import { ServiceTableOfContents } from "@/components/domain/ServiceTableOfContents";
import { GuidePageHero } from "@/components/domain/GuidePageHero";
import { RelatedBlogsPanel } from "@/components/blog/RelatedBlogsPanel";
import { BlogTopicCategoryPanel } from "@/components/blog/BlogTopicCategoryPanel";
import { getServiceSectionNavItems } from "@/lib/service-page";
import { getSiteSettings } from "@/lib/settings";
import {
  findBlogPostBySlug,
  findRelatedBlogPostsByCountry,
  loadBlogTopicCategoryPanelData,
} from "@/lib/repositories/blog.repository";
import {
  buildEntityMetadata,
  buildBreadcrumbJsonLd,
  findEntityStructuredDataJsonLd,
  siteUrl,
} from "@/lib/services/seo.service";
import { SeoEntityType } from "@/generated/prisma/client";
import { buildBlogListPath, buildBlogPath } from "@/lib/paths";
import { resolveBlogPageHeroImage } from "@/lib/country-item-image";
import { getBlogTopicCategoryLabel, type BlogTopicCategoryValue } from "@/lib/blog-topic-categories";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await findBlogPostBySlug(slug);
  if (!post) return {};

  return buildEntityMetadata({
    entityType: SeoEntityType.BLOG_POST,
    entityId: post.id,
    path: buildBlogPath(post.slug),
    fallbackTitle: post.title,
    fallbackDescription: post.excerpt ?? undefined,
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await findBlogPostBySlug(slug);
  if (!post) notFound();

  const country = post.country;
  const topicCategory = post.topicCategory;

  const [settings, relatedBlogs, topicCategoryPanel, seoStructuredData] = await Promise.all([
    getSiteSettings(),
    country
      ? findRelatedBlogPostsByCountry(country.id, post.id)
      : Promise.resolve([]),
    !country ? loadBlogTopicCategoryPanelData() : Promise.resolve([]),
    findEntityStructuredDataJsonLd(SeoEntityType.BLOG_POST, post.id),
  ]);

  const breadcrumbItems = [
    { label: "Anasayfa", href: "/" },
    { label: "Bloglar", href: buildBlogListPath() },
    { label: post.title },
  ];

  const jsonLd = [
    buildBreadcrumbJsonLd(
      breadcrumbItems.map((b) => ({
        name: b.label,
        url: b.href ? `${siteUrl}${b.href}` : `${siteUrl}${buildBlogPath(post.slug)}`,
      })),
    ),
    ...seoStructuredData,
  ].filter(Boolean);

  const heroTitle = post.heroTitle?.trim() || post.title;
  const heroSubtitle = post.heroSubtitle?.trim() || post.excerpt;

  const sectionNav = getServiceSectionNavItems(post.sectionsJson, []);
  const showTocSidebar = sectionNav.length > 0;
  const showRelatedBlogs = relatedBlogs.length > 0;
  const showTopicCategoryPanel = !country;
  const showLeftSidebar = showRelatedBlogs || showTopicCategoryPanel;

  const contentGridClass = showLeftSidebar
    ? showTocSidebar
      ? "mt-8 grid gap-6 lg:grid-cols-[minmax(240px,280px)_minmax(0,1fr)_minmax(0,240px)] lg:items-start"
      : "mt-8 grid gap-6 lg:grid-cols-[minmax(240px,280px)_minmax(0,1fr)] lg:items-start"
    : showTocSidebar
      ? "mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,240px)] lg:items-start"
      : "mt-8";

  const tocStickyClass =
    "lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100dvh-var(--site-header-height)-2rem)] lg:overflow-y-auto";

  const badge =
    country?.name ??
    (topicCategory ? getBlogTopicCategoryLabel(topicCategory as BlogTopicCategoryValue) : "Blog");

  return (
    <>
      <GuidePageHero
        heroImage={resolveBlogPageHeroImage(country)}
        title={heroTitle}
        subtitle={heroSubtitle}
        badge={badge}
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
          {showLeftSidebar && (
            <aside className="order-2 country-panel-sticky min-w-0 lg:order-1 lg:z-30 lg:self-start">
              {showTopicCategoryPanel ? (
                <BlogTopicCategoryPanel
                  categories={topicCategoryPanel}
                  activeCategory={topicCategory as BlogTopicCategoryValue | null}
                  currentPostId={post.id}
                />
              ) : (
                <RelatedBlogsPanel countryName={country!.name} posts={relatedBlogs} />
              )}
            </aside>
          )}

          <div className={`order-1 min-w-0 ${showLeftSidebar ? "lg:order-2" : ""}`}>
            <ServiceDetailContent
              sectionsJson={post.sectionsJson}
              legacySections={[]}
              featureImage1={post.featureImage1}
              featureImage1Title={post.featureImage1Title}
              featureImage1Text={post.featureImage1Text}
              featureImage2={post.featureImage2}
              featureImage2Title={post.featureImage2Title}
              featureImage2Text={post.featureImage2Text}
            />

            <div className="mt-12">
              <ContactCTA
                settings={settings}
                context={post.title}
                title={`${post.title} hakkında uzman danışmanlık`}
                subtitle="WhatsApp veya telefon ile doğrudan uzman ekibimize ulaşın."
                variant="country"
              />
            </div>
          </div>

          {showTocSidebar && (
            <aside
              className={`order-3 min-w-0 ${showLeftSidebar ? "lg:order-3" : ""} ${tocStickyClass}`}
            >
              <ServiceTableOfContents items={sectionNav} />
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
