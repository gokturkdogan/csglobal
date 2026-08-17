import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog/BlogCard";
import { GuidesListCtaSection } from "@/components/domain/GuidesListCtaSection";
import { GuidesListPageHero } from "@/components/domain/GuidesListPageHero";
import { resolveBlogCardImage } from "@/lib/country-item-image";
import {
  findBlogListSitePage,
  findBlogListSitePageRecord,
  getGuidesListPageContent,
  guidesListPageSeo,
} from "@/lib/guides-list-page";
import { buildBlogListPath } from "@/lib/paths";
import { findActiveBlogPosts } from "@/lib/repositories/blog.repository";
import { getSiteSettings } from "@/lib/settings";
import { buildEntityMetadata } from "@/lib/services/seo.service";
import { SeoEntityType } from "@/generated/prisma/client";

export async function generateMetadata() {
  const page = await findBlogListSitePage();
  if (!page) {
    return {
      title: guidesListPageSeo.title,
      description: guidesListPageSeo.description,
    };
  }
  return buildEntityMetadata({
    entityType: SeoEntityType.SITE_PAGE,
    entityId: page.id,
    path: buildBlogListPath(),
    fallbackTitle: guidesListPageSeo.title,
    fallbackDescription: guidesListPageSeo.description,
  });
}

export default async function BlogListPage() {
  const pageRecord = await findBlogListSitePageRecord();
  if (pageRecord && !pageRecord.isActive) {
    notFound();
  }

  const content = await getGuidesListPageContent();
  const settings = await getSiteSettings();
  const posts = await findActiveBlogPosts();

  return (
    <>
      <GuidesListPageHero content={content} articleCount={posts.length} />

      <section className="home-band-soft border-b border-slate-200/60">
        <div className="site-container py-12 md:py-16">
          {content.listIntro.trim() && (
            <p className="mb-8 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
              {content.listIntro}
            </p>
          )}

          {posts.length === 0 ? (
            <p className="text-sm text-slate-500">Henüz yayınlanmış blog yazısı yok.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  slug={post.slug}
                  excerpt={post.excerpt}
                  coverImage={resolveBlogCardImage(post.country?.itemImage)}
                  countryName={post.country?.name}
                  publishedAt={post.publishedAt}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <GuidesListCtaSection content={content} settings={settings} />
    </>
  );
}
