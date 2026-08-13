const DEFAULT_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://csglobal.com";

const ALLOWED_EXTENSIONS = new Set([
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "png",
  "jpg",
  "jpeg",
  "webp",
]);

export function sanitizeSiteAssetFileName(rawName: string): string {
  const trimmed = rawName.trim();
  const lastDot = trimmed.lastIndexOf(".");
  const base = lastDot > 0 ? trimmed.slice(0, lastDot) : trimmed;
  const ext = lastDot > 0 ? trimmed.slice(lastDot + 1) : "pdf";

  const safeBase = base
    .replace(/[/\\?%*:|"<>#]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);

  const safeExt = ext.replace(/[^a-zA-Z0-9]+/g, "").slice(0, 8).toLowerCase();
  const extension = ALLOWED_EXTENSIONS.has(safeExt) ? safeExt : "pdf";

  return `${safeBase || "dokuman"}.${extension}`;
}

export function buildSiteAssetPath(
  id: number,
  countrySlug: string,
  fileName: string,
): string {
  return `/asset/${id}/${countrySlug}/${encodeURIComponent(fileName)}`;
}

export function buildSiteAssetPublicUrl(
  id: number,
  countrySlug: string,
  fileName: string,
): string {
  return `${DEFAULT_SITE_URL}${buildSiteAssetPath(id, countrySlug, fileName)}`;
}

/** Önizleme iframe / embed için kendi domain üzerinden dosya akışı. */
export function buildSiteAssetViewApiUrl(
  id: number,
  countrySlug: string,
  fileName: string,
): string {
  const params = new URLSearchParams({
    countrySlug,
    fileName,
  });
  return `/api/asset/${id}/view?${params.toString()}`;
}

/** Panel ve listelerde dosya adı gösterimi. */
export function formatSiteAssetDisplayName(fileName: string): string {
  const base = fileName.replace(/\.[^.]+$/, "").trim();
  if (!base) return fileName;
  return base.replace(/-/g, " ").replace(/\s+/g, " ").trim();
}

export function formatSiteAssetFileSize(bytes: number | null | undefined): string {
  if (!bytes || bytes <= 0) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const SITE_ASSET_MAX_BYTES = 10 * 1024 * 1024;

/** Tek yüklemede seçilebilecek dosya sayısı */
export const SITE_ASSET_MAX_BATCH = 10;

export const SITE_ASSET_ACCEPT =
  ".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.webp,application/pdf";

const EXTENSION_MIME: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
};

const ALLOWED_MIME = new Set(Object.values(EXTENSION_MIME));

/** Tarayıcı bazen PDF için boş type gönderir; uzantıdan tamamlar. */
export function resolveSiteAssetMimeType(
  fileName: string,
  reportedType?: string | null,
): string | null {
  const type = reportedType?.trim().toLowerCase();
  if (type && ALLOWED_MIME.has(type)) {
    return type;
  }

  const ext = fileName.split(".").pop()?.toLowerCase();
  if (ext && EXTENSION_MIME[ext]) {
    return EXTENSION_MIME[ext];
  }

  return null;
}
