/** Cloudinary Media Library > Services/{slug} */
export const SERVICES_CLOUDINARY_FOLDER = "Services";

export function buildServiceImagePublicId(slug: string, assetName: string): string {
  const safeSlug = slug.trim().replace(/^\/+|\/+$/g, "");
  if (!safeSlug || safeSlug.includes("/")) {
    throw new Error("Geçersiz program slug");
  }
  if (!assetName || assetName.includes("/")) {
    throw new Error("Geçersiz program görsel adı");
  }
  return `${SERVICES_CLOUDINARY_FOLDER}/${safeSlug}/${assetName}`;
}

export function parseServiceImagePublicId(publicId: string): {
  folder: string;
  assetName: string;
} {
  const prefix = `${SERVICES_CLOUDINARY_FOLDER}/`;
  if (!publicId.startsWith(prefix)) {
    throw new Error("Yalnızca Services klasörüne yükleme yapılabilir");
  }

  const rest = publicId.slice(prefix.length);
  const slash = rest.indexOf("/");
  if (slash <= 0) {
    throw new Error("Geçersiz Services görsel yolu");
  }

  const slug = rest.slice(0, slash);
  const assetName = rest.slice(slash + 1);
  if (!slug || !assetName || assetName.includes("/")) {
    throw new Error("Geçersiz Services görsel yolu");
  }

  return { folder: `${SERVICES_CLOUDINARY_FOLDER}/${slug}`, assetName };
}
