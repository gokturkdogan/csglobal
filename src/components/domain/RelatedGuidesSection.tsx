import Link from "next/link";
import { ArticleCard } from "@/components/home/ArticleCard";

type GuideItem = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  heroImage?: string | null;
  coverImage?: string | null;
  publishedAt?: Date | null;
  country?: { name: string } | null;
};

export function RelatedGuidesSection({ guides }: { guides: GuideItem[] }) {
  if (guides.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Konu ile ilgili rehberlerimiz
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Bu hizmetle ilişkili güncel rehber ve bilgi yazıları.
          </p>
        </div>
        <Link
          href="/rehber"
          className="text-sm font-medium text-csg-blue hover:text-csg-blue/80"
        >
          Tüm rehberler
        </Link>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {guides.map((guide) => (
          <ArticleCard
            key={guide.id}
            title={guide.title}
            slug={guide.slug}
            excerpt={guide.excerpt}
            coverImage={guide.heroImage ?? guide.coverImage}
            categoryName={guide.country?.name}
            publishedAt={guide.publishedAt}
          />
        ))}
      </div>
    </section>
  );
}
