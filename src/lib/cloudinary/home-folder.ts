/** Anasayfa görselleri: Cloudinary Media Library > Home */
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

  const relativePath = publicId.slice(prefix.length);
  if (!relativePath || relativePath.startsWith("/") || relativePath.endsWith("/")) {
    throw new Error("Geçersiz Home görsel yolu");
  }

  const lastSlash = relativePath.lastIndexOf("/");
  if (lastSlash === -1) {
    return { folder: HOMEPAGE_CLOUDINARY_FOLDER, assetName: relativePath };
  }

  const subFolder = relativePath.slice(0, lastSlash);
  const assetName = relativePath.slice(lastSlash + 1);
  if (!assetName) {
    throw new Error("Geçersiz Home görsel yolu");
  }

  return {
    folder: `${HOMEPAGE_CLOUDINARY_FOLDER}/${subFolder}`,
    assetName,
  };
}

export function homeImageAssetLabel(publicId: string): string {
  return publicId.startsWith(`${HOMEPAGE_CLOUDINARY_FOLDER}/`)
    ? publicId.slice(HOMEPAGE_CLOUDINARY_FOLDER.length + 1)
    : publicId;
}
