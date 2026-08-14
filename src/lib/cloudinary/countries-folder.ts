/** Ülke görselleri: Cloudinary Media Library > Countries/{slug}/ */
export const COUNTRIES_CLOUDINARY_FOLDER = "Countries";

export function buildCountryImagePublicId(slug: string, assetName: string): string {
  const safeSlug = slug.trim().replace(/^\/+|\/+$/g, "");
  if (!safeSlug || safeSlug.includes("/")) {
    throw new Error("Geçersiz ülke slug");
  }
  if (!assetName || assetName.includes("/")) {
    throw new Error("Geçersiz ülke görsel adı");
  }
  return `${COUNTRIES_CLOUDINARY_FOLDER}/${safeSlug}/${assetName}`;
}

export function parseCountryImagePublicId(publicId: string): {
  folder: string;
  assetName: string;
} {
  const prefix = `${COUNTRIES_CLOUDINARY_FOLDER}/`;
  if (!publicId.startsWith(prefix)) {
    throw new Error("Yalnızca Countries klasörüne yükleme yapılabilir");
  }

  const rest = publicId.slice(prefix.length);
  const slash = rest.indexOf("/");
  if (slash <= 0) {
    throw new Error("Geçersiz Countries görsel yolu");
  }

  const slug = rest.slice(0, slash);
  const assetName = rest.slice(slash + 1);
  if (!slug || !assetName || assetName.includes("/")) {
    throw new Error("Geçersiz Countries görsel yolu");
  }

  return { folder: `${COUNTRIES_CLOUDINARY_FOLDER}/${slug}`, assetName };
}
