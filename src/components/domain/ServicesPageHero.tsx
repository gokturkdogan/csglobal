import { SiteImage } from "@/components/ui/SiteImage";
import { siteImages } from "@/lib/media";

export function ServicesPageHero({ serviceCount }: { serviceCount: number }) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-900">
      <div className="absolute inset-0">
        <SiteImage
          src={siteImages.countryDetailHero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center md:object-[center_35%]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-900/92 via-slate-900/65 to-slate-900/30"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/20"
        />
      </div>

      <div className="relative z-[1] site-container py-16 md:py-20 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
            Vize ve göçmenlik
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
            Hizmetlerimiz
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-200 md:text-lg">
            Tüm ülkelerde sunduğumuz vize, oturum ve göçmenlik hizmetlerini tek listede
            inceleyin. Detay sayfasından süre, evrak ve ücret bilgilerine ulaşabilirsiniz.
          </p>

          {serviceCount > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              <span
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
              >
                <span className="text-lg font-semibold text-sky-200">{serviceCount}</span>
                aktif hizmet
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
