import Link from "next/link";
import { ProgramCard } from "@/components/home/ProgramCard";
import { resolveArticleCardImage } from "@/lib/country-item-image";

type ProgramItem = {
  id: string;
  name: string;
  slug: string;
  excerpt?: string | null;
  country?: { name: string } | null;
};

type Props = {
  programs: ProgramItem[];
  countryName: string;
  countrySlug: string;
  countryItemImage?: string | null;
};

export function RelatedProgramsSection({
  programs,
  countryName,
  countrySlug,
  countryItemImage,
}: Props) {
  if (programs.length === 0) return null;

  return (
    <section className="mt-10">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {countryName} vize programları
          </h2>
          <p className="mt-0.5 text-xs text-slate-600">
            Bu ülkeye bağlı diğer yayınlanmış programlar.
          </p>
        </div>
        <Link
          href={`/${countrySlug}`}
          className="text-xs font-medium text-csg-blue hover:text-csg-blue/80"
        >
          Ülke sayfası
        </Link>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {programs.map((program) => (
          <ProgramCard
            key={program.id}
            variant="compact"
            name={program.name}
            slug={program.slug}
            countrySlug={countrySlug}
            excerpt={program.excerpt}
            coverImage={resolveArticleCardImage(countryItemImage)}
            categoryName={program.country?.name}
          />
        ))}
      </div>
    </section>
  );
}
