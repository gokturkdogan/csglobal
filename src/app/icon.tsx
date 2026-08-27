import { optimizeCloudinaryPngUrl, siteImages } from "@/lib/media";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const logoUrl = optimizeCloudinaryPngUrl(siteImages.headerLogo, 64);
  const response = await fetch(logoUrl, { next: { revalidate: 86400 } });

  if (!response.ok) {
    throw new Error(`Favicon yüklenemedi: ${response.status}`);
  }

  const buffer = await response.arrayBuffer();

  return new Response(buffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
