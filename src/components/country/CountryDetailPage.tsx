import type { SiteSettingsMap } from "@/lib/site-settings.shared";
import {
  buildCountryDetailParagraphs,
  buildCountryQuickStats,
  parseCountryNotesJson,
} from "@/lib/country-detail";
import { getMockCountryCategories } from "@/lib/country-page/mock-category-services";
import { ContactCTA } from "@/components/domain/ContactCTA";
import { FaqAccordion } from "@/components/domain/FaqAccordion";
import { CountryPageHero } from "@/components/domain/CountryPageHero";
import { CountryCategoryPanel } from "@/components/country/CountryCategoryPanel";

export type CountryDetailViewModel = {
  id: string;
  name: string;
  slug: string;
  flag: string | null;
  shortDescription: string | null;
  visaRegion: string | null;
  requiresAppointment: boolean;
  averageProcessingTime: string | null;
  detailParagraph1: string | null;
  detailParagraph2: string | null;
  importantNotesJson: string | null;
  faqs: Array<{ question: string; answer: string }>;
};

type Props = {
  country: CountryDetailViewModel;
  settings: SiteSettingsMap;
  serviceCount: number;
  categoryCount: number;
};

export function CountryDetailPage({
  country,
  settings,
  serviceCount,
  categoryCount,
}: Props) {
  const mockCategories = getMockCountryCategories(country.name);
  const paragraphs = buildCountryDetailParagraphs(country);
  const stats = buildCountryQuickStats({
    name: country.name,
    visaRegion: country.visaRegion,
    averageProcessingTime: country.averageProcessingTime,
    requiresAppointment: country.requiresAppointment,
    categoryCount,
  });
  const importantNotes = parseCountryNotesJson(country.importantNotesJson);
  const heroBadge = country.visaRegion?.trim() || "Ülke rehberi";

  return (
    <>
      <CountryPageHero
        name={country.name}
        shortDescription={country.shortDescription}
        flag={country.flag}
        serviceCount={serviceCount}
        categoryCount={categoryCount}
        badge={heroBadge}
        subtitle={country.shortDescription ?? undefined}
        primaryCta={{ label: "Hizmet kategorileri", href: "#kategoriler-panel" }}
        secondaryCta={{ label: "İletişim", href: "/iletisim" }}
      />

      <div className="home-band-soft border-b border-slate-200/80">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(280px,320px)_1fr] lg:items-start">
            <aside className="country-panel-sticky lg:self-start lg:z-30">
              <CountryCategoryPanel
                countrySlug={country.slug}
                categories={mockCategories}
              />
            </aside>

            <div className="min-w-0 space-y-14 md:space-y-16">
              {(paragraphs.length > 0 || stats.length > 0) && (
                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
                    {country.name} vize ve göçmenlik rehberi
                  </h2>
                  {paragraphs.length > 0 && (
                    <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
                      {paragraphs.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                  )}
                  {stats.length > 0 && (
                    <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                      {stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-lg border border-slate-200 bg-white px-4 py-3"
                        >
                          <dt className="text-xs text-slate-500">{stat.label}</dt>
                          <dd className="mt-1 text-lg font-semibold text-csg-blue">
                            {stat.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </section>
              )}

              {importantNotes.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
                    {country.name} başvurularında önemli notlar
                  </h2>
                  <ul className="mt-6 space-y-2">
                    {importantNotes.map((note) => (
                      <li
                        key={note}
                        className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 leading-relaxed"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-csg-blue" />
                        {note}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {country.faqs.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
                    {country.name} vizesi hakkında sık sorulan sorular
                  </h2>
                  <div className="mt-6">
                    <FaqAccordion items={country.faqs} />
                  </div>
                </section>
              )}

              <ContactCTA
                settings={settings}
                context={`${country.name} vize danışmanlığı`}
                title={`${country.name} için uzman danışmanlık`}
                subtitle="Online başvuru veya belge yükleme yok. WhatsApp veya telefon ile doğrudan uzman ekibimize ulaşın."
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
