import { ArticleCard } from "@/components/home/ArticleCard";
import { GuidesListCtaSection } from "@/components/domain/GuidesListCtaSection";
import { GuidesListPageHero } from "@/components/domain/GuidesListPageHero";
import { findPublishedArticles } from "@/lib/repositories/article.repository";
import { resolveArticleCardImage } from "@/lib/country-item-image";
import { getGuidesListPageContent } from "@/lib/guides-list-page";
import { getSiteSettings } from "@/lib/settings";
import { buildEntityMetadata } from "@/lib/services/seo.service";

export async function generateMetadata() {
  const content = await getGuidesListPageContent();

  return buildEntityMetadata({
    entityType: "SITE_PAGE",
    entityId: "rehber",
    path: "/rehber",
    fallbackTitle: content.heroTitle,
    fallbackDescription: content.heroSubtitle,
  });
}

export default async function RehberPage() {
  const articles = await findPublishedArticles();
  const content = await getGuidesListPageContent();
  const settings = await getSiteSettings();

  return (
    <>
      <GuidesListPageHero content={content} articleCount={articles.length} />

      <div className="border-b border-slate-200/60 bg-white">
        <div className="site-container py-12 md:py-16">
          {content.listIntro.trim() && (
            <p className="max-w-2xl text-base leading-relaxed text-slate-600">
              {content.listIntro}
            </p>
          )}

          {articles.length === 0 ? (
            <p className="mt-10 text-sm text-slate-500">Henüz yayınlanan rehber yok.</p>
          ) : (
            <div
              className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${
                content.listIntro.trim() ? "mt-10" : ""
              }`}
            >
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  title={article.title}
                  slug={article.slug}
                  excerpt={article.excerpt}
                  coverImage={resolveArticleCardImage(article.country?.itemImage)}
                  categoryName={article.country?.name}
                  publishedAt={article.publishedAt}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <GuidesListCtaSection content={content} settings={settings} />
    </>
  );
}
