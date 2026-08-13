import { NextResponse } from "next/server";
import {
  buildCloudinaryDeliveryUrlCandidates,
  enrichCloudinaryAssetFromApi,
} from "@/lib/cloudinary/delivery-url";
import { findSiteAssetForPublicUrl } from "@/lib/repositories/site-asset.repository";

type RouteContext = {
  params: Promise<{ id: string }>;
};

async function fetchFirstAvailableUrl(urls: string[]): Promise<Response | null> {
  for (const url of urls) {
    try {
      const response = await fetch(url, { redirect: "follow" });
      if (response.ok && response.body) {
        return response;
      }
    } catch {
      continue;
    }
  }
  return null;
}

function streamFromDatabase(
  fileData: Uint8Array | Buffer,
  mimeType: string | null,
  fileName: string,
) {
  const headers = new Headers();
  headers.set("Content-Type", mimeType ?? "application/pdf");
  headers.set("Cache-Control", "public, max-age=86400");
  headers.set(
    "Content-Disposition",
    `inline; filename="${fileName.replace(/"/g, "")}"`,
  );

  const body = Buffer.from(fileData);
  return new NextResponse(body, { status: 200, headers });
}

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const assetId = Number.parseInt(id, 10);
  if (!Number.isFinite(assetId)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const countrySlug = searchParams.get("countrySlug")?.trim();
  const fileName = searchParams.get("fileName")?.trim();
  if (!countrySlug || !fileName) {
    return new NextResponse("Not found", { status: 404 });
  }

  const asset = await findSiteAssetForPublicUrl(assetId, countrySlug, fileName);
  if (!asset) {
    return new NextResponse("Not found", { status: 404 });
  }

  if (asset.fileData && asset.fileData.length > 0) {
    return streamFromDatabase(asset.fileData, asset.mimeType, asset.fileName);
  }

  if (!asset.cloudinaryPublicId) {
    return new NextResponse("Dosya bulunamadı", { status: 404 });
  }

  let candidates = buildCloudinaryDeliveryUrlCandidates({
    fileUrl: asset.fileUrl,
    cloudinaryPublicId: asset.cloudinaryPublicId,
    mimeType: asset.mimeType,
    fileName: asset.fileName,
  });

  if (!asset.fileUrl.includes("/v")) {
    const meta = await enrichCloudinaryAssetFromApi(
      asset.cloudinaryPublicId,
      asset.mimeType,
    );
    if (meta.version || meta.secureUrl) {
      candidates = buildCloudinaryDeliveryUrlCandidates({
        fileUrl: meta.secureUrl ?? asset.fileUrl,
        cloudinaryPublicId: asset.cloudinaryPublicId,
        mimeType: asset.mimeType,
        fileName: asset.fileName,
      });
    }
  }

  const upstream = await fetchFirstAvailableUrl(candidates);
  if (!upstream?.body) {
    return new NextResponse("Dosya bulunamadı", { status: 404 });
  }

  const contentType =
    upstream.headers.get("content-type") ??
    asset.mimeType ??
    "application/octet-stream";

  const headers = new Headers();
  headers.set("Content-Type", contentType);
  headers.set("Cache-Control", "public, max-age=3600");
  headers.set(
    "Content-Disposition",
    `inline; filename="${asset.fileName.replace(/"/g, "")}"`,
  );

  return new NextResponse(upstream.body, { status: 200, headers });
}
