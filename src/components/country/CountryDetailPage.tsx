import type { SiteSettingsMap } from "@/lib/site-settings.shared";
import {
  buildCountryDetailParagraphs,
  buildCountryQuickStats,
  parseCountryDetailSectionsJson,
  parseCountryNotesJson,
} from "@/lib/country-detail";
import type { CountryCategoryPanelItem, CountryConsulatePanelItem, CountryDocumentPanelItem } from "@/lib/country-page/category-panel";
import { ContactCTA } from "@/components/domain/ContactCTA";
import { FaqAccordion } from "@/components/domain/FaqAccordion";
import { CountryPageHero } from "@/components/domain/CountryPageHero";
import { CountryCategoryPanel } from "@/components/country/CountryCategoryPanel";
import { RichContent } from "@/components/RichTextContent";

export type CountryDetailViewModel = {
  id: string;
  name: string;
  slug: string;
  flag: string | null;
  heroImage?: string | null;
  shortDescription: string | null;
  visaRegion: string | null;
  requiresAppointment: boolean;
  averageProcessingTime: string | null;
  detailParagraph1: string | null;
  detailParagraph2: string | null;
  importantNotesJson: string | null;
  detailSectionsJson: string | null;
  faqs: Array<{ question: string; answer: string }>;
};

type Props = {
  country: CountryDetailViewModel;
  settings: SiteSettingsMap;
  serviceCount: number;
  categoryCount: number;
  categories: CountryCategoryPanelItem[];
  consulates?: CountryConsulatePanelItem[];
  documents?: CountryDocumentPanelItem[];
};

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="country-section-heading">
      <div className="min-w-0">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm leading-relaxed text-slate-500">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

export function CountryDetailPage({
  country,
  settings,
  serviceCount,
  categoryCount,
  categories = [],
  consulates = [],
  documents = [],
}: Props) {
  const paragraphs = buildCountryDetailParagraphs(country);
  const stats = buildCountryQuickStats({
    name: country.name,
    visaRegion: country.visaRegion,
    averageProcessingTime: country.averageProcessingTime,
    requiresAppointment: country.requiresAppointment,
    categoryCount,
  });
  const importantNotes = parseCountryNotesJson(country.importantNotesJson);
  const detailSections = parseCountryDetailSectionsJson(country.detailSectionsJson);
  const heroBadge = country.visaRegion?.trim() || "Ülke rehberi";

  return (
    <>
      <CountryPageHero
        name={country.name}
        shortDescription={country.shortDescription}
        flag={country.flag}
        heroImage={country.heroImage}
        serviceCount={serviceCount}
        categoryCount={categoryCount}
        badge={heroBadge}
        subtitle={country.shortDescription ?? undefined}
        primaryCta={{ label: "Program kategorileri", href: "#kategoriler-panel" }}
        secondaryCta={{ label: "İletişim", href: "/iletisim" }}
      />

      <div className="country-detail-main border-b border-slate-200/60">
        <div className="site-container py-10 md:py-14">
          <div className="grid gap-6 lg:grid-cols-[minmax(240px,280px)_1fr] lg:gap-8 lg:items-start">
            <aside className="country-panel-sticky lg:z-30 lg:self-start">
              <CountryCategoryPanel
                countrySlug={country.slug}
                categories={categories}
                consulates={consulates}
                documents={documents}
              />
            </aside>

            <div className="min-w-0 space-y-8 md:space-y-10">
              {(paragraphs.length > 0 || stats.length > 0) && (
                <section className="country-section-card p-6 md:p-8">
                  <SectionHeading
                    title={`${country.name} vize ve göçmenlik rehberi`}
                    subtitle="Ülkeye özel süreç, evrak ve randevu bilgileri"
                  />
                  {paragraphs.length > 0 && (
                    <div className="mt-6 space-y-4 text-content text-slate-600">
                      {paragraphs.map((p, i) => (
                        <p key={i} className="whitespace-pre-line">{p}</p>
                      ))}
                    </div>
                  )}
                  {stats.length > 0 && (
                    <dl className="mt-8 grid gap-3 sm:grid-cols-2">
                      {stats.map((stat) => (
                        <div key={stat.label} className="country-metric-card">
                          <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                            {stat.label}
                          </dt>
                          <dd className="mt-2 text-lg font-semibold tracking-tight text-csg-blue">
                            {stat.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </section>
              )}

              {importantNotes.length > 0 && (
                <section className="country-section-card p-6 md:p-8">
                  <SectionHeading
                    title={`${country.name} başvurularında önemli notlar`}
                    subtitle="Başvuru öncesi dikkat edilmesi gereken hususlar"
                  />
                  <ul className="mt-6 space-y-2.5">
                    {importantNotes.map((note, index) => (
                      <li key={note} className="country-note-item">
                        <span className="country-note-icon">{index + 1}</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {detailSections.map((section, index) => (
                <section
                  key={`${section.title}-${index}`}
                  className="country-section-card p-6 md:p-8"
                >
                  <SectionHeading title={section.title} />
                  <div className="mt-6 country-detail-prose">
                    <RichContent content={section.content} />
                  </div>
                </section>
              ))}

              {country.faqs.length > 0 && (
                <section className="country-section-card p-6 md:p-8">
                  <SectionHeading
                    title={`${country.name} vizesi hakkında sık sorulan sorular`}
                  />
                  <div className="mt-6">
                    <FaqAccordion
                      items={country.faqs}
                      variant="modern"
                      initialOpenIndex={null}
                    />
                  </div>
                </section>
              )}

              <ContactCTA
                settings={settings}
                context={`${country.name} vize danışmanlığı`}
                title={`${country.name} için uzman danışmanlık`}
                subtitle="Online başvuru veya belge yükleme yok. WhatsApp veya telefon ile doğrudan uzman ekibimize ulaşın."
                variant="country"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
