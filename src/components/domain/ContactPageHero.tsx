import { SiteImage } from "@/components/ui/SiteImage";
import { siteImages } from "@/lib/media";
import { contactHeroImageClassName } from "@/lib/contact-image-slot";

type Props = {
  heroImage?: string;
  title?: string;
  subtitle?: string;
};

export function ContactPageHero({ heroImage, title = "İletişim", subtitle }: Props) {
  const defaultSubtitle =
    "Vize, oturum ve göçmenlik süreçleriniz için doğrudan uzman ekibimize ulaşın. Online başvuru veya belge yükleme yok. WhatsApp veya telefon ile hızlı destek.";

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-900">
      <div className="absolute inset-0">
        <SiteImage
          src={heroImage ?? siteImages.contactHero}
          alt=""
          fill
          priority
          sizes="100vw"
          className={contactHeroImageClassName}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-900/94 via-slate-900/72 to-slate-900/40"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/25"
        />
      </div>

      <div className="relative z-[1] mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
            Uzman danışmanlık
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-200 md:text-lg">
            {subtitle?.trim() || defaultSubtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span
              className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
            >
              Yanıt süresi: genellikle aynı gün
            </span>
            <span
              className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur-sm"
            >
              Uzman danışman desteği
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
