"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { buildEagvsBatchCountryPreview } from "@/lib/eagvs-country-batch";
import {
  buildProgramRepairQueueForCountry,
  listProgramRepairCountries,
  previewProgramRepairForCountry,
  previewProgramRepairItem,
  repairProgramContentFromEagvs,
  type ProgramRepairPreviewRow,
  type ProgramRepairQueueItem,
  type ProgramRepairResult,
} from "@/lib/eagvs-program-content-sync";
import { adminErrorMessage } from "@/lib/admin-action-result";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
}

export type ProgramRepairCountryRow = {
  countryId: string;
  countryName: string;
  countrySlug: string;
  eagvsUrl: string;
  eagvsPath: string;
  programCount: number;
  matchStatus: "matched" | "unmatched";
};

export async function listProgramRepairCountriesAction(): Promise<{
  ok: boolean;
  countries: ProgramRepairCountryRow[];
  message?: string;
}> {
  await requireAdmin();

  try {
    const dbCountries = await prisma.country.findMany({
      where: { isActive: true },
      select: { id: true, name: true, slug: true, detailSectionsJson: true },
      orderBy: { name: "asc" },
    });
    const programCountries = await listProgramRepairCountries();
    const programCountMap = new Map(
      programCountries.map((row) => [row.countryId, row.programCount]),
    );

    const eagvsRows = await buildEagvsBatchCountryPreview(dbCountries);
    const eagvsMap = new Map(
      eagvsRows
        .filter((row) => row.matchStatus === "matched" && row.countryId)
        .map((row) => [row.countryId!, row]),
    );

    const countries: ProgramRepairCountryRow[] = dbCountries
      .filter((country) => (programCountMap.get(country.id) ?? 0) > 0)
      .map((country) => {
        const eagvs = eagvsMap.get(country.id);
        return {
          countryId: country.id,
          countryName: country.name,
          countrySlug: country.slug,
          eagvsUrl: eagvs?.eagvsUrl ?? "",
          eagvsPath: eagvs?.eagvsPath ?? "",
          programCount: programCountMap.get(country.id) ?? 0,
          matchStatus: eagvs ? "matched" : "unmatched",
        };
      });

    return { ok: true, countries };
  } catch (error) {
    return {
      ok: false,
      countries: [],
      message: adminErrorMessage(error, "Ülke listesi alınamadı."),
    };
  }
}

export async function buildProgramRepairQueueCountryAction(
  countryId: string,
  eagvsUrl: string,
): Promise<{
  ok: boolean;
  items: ProgramRepairQueueItem[];
  message?: string;
}> {
  await requireAdmin();

  const trimmedCountryId = countryId.trim();
  const trimmedUrl = eagvsUrl.trim();
  if (!trimmedCountryId || !trimmedUrl) {
    return { ok: false, items: [], message: "Ülke ve EAGVS URL zorunludur." };
  }

  try {
    const items = await buildProgramRepairQueueForCountry(trimmedCountryId, trimmedUrl);
    return { ok: true, items };
  } catch (error) {
    return {
      ok: false,
      items: [],
      message: adminErrorMessage(error, "Ülke program kuyruğu oluşturulamadı."),
    };
  }
}

export async function previewProgramRepairItemAction(
  programId: string,
  eagvsUrl: string,
): Promise<{
  ok: boolean;
  row?: ProgramRepairPreviewRow;
  message?: string;
}> {
  await requireAdmin();

  const trimmedProgramId = programId.trim();
  const trimmedUrl = eagvsUrl.trim();
  if (!trimmedProgramId || !trimmedUrl) {
    return { ok: false, message: "Program ve URL zorunludur." };
  }

  try {
    const row = await previewProgramRepairItem(trimmedProgramId, trimmedUrl);
    return { ok: true, row };
  } catch (error) {
    return {
      ok: false,
      message: adminErrorMessage(error, "Program taraması başarısız."),
    };
  }
}

export async function previewProgramRepairCountryAction(
  countryId: string,
  eagvsUrl: string,
): Promise<{
  ok: boolean;
  rows: ProgramRepairPreviewRow[];
  message?: string;
}> {
  await requireAdmin();

  const trimmedCountryId = countryId.trim();
  const trimmedUrl = eagvsUrl.trim();
  if (!trimmedCountryId || !trimmedUrl) {
    return { ok: false, rows: [], message: "Ülke ve EAGVS URL zorunludur." };
  }

  try {
    const rows = await previewProgramRepairForCountry(trimmedCountryId, trimmedUrl);
    return { ok: true, rows };
  } catch (error) {
    return {
      ok: false,
      rows: [],
      message: adminErrorMessage(error, "Ülke program taraması başarısız."),
    };
  }
}

export async function repairProgramItemAction(
  programId: string,
  eagvsUrl: string,
): Promise<{ ok: boolean; result: ProgramRepairResult }> {
  await requireAdmin();

  const trimmedProgramId = programId.trim();
  const trimmedUrl = eagvsUrl.trim();
  if (!trimmedProgramId || !trimmedUrl) {
    return {
      ok: false,
      result: {
        programId: trimmedProgramId,
        programName: "",
        countryName: "",
        countrySlug: "",
        programSlug: "",
        status: "error",
        message: "Program ve URL zorunludur.",
        dbCharCount: 0,
        liveCharCount: 0,
      },
    };
  }

  const result = await repairProgramContentFromEagvs(trimmedProgramId, trimmedUrl);
  return { ok: result.status !== "error", result };
}
