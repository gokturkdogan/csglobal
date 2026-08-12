import type { SiteSettingsMap } from "@/lib/site-settings.shared";
import { buildWhatsAppUrl } from "@/lib/site-settings.shared";
import Link from "next/link";
import { WhatsAppIcon, whatsappButtonClass } from "@/components/ui/WhatsAppIcon";

export function ContactCTA({
  settings,
  title = "Uzman danışmanlık için iletişime geçin",
  subtitle = "Online başvuru veya belge yükleme yok. WhatsApp veya telefon ile doğrudan bize ulaşın.",
  context,
  variant = "default",
}: {
  settings: SiteSettingsMap;
  title?: string;
  subtitle?: string;
  context?: string;
  variant?: "default" | "country";
}) {
  const message = context
    ? `${settings.whatsappMessage} (${context})`
    : settings.whatsappMessage;
  const whatsappUrl = buildWhatsAppUrl(settings.whatsappNumber, message);
  const isCountry = variant === "country";

  return (
    <section
      className={
        isCountry
          ? "country-cta-card"
          : "rounded-lg border border-slate-200 bg-white p-6 md:p-8"
      }
    >
      <h2
        className={
          isCountry
            ? "text-xl font-semibold tracking-tight text-white md:text-2xl"
            : "text-xl font-semibold text-slate-900"
        }
      >
        {title}
      </h2>
      <p
        className={
          isCountry
            ? "mt-3 max-w-2xl text-sm leading-relaxed text-white/85 md:text-[0.9375rem]"
            : "mt-2 text-sm text-slate-600 leading-relaxed"
        }
      >
        {subtitle}
      </p>
      <div
        className={`mt-6 flex flex-col gap-3 sm:flex-row sm:items-center ${
          isCountry ? "sm:gap-4" : ""
        }`}
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${whatsappButtonClass} justify-center px-5 py-2.5 sm:min-w-[140px] ${
            isCountry ? "shadow-sm" : ""
          }`}
        >
          <WhatsAppIcon className="h-5 w-5 shrink-0" />
          WhatsApp
        </a>
        <Link
          href="/iletisim"
          className={`inline-flex cursor-pointer items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition sm:min-w-[140px] ${
            isCountry
              ? "border border-white/30 bg-white/10 text-white hover:bg-white/20"
              : "bg-csg-blue text-white hover:bg-csg-blue-dark"
          }`}
        >
          İletişim
        </Link>
      </div>
    </section>
  );
}

export function FloatingWhatsApp({ settings }: { settings: SiteSettingsMap }) {
  const whatsappUrl = buildWhatsAppUrl(
    settings.whatsappNumber,
    settings.whatsappMessage,
  );

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition hover:scale-105 hover:bg-[#1da851] md:bottom-8 md:right-8"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
