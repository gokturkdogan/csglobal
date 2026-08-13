/** Cloudinary Media Library > Guides/{slug} ve Guides/list-hero */
export const GUIDES_CLOUDINARY_FOLDER = "Guides";

/** Rehber liste sayfası hero (Guides klasörü kökü) */
export const GUIDES_LIST_HERO_ASSET = "list-hero";

export function buildGuidesListHeroPublicId(): string {
  return `${GUIDES_CLOUDINARY_FOLDER}/${GUIDES_LIST_HERO_ASSET}`;
}

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

export function parseGuidesImagePublicId(publicId: string): {
  folder: string;
  assetName: string;
} {
  const prefix = `${GUIDES_CLOUDINARY_FOLDER}/`;
  if (!publicId.startsWith(prefix)) {
    throw new Error("Yalnızca Guides klasörüne yükleme yapılabilir");
  }

  const rest = publicId.slice(prefix.length);
  if (!rest) {
    throw new Error("Geçersiz Guides görsel yolu");
  }

  const slash = rest.indexOf("/");
  if (slash === -1) {
    return { folder: GUIDES_CLOUDINARY_FOLDER, assetName: rest };
  }

  const slug = rest.slice(0, slash);
  const assetName = rest.slice(slash + 1);
  if (!slug || !assetName || assetName.includes("/")) {
    throw new Error("Geçersiz Guides görsel yolu");
  }

  return { folder: `${GUIDES_CLOUDINARY_FOLDER}/${slug}`, assetName };
}

export function parseGuideImagePublicId(publicId: string): {
  folder: string;
  assetName: string;
} {
  const parsed = parseGuidesImagePublicId(publicId);
  if (parsed.folder === GUIDES_CLOUDINARY_FOLDER && parsed.assetName === GUIDES_LIST_HERO_ASSET) {
    throw new Error("Rehber makale görseli için slug alt klasörü gerekli");
  }
  if (parsed.folder === GUIDES_CLOUDINARY_FOLDER) {
    throw new Error("Geçersiz rehber makale görsel yolu");
  }
  return parsed;
}
