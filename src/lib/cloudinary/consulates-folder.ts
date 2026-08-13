/** Cloudinary Media Library > Consulates/{slug} */
export const CONSULATES_CLOUDINARY_FOLDER = "Consulates";

export function buildConsulateImagePublicId(slug: string, assetName: string): string {
  const safeSlug = slug.trim().replace(/^\/+|\/+$/g, "");
  if (!safeSlug || safeSlug.includes("/")) {
    throw new Error("Geçersiz konsolosluk slug");
  }
  if (!assetName || assetName.includes("/")) {
    throw new Error("Geçersiz konsolosluk görsel adı");
  }
  return `${CONSULATES_CLOUDINARY_FOLDER}/${safeSlug}/${assetName}`;
}

export function parseConsulateImagePublicId(publicId: string): {
  folder: string;
  assetName: string;
} {
  const prefix = `${CONSULATES_CLOUDINARY_FOLDER}/`;
  if (!publicId.startsWith(prefix)) {
    throw new Error("Yalnızca Consulates klasörüne yükleme yapılabilir");
  }

  const rest = publicId.slice(prefix.length);
  const slash = rest.indexOf("/");
  if (slash <= 0) {
    throw new Error("Geçersiz Consulates görsel yolu");
  }

  const slug = rest.slice(0, slash);
  const assetName = rest.slice(slash + 1);
  if (!slug || !assetName || assetName.includes("/")) {
    throw new Error("Geçersiz Consulates görsel yolu");
  }

  return { folder: `${CONSULATES_CLOUDINARY_FOLDER}/${slug}`, assetName };
}
