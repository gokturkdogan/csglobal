"use client";

import Link from "next/link";
import { resolveArticleCardImage } from "@/lib/country-item-image";
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
    publishedAt: Date | null;
    country: { name: string; itemImage?: string | null } | null;
  }>;
}) {
  const edit = useHomepageEdit();

  if (articles.length === 0) return null;

  return (
    <section className="border-t border-slate-200 bg-white">
      <div className="site-container py-16 md:py-20">
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
            <Link href="/rehber" className="cursor-pointer text-sm font-medium text-csg-blue hover:underline">
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
              coverImage={resolveArticleCardImage(a.country?.itemImage)}
              categoryName={a.country?.name}
              publishedAt={a.publishedAt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
