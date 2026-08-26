"use client";

import { useMemo, useState } from "react";
import {
  buildProgramRepairQueueCountryAction,
  listProgramRepairCountriesAction,
  previewProgramRepairItemAction,
  repairProgramItemAction,
  type ProgramRepairCountryRow,
} from "@/lib/eagvs-program-repair-actions";
import { PROGRAM_REPAIR_BATCH_SIZE } from "@/lib/eagvs-program-repair-constants";
import type { ProgramRepairQueueItem } from "@/lib/eagvs-program-content-sync";
import { AdminLoadingButton } from "@/components/admin/AdminForm";
import { useAdminToast } from "@/components/admin/AdminToast";

type RepairStatus = "idle" | "scanning" | "running" | "fixed" | "skipped" | "error";

type ProgramRow = {
  countryId: string;
  countryName: string;
  countrySlug: string;
  programId: string;
  programName: string;
  programSlug: string;
  eagvsUrl: string;
  eagvsLabel: string;
  dbCharCount: number;
  liveCharCount: number;
  ratio: number;
  needsRepair: boolean;
  selected: boolean;
  repairStatus: RepairStatus;
  repairMessage?: string;
};

type FilterMode = "needs_repair" | "all";

const inputClass =
  "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function awaitWithElapsed<T>(
  label: string,
  run: () => Promise<T>,
  onProgress: (text: string) => void,
): Promise<T> {
  const start = Date.now();
  const interval = setInterval(() => {
    const sec = Math.floor((Date.now() - start) / 1000);
    onProgress(`${label} (${sec}s)`);
  }, 1000);
  try {
    return await run();
  } finally {
    clearInterval(interval);
  }
}

function statusBadge(status: RepairStatus) {
  switch (status) {
    case "scanning":
    case "running":
      return "bg-blue-100 text-blue-800";
    case "fixed":
      return "bg-emerald-100 text-emerald-800";
    case "skipped":
      return "bg-amber-100 text-amber-800";
    case "error":
      return "bg-red-100 text-red-800";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

function statusLabel(status: RepairStatus) {
  switch (status) {
    case "scanning":
      return "Taranıyor";
    case "running":
      return "Çalışıyor";
    case "fixed":
      return "Düzeltildi";
    case "skipped":
      return "Atlandı";
    case "error":
      return "Hata";
    default:
      return "Bekliyor";
  }
}

function rowKey(row: { programId: string; eagvsUrl: string }) {
  return `${row.programId}-${row.eagvsUrl}`;
}

function toProgramRow(
  row: Omit<ProgramRow, "selected" | "repairStatus" | "repairMessage">,
  repairStatus: RepairStatus = "idle",
): ProgramRow {
  return {
    ...row,
    selected: row.needsRepair,
    repairStatus,
  };
}

export function EagvsProgramRepairForm() {
  const toast = useAdminToast();
  const [countries, setCountries] = useState<ProgramRepairCountryRow[]>([]);
  const [queue, setQueue] = useState<ProgramRepairQueueItem[]>([]);
  const [scanIndex, setScanIndex] = useState(0);
  const [countryBuildIndex, setCountryBuildIndex] = useState(0);
  const [hubComplete, setHubComplete] = useState(false);
  const [rows, setRows] = useState<ProgramRow[]>([]);
  const [filter, setFilter] = useState<FilterMode>("needs_repair");
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [repairing, setRepairing] = useState(false);
  const [scanProgress, setScanProgress] = useState("");
  const [logLines, setLogLines] = useState<string[]>([]);

  const matchedCountries = countries.filter((c) => c.matchStatus === "matched");
  const unscannedInQueue = Math.max(0, queue.length - scanIndex);
  const canExtendHub = !hubComplete && countryBuildIndex < matchedCountries.length;
  const nextBatchSize =
    canExtendHub
      ? PROGRAM_REPAIR_BATCH_SIZE
      : Math.min(PROGRAM_REPAIR_BATCH_SIZE, unscannedInQueue);
  const needsRepairCount = rows.filter((r) => r.needsRepair).length;
  const selectedCount = rows.filter((r) => r.selected && r.needsRepair).length;
  const repairBatchCount = Math.min(
    PROGRAM_REPAIR_BATCH_SIZE,
    rows.filter((r) => r.selected && r.needsRepair && r.repairStatus !== "fixed").length,
  );
  const fixedCount = rows.filter((r) => r.repairStatus === "fixed").length;
  const skippedCount = rows.filter((r) => r.repairStatus === "skipped").length;
  const errorCount = rows.filter((r) => r.repairStatus === "error").length;

  const countrySummary = useMemo(() => {
    const map = new Map<
      string,
      { name: string; fixed: number; skipped: number; error: number; needsRepair: number }
    >();
    for (const row of rows) {
      const entry = map.get(row.countrySlug) ?? {
        name: row.countryName,
        fixed: 0,
        skipped: 0,
        error: 0,
        needsRepair: 0,
      };
      if (row.needsRepair) entry.needsRepair += 1;
      if (row.repairStatus === "fixed") entry.fixed += 1;
      if (row.repairStatus === "skipped") entry.skipped += 1;
      if (row.repairStatus === "error") entry.error += 1;
      map.set(row.countrySlug, entry);
    }
    return [...map.entries()].sort((a, b) => a[1].name.localeCompare(b[1].name, "tr"));
  }, [rows]);

  const filteredRows = useMemo(() => {
    if (filter === "needs_repair") return rows.filter((r) => r.needsRepair);
    return rows;
  }, [rows, filter]);

  async function loadCountries() {
    setLoadingCountries(true);
    try {
      const result = await listProgramRepairCountriesAction();
      if (!result.ok) {
        toast.show({ variant: "error", message: result.message ?? "Ülke listesi alınamadı." });
        return;
      }
      setCountries(result.countries);
      setQueue([]);
      setScanIndex(0);
      setCountryBuildIndex(0);
      setHubComplete(false);
      setRows([]);
      setLogLines([
        `${result.countries.length} ülke (program kaydı var).`,
        `${result.countries.filter((c) => c.matchStatus === "matched").length} ülke EAGVS ile eşleşti.`,
      ]);
      toast.show({ variant: "success", message: "Ülke listesi yüklendi." });
    } catch {
      toast.show({ variant: "error", message: "Ülke listesi alınırken hata oluştu." });
    } finally {
      setLoadingCountries(false);
    }
  }

  async function extendQueueTo(targetLength: number): Promise<ProgramRepairQueueItem[]> {
    const countryQueue = countries.filter((c) => c.matchStatus === "matched" && c.eagvsUrl);
    if (countryQueue.length === 0) return queue;

    const seen = new Set(queue.map((item) => `${item.programId}-${item.eagvsUrl}`));
    const collected: ProgramRepairQueueItem[] = [...queue];
    let idx = countryBuildIndex;

    while (collected.length < targetLength && idx < countryQueue.length) {
      const country = countryQueue[idx];
      setScanProgress(
        `Hub eşleşmesi: ${country.countryName} (ülke ${idx + 1}/${countryQueue.length})`,
      );

      const result = await awaitWithElapsed(
        `Hub: ${country.countryName}`,
        () => buildProgramRepairQueueCountryAction(country.countryId, country.eagvsUrl),
        setScanProgress,
      );

      idx += 1;

      if (!result.ok) {
        setLogLines((prev) => [
          ...prev,
          `✗ ${country.countryName}: ${result.message ?? "hub eşleşme hatası"}`,
        ]);
        continue;
      }

      let added = 0;
      for (const item of result.items) {
        const key = `${item.programId}-${item.eagvsUrl}`;
        if (seen.has(key)) continue;
        seen.add(key);
        collected.push(item);
        added += 1;
      }

      setQueue([...collected]);
      setLogLines((prev) => [
        ...prev,
        `✓ ${country.countryName}: +${added} program (toplam ${collected.length}).`,
      ]);
      await sleep(80);
    }

    setCountryBuildIndex(idx);
    if (idx >= countryQueue.length) setHubComplete(true);
    return collected;
  }

  async function scanNextBatch() {
    if (matchedCountries.length === 0) {
      toast.show({ variant: "error", message: "Önce ülke listesini yükleyin." });
      return;
    }
    if (hubComplete && scanIndex >= queue.length) {
      toast.show({ variant: "success", message: "Tüm programlar tarandı." });
      return;
    }

    setScanning(true);

    const targetEnd = scanIndex + PROGRAM_REPAIR_BATCH_SIZE;
    const currentQueue = await extendQueueTo(targetEnd);
    const batch = currentQueue.slice(
      scanIndex,
      Math.min(scanIndex + PROGRAM_REPAIR_BATCH_SIZE, currentQueue.length),
    );

    if (batch.length === 0) {
      setScanning(false);
      setScanProgress("");
      toast.show({ variant: "error", message: "Bu batch için program bulunamadı." });
      return;
    }

    setLogLines((prev) => [
      ...prev,
      `Program tarama batch: ${batch.length} program (${scanIndex + 1}-${scanIndex + batch.length}).`,
    ]);

    let batchNeedsRepair = 0;
    let currentRows = rows;

    for (let i = 0; i < batch.length; i++) {
      const item = batch[i];
      setScanProgress(`Program ${scanIndex + i + 1}: ${item.countryName} / ${item.programName}`);

      const result = await awaitWithElapsed(
        `Program ${scanIndex + i + 1}: ${item.programName}`,
        () => previewProgramRepairItemAction(item.programId, item.eagvsUrl),
        setScanProgress,
      );

      if (!result.ok || !result.row) {
        setLogLines((prev) => [
          ...prev,
          `✗ ${item.countryName} / ${item.programName}: ${result.message ?? "tarama hatası"}`,
        ]);
        continue;
      }

      const programRow = toProgramRow({
        ...result.row,
        eagvsLabel: item.eagvsLabel,
      });
      if (programRow.needsRepair) batchNeedsRepair += 1;
      currentRows = currentRows.some((row) => rowKey(row) === rowKey(programRow))
        ? currentRows.map((row) =>
            rowKey(row) === rowKey(programRow) ? programRow : row,
          )
        : [...currentRows, programRow];
      setRows(currentRows);
      await sleep(80);
    }

    const nextIndex = scanIndex + batch.length;
    setScanIndex(nextIndex);
    setScanning(false);
    setScanProgress("");
    setLogLines((prev) => [
      ...prev,
      `Batch bitti: ${batch.length} program tarandı, ${batchNeedsRepair} kesik. Taranan toplam: ${nextIndex}.`,
    ]);
    toast.show({
      variant: "success",
      message: `${batch.length} program tarandı (toplam ${nextIndex}).`,
    });
  }

  function toggleRow(key: string) {
    setRows((current) =>
      current.map((row) =>
        rowKey(row) === key ? { ...row, selected: !row.selected } : row,
      ),
    );
  }

  function selectAllNeedsRepair(selected: boolean) {
    setRows((current) =>
      current.map((row) =>
        row.needsRepair ? { ...row, selected } : row,
      ),
    );
  }

  async function runRepair() {
    const queue = rows.filter(
      (row) =>
        row.selected &&
        row.needsRepair &&
        row.repairStatus !== "fixed" &&
        row.repairStatus !== "running",
    );
    const batch = queue.slice(0, PROGRAM_REPAIR_BATCH_SIZE);

    if (batch.length === 0) {
      toast.show({ variant: "error", message: "Düzeltmek için kesik program seçin." });
      return;
    }

    setRepairing(true);
    setLogLines((prev) => [
      ...prev,
      `Düzeltme batch: ${batch.length} program (max ${PROGRAM_REPAIR_BATCH_SIZE}).`,
    ]);

    for (const item of batch) {
      const key = rowKey(item);
      setRows((current) =>
        current.map((row) =>
          rowKey(row) === key
            ? { ...row, repairStatus: "running", repairMessage: "Güncelleniyor..." }
            : row,
        ),
      );

      const { result } = await awaitWithElapsed(
        `Düzelt: ${item.programName}`,
        () => repairProgramItemAction(item.programId, item.eagvsUrl),
        setScanProgress,
      );

      setRows((current) =>
        current.map((row) =>
          rowKey(row) === key
            ? {
                ...row,
                repairStatus: result.status,
                repairMessage: result.message,
                dbCharCount: result.dbCharCount,
                liveCharCount: result.liveCharCount,
                needsRepair: result.status !== "fixed",
                ratio:
                  result.liveCharCount > 0
                    ? result.dbCharCount / result.liveCharCount
                    : row.ratio,
              }
            : row,
        ),
      );

      setLogLines((prev) => [
        ...prev,
        `${result.status === "fixed" ? "✓" : result.status === "skipped" ? "↷" : "✗"} ${result.countryName} / ${result.programName}: ${result.message}`,
      ]);

      await sleep(300);
    }

    setRepairing(false);
    const remaining = rows.filter(
      (row) =>
        row.selected &&
        row.needsRepair &&
        row.repairStatus !== "fixed" &&
        row.repairStatus !== "running",
    ).length - batch.length;
    setLogLines((prev) => [
      ...prev,
      `Batch düzeltme bitti. Kalan seçili kesik: ${Math.max(0, remaining)}.`,
    ]);
    toast.show({
      variant: "success",
      message: `${batch.length} program işlendi.`,
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <AdminLoadingButton
            pending={loadingCountries}
            loadingLabel="Yükleniyor..."
            onClick={loadCountries}
            disabled={scanning || repairing}
          >
            Ülke listesini yükle
          </AdminLoadingButton>

          <AdminLoadingButton
            pending={scanning}
            loadingLabel="İşleniyor..."
            onClick={scanNextBatch}
            disabled={
              loadingCountries ||
              matchedCountries.length === 0 ||
              repairing ||
              (hubComplete && scanIndex >= queue.length)
            }
          >
            Sonraki {nextBatchSize} programu tara
          </AdminLoadingButton>

          <AdminLoadingButton
            pending={repairing}
            loadingLabel="Düzeltiliyor..."
            onClick={runRepair}
            disabled={scanning || rows.length === 0 || repairBatchCount === 0}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Batch düzelt ({repairBatchCount})
          </AdminLoadingButton>

          {scanProgress ? (
            <span className="text-sm text-slate-500">{scanProgress}</span>
          ) : null}
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
          <p className="font-medium text-slate-700">Nasıl çalışır?</p>
          <ul className="mt-2 list-disc space-y-1 pl-4">
            <li>Her tıklamada en fazla {PROGRAM_REPAIR_BATCH_SIZE} program işlenir (ülke bazlı değil).</li>
            <li>EAGVS yavaş yanıt verirse tek istek ~45 sn bekleyebilir; süre satırda görünür.</li>
            <li>Önce gerekli ülke hub eşleşmesi yapılır, ardından programlar canlı taranır.</li>
            <li>Yalnızca sistemde kayıtlı programlar işlenir; yeni program oluşturulmaz.</li>
            <li>DB içeriği canlı sayfanın %85 altındaysa kesik kabul edilir.</li>
            <li>Düzeltme de her seferde en fazla {PROGRAM_REPAIR_BATCH_SIZE} seçili program.</li>
          </ul>
        </div>

        {rows.length > 0 ? (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <button
                type="button"
                className={`${inputClass} ${filter === "needs_repair" ? "border-csg-blue text-csg-blue" : ""}`}
                onClick={() => setFilter("needs_repair")}
              >
                Kesik ({needsRepairCount})
              </button>
              <button
                type="button"
                className={`${inputClass} ${filter === "all" ? "border-csg-blue text-csg-blue" : ""}`}
                onClick={() => setFilter("all")}
              >
                Tümü ({rows.length})
              </button>
              <label className="ml-auto flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  className="rounded border-slate-300"
                  checked={
                    needsRepairCount > 0 &&
                    rows.filter((r) => r.needsRepair).every((r) => r.selected)
                  }
                  onChange={(e) => selectAllNeedsRepair(e.target.checked)}
                  disabled={scanning || repairing || needsRepairCount === 0}
                />
                Tüm kesikleri seç
              </label>
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-3 py-2">Seç</th>
                    <th className="px-3 py-2">Ülke</th>
                    <th className="px-3 py-2">Program</th>
                    <th className="px-3 py-2">DB</th>
                    <th className="px-3 py-2">Canlı</th>
                    <th className="px-3 py-2">Durum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredRows.map((row) => (
                    <tr key={`${row.programId}-${row.eagvsUrl}`} className="align-top">
                      <td className="px-3 py-2">
                        <input
                          type="checkbox"
                          className="rounded border-slate-300"
                          checked={row.selected}
                          disabled={
                            !row.needsRepair ||
                            scanning ||
                            repairing ||
                            row.repairStatus === "running"
                          }
                          onChange={() => toggleRow(rowKey(row))}
                        />
                      </td>
                      <td className="px-3 py-2 text-slate-600">{row.countryName}</td>
                      <td className="px-3 py-2">
                        <p className="font-medium text-slate-900">{row.programName}</p>
                        <a
                          href={row.eagvsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-csg-blue hover:underline"
                        >
                          EAGVS
                        </a>
                      </td>
                      <td className="px-3 py-2 text-slate-600">{row.dbCharCount}</td>
                      <td className="px-3 py-2 text-slate-600">
                        {row.liveCharCount}
                        {row.liveCharCount > 0 ? (
                          <span className="block text-xs text-slate-400">
                            {Math.round(row.ratio * 100)}%
                          </span>
                        ) : null}
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge(row.repairStatus)}`}
                        >
                          {row.needsRepair && row.repairStatus === "idle"
                            ? "Kesik"
                            : statusLabel(row.repairStatus)}
                        </span>
                        {row.repairMessage ? (
                          <p className="mt-1 text-xs text-slate-500">{row.repairMessage}</p>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            Henüz tarama yok. Ülke listesini yükleyin, ardından her seferde{" "}
            {PROGRAM_REPAIR_BATCH_SIZE} programlık batchlerle tarayın.
          </p>
        )}
      </div>

      <aside className="space-y-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Özet</h2>
          <dl className="mt-3 space-y-2 text-sm text-slate-600">
            <div className="flex justify-between gap-3">
              <dt>Ülke (programlı)</dt>
              <dd className="font-medium text-slate-900">{countries.length}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>EAGVS eşleşen</dt>
              <dd className="font-medium text-slate-900">{matchedCountries.length}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Keşfedilen program</dt>
              <dd className="font-medium text-slate-900">{queue.length}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Taranan program</dt>
              <dd className="font-medium text-slate-900">{scanIndex}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Tarama kalan</dt>
              <dd className="font-medium text-slate-900">
                {hubComplete ? unscannedInQueue : `${unscannedInQueue}+`}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Hub ilerleme</dt>
              <dd className="font-medium text-slate-900">
                {hubComplete
                  ? "Tamam"
                  : `${countryBuildIndex}/${matchedCountries.length} ülke`}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Listede</dt>
              <dd className="font-medium text-slate-900">{rows.length}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Kesik</dt>
              <dd className="font-medium text-amber-700">{needsRepairCount}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Düzeltildi</dt>
              <dd className="font-medium text-emerald-700">{fixedCount}</dd>
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

        {countrySummary.length > 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">Ülke bazlı</h2>
            <div className="mt-3 max-h-64 space-y-2 overflow-y-auto text-xs text-slate-600">
              {countrySummary.map(([slug, summary]) => (
                <div key={slug} className="rounded-md border border-slate-100 bg-slate-50 p-2">
                  <p className="font-medium text-slate-800">{summary.name}</p>
                  <p>
                    Kesik: {summary.needsRepair} · Düzeltildi: {summary.fixed} · Atlandı:{" "}
                    {summary.skipped} · Hata: {summary.error}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Günlük</p>
          <div className="mt-2 max-h-56 space-y-1 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
            {logLines.length === 0 ? (
              <p>Henüz işlem yok.</p>
            ) : (
              logLines.map((line, index) => (
                <p key={`${index}-${line}`} className="leading-relaxed">{line}</p>
              ))
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
