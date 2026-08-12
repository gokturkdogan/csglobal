import type { SiteSettingsMap } from "@/lib/settings";
import { buildWhatsAppUrl } from "@/lib/settings";
import Link from "next/link";
import { WhatsAppIcon, whatsappButtonClass } from "@/components/ui/WhatsAppIcon";

export function ContactCTA({
  settings,
  title = "Uzman danışmanlık için iletişime geçin",
  subtitle = "Online başvuru veya belge yükleme yok. WhatsApp veya telefon ile doğrudan bize ulaşın.",
  context,
}: {
  settings: SiteSettingsMap;
  title?: string;
  subtitle?: string;
  context?: string;
}) {
  const message = context
    ? `${settings.whatsappMessage} (${context})`
    : settings.whatsappMessage;
  const whatsappUrl = buildWhatsAppUrl(settings.whatsappNumber, message);

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 md:p-8">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{subtitle}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${whatsappButtonClass} px-5 py-2.5`}
        >
          <WhatsAppIcon className="h-5 w-5 shrink-0" />
          WhatsApp
        </a>
        <Link
          href="/iletisim"
          className="inline-flex items-center justify-center rounded-md bg-csg-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-csg-blue-dark"
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
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition hover:scale-105 hover:bg-[#1da851] md:bottom-8 md:right-8"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
