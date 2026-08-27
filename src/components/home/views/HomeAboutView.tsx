import type { HomepageContent } from "@/lib/homepage";
import { SiteImage } from "@/components/ui/SiteImage";

export function HomeAboutView({ content }: { content: HomepageContent }) {
  return (
    <section className="bg-white border-t border-slate-100">
      <div className="site-container py-16 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            <SiteImage
              src={content.aboutImage}
              alt={content.aboutTitle}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              {content.aboutTitle}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">{content.aboutText}</p>

            {content.stats.length > 0 && (
              <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2">
                {content.stats.map((stat, index) => (
                  <div
                    key={`${stat.label}-${index}`}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-3"
                  >
                    <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      {stat.label}
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold text-csg-blue">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
