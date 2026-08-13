/** Cloudinary Media Library > Guides/{slug} */
export const GUIDES_CLOUDINARY_FOLDER = "Guides";

export function buildGuideImagePublicId(slug: string, assetName: string): string {
  const safeSlug = slug.trim().replace(/^\/+|\/+$/g, "");
  if (!safeSlug || safeSlug.includes("/")) {
    throw new Error("Geçersiz rehber slug");
  }
  if (!assetName || assetName.includes("/")) {
    throw new Error("Geçersiz rehber görsel adı");
  }
  return `${GUIDES_CLOUDINARY_FOLDER}/${safeSlug}/${assetName}`;
}

export function parseGuideImagePublicId(publicId: string): {
  folder: string;
  assetName: string;
} {
  const prefix = `${GUIDES_CLOUDINARY_FOLDER}/`;
  if (!publicId.startsWith(prefix)) {
    throw new Error("Yalnızca Guides klasörüne yükleme yapılabilir");
  }

  const rest = publicId.slice(prefix.length);
  const slash = rest.indexOf("/");
  if (slash <= 0) {
    throw new Error("Geçersiz Guides görsel yolu");
  }

  const slug = rest.slice(0, slash);
  const assetName = rest.slice(slash + 1);
  if (!slug || !assetName || assetName.includes("/")) {
    throw new Error("Geçersiz Guides görsel yolu");
  }

  return { folder: `${GUIDES_CLOUDINARY_FOLDER}/${slug}`, assetName };
}
