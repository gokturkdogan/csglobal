import { SiteImage } from "@/components/ui/SiteImage";
import { siteImages } from "@/lib/media";
import { contactHeroImageClassName } from "@/lib/contact-image-slot";

type Props = {
  toolCount: number;
};

export function ToolsPageHero({ toolCount }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-900">
      <div className="absolute inset-0">
        <SiteImage
          src={siteImages.contactHero}
          alt=""
          fill
          priority
          sizes="100vw"
          className={contactHeroImageClassName}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-900/94 via-slate-900/72 to-slate-900/40" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/25" />
      </div>

      <div className="relative z-[1] site-container py-16 md:py-20 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
            Pratik yardımcılar
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
            Araçlar
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-200 md:text-lg">
            Vize ve göçmenlik süreçlerinizde işinize yarayacak hesaplama ve bilgi araçları.
          </p>
          {toolCount > 0 ? (
            <div className="mt-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                <span className="text-lg font-semibold text-sky-200">{toolCount}</span>
                araç
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
