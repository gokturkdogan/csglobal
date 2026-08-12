/** Cloudinary Media Library > Heros (Home ile aynı seviyede) */
export const HEROS_CLOUDINARY_FOLDER = "Heros";

export function buildHerosImagePublicId(assetName: string): string {
  return `${HEROS_CLOUDINARY_FOLDER}/${assetName}`;
}

export function parseHerosImagePublicId(publicId: string): {
  folder: string;
  assetName: string;
} {
  const prefix = `${HEROS_CLOUDINARY_FOLDER}/`;
  if (!publicId.startsWith(prefix)) {
    throw new Error("Yalnızca Heros klasörüne yükleme yapılabilir");
  }

  const assetName = publicId.slice(prefix.length);
  if (!assetName || assetName.includes("/")) {
    throw new Error("Geçersiz Heros görsel yolu");
  }

  return { folder: HEROS_CLOUDINARY_FOLDER, assetName };
}
