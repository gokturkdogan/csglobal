import Link from "next/link";
import type { SiteSettingsMap } from "@/lib/site-settings.shared";
import { buildWhatsAppUrl } from "@/lib/site-settings.shared";
import { siteImages } from "@/lib/media";
import { SiteImage } from "@/components/ui/SiteImage";
import { WhatsAppIcon, whatsappButtonClass } from "@/components/ui/WhatsAppIcon";

const navItems = [
  { href: "/ulkeler", label: "Ülkeler" },
  { href: "/hizmetlerimiz", label: "Programlar" },
  { href: "/rehber", label: "Rehber" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

export function Header({
  siteName,
  whatsappNumber,
  whatsappMessage,
  logoUrl,
}: Pick<SiteSettingsMap, "siteName" | "whatsappNumber" | "whatsappMessage"> & {
  logoUrl?: string;
}) {
  const whatsappUrl = buildWhatsAppUrl(whatsappNumber, whatsappMessage);
  const trimmedLogo = logoUrl?.trim();
  const logo =
    trimmedLogo && !trimmedLogo.includes("lheader-logo.jpg")
      ? trimmedLogo
      : siteImages.headerLogo;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-sm">
      <div className="site-container flex items-center justify-between gap-4 py-3">
        <Link href="/" className="flex shrink-0 cursor-pointer items-center" aria-label={siteName}>
          <SiteImage
            src={logo}
            alt={siteName}
            width={200}
            height={56}
            priority
            className="h-10 w-auto max-w-[180px] object-contain md:h-12 md:max-w-[220px]"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Ana menü">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-csg-blue"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={whatsappButtonClass}
          >
            <WhatsAppIcon className="h-4 w-4 shrink-0" />
            WhatsApp
          </a>
          <Link
            href="/iletisim"
            className="cursor-pointer rounded-md bg-csg-red px-4 py-2 text-sm font-semibold text-white transition hover:bg-csg-red-dark"
          >
            Danışmanlık Al
          </Link>
        </div>

        <details className="relative lg:hidden">
          <summary className="list-none cursor-pointer rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700">
            Menü
          </summary>
          <nav className="absolute right-0 mt-2 w-52 rounded-lg border border-slate-200 bg-white py-2 shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block cursor-pointer px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}

export function Footer({
  siteName,
  contactPhone,
  contactEmail,
}: Pick<SiteSettingsMap, "siteName" | "contactPhone" | "contactEmail">) {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="site-container grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="text-base font-semibold text-slate-900">{siteName}</p>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Vize, oturum, çalışma izni ve vatandaşlık süreçleriniz için kurumsal danışmanlık.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Bağlantılar</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link href="/ulkeler" className="cursor-pointer hover:text-csg-blue">Ülkeler</Link></li>
            <li><Link href="/hizmetlerimiz" className="cursor-pointer hover:text-csg-blue">Programlar</Link></li>
            <li><Link href="/rehber" className="cursor-pointer hover:text-csg-blue">Rehber & Blog</Link></li>
            <li><Link href="/hakkimizda" className="cursor-pointer hover:text-csg-blue">Hakkımızda</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">İletişim</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {contactPhone && (
              <li>
                <a href={`tel:${contactPhone.replace(/\s/g, "")}`} className="cursor-pointer hover:text-csg-blue">
                  {contactPhone}
                </a>
              </li>
            )}
            {contactEmail && (
              <li>
                <a href={`mailto:${contactEmail}`} className="cursor-pointer hover:text-csg-blue">
                  {contactEmail}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {siteName}
      </div>
    </footer>
  );
}
