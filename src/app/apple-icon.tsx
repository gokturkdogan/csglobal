import { ImageResponse } from "next/og";
import { optimizeCloudinaryDeliveryUrl, siteImages } from "@/lib/media";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const logoUrl = optimizeCloudinaryDeliveryUrl(siteImages.headerLogo, 180);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
        }}
      >
        <img src={logoUrl} width={160} height={160} alt="" />
      </div>
    ),
    { ...size },
  );
}
