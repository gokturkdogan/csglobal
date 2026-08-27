import { optimizeCloudinaryPngUrl, siteImages } from "@/lib/media";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const logoUrl = optimizeCloudinaryPngUrl(siteImages.headerLogo, 180);
  const response = await fetch(logoUrl, { next: { revalidate: 86400 } });

  if (!response.ok) {
    throw new Error(`Apple icon yüklenemedi: ${response.status}`);
  }

  const buffer = await response.arrayBuffer();

  return new Response(buffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
