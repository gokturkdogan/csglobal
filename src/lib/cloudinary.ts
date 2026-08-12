import crypto from "crypto";
import { parseAboutImagePublicId } from "@/lib/cloudinary/about-folder";
import { parseHomeImagePublicId } from "@/lib/cloudinary/home-folder";
import { parseHerosImagePublicId } from "@/lib/cloudinary/heros-folder";

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
): Promise<{ secureUrl: string; publicId: string }> {
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

  const data = (await response.json()) as { secure_url: string; public_id: string };
  return { secureUrl: data.secure_url, publicId: data.public_id };
}

/** Home veya Heros klasörüne yükler (public_id ile hedef belirlenir). */
export async function uploadHomeImageToCloudinary(
  file: Buffer,
  fullPublicId: string,
  mimeType: string,
): Promise<{ secureUrl: string; publicId: string }> {
  if (fullPublicId.startsWith("Heros/")) {
    const { folder, assetName } = parseHerosImagePublicId(fullPublicId);
    return uploadWithFolder(file, folder, assetName, mimeType);
  }

  if (fullPublicId.startsWith("About/")) {
    const { folder, assetName } = parseAboutImagePublicId(fullPublicId);
    return uploadWithFolder(file, folder, assetName, mimeType);
  }

  const { folder, assetName } = parseHomeImagePublicId(fullPublicId);
  return uploadWithFolder(file, folder, assetName, mimeType);
}
