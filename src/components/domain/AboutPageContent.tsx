import Link from "next/link";
import { SiteImage } from "@/components/ui/SiteImage";
import { ContactCTA } from "@/components/domain/ContactCTA";
import {
  resolveAboutValuesSectionImage,
  resolveAboutWhoWeAreImage,
  type AboutPageContent,
} from "@/lib/about";
import { siteImages } from "@/lib/media";
import type { SiteSettingsMap } from "@/lib/site-settings.shared";

const whyUsIcons = [
  (
    <svg key="0" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  ),
  (
    <svg key="1" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  (
    <svg key="2" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
  ),
  (
    <svg key="3" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
];

type Props = {
  content: AboutPageContent;
  settings: SiteSettingsMap;
};

export function AboutPageContent({ content, settings }: Props) {
  const { whyUs, stats, cta } = content;

  return (
    <>
      <section className="about-page-section bg-white">
        <div className="site-container py-14 md:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200/80">
              <SiteImage
                src={resolveAboutWhoWeAreImage(content.whoWeAreImage)}
                alt="CSGLOBAL danışmanlık ofisi"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                {content.whoWeAreTitle}
              </h2>
              <p className="mt-4 text-lg font-medium leading-relaxed text-slate-800">
                {content.whoWeAreLead}
              </p>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600">
                {content.whoWeAreParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-page-section home-band-soft">
        <div className="site-container py-14 md:py-20">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="about-vision-card rounded-2xl border border-white/70 bg-white/90 p-6 shadow-sm backdrop-blur-sm md:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-csg-blue/10 text-csg-blue">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="mt-5 text-xl font-semibold text-slate-900 md:text-2xl">
                {content.visionTitle}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">{content.visionText}</p>
            </article>
            <article className="about-vision-card rounded-2xl border border-white/70 bg-white/90 p-6 shadow-sm backdrop-blur-sm md:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-csg-blue/10 text-csg-blue">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 9.813V15M12 15V9.75m-3 0V15M6.75 15h10.5a1.5 1.5 0 001.5-1.5V6.75A1.5 1.5 0 0017.25 5.25h-10.5A1.5 1.5 0 005.25 6.75v6.75a1.5 1.5 0 001.5 1.5z" />
                </svg>
              </div>
              <h2 className="mt-5 text-xl font-semibold text-slate-900 md:text-2xl">
                {content.missionTitle}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">{content.missionText}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="about-page-section home-band-navy">
        <div className="site-container py-14 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">{whyUs.title}</h2>
            <p className="mt-3 text-base leading-relaxed text-white/85">{whyUs.subtitle}</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.items.map((item, index) => (
              <article
                key={item.title}
                className="home-glass-card rounded-xl p-6 shadow-lg shadow-black/15"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 text-white ring-1 ring-white/30">
                  {whyUsIcons[index % whyUsIcons.length]}
                </div>
                <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/90">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-page-section bg-white">
        <div className="site-container py-14 md:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                {content.valuesTitle}
              </h2>
              <p className="mt-3 text-base text-slate-600">{content.valuesSubtitle}</p>
              <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                {content.valuesItems.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-4"
                  >
                    <dt className="font-semibold text-slate-900">{item.title}</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200/80">
              <SiteImage
                src={resolveAboutValuesSectionImage(content.valuesSectionImage)}
                alt="CSGLOBAL uzman danışmanlık toplantısı"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="about-stat-card rounded-xl border border-slate-200 bg-white px-4 py-5 text-center shadow-sm"
              >
                <dd className="text-2xl font-semibold text-csg-blue md:text-3xl">{stat.value}</dd>
                <dt className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="about-page-section border-t border-slate-200/60">
        <div className="site-container py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <ContactCTA settings={settings} title={cta.title} subtitle={cta.subtitle} />
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-md ring-1 ring-slate-200/80">
              <SiteImage
                src={siteImages.travel}
                alt="Uluslararası vize ve seyahat danışmanlığı"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-slate-600 md:text-base">
            Telefon, e-posta, WhatsApp ve ofis bilgileri için{" "}
            <Link
              href="/iletisim"
              className="font-semibold text-csg-blue transition hover:text-csg-blue-dark hover:underline"
            >
              iletişim sayfamıza gidin
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
