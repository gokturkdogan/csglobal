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
            ? "mt-3 max-w-2xl text-sm leading-relaxed text-white/85 md:text-content"
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

function PhoneIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function FloatingPhone({ settings }: { settings: SiteSettingsMap }) {
  const phone = settings.contactPhone?.trim();
  if (!phone) return null;

  const phoneHref = `tel:${phone.replace(/\s/g, "")}`;

  return (
    <a
      href={phoneHref}
      aria-label="Telefon"
      className="fixed bottom-6 left-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-csg-blue text-white shadow-md transition hover:scale-105 hover:bg-csg-blue-dark md:bottom-8 md:left-8"
    >
      <PhoneIcon className="h-6 w-6" />
    </a>
  );
}
