import { ImageResponse } from "next/og";
import { optimizeCloudinaryDeliveryUrl, siteImages } from "@/lib/media";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const logoUrl = optimizeCloudinaryDeliveryUrl(siteImages.headerLogo, 64);

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
        <img src={logoUrl} width={32} height={32} alt="" />
      </div>
    ),
    { ...size },
  );
}
