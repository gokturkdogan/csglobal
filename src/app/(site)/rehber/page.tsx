import Link from "next/link";
import { findPublishedArticles } from "@/lib/repositories/article.repository";
import { buildEntityMetadata } from "@/lib/services/seo.service";

export async function generateMetadata() {
  return buildEntityMetadata({
    entityType: "SITE_PAGE",
    entityId: "rehber",
    path: "/rehber",
    fallbackTitle: "Rehber & Makaleler",
    fallbackDescription: "Vize ve seyahat rehberleri, haberler ve bilgilendirme yazıları.",
  });
}

export default async function RehberPage() {
  const articles = await findPublishedArticles();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-8">
      <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">Rehber</h1>
      <p className="mt-3 text-slate-600">Vize süreçleri ve ülke rehberleri.</p>
      <ul className="mt-10 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
        {articles.map((a) => (
          <li key={a.id}>
            <Link
              href={`/rehber/${a.slug}`}
              className="block px-5 py-4 hover:bg-slate-50"
            >
              <span className="font-medium text-slate-900">{a.title}</span>
              {a.articleCategory && (
                <span className="mt-1 block text-xs text-slate-500">
                  {a.articleCategory.name}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
