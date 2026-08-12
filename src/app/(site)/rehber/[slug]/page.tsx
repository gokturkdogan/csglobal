import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { MarkdownContent } from "@/components/MarkdownContent";
import { ContactCTA } from "@/components/domain/ContactCTA";
import { findArticleBySlug } from "@/lib/repositories/article.repository";
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
    fallbackDescription: article.excerpt ?? undefined,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await findArticleBySlug(slug);
  if (!article) notFound();

  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-8">
      <Breadcrumb
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "Rehber", href: "/rehber" },
          { label: article.title },
        ]}
      />
      <article>
        <h1 className="text-3xl font-semibold text-slate-900">{article.title}</h1>
        {article.publishedAt && (
          <time className="mt-2 block text-sm text-slate-500">
            {new Date(article.publishedAt).toLocaleDateString("tr-TR")}
          </time>
        )}
        <div className="mt-8">
          <MarkdownContent content={article.content} />
        </div>
      </article>
      <div className="mt-12">
        <ContactCTA settings={settings} />
      </div>
    </div>
  );
}
