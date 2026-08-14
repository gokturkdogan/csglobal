import crypto from "crypto";
import { parseAboutImagePublicId } from "@/lib/cloudinary/about-folder";
import { parseHomeImagePublicId } from "@/lib/cloudinary/home-folder";
import { parseHerosImagePublicId } from "@/lib/cloudinary/heros-folder";
import { parseDocumentPublicId } from "@/lib/cloudinary/documents-folder";
import { parseConsulateImagePublicId } from "@/lib/cloudinary/consulates-folder";
import { parseCountryImagePublicId } from "@/lib/cloudinary/countries-folder";
import { parseGuidesImagePublicId } from "@/lib/cloudinary/guides-folder";
import { parseServiceImagePublicId } from "@/lib/cloudinary/services-folder";

type CloudinaryConfig = {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
};

function getConfig(): CloudinaryConfig {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary yapılandırması eksik (CLOUDINARY_* env)");
  }

  return { cloudName, apiKey, apiSecret };
}

function signParams(params: Record<string, string>, apiSecret: string): string {
  const sorted = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return crypto.createHash("sha1").update(sorted + apiSecret).digest("hex");
}

async function uploadWithFolder(
  file: Buffer,
  folder: string,
  publicId: string,
  mimeType: string,
): Promise<{ secureUrl: string; publicId: string; version: number }> {
  const { cloudName, apiKey, apiSecret } = getConfig();
  const timestamp = String(Math.round(Date.now() / 1000));

  const paramsToSign: Record<string, string> = {
    folder,
    overwrite: "true",
    invalidate: "true",
    public_id: publicId,
    timestamp,
  };

  const signature = signParams(paramsToSign, apiSecret);

  const body = new FormData();
  const blob = new Blob([new Uint8Array(file)], { type: mimeType });
  body.append("file", blob, "upload.jpg");
  body.append("api_key", apiKey);
  body.append("timestamp", timestamp);
  body.append("folder", folder);
  body.append("public_id", publicId);
  body.append("overwrite", "true");
  body.append("invalidate", "true");
  body.append("signature", signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body,
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Cloudinary yükleme hatası: ${errText}`);
  }

  const data = (await response.json()) as {
    secure_url: string;
    public_id: string;
    version: number;
  };
  return {
    secureUrl: data.secure_url,
    publicId: data.public_id,
    version: data.version,
  };
}

function parseCloudinaryErrorMessage(errText: string): string {
  try {
    const parsed = JSON.parse(errText) as { error?: { message?: string } };
    if (parsed.error?.message?.trim()) {
      return parsed.error.message.trim();
    }
  } catch {
    // JSON değilse ham metin kullanılır
  }
  return errText.trim() || "Cloudinary yükleme hatası";
}

async function uploadSignedResource(
  file: Buffer,
  resourceType: "image" | "raw",
  folder: string,
  publicId: string,
  mimeType: string,
  originalFilename: string,
): Promise<{ secureUrl: string; publicId: string; version: number }> {
  const { cloudName, apiKey, apiSecret } = getConfig();
  const timestamp = String(Math.round(Date.now() / 1000));
  const useAuthenticated = resourceType === "raw";

  const paramsToSign: Record<string, string> = {
    folder,
    overwrite: "true",
    invalidate: "true",
    public_id: publicId,
    timestamp,
  };
  if (useAuthenticated) {
    paramsToSign.type = "authenticated";
  }

  const signature = signParams(paramsToSign, apiSecret);

  const body = new FormData();
  const blob = new Blob([new Uint8Array(file)], { type: mimeType });
  body.append("file", blob, originalFilename);
  body.append("api_key", apiKey);
  body.append("timestamp", timestamp);
  body.append("folder", folder);
  body.append("public_id", publicId);
  body.append("overwrite", "true");
  body.append("invalidate", "true");
  if (useAuthenticated) {
    body.append("type", "authenticated");
  }
  body.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
    {
      method: "POST",
      body,
    },
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(parseCloudinaryErrorMessage(errText));
  }

  const data = (await response.json()) as {
    secure_url: string;
    public_id: string;
    version: number;
  };
  return {
    secureUrl: data.secure_url,
    publicId: data.public_id,
    version: data.version,
  };
}

function cloudinaryAssetNameFromFileName(fileName: string): string {
  const trimmed = fileName.trim();
  const lastDot = trimmed.lastIndexOf(".");
  const base = lastDot > 0 ? trimmed.slice(0, lastDot) : trimmed;
  return base || "dokuman";
}

/** Documents klasörüne PDF, Office ve görseller. */
export async function uploadDocumentToCloudinary(
  file: Buffer,
  fullPublicId: string,
  mimeType: string,
  originalFilename: string,
): Promise<{ secureUrl: string; publicId: string; version: number }> {
  const { folder, assetName } = parseDocumentPublicId(fullPublicId);
  const publicId = mimeType.startsWith("image/")
    ? cloudinaryAssetNameFromFileName(assetName)
    : assetName;

  if (mimeType.startsWith("image/")) {
    return uploadSignedResource(
      file,
      "image",
      folder,
      publicId,
      mimeType,
      originalFilename,
    );
  }

  return uploadSignedResource(
    file,
    "raw",
    folder,
    publicId,
    mimeType,
    originalFilename,
  );
}

/** Home veya Heros klasörüne yükler (public_id ile hedef belirlenir). */
export async function uploadHomeImageToCloudinary(
  file: Buffer,
  fullPublicId: string,
  mimeType: string,
): Promise<{ secureUrl: string; publicId: string; version: number }> {
  if (fullPublicId.startsWith("Heros/")) {
    const { folder, assetName } = parseHerosImagePublicId(fullPublicId);
    return uploadWithFolder(file, folder, assetName, mimeType);
  }

  if (fullPublicId.startsWith("About/")) {
    const { folder, assetName } = parseAboutImagePublicId(fullPublicId);
    return uploadWithFolder(file, folder, assetName, mimeType);
  }

  if (fullPublicId.startsWith("Guides/")) {
    const { folder, assetName } = parseGuidesImagePublicId(fullPublicId);
    return uploadWithFolder(file, folder, assetName, mimeType);
  }

  if (fullPublicId.startsWith("Services/")) {
    const { folder, assetName } = parseServiceImagePublicId(fullPublicId);
    return uploadWithFolder(file, folder, assetName, mimeType);
  }

  if (fullPublicId.startsWith("Consulates/")) {
    const { folder, assetName } = parseConsulateImagePublicId(fullPublicId);
    return uploadWithFolder(file, folder, assetName, mimeType);
  }

  if (fullPublicId.startsWith("Countries/")) {
    const { folder, assetName } = parseCountryImagePublicId(fullPublicId);
    return uploadWithFolder(file, folder, assetName, mimeType);
  }

  const { folder, assetName } = parseHomeImagePublicId(fullPublicId);
  return uploadWithFolder(file, folder, assetName, mimeType);
}
