/** Cloudinary Media Library > Documents/{countrySlug}/{fileName} */
export const DOCUMENTS_CLOUDINARY_FOLDER = "Documents";

export function buildDocumentPublicId(countrySlug: string, fileName: string): string {
  const safeSlug = countrySlug.trim().replace(/^\/+|\/+$/g, "");
  const safeFileName = fileName.trim().replace(/^\/+/, "");
  if (!safeSlug || safeSlug.includes("/")) {
    throw new Error("Geçersiz ülke slug");
  }
  if (!safeFileName || safeFileName.includes("/")) {
    throw new Error("Geçersiz dosya adı");
  }
  return `${DOCUMENTS_CLOUDINARY_FOLDER}/${safeSlug}/${safeFileName}`;
}

export function parseDocumentPublicId(publicId: string): {
  folder: string;
  assetName: string;
} {
  const prefix = `${DOCUMENTS_CLOUDINARY_FOLDER}/`;
  if (!publicId.startsWith(prefix)) {
    throw new Error("Yalnızca Documents klasörüne yükleme yapılabilir");
  }

  const rest = publicId.slice(prefix.length);
  const slash = rest.indexOf("/");
  if (slash <= 0) {
    throw new Error("Geçersiz Documents dosya yolu");
  }

  const countrySlug = rest.slice(0, slash);
  const fileName = rest.slice(slash + 1);
  if (!countrySlug || !fileName || fileName.includes("/")) {
    throw new Error("Geçersiz Documents dosya yolu");
  }

  return {
    folder: `${DOCUMENTS_CLOUDINARY_FOLDER}/${countrySlug}`,
    assetName: fileName,
  };
}
