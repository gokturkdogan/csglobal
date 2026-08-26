import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { optimizeCloudinaryDeliveryUrl, siteImages } from "@/lib/media";
import { getSiteSettings } from "@/lib/settings";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const faviconUrl = optimizeCloudinaryDeliveryUrl(siteImages.headerLogo, 64);

  return {
    title: {
      default: `${settings.siteName} | Vize Danışmanlığı`,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.siteDescription,
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://csglobal.com",
    ),
    icons: {
      icon: [{ url: faviconUrl, type: "image/png" }],
      apple: [{ url: faviconUrl, type: "image/png" }],
      shortcut: faviconUrl,
    },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${inter.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
