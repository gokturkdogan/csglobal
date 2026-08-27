import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { defaultOgImageUrl } from "@/lib/services/seo.service";
import { getSiteSettings } from "@/lib/settings";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: {
      default: `${settings.siteName} | Vize Danışmanlığı`,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.siteDescription,
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://csglobal.com",
    ),
    openGraph: {
      images: [{ url: defaultOgImageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      images: [defaultOgImageUrl],
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
