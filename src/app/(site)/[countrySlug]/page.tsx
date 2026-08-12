import { notFound } from "next/navigation";
import { ContactCTA } from "@/components/domain/ContactCTA";
import { CountryPageHero } from "@/components/domain/CountryPageHero";
import { CategoryLinkCard, ServiceCard } from "@/components/domain/ServiceCard";
import { MarkdownContent } from "@/components/MarkdownContent";
import { findCountryBySlug } from "@/lib/repositories/country.repository";
import { buildCategoryTree, type CategoryNode } from "@/lib/services/category-tree.service";
import {
  buildCategoryPath,
} from "@/lib/services/path-resolver.service";
import { buildEntityMetadata } from "@/lib/services/seo.service";
import { getSiteSettings } from "@/lib/settings";
import { SeoEntityType } from "@/generated/prisma/client";

type Props = { params: Promise<{ countrySlug: string }> };

function countTreeStats(nodes: CategoryNode[]): { services: number; categories: number } {
  let services = 0;
  let categories = 0;

  for (const node of nodes) {
    categories += 1;
    services += node.services.length;
    const childStats = countTreeStats(node.children);
    services += childStats.services;
    categories += childStats.categories;
  }

  return { services, categories };
}

export async function generateMetadata({ params }: Props) {
  const { countrySlug } = await params;
  const country = await findCountryBySlug(countrySlug);
  if (!country) return {};

  return buildEntityMetadata({
    entityType: SeoEntityType.COUNTRY,
    entityId: country.id,
    path: `/${countrySlug}`,
    fallbackTitle: `${country.name} Vize ve Göçmenlik`,
    fallbackDescription: country.shortDescription ?? undefined,
  });
}

export default async function CountryPage({ params }: Props) {
  const { countrySlug } = await params;
  const country = await findCountryBySlug(countrySlug);
  if (!country) notFound();

  const settings = await getSiteSettings();
  const tree = await buildCategoryTree(country.id);
  const { services: serviceCount, categories: categoryCount } = countTreeStats(tree);

  return (
    <>
      <CountryPageHero
        name={country.name}
        shortDescription={country.shortDescription}
        flag={country.flag}
        serviceCount={serviceCount}
        categoryCount={categoryCount}
      />

      <div className="home-band-soft">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
          {country.description && (
            <div className="max-w-3xl">
              <MarkdownContent content={country.description} />
            </div>
          )}

          <div className={`space-y-12 ${country.description ? "mt-12" : ""}`}>
            {tree.map((root) => (
              <CategorySection key={root.id} node={root} countrySlug={countrySlug} />
            ))}
          </div>

          <div className="mt-16">
            <ContactCTA settings={settings} context={country.name} />
          </div>
        </div>
      </div>
    </>
  );
}

function CategorySection({
  node,
  countrySlug,
  depth = 0,
}: {
  node: CategoryNode;
  countrySlug: string;
  depth?: number;
}) {
  const hasDirectServices = node.services.length > 0;
  const hasChildren = node.children.length > 0;

  return (
    <section>
      <h2
        className={`font-semibold text-slate-900 ${depth === 0 ? "text-xl" : "text-lg"}`}
      >
        {node.name}
      </h2>
      {node.shortDescription && (
        <p className="mt-2 text-sm text-slate-600">{node.shortDescription}</p>
      )}

      {hasChildren && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {node.children.map((child) => {
            const href = buildCategoryPath(countrySlug, child.slugPath);
            const count = child.services.length + child.children.length;
            return (
              <CategoryLinkCard
                key={child.id}
                name={child.name}
                href={href}
                meta={`${count} alt öğe`}
              />
            );
          })}
        </div>
      )}

      {hasDirectServices && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {node.services.map((s) => (
            <ServiceCard
              key={s.id}
              name={s.name}
              slug={s.slug}
              countrySlug={countrySlug}
              shortDescription={s.shortDescription}
              processingTime={s.processingTime}
            />
          ))}
        </div>
      )}

      {depth < 2 &&
        node.children.map((child) => (
          <div
            key={child.id}
            className="mt-8 border-l-0 border-slate-200 pl-0 md:border-l md:pl-6"
          >
            <CategorySection node={child} countrySlug={countrySlug} depth={depth + 1} />
          </div>
        ))}
    </section>
  );
}
