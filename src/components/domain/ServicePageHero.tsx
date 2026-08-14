import { SiteImage } from "@/components/ui/SiteImage";
import {
  resolveServiceHeroImage,
  serviceHeroImageClassName,
} from "@/lib/service-page";

export type ServiceHeroQuickInfo = {
  processingTime?: string | null;
  requiresAppointment?: boolean;
  feeAmount?: string | null;
  feeCurrency?: string | null;
};

type Props = {
  heroImage?: string | null;
  title: string;
  subtitle?: string | null;
  badge?: string | null;
  quickInfo?: ServiceHeroQuickInfo;
};

export function ServicePageHero({
  heroImage,
  title,
  subtitle,
  badge = "Program",
  quickInfo,
}: Props) {
  const badges: Array<{ label: string; value: string; highlight?: boolean }> = [];

  if (quickInfo?.processingTime?.trim()) {
    badges.push({ label: "Süre", value: quickInfo.processingTime.trim(), highlight: true });
  }

  badges.push({
    label: "Randevu",
    value: quickInfo?.requiresAppointment ? "Gerekli" : "Ülkeye bağlı",
  });

  if (quickInfo?.feeAmount?.trim() && quickInfo.feeCurrency?.trim()) {
    badges.push({
      label: "Ücret",
      value: `${quickInfo.feeAmount.trim()} ${quickInfo.feeCurrency.trim()} ve üzeri`,
    });
  }

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-900">
      <div className="absolute inset-0">
        <SiteImage
          src={resolveServiceHeroImage(heroImage)}
          alt=""
          fill
          priority
          sizes="100vw"
          className={serviceHeroImageClassName}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-900/94 via-slate-900/72 to-slate-900/40"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/25"
        />
      </div>

      <div className="relative z-[1] site-container py-16 md:py-20 lg:py-24">
        <div className="max-w-3xl">
          {badge?.trim() && (
            <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
              {badge}
            </p>
          )}
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
            {title}
          </h1>
          {subtitle?.trim() && (
            <p className="mt-4 text-base leading-relaxed text-slate-200 md:text-lg">
              {subtitle}
            </p>
          )}

          {badges.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {badges.map((item) => (
                <span
                  key={item.label}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm backdrop-blur-sm ${
                    item.highlight
                      ? "border-white/25 bg-white/10 font-medium text-white"
                      : "border-white/15 bg-white/5 text-slate-200"
                  }`}
                >
                  <span className="text-xs uppercase tracking-wide text-slate-300">
                    {item.label}
                  </span>
                  <span
                    className={
                      item.highlight
                        ? "font-semibold text-sky-200"
                        : "font-semibold text-white"
                    }
                  >
                    {item.value}
                  </span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
