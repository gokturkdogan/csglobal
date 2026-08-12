"use client";

import Link from "next/link";
import { ArticleCard } from "@/components/home/ArticleCard";
import type { HomepageContent } from "@/lib/homepage";
import { HomeEditableField } from "@/components/admin/homepage/HomeEditableField";
import { useHomepageEdit } from "@/components/admin/homepage/HomepageEditContext";

export function HomeArticlesSection({
  content,
  articles,
}: {
  content: HomepageContent;
  articles: Array<{
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    coverImage: string | null;
    publishedAt: Date | null;
    articleCategory: { name: string };
  }>;
}) {
  const edit = useHomepageEdit();

  if (articles.length === 0) return null;

  return (
    <section className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <HomeEditableField
            field="articlesTitle"
            value={content.articlesTitle}
            className="text-2xl font-semibold text-slate-900 md:text-3xl"
            as="h2"
          />
          {edit?.editing ? (
            <span className="text-sm font-medium text-slate-400">Tüm rehberler</span>
          ) : (
            <Link href="/rehber" className="text-sm font-medium text-csg-blue hover:underline">
              Tüm rehberler
            </Link>
          )}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard
              key={a.id}
              title={a.title}
              slug={a.slug}
              excerpt={a.excerpt}
              coverImage={a.coverImage}
              categoryName={a.articleCategory.name}
              publishedAt={a.publishedAt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
