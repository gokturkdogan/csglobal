"use client";

import Link from "next/link";
import { resolveArticleCardImage } from "@/lib/country-item-image";
import { ProgramCard } from "@/components/home/ProgramCard";
import type { HomepageContent } from "@/lib/homepage";
import { HomeEditableField } from "@/components/admin/homepage/HomeEditableField";
import { useHomepageEdit } from "@/components/admin/homepage/HomepageEditContext";

export function HomeProgramsSection({
  content,
  programs,
}: {
  content: HomepageContent;
  programs: Array<{
    id: string;
    name: string;
    slug: string;
    excerpt: string | null;
    publishedAt: Date | null;
    country: { name: string; slug: string; itemImage?: string | null } | null;
  }>;
}) {
  const edit = useHomepageEdit();

  if (programs.length === 0) return null;

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
            <span className="text-sm font-medium text-slate-400">Tüm programlar</span>
          ) : (
            <Link
              href="/hizmetlerimiz"
              className="cursor-pointer text-sm font-medium text-csg-blue hover:underline"
            >
              Tüm programlar
            </Link>
          )}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <ProgramCard
              key={program.id}
              name={program.name}
              slug={program.slug}
              countrySlug={program.country?.slug ?? ""}
              excerpt={program.excerpt}
              coverImage={resolveArticleCardImage(program.country?.itemImage)}
              categoryName={program.country?.name}
              publishedAt={program.publishedAt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
