import "@/app/globals.css";
import { Header, Footer } from "@/components/layout/HeaderFooter";
import { FloatingPhone, FloatingWhatsApp } from "@/components/domain/ContactCTA";
import { getSiteSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <>
      <Header
        siteName={settings.siteName}
        whatsappNumber={settings.whatsappNumber}
        whatsappMessage={settings.whatsappMessage}
        logoUrl={settings.headerLogoUrl}
      />
      <main className="min-h-[60vh]">{children}</main>
      <Footer
        siteName={settings.siteName}
        contactPhone={settings.contactPhone}
        contactEmail={settings.contactEmail}
      />
      <FloatingPhone settings={settings} />
      <FloatingWhatsApp settings={settings} />
    </>
  );
}
