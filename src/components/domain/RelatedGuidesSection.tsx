import Link from "next/link";
import { ArticleCard } from "@/components/home/ArticleCard";
import { resolveArticleCardImage } from "@/lib/country-item-image";

type GuideItem = {
  id: string;
  title: string;
  slug: string;
  country?: { name: string } | null;
};

type Props = {
  guides: GuideItem[];
  countryName: string;
  countryItemImage?: string | null;
};

export function RelatedGuidesSection({
  guides,
  countryName,
  countryItemImage,
}: Props) {
  if (guides.length === 0) return null;

  return (
    <section className="mt-10">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Konu ile ilgili rehberlerimiz
          </h2>
          <p className="mt-0.5 text-xs text-slate-600">
            {countryName} için yayınlanan tüm rehber yazıları.
          </p>
        </div>
        <Link
          href="/rehber"
          className="text-xs font-medium text-csg-blue hover:text-csg-blue/80"
        >
          Tüm rehberler
        </Link>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {guides.map((guide) => (
          <ArticleCard
            key={guide.id}
            variant="compact"
            title={guide.title}
            slug={guide.slug}
            coverImage={resolveArticleCardImage(countryItemImage)}
            categoryName={guide.country?.name}
          />
        ))}
      </div>
    </section>
  );
}
