"use client";

import { useMemo, useState } from "react";
import type { EagvsBatchCountryRow } from "@/lib/eagvs-country-batch";
import {
  importEagvsCountryBatchItemAction,
  previewEagvsAllCountriesAction,
  type EagvsBatchSyncReport,
} from "@/lib/eagvs-batch-actions";
import { AdminLoadingButton } from "@/components/admin/AdminForm";
import { useAdminToast } from "@/components/admin/AdminToast";

type SyncStatus = "idle" | "running" | "success" | "error" | "unmatched" | "skipped";

type BatchRow = EagvsBatchCountryRow & {
  selected: boolean;
  syncStatus: SyncStatus;
  syncMessage?: string;
  report?: EagvsBatchSyncReport;
};

type FilterMode = "all" | "matched" | "missing" | "unmatched";

const inputClass =
  "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function statusBadge(status: SyncStatus) {
  switch (status) {
    case "running":
      return "bg-blue-100 text-blue-800";
    case "success":
      return "bg-emerald-100 text-emerald-800";
    case "skipped":
      return "bg-amber-100 text-amber-800";
    case "error":
      return "bg-red-100 text-red-800";
    case "unmatched":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

function statusLabel(status: SyncStatus) {
  switch (status) {
    case "running":
      return "Çalışıyor";
    case "success":
      return "Çekildi";
    case "skipped":
      return "Atlandı";
    case "error":
      return "Hata";
    case "unmatched":
      return "Eşleşmedi";
    default:
      return "Bekliyor";
  }
}

function resolveSyncStatus(result: {
  ok: boolean;
  report?: EagvsBatchSyncReport;
}): SyncStatus {
  if (!result.ok) return "error";
  const report = result.report;
  if (!report) return "success";
  const changed =
    report.detailUpdated || report.programs.length > 0 || report.documents.length > 0;
  return changed ? "success" : "skipped";
}

export function EagvsCountryBatchForm() {
  const toast = useAdminToast();
  const [rows, setRows] = useState<BatchRow[]>([]);
  const [filter, setFilter] = useState<FilterMode>("missing");
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [detailOnly, setDetailOnly] = useState(true);
  const [skipIfHasDetail, setSkipIfHasDetail] = useState(true);
  const [expandedUrl, setExpandedUrl] = useState<string | null>(null);
  const [logLines, setLogLines] = useState<string[]>([]);

  const matchedCount = rows.filter((row) => row.matchStatus === "matched").length;
  const unmatchedCount = rows.filter((row) => row.matchStatus === "unmatched").length;
  const missingCount = rows.filter(
    (row) => row.matchStatus === "matched" && !row.hasDetailContent,
  ).length;
  const selectedCount = rows.filter(
    (row) => row.selected && row.matchStatus === "matched",
  ).length;
  const successCount = rows.filter((row) => row.syncStatus === "success").length;
  const skippedCount = rows.filter((row) => row.syncStatus === "skipped").length;
  const errorCount = rows.filter((row) => row.syncStatus === "error").length;

  const pulledPrograms = useMemo(
    () =>
      rows.flatMap((row) =>
        (row.report?.programs ?? []).map((program) => ({
          country: row.countryName ?? row.eagvsName,
          ...program,
        })),
      ),
    [rows],
  );
  const pulledDocuments = useMemo(
    () =>
      rows.flatMap((row) =>
        (row.report?.documents ?? []).map((document) => ({
          country: row.countryName ?? row.eagvsName,
          ...document,
        })),
      ),
    [rows],
  );
  const skippedItems = useMemo(
    () =>
      rows.flatMap((row) =>
        (row.report?.skipped ?? []).map((item) => ({
          country: row.countryName ?? row.eagvsName,
          ...item,
        })),
      ),
    [rows],
  );
  const detailPulledCount = rows.filter((row) => row.report?.detailUpdated).length;

  const filteredRows = useMemo(() => {
    if (filter === "matched") return rows.filter((row) => row.matchStatus === "matched");
    if (filter === "missing") {
      return rows.filter(
        (row) => row.matchStatus === "matched" && !row.hasDetailContent,
      );
    }
    if (filter === "unmatched") return rows.filter((row) => row.matchStatus === "unmatched");
    return rows;
  }, [rows, filter]);

  async function loadPreview() {
    setLoadingPreview(true);
    try {
      const result = await previewEagvsAllCountriesAction();
      if (!result.ok) {
        toast.show({
          variant: "error",
          message: result.message ?? "EAGVS listesi alınamadı.",
        });
        return;
      }

      setRows(
        result.items.map((item) => ({
          ...item,
          selected: item.matchStatus === "matched" && !item.hasDetailContent,
          syncStatus: item.matchStatus === "unmatched" ? "unmatched" : "idle",
        })),
      );
      setExpandedUrl(null);
      setLogLines([
        `${result.items.length} ülke EAGVS listesinden çekildi.`,
        `${result.items.filter((item) => item.matchStatus === "matched").length} ülke sistemde eşleşti.`,
        `${result.items.filter((item) => item.matchStatus === "matched" && !item.hasDetailContent).length} ülkenin detay içeriği eksik (varsayılan seçim).`,
        `${result.items.filter((item) => item.matchStatus === "unmatched").length} ülke sistemde bulunamadı.`,
      ]);
      toast.show({
        variant: "success",
        message: "EAGVS ülke listesi yüklendi.",
      });
    } catch {
      toast.show({
        variant: "error",
        message: "EAGVS listesi alınırken hata oluştu.",
      });
    } finally {
      setLoadingPreview(false);
    }
  }

  function toggleRow(index: number) {
    setRows((current) =>
      current.map((row, rowIndex) => {
        if (rowIndex !== index || row.matchStatus !== "matched") return row;
        return { ...row, selected: !row.selected };
      }),
    );
  }

  function selectMissingOnly() {
    setRows((current) =>
      current.map((row) => ({
        ...row,
        selected: row.matchStatus === "matched" && !row.hasDetailContent,
      })),
    );
  }

  function toggleAllMatched(selected: boolean) {
    setRows((current) =>
      current.map((row) =>
        row.matchStatus === "matched" ? { ...row, selected } : row,
      ),
    );
  }

  async function runBatch() {
    const queue = rows.filter((row) => row.selected && row.matchStatus === "matched");
    if (queue.length === 0) {
      toast.show({
        variant: "error",
        message: "Senkron için en az bir eşleşen ülke seçin.",
      });
      return;
    }

    setSyncing(true);
    setLogLines((current) => [
      ...current,
      `Toplu senkron başladı: ${queue.length} ülke${detailOnly ? " (yalnızca detay)" : ""}.`,
    ]);

    for (const item of queue) {
      setRows((current) =>
        current.map((row) =>
          row.eagvsUrl === item.eagvsUrl
            ? { ...row, syncStatus: "running", syncMessage: "Senkronize ediliyor..." }
            : row,
        ),
      );

      const result = await importEagvsCountryBatchItemAction(
        item.eagvsUrl,
        item.countryId!,
        { detailOnly, skipIfHasDetail },
      );

      const nextStatus = resolveSyncStatus(result);

      setRows((current) =>
        current.map((row) =>
          row.eagvsUrl === item.eagvsUrl
            ? {
                ...row,
                syncStatus: nextStatus,
                syncMessage: result.message,
                report: result.report,
                hasDetailContent:
                  result.report != null
                    ? result.report.detailSectionCount > 0
                    : row.hasDetailContent,
                detailSectionCount:
                  result.report?.detailSectionCount ?? row.detailSectionCount,
              }
            : row,
        ),
      );

      setLogLines((current) => [
        ...current,
        result.ok
          ? `${nextStatus === "skipped" ? "↷" : "✓"} ${result.message}`
          : `✗ ${result.message}`,
      ]);

      await sleep(350);
    }

    setSyncing(false);
    setLogLines((current) => [...current, "Toplu senkron tamamlandı."]);
    toast.show({
      variant: "success",
      message: "Toplu ülke detay senkronu tamamlandı.",
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <AdminLoadingButton
            pending={loadingPreview}
            loadingLabel="Liste çekiliyor..."
            onClick={loadPreview}
            disabled={syncing}
          >
            EAGVS listesini çek
          </AdminLoadingButton>

          <AdminLoadingButton
            pending={syncing}
            loadingLabel="Senkronize ediliyor..."
            onClick={runBatch}
            disabled={loadingPreview || rows.length === 0}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Seçilenleri senkronize et ({selectedCount})
          </AdminLoadingButton>

          <a
            href="https://www.eagvs.com/tum-ulkeler"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-csg-blue hover:underline"
          >
            Kaynak: tum-ulkeler
          </a>
        </div>

        <div className="flex flex-wrap gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="rounded border-slate-300"
              checked={detailOnly}
              onChange={(event) => setDetailOnly(event.target.checked)}
              disabled={syncing}
            />
            Yalnızca ülke detay bölümleri (program/döküman tarama)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="rounded border-slate-300"
              checked={skipIfHasDetail}
              onChange={(event) => setSkipIfHasDetail(event.target.checked)}
              disabled={syncing}
            />
            Detayı dolu ülkeleri atla
          </label>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
          <p className="font-medium text-slate-700">Nasıl çalışır?</p>
          <ul className="mt-2 list-disc space-y-1 pl-4">
            <li>Liste çekilince detayı eksik ülkeler varsayılan olarak seçilir.</li>
            <li>
              Tek ülke senkronuyla aynı kaynak kullanılır: EAGVS ülke sayfasındaki detay
              bölümleri.
            </li>
            <li>
              &quot;Yalnızca detay&quot; kapalıysa sol panel program ve dökümanları da eklenir;
              mevcutlar atlanır.
            </li>
            <li>Rapor paneli çekilen / atlanan kayıtları ülke bazında gösterir.</li>
          </ul>
        </div>

        {rows.length > 0 ? (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <button
                type="button"
                className={`${inputClass} ${filter === "missing" ? "border-csg-blue text-csg-blue" : ""}`}
                onClick={() => setFilter("missing")}
              >
                Detayı eksik ({missingCount})
              </button>
              <button
                type="button"
                className={`${inputClass} ${filter === "matched" ? "border-csg-blue text-csg-blue" : ""}`}
                onClick={() => setFilter("matched")}
              >
                Eşleşen ({matchedCount})
              </button>
              <button
                type="button"
                className={`${inputClass} ${filter === "unmatched" ? "border-csg-blue text-csg-blue" : ""}`}
                onClick={() => setFilter("unmatched")}
              >
                Eşleşmeyen ({unmatchedCount})
              </button>
              <button
                type="button"
                className={`${inputClass} ${filter === "all" ? "border-csg-blue text-csg-blue" : ""}`}
                onClick={() => setFilter("all")}
              >
                Tümü ({rows.length})
              </button>

              <button
                type="button"
                className={`${inputClass} ml-auto`}
                onClick={selectMissingOnly}
                disabled={syncing || missingCount === 0}
              >
                Eksikleri seç
              </button>
              <label className="flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  className="rounded border-slate-300"
                  checked={
                    matchedCount > 0 &&
                    rows
                      .filter((row) => row.matchStatus === "matched")
                      .every((row) => row.selected)
                  }
                  onChange={(event) => toggleAllMatched(event.target.checked)}
                  disabled={syncing || matchedCount === 0}
                />
                Tüm eşleşenleri seç
              </label>
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-3 py-2">Seç</th>
                    <th className="px-3 py-2">EAGVS</th>
                    <th className="px-3 py-2">Sistem ülke</th>
                    <th className="px-3 py-2">Detay</th>
                    <th className="px-3 py-2">Durum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredRows.map((row) => {
                    const rowIndex = rows.findIndex(
                      (item) => item.eagvsUrl === row.eagvsUrl,
                    );
                    return (
                      <tr key={row.eagvsUrl} className="align-top">
                        <td className="px-3 py-2">
                          <input
                            type="checkbox"
                            className="rounded border-slate-300"
                            checked={row.selected}
                            disabled={
                              row.matchStatus !== "matched" ||
                              syncing ||
                              row.syncStatus === "running"
                            }
                            onChange={() => toggleRow(rowIndex)}
                          />
                        </td>
                        <td className="px-3 py-2">
                          <p className="font-medium text-slate-900">{row.eagvsName}</p>
                          <a
                            href={row.eagvsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-csg-blue hover:underline"
                          >
                            {row.eagvsPath}
                          </a>
                        </td>
                        <td className="px-3 py-2 text-slate-700">
                          {row.countryName ? (
                            <>
                              <span>{row.countryName}</span>
                              <span className="block text-xs text-slate-500">
                                {row.countrySlug}
                              </span>
                            </>
                          ) : (
                            <span className="text-amber-700">Sistemde yok</span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-xs">
                          {row.matchStatus !== "matched" ? (
                            <span className="text-slate-400">-</span>
                          ) : row.hasDetailContent ? (
                            <span className="text-emerald-700">
                              {row.detailSectionCount} bölüm
                            </span>
                          ) : (
                            <span className="font-medium text-amber-700">Eksik</span>
                          )}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge(row.syncStatus)}`}
                          >
                            {statusLabel(row.syncStatus)}
                          </span>
                          {row.syncMessage ? (
                            <p className="mt-1 text-xs text-slate-500">{row.syncMessage}</p>
                          ) : null}
                          {row.report ? (
                            <button
                              type="button"
                              className="mt-1 text-xs text-csg-blue hover:underline"
                              onClick={() =>
                                setExpandedUrl((current) =>
                                  current === row.eagvsUrl ? null : row.eagvsUrl,
                                )
                              }
                            >
                              {expandedUrl === row.eagvsUrl
                                ? "Raporu gizle"
                                : "Raporu göster"}
                            </button>
                          ) : null}
                          {expandedUrl === row.eagvsUrl && row.report ? (
                            <div className="mt-2 space-y-2 rounded-md border border-slate-200 bg-slate-50 p-2 text-xs text-slate-600">
                              <p>
                                Detay:{" "}
                                {row.report.detailUpdated
                                  ? `${row.report.detailSectionCount} bölüm güncellendi`
                                  : "güncellenmedi"}
                              </p>
                              {row.report.programs.length > 0 ? (
                                <div>
                                  <p className="font-medium text-emerald-700">
                                    Çekilen programlar
                                  </p>
                                  <ul className="mt-1 list-disc pl-4">
                                    {row.report.programs.map((program) => (
                                      <li key={`${program.slug}-${program.title}`}>
                                        {program.title}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ) : null}
                              {row.report.documents.length > 0 ? (
                                <div>
                                  <p className="font-medium text-emerald-700">
                                    Çekilen dökümanlar
                                  </p>
                                  <ul className="mt-1 list-disc pl-4">
                                    {row.report.documents.map((document) => (
                                      <li key={`${document.fileName}-${document.label}`}>
                                        {document.label}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ) : null}
                              {row.report.skipped.length > 0 ? (
                                <div>
                                  <p className="font-medium text-amber-700">Atlananlar</p>
                                  <ul className="mt-1 list-disc pl-4">
                                    {row.report.skipped.map((item) => (
                                      <li key={`${item.url}-${item.reason}`}>
                                        {item.label}: {item.reason}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ) : null}
                            </div>
                          ) : null}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            Henüz liste çekilmedi. EAGVS tüm ülkeler sayfasından ülkeleri yükleyin; detayı
            eksik olanlar otomatik seçilir.
          </p>
        )}
      </div>

      <aside className="space-y-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Senkron özeti</h2>
          <dl className="mt-3 space-y-2 text-sm text-slate-600">
            <div className="flex justify-between gap-3">
              <dt>Listedeki ülke</dt>
              <dd className="font-medium text-slate-900">{rows.length}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Detayı eksik</dt>
              <dd className="font-medium text-amber-700">{missingCount}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Seçili</dt>
              <dd className="font-medium text-slate-900">{selectedCount}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Detay çekildi</dt>
              <dd className="font-medium text-emerald-700">{detailPulledCount}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Başarılı</dt>
              <dd className="font-medium text-emerald-700">{successCount}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Atlandı</dt>
              <dd className="font-medium text-amber-700">{skippedCount}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Hata</dt>
              <dd className="font-medium text-red-700">{errorCount}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Çekilenler</h2>
          <div className="mt-3 max-h-48 space-y-2 overflow-y-auto text-xs text-slate-600">
            {detailPulledCount === 0 &&
            pulledPrograms.length === 0 &&
            pulledDocuments.length === 0 ? (
              <p>Henüz çekilen kayıt yok.</p>
            ) : (
              <>
                {detailPulledCount > 0 ? (
                  <p className="font-medium text-emerald-700">
                    {detailPulledCount} ülke detay bölümü güncellendi
                  </p>
                ) : null}
                {pulledPrograms.map((program) => (
                  <p key={`p-${program.country}-${program.slug}`}>
                    <span className="text-slate-400">{program.country}:</span> {program.title}
                  </p>
                ))}
                {pulledDocuments.map((document) => (
                  <p key={`d-${document.country}-${document.fileName}`}>
                    <span className="text-slate-400">{document.country}:</span>{" "}
                    {document.label}
                  </p>
                ))}
              </>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Atlananlar</h2>
          <div className="mt-3 max-h-48 space-y-2 overflow-y-auto text-xs text-slate-600">
            {skippedItems.length === 0 ? (
              <p>Henüz atlanan kayıt yok.</p>
            ) : (
              skippedItems.map((item) => (
                <p key={`s-${item.country}-${item.url}-${item.reason}`}>
                  <span className="text-slate-400">{item.country}:</span> {item.label}
                  <span className="block text-amber-700">{item.reason}</span>
                </p>
              ))
            )}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Günlük
          </p>
          <div className="mt-2 max-h-56 space-y-1 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
            {logLines.length === 0 ? (
              <p>Henüz işlem yok.</p>
            ) : (
              logLines.map((line, index) => (
                <p key={`${index}-${line}`} className="leading-relaxed">
                  {line}
                </p>
              ))
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
