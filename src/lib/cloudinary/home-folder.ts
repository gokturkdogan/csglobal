/** Anasayfa görselleri — Cloudinary Media Library > Home */
export const HOMEPAGE_CLOUDINARY_FOLDER = "Home";

export function buildHomeImagePublicId(assetName: string): string {
  return `${HOMEPAGE_CLOUDINARY_FOLDER}/${assetName}`;
}

export function parseHomeImagePublicId(publicId: string): {
  folder: string;
  assetName: string;
} {
  const prefix = `${HOMEPAGE_CLOUDINARY_FOLDER}/`;
  if (!publicId.startsWith(prefix)) {
    throw new Error("Yalnızca Home klasörüne yükleme yapılabilir");
  }

  const assetName = publicId.slice(prefix.length);
  if (!assetName || assetName.includes("/")) {
    throw new Error("Geçersiz Home görsel yolu");
  }

  return { folder: HOMEPAGE_CLOUDINARY_FOLDER, assetName };
}

export function homeImageAssetLabel(publicId: string): string {
  return publicId.startsWith(`${HOMEPAGE_CLOUDINARY_FOLDER}/`)
    ? publicId.slice(HOMEPAGE_CLOUDINARY_FOLDER.length + 1)
    : publicId;
}
