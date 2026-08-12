import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ContactCTA } from "@/components/domain/ContactCTA";
import { CategoryLinkCard, ServiceCard } from "@/components/domain/ServiceCard";
import { DocumentList } from "@/components/domain/DocumentList";
import { FeeTable } from "@/components/domain/FeeTable";
import { FaqAccordion } from "@/components/domain/FaqAccordion";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getSiteSettings } from "@/lib/settings";
import {
  resolveCountryPath,
  loadCategoryPageData,
  buildCategoryPath,
  buildServicePath,
} from "@/lib/services/path-resolver.service";
import { findServiceByCountrySlug } from "@/lib/repositories/service.repository";
import { findCountryBySlug } from "@/lib/repositories/country.repository";
import {
  buildEntityMetadata,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  siteUrl,
} from "@/lib/services/seo.service";
import { SeoEntityType } from "@/generated/prisma/client";

type Props = { params: Promise<{ countrySlug: string; path: string[] }> };

export async function generateMetadata({ params }: Props) {
  const { countrySlug, path } = await params;
  const resolved = await resolveCountryPath(countrySlug, path);
  if (resolved.type === "not_found") return {};

  if (resolved.type === "service") {
    const country = await findCountryBySlug(countrySlug);
    if (!country) return {};
    const service = await findServiceByCountrySlug(country.id, resolved.serviceSlug);
    if (!service) return {};
    return buildEntityMetadata({
      entityType: SeoEntityType.SERVICE,
      entityId: service.id,
      path: buildServicePath(countrySlug, service.slug),
      fallbackTitle: service.name,
      fallbackDescription: service.shortDescription ?? undefined,
    });
  }

  const data = await loadCategoryPageData(countrySlug, path);
  if (!data) return {};
  return buildEntityMetadata({
    entityType: SeoEntityType.CATEGORY,
    entityId: data.category.id,
    path: buildCategoryPath(countrySlug, path),
    fallbackTitle: data.category.name,
    fallbackDescription: data.category.shortDescription ?? undefined,
  });
}

export default async function CountryPathPage({ params }: Props) {
  const { countrySlug, path } = await params;
  const resolved = await resolveCountryPath(countrySlug, path);
  const settings = await getSiteSettings();

  if (resolved.type === "not_found") notFound();

  if (resolved.type === "service") {
    const country = await findCountryBySlug(countrySlug);
    if (!country) notFound();
    const service = await findServiceByCountrySlug(country.id, resolved.serviceSlug);
    if (!service) notFound();

    const minFee = service.fees.length
      ? service.fees.reduce((min, f) =>
          Number(f.amount) < Number(min.amount) ? f : min,
        service.fees[0])
      : null;

    const generalDocs = service.serviceDocuments.filter((d) => !d.applicantProfileId);
    const profileDocs = service.serviceDocuments.filter((d) => d.applicantProfileId);

    const breadcrumbItems = [
      { label: "Anasayfa", href: "/" },
      { label: country.name, href: `/${countrySlug}` },
      { label: service.name },
    ];

    const jsonLd = [
      buildBreadcrumbJsonLd(
        breadcrumbItems.map((b) => ({
          name: b.label,
          url: b.href ? `${siteUrl}${b.href}` : `${siteUrl}/${countrySlug}/${service.slug}`,
        })),
      ),
      buildFaqJsonLd(service.faqs),
    ].filter(Boolean);

    return (
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        {jsonLd.map((ld, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
          />
        ))}

        <Breadcrumb items={breadcrumbItems} />

        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              {service.name}
            </h1>
            {service.shortDescription && (
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                {service.shortDescription}
              </p>
            )}

            <div className="mt-8">
              <ContactCTA
                settings={settings}
                context={`${country.name} - ${service.name}`}
                title="Bu hizmet için danışmanlık"
              />
            </div>

            {service.sections.map((section) => (
              <section key={section.id} id={section.slug} className="mt-12 scroll-mt-24">
                <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
                <div className="mt-4">
                  <MarkdownContent content={section.content} />
                </div>
              </section>
            ))}

            {generalDocs.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-semibold text-slate-900">Gerekli evraklar</h2>
                <div className="mt-4">
                  <DocumentList documents={generalDocs} />
                </div>
              </section>
            )}

            {profileDocs.length > 0 && (
              <section className="mt-8">
                <DocumentList documents={profileDocs} title="Profil bazlı evraklar" />
              </section>
            )}

            {service.fees.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-semibold text-slate-900">Ücretler</h2>
                <div className="mt-4">
                  <FeeTable fees={service.fees} />
                </div>
              </section>
            )}

            {service.faqs.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-semibold text-slate-900">Sık sorulan sorular</h2>
                <div className="mt-4">
                  <FaqAccordion items={service.faqs} />
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-lg border border-slate-200 bg-white p-5 text-sm">
              <p className="font-semibold text-slate-900">Hızlı bilgi</p>
              <dl className="mt-4 space-y-3 text-slate-600">
                {service.processingTime && (
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-slate-400">Süre</dt>
                    <dd>{service.processingTime}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs uppercase tracking-wide text-slate-400">Randevu</dt>
                  <dd>{service.requiresAppointment ? "Gerekli" : "Ülkeye bağlı"}</dd>
                </div>
                {minFee && (
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-slate-400">Ücret</dt>
                    <dd>
                      {minFee.amount.toString()} {minFee.currency} ve üzeri
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {service.sections.length > 0 && (
              <nav className="rounded-lg border border-slate-200 bg-white p-5 text-sm">
                <p className="font-semibold text-slate-900">İçindekiler</p>
                <ul className="mt-3 space-y-2">
                  {service.sections.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.slug}`} className="text-slate-600 hover:text-csg-blue">
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </aside>
        </div>
      </div>
    );
  }

  const data = await loadCategoryPageData(countrySlug, path);
  if (!data) notFound();

  const breadcrumbItems = [
    { label: "Anasayfa", href: "/" },
    { label: data.country.name, href: `/${countrySlug}` },
    ...data.categories.map((c, i) => ({
      label: c.name,
      href:
        i < data.categories.length - 1
          ? buildCategoryPath(countrySlug, path.slice(0, i + 1))
          : undefined,
    })),
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
        {data.category.name}
      </h1>
      {data.category.shortDescription && (
        <p className="mt-3 text-slate-600">{data.category.shortDescription}</p>
      )}

      {data.children.length > 0 && (
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {data.children.map(({ category, childCount, serviceCount }) => (
            <CategoryLinkCard
              key={category.id}
              name={category.name}
              href={buildCategoryPath(countrySlug, [...path, category.slug])}
              meta={`${childCount + serviceCount} öğe`}
            />
          ))}
        </div>
      )}

      {data.services.length > 0 && (
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {data.services.map((s) => (
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

      <div className="mt-12">
        <ContactCTA settings={settings} context={data.category.name} />
      </div>
    </div>
  );
}
