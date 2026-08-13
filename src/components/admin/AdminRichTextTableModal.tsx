"use client";

import { useEffect } from "react";
import {
  addTableColumn,
  addTableRow,
  createEmptyMatrix,
  removeTableColumn,
  removeTableRow,
  updateMatrixCell,
  type TableMatrix,
} from "@/lib/rich-text-table";

const inputClass =
  "w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 shadow-sm focus:border-csg-blue focus:outline-none focus:ring-2 focus:ring-csg-blue/20";

type Props = {
  open: boolean;
  mode: "create" | "edit";
  matrix: TableMatrix;
  onMatrixChange: (matrix: TableMatrix) => void;
  onApply: () => void;
  onRemove?: () => void;
  onClose: () => void;
};

export function AdminRichTextTableModal({
  open,
  mode,
  matrix,
  onMatrixChange,
  onApply,
  onRemove,
  onClose,
}: Props) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  const normalized =
    matrix.length > 0 ? matrix : createEmptyMatrix(2, 2);
  const colCount = normalized[0]?.length ?? 0;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rich-text-table-modal-title"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-3xl max-h-[90vh] flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-slate-200 px-5 py-4">
          <h2
            id="rich-text-table-modal-title"
            className="text-sm font-semibold text-slate-900"
          >
            {mode === "create" ? "Tablo ekle" : "Tablo düzenle"}
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            İlk satır başlık olarak gösterilir. Hücrelere metin girin.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-slate-100 px-5 py-3">
          <button
            type="button"
            onClick={() => onMatrixChange(addTableRow(normalized))}
            className="cursor-pointer rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            + Satır
          </button>
          <button
            type="button"
            onClick={() => onMatrixChange(addTableColumn(normalized))}
            className="cursor-pointer rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            + Sütun
          </button>
          <button
            type="button"
            onClick={() => onMatrixChange(removeTableRow(normalized))}
            disabled={normalized.length <= 1}
            className="cursor-pointer rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            − Satır
          </button>
          <button
            type="button"
            onClick={() => onMatrixChange(removeTableColumn(normalized))}
            disabled={colCount <= 1}
            className="cursor-pointer rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            − Sütun
          </button>
        </div>

        <div className="overflow-auto px-5 py-4">
          <table className="w-full min-w-[280px] border-collapse text-sm">
            <tbody>
              {normalized.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td
                      key={`${rowIndex}-${colIndex}`}
                      className="border border-slate-200 p-1.5 align-top"
                    >
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) =>
                          onMatrixChange(
                            updateMatrixCell(
                              normalized,
                              rowIndex,
                              colIndex,
                              e.target.value,
                            ),
                          )
                        }
                        placeholder={
                          rowIndex === 0
                            ? `Başlık ${colIndex + 1}`
                            : `Satır ${rowIndex + 1}, sütun ${colIndex + 1}`
                        }
                        className={inputClass}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-slate-200 px-5 py-4">
          {mode === "edit" && onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Tabloyu kaldır
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            İptal
          </button>
          <button
            type="button"
            onClick={onApply}
            className="cursor-pointer rounded-lg bg-csg-blue px-3 py-1.5 text-sm font-semibold text-white hover:bg-csg-blue-dark"
          >
            {mode === "create" ? "Ekle" : "Kaydet"}
          </button>
        </div>
      </div>
    </div>
  );
}
