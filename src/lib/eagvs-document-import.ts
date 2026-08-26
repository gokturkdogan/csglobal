import { prisma } from "@/lib/prisma";
import { findExistingDocumentMatch } from "@/lib/eagvs-dedupe";
import {
  buildSiteAssetPath,
  buildSiteAssetPublicUrl,
  resolveSiteAssetMimeType,
  sanitizeSiteAssetFileName,
  SITE_ASSET_MAX_BYTES,
} from "@/lib/site-asset";

const FETCH_USER_AGENT = "Mozilla/5.0 (compatible; CSGLOBAL-EAGVS-Import/1.0)";

export type EagvsDocumentImportResult = {
  fileName: string;
  label: string;
  entityId: number;
  publicPath: string;
  skipped: boolean;
};

function normalizeDownloadUrl(url: string): string {
  const trimmed = url.trim();
  if (trimmed.startsWith("//")) {
    return `https:${trimmed}`;
  }
  return trimmed;
}

export function fileNameFromEagvsAssetUrl(url: string): string {
  try {
    const pathname = new URL(normalizeDownloadUrl(url)).pathname;
    const segment = pathname.split("/").filter(Boolean).pop() ?? "";
    return sanitizeSiteAssetFileName(segment);
  } catch {
    return sanitizeSiteAssetFileName("dokuman.pdf");
  }
}

export async function importEagvsDocument(options: {
  url: string;
  countryId: string;
  label?: string;
  skipIfExists?: boolean;
}): Promise<EagvsDocumentImportResult> {
  const downloadUrl = normalizeDownloadUrl(options.url);
  const fileName = fileNameFromEagvsAssetUrl(downloadUrl);
  const label = options.label?.trim() || fileName;

  const countryAssets = await prisma.siteAsset.findMany({
    where: { countryId: options.countryId },
    select: { id: true, fileName: true },
  });

  const existingMatch = findExistingDocumentMatch(countryAssets, fileName, label);

  if (existingMatch && options.skipIfExists) {
    const country = await prisma.country.findUnique({
      where: { id: options.countryId },
      select: { slug: true },
    });
    if (!country) {
      throw new Error("Ülke bulunamadı.");
    }
    return {
      fileName: existingMatch.fileName,
      label,
      entityId: existingMatch.id,
      publicPath: buildSiteAssetPath(existingMatch.id, country.slug, existingMatch.fileName),
      skipped: true,
    };
  }

  const response = await fetch(downloadUrl, {
    headers: { "User-Agent": FETCH_USER_AGENT },
    redirect: "follow",
    signal: AbortSignal.timeout(60_000),
  });

  if (!response.ok) {
    throw new Error(`Dosya indirilemedi (${response.status}).`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length === 0) {
    throw new Error("Dosya boş.");
  }
  if (buffer.length > SITE_ASSET_MAX_BYTES) {
    throw new Error("Dosya 10MB sınırını aşıyor.");
  }

  const mimeType = resolveSiteAssetMimeType(fileName, response.headers.get("content-type"));
  if (!mimeType) {
    throw new Error("Desteklenmeyen dosya türü.");
  }

  const country = await prisma.country.findUnique({
    where: { id: options.countryId },
    select: { slug: true },
  });
  if (!country) {
    throw new Error("Ülke bulunamadı.");
  }

  const asset = options.skipIfExists
    ? await prisma.siteAsset.create({
        data: {
          countryId: options.countryId,
          fileName,
          cloudinaryPublicId: null,
          fileUrl: "",
          fileData: buffer,
          mimeType,
          byteSize: buffer.length,
          showInMenu: true,
        },
      })
    : await prisma.siteAsset.upsert({
        where: {
          countryId_fileName: { countryId: options.countryId, fileName },
        },
        create: {
          countryId: options.countryId,
          fileName,
          cloudinaryPublicId: null,
          fileUrl: "",
          fileData: buffer,
          mimeType,
          byteSize: buffer.length,
          showInMenu: true,
        },
        update: {
          cloudinaryPublicId: null,
          fileData: buffer,
          mimeType,
          byteSize: buffer.length,
          showInMenu: true,
        },
      });

  const publicUrl = buildSiteAssetPublicUrl(asset.id, country.slug, fileName);
  await prisma.siteAsset.update({
    where: { id: asset.id },
    data: { fileUrl: publicUrl },
  });

  return {
    fileName,
    label,
    entityId: asset.id,
    publicPath: buildSiteAssetPath(asset.id, country.slug, fileName),
    skipped: false,
  };
}
