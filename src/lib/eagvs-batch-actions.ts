"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  buildEagvsBatchCountryPreview,
  type EagvsBatchCountryRow,
} from "@/lib/eagvs-country-batch";
import {
  importEagvsCountryHub,
  type EagvsCountrySyncResult,
} from "@/lib/eagvs-country-sync";
import { revalidateAfterEagvsCountrySync } from "@/lib/eagvs-country-sync-revalidate";
import { adminErrorMessage } from "@/lib/admin-action-result";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
}

export type EagvsBatchSyncReport = {
  detailUpdated: boolean;
  detailSectionCount: number;
  sidebarLinkCount: number;
  programs: EagvsCountrySyncResult["programs"];
  documents: EagvsCountrySyncResult["documents"];
  skipped: EagvsCountrySyncResult["skipped"];
  failed: EagvsCountrySyncResult["failed"];
};

export type EagvsBatchSyncItemResult = {
  ok: boolean;
  message: string;
  countryName?: string;
  programsAdded?: number;
  documentsAdded?: number;
  skippedCount?: number;
  report?: EagvsBatchSyncReport;
};

export async function previewEagvsAllCountriesAction(): Promise<{
  ok: boolean;
  items: EagvsBatchCountryRow[];
  message?: string;
}> {
  await requireAdmin();

  try {
    const countries = await prisma.country.findMany({
      where: { isActive: true },
      select: { id: true, name: true, slug: true, detailSectionsJson: true },
      orderBy: { name: "asc" },
    });
    const items = await buildEagvsBatchCountryPreview(countries);
    return { ok: true, items };
  } catch (error) {
    return {
      ok: false,
      items: [],
      message: adminErrorMessage(error, "EAGVS ülke listesi alınamadı."),
    };
  }
}

export async function importEagvsCountryBatchItemAction(
  url: string,
  countryId: string,
  options?: {
    detailOnly?: boolean;
    skipIfHasDetail?: boolean;
  },
): Promise<EagvsBatchSyncItemResult> {
  await requireAdmin();

  const trimmedUrl = url.trim();
  const trimmedCountryId = countryId.trim();

  if (!trimmedUrl || !trimmedCountryId) {
    return { ok: false, message: "Ülke URL ve kayıt bilgisi zorunludur." };
  }

  try {
    const result = await importEagvsCountryHub({
      url: trimmedUrl,
      countryId: trimmedCountryId,
      detailOnly: options?.detailOnly === true,
      skipIfHasDetail: options?.skipIfHasDetail === true,
    });

    revalidateAfterEagvsCountrySync(result);

    const report: EagvsBatchSyncReport = {
      detailUpdated: result.detailUpdated,
      detailSectionCount: result.detailSectionCount,
      sidebarLinkCount: result.sidebarLinkCount,
      programs: result.programs,
      documents: result.documents,
      skipped: result.skipped,
      failed: result.failed,
    };

    if (!result.detailUpdated && result.programs.length === 0 && result.documents.length === 0) {
      return {
        ok: true,
        countryName: result.countryName,
        programsAdded: 0,
        documentsAdded: 0,
        skippedCount: result.skipped.length,
        report,
        message: `${result.countryName}: atlandı (${result.skipped[0]?.reason ?? "değişiklik yok"}).`,
      };
    }

    const parts: string[] = [];
    if (result.detailUpdated) {
      parts.push(`${result.detailSectionCount} detay bölümü`);
    }
    if (result.programs.length > 0) {
      parts.push(`${result.programs.length} yeni program`);
    }
    if (result.documents.length > 0) {
      parts.push(`${result.documents.length} yeni döküman`);
    }
    if (result.skipped.length > 0) {
      parts.push(`${result.skipped.length} atlandı`);
    }

    return {
      ok: true,
      countryName: result.countryName,
      programsAdded: result.programs.length,
      documentsAdded: result.documents.length,
      skippedCount: result.skipped.length,
      report,
      message: `${result.countryName}: ${parts.join(", ") || "tamamlandı"}.`,
    };
  } catch (error) {
    return {
      ok: false,
      message: adminErrorMessage(error, "Ülke senkronizasyonu başarısız."),
    };
  }
}
