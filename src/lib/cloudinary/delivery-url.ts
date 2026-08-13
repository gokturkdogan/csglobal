import crypto from "crypto";
import { DOCUMENTS_CLOUDINARY_FOLDER } from "@/lib/cloudinary/documents-folder";

const MIME_EXTENSION: Record<string, string> = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
};

type CloudinaryConfig = {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
};

function getCloudinaryConfig(): CloudinaryConfig {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary yapılandırması eksik (CLOUDINARY_* env)");
  }
  return { cloudName, apiKey, apiSecret };
}

function extensionFromMime(mimeType: string | null | undefined): string | null {
  if (!mimeType) return null;
  return MIME_EXTENSION[mimeType.trim().toLowerCase()] ?? null;
}

function extensionFromFileName(fileName: string | null | undefined): string | null {
  if (!fileName) return null;
  const ext = fileName.split(".").pop()?.toLowerCase();
  return ext && ext.length <= 8 ? ext : null;
}

export function versionFromCloudinaryUrl(fileUrl: string | null | undefined): string | null {
  if (!fileUrl) return null;
  const match = fileUrl.match(/\/upload\/(?:s--[^/]+--\/)?v(\d+)\//);
  return match?.[1] ?? null;
}

function stripExtension(publicId: string): string {
  const knownExt = new Set([
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "png",
    "jpg",
    "jpeg",
    "webp",
  ]);
  const lastDot = publicId.lastIndexOf(".");
  if (lastDot <= 0) return publicId;
  const ext = publicId.slice(lastDot + 1).toLowerCase();
  if (knownExt.has(ext)) return publicId.slice(0, lastDot);
  return publicId;
}

function deliveryPublicId(
  cloudinaryPublicId: string,
  mimeType: string | null | undefined,
  fileName?: string | null,
): string {
  const id = cloudinaryPublicId.trim();
  const ext = extensionFromMime(mimeType) ?? extensionFromFileName(fileName);
  if (!ext) return id;
  if (id.toLowerCase().endsWith(`.${ext}`)) return id;
  return `${id}.${ext}`;
}

function deliverySignature(pathToSign: string, apiSecret: string): string {
  return crypto
    .createHash("sha1")
    .update(pathToSign + apiSecret)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .slice(0, 8);
}

/** Untrusted hesaplarda raw dosyalar için imzalı teslimat URL'si gerekir. */
export function buildSignedCloudinaryDeliveryUrl(
  cloudinaryPublicId: string,
  mimeType: string | null | undefined,
  version: string | null,
  fileName?: string | null,
): string {
  const { cloudName, apiSecret } = getCloudinaryConfig();
  const isImage = mimeType?.startsWith("image/");
  const resourceType = isImage ? "image" : "raw";
  const deliveryId = isImage
    ? cloudinaryPublicId.trim()
    : deliveryPublicId(cloudinaryPublicId, mimeType, fileName);

  const versionPrefix = version ? `v${version}/` : "";
  const pathToSign = `${versionPrefix}${deliveryId}`;
  const signature = deliverySignature(pathToSign, apiSecret);
  const authenticatedSegment = !isImage ? "authenticated/" : "";

  return `https://res.cloudinary.com/${cloudName}/${resourceType}/${authenticatedSegment}s--${signature}--/${versionPrefix}${deliveryId}`;
}

export function buildCloudinaryDeliveryUrl(
  cloudinaryPublicId: string,
  mimeType: string | null | undefined,
  fileName?: string | null,
  version?: string | null,
): string {
  const { cloudName } = getCloudinaryConfig();
  const isImage = mimeType?.startsWith("image/");
  const resourceType = isImage ? "image" : "raw";
  const deliveryId = isImage
    ? cloudinaryPublicId.trim()
    : deliveryPublicId(cloudinaryPublicId, mimeType, fileName);
  const versionPrefix = version ? `v${version}/` : "";

  return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/${versionPrefix}${deliveryId}`;
}

export function isBrokenDocumentFileUrl(fileUrl: string): boolean {
  const url = fileUrl.toLowerCase();
  return url.includes("/image/upload/") || url.includes(".pdf.pdf");
}

type SiteAssetUrlFields = {
  fileUrl: string;
  cloudinaryPublicId: string;
  mimeType: string | null;
  fileName?: string | null;
};

function uniqueUrls(urls: string[]): string[] {
  return urls.filter((url, index) => url && urls.indexOf(url) === index);
}

/** Olası teslimat URL'leri: imzalı önce (untrusted hesaplar için). */
export function buildCloudinaryDeliveryUrlCandidates(asset: SiteAssetUrlFields): string[] {
  const version = versionFromCloudinaryUrl(asset.fileUrl);
  const publicId = asset.cloudinaryPublicId.trim();
  const stripped = stripExtension(publicId);
  const isImage = asset.mimeType?.startsWith("image/");
  const candidates: string[] = [];

  const push = (url: string) => {
    if (url && !candidates.includes(url)) candidates.push(url);
  };

  try {
    if (!isImage) {
      push(buildSignedCloudinaryDeliveryUrl(publicId, asset.mimeType, version, asset.fileName));
      if (stripped !== publicId) {
        push(buildSignedCloudinaryDeliveryUrl(stripped, asset.mimeType, version, asset.fileName));
      }
      if (!version) {
        push(buildSignedCloudinaryDeliveryUrl(publicId, asset.mimeType, null, asset.fileName));
        if (stripped !== publicId) {
          push(buildSignedCloudinaryDeliveryUrl(stripped, asset.mimeType, null, asset.fileName));
        }
      }
    }

    if (asset.fileUrl?.trim() && !isBrokenDocumentFileUrl(asset.fileUrl)) {
      push(asset.fileUrl.trim());
    }

    push(buildCloudinaryDeliveryUrl(publicId, asset.mimeType, asset.fileName, version));
    if (stripped !== publicId) {
      push(buildCloudinaryDeliveryUrl(stripped, asset.mimeType, asset.fileName, version));
    }
  } catch {
    if (asset.fileUrl?.trim()) push(asset.fileUrl.trim());
  }

  return uniqueUrls(candidates);
}

export function resolveSiteAssetFileUrl(asset: SiteAssetUrlFields): string {
  const candidates = buildCloudinaryDeliveryUrlCandidates(asset);
  return candidates[0] ?? asset.fileUrl;
}

/** Admin API ile eksik version / URL bilgisini tamamlar. */
export async function enrichCloudinaryAssetFromApi(
  cloudinaryPublicId: string,
  mimeType: string | null,
): Promise<{ version: string | null; secureUrl: string | null }> {
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  const resourceType = mimeType?.startsWith("image/") ? "image" : "raw";
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
  const encodedId = cloudinaryPublicId
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/resources/${resourceType}/upload/${encodedId}`,
    {
      headers: { Authorization: `Basic ${auth}` },
    },
  );

  if (!response.ok) {
    return { version: null, secureUrl: null };
  }

  const data = (await response.json()) as { version?: number; secure_url?: string };
  return {
    version: data.version ? String(data.version) : null,
    secureUrl: data.secure_url ?? null,
  };
}

export async function resolveSiteAssetFileUrlWithFallback(
  asset: SiteAssetUrlFields,
): Promise<string> {
  let candidates = buildCloudinaryDeliveryUrlCandidates(asset);

  if (!versionFromCloudinaryUrl(asset.fileUrl) && asset.cloudinaryPublicId) {
    const meta = await enrichCloudinaryAssetFromApi(
      asset.cloudinaryPublicId,
      asset.mimeType,
    );
    if (meta.version || meta.secureUrl) {
      const enriched: SiteAssetUrlFields = {
        ...asset,
        fileUrl: meta.secureUrl ?? asset.fileUrl,
      };
      candidates = buildCloudinaryDeliveryUrlCandidates(enriched);
    }
  }

  return candidates[0] ?? asset.fileUrl;
}
