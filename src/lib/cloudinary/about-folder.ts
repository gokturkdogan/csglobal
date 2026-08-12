/** Cloudinary Media Library > About (ana dizin) */
export const ABOUT_CLOUDINARY_FOLDER = "About";

export function buildAboutImagePublicId(assetName: string): string {
  return `${ABOUT_CLOUDINARY_FOLDER}/${assetName}`;
}

export function parseAboutImagePublicId(publicId: string): {
  folder: string;
  assetName: string;
} {
  const prefix = `${ABOUT_CLOUDINARY_FOLDER}/`;
  if (!publicId.startsWith(prefix)) {
    throw new Error("Yalnızca About klasörüne yükleme yapılabilir");
  }

  const assetName = publicId.slice(prefix.length);
  if (!assetName || assetName.includes("/")) {
    throw new Error("Geçersiz About görsel yolu");
  }

  return { folder: ABOUT_CLOUDINARY_FOLDER, assetName };
}
