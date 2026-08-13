import type { JSONContent } from "@tiptap/react";
import type { Node as ProseMirrorNode } from "@tiptap/pm/model";

export type TableMatrix = string[][];

export function createEmptyMatrix(rows = 2, cols = 2): TableMatrix {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ""),
  );
}

export function extractMatrixFromTableHtml(table: HTMLTableElement): TableMatrix {
  const rows = Array.from(table.rows);
  if (rows.length === 0) return createEmptyMatrix();

  const colCount = Math.max(
    ...rows.map((row) => row.cells.length),
    1,
  );

  return rows.map((row) => {
    const cells = Array.from(row.cells);
    return Array.from({ length: colCount }, (_, index) => {
      return cells[index]?.textContent?.trim() ?? "";
    });
  });
}

export function matrixFromTableNode(node: ProseMirrorNode): TableMatrix {
  const matrix: TableMatrix = [];

  node.forEach((row) => {
    if (row.type.name !== "tableRow") return;
    const cells: string[] = [];
    row.forEach((cell) => {
      if (cell.type.name !== "tableCell" && cell.type.name !== "tableHeader") {
        return;
      }
      cells.push(cell.textContent.trim());
    });
    matrix.push(cells);
  });

  return matrix.length > 0 ? matrix : createEmptyMatrix();
}

export function normalizeMatrix(matrix: TableMatrix): TableMatrix {
  if (matrix.length === 0) return createEmptyMatrix();

  const colCount = Math.max(...matrix.map((row) => row.length), 1);
  return matrix.map((row) =>
    Array.from({ length: colCount }, (_, index) => row[index] ?? ""),
  );
}

export function buildTableContent(matrix: TableMatrix): JSONContent {
  const normalized = normalizeMatrix(matrix);
  if (normalized.length === 0) {
    return { type: "paragraph" };
  }

  return {
    type: "table",
    content: normalized.map((row, rowIndex) => ({
      type: "tableRow",
      content: row.map((cellText) => ({
        type: rowIndex === 0 ? "tableHeader" : "tableCell",
        content: [
          {
            type: "paragraph",
            content: cellText.trim()
              ? [{ type: "text", text: cellText }]
              : [],
          },
        ],
      })),
    })),
  };
}

export function addTableRow(matrix: TableMatrix): TableMatrix {
  const normalized = normalizeMatrix(matrix);
  const colCount = normalized[0]?.length ?? 2;
  return [...normalized, Array.from({ length: colCount }, () => "")];
}

export function addTableColumn(matrix: TableMatrix): TableMatrix {
  const normalized = normalizeMatrix(matrix);
  return normalized.map((row) => [...row, ""]);
}

export function removeTableRow(matrix: TableMatrix): TableMatrix {
  const normalized = normalizeMatrix(matrix);
  if (normalized.length <= 1) return normalized;
  return normalized.slice(0, -1);
}

export function removeTableColumn(matrix: TableMatrix): TableMatrix {
  const normalized = normalizeMatrix(matrix);
  if (normalized[0]?.length <= 1) return normalized;
  return normalized.map((row) => row.slice(0, -1));
}

export function updateMatrixCell(
  matrix: TableMatrix,
  rowIndex: number,
  colIndex: number,
  value: string,
): TableMatrix {
  return matrix.map((row, r) =>
    r === rowIndex
      ? row.map((cell, c) => (c === colIndex ? value : cell))
      : row,
  );
}
