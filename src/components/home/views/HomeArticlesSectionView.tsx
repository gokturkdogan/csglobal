import Link from "next/link";
import { BlogCard } from "@/components/blog/BlogCard";
import { resolveBlogCardImage } from "@/lib/country-item-image";
import { getBlogTopicCategoryLabel, type BlogTopicCategoryValue } from "@/lib/blog-topic-categories";
import type { HomepageContent } from "@/lib/homepage";

export function HomeArticlesSectionView({
  content,
  articles,
}: {
  content: HomepageContent;
  articles: Array<{
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    publishedAt: Date | null;
    topicCategory?: BlogTopicCategoryValue | null;
    country: { name: string; slug: string; itemImage?: string | null } | null;
  }>;
}) {
  if (articles.length === 0) return null;

  return (
    <section className="border-t border-slate-200 bg-white">
      <div className="site-container py-16 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            {content.articlesTitle}
          </h2>
          <Link
            href="/bloglar"
            className="cursor-pointer text-sm font-medium text-csg-blue hover:underline"
          >
            Tüm rehberler
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <BlogCard
              key={article.id}
              title={article.title}
              slug={article.slug}
              excerpt={article.excerpt}
              coverImage={resolveBlogCardImage(article.country?.itemImage)}
              countryName={
                article.country?.name ??
                (article.topicCategory
                  ? getBlogTopicCategoryLabel(article.topicCategory)
                  : null)
              }
              publishedAt={article.publishedAt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
