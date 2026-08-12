import crypto from "crypto";

type CloudinaryConfig = {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
};

export type CloudinaryResource = {
  public_id: string;
  secure_url: string;
  format: string;
  bytes: number;
  width: number;
  height: number;
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

export async function uploadToCloudinary(
  file: Buffer,
  publicId: string,
  mimeType: string,
): Promise<{ secureUrl: string; publicId: string }> {
  const { cloudName, apiKey, apiSecret } = getConfig();
  const timestamp = String(Math.round(Date.now() / 1000));

  const paramsToSign: Record<string, string> = {
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

export async function listCloudinaryFolder(folder: string): Promise<CloudinaryResource[]> {
  const { cloudName, apiKey, apiSecret } = getConfig();
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/resources/search`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      expression: `folder:${folder}`,
      max_results: 50,
      sort_by: [{ created_at: "desc" }],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Cloudinary listeleme hatası: ${errText}`);
  }

  const data = (await response.json()) as { resources?: CloudinaryResource[] };
  return data.resources ?? [];
}
