import Link from "next/link";
import { ArticleCard } from "@/components/home/ArticleCard";
import { findPublishedArticles } from "@/lib/repositories/article.repository";
import { buildEntityMetadata } from "@/lib/services/seo.service";

export async function generateMetadata() {
  return buildEntityMetadata({
    entityType: "SITE_PAGE",
    entityId: "rehber",
    path: "/rehber",
    fallbackTitle: "Rehber",
    fallbackDescription: "Ülkeye özel vize ve göçmenlik rehberleri.",
  });
}

export default async function RehberPage() {
  const articles = await findPublishedArticles();

  return (
    <div className="site-container py-12">
      <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">Rehber</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Ülkeye özel vize süreçleri, evrak hazırlığı ve başvuru adımları.
      </p>

      {articles.length === 0 ? (
        <p className="mt-10 text-sm text-slate-500">Henüz yayınlanan rehber yok.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              title={article.title}
              slug={article.slug}
              excerpt={article.excerpt}
              coverImage={article.heroImage ?? article.coverImage}
              categoryName={article.country?.name}
              publishedAt={article.publishedAt}
            />
          ))}
        </div>
      )}

      <p className="mt-10 text-sm text-slate-500">
        <Link href="/ulkeler" className="font-medium text-csg-blue hover:underline">
          Ülkeler sayfasından
        </Link>
        {" "}
        ülke bazlı hizmetlere de göz atabilirsiniz.
      </p>
    </div>
  );
}
