"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const TOOLTIP_TEXT = "Bu site sağ tıklamayı engellemiştir.";
const TOOLTIP_VISIBLE_MS = 2200;

function selectionAnchorElement(selection: Selection): Element | null {
  const node = selection.anchorNode;
  if (!node) return null;
  return node.nodeType === Node.ELEMENT_NODE ? (node as Element) : node.parentElement;
}

function isInteractionInFormField(target: EventTarget | null): boolean {
  if (!(target instanceof Node)) return false;
  const el = target.nodeType === Node.ELEMENT_NODE ? (target as Element) : target.parentElement;
  if (!el) return false;
  return !!el.closest('input, textarea, select, [contenteditable="true"]');
}

function isDevToolsShortcut(event: KeyboardEvent): boolean {
  const { key, ctrlKey, shiftKey, metaKey, altKey } = event;
  if (key === "F12") return true;
  if (ctrlKey && shiftKey && ["I", "i", "J", "j", "C", "c"].includes(key)) return true;
  if (metaKey && altKey && ["I", "i", "J", "j", "C", "c"].includes(key)) return true;
  if (ctrlKey && !shiftKey && (key === "u" || key === "U")) return true;
  return false;
}

export function SiteContentProtection() {
  const [tip, setTip] = useState<{ x: number; y: number } | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showTip = useCallback((clientX: number, clientY: number) => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    const margin = 12;
    const maxX = typeof window !== "undefined" ? window.innerWidth - 260 : clientX;
    const maxY = typeof window !== "undefined" ? window.innerHeight - 48 : clientY;
    setTip({
      x: Math.min(clientX + margin, maxX),
      y: Math.min(clientY + margin, maxY),
    });
    hideTimerRef.current = setTimeout(() => setTip(null), TOOLTIP_VISIBLE_MS);
  }, []);

  useEffect(() => {
    document.body.classList.add("site-copy-protection");

    const blockCut = (event: ClipboardEvent) => {
      if (isInteractionInFormField(event.target)) return;
      const selection = window.getSelection();
      if (selection && !selection.isCollapsed && isInteractionInFormField(selectionAnchorElement(selection))) {
        return;
      }
      event.preventDefault();
    };

    const onSelectStart = (event: Event) => {
      if (isInteractionInFormField(event.target)) return;
      event.preventDefault();
    };

    const onDragStart = (event: DragEvent) => {
      if (isInteractionInFormField(event.target)) return;
      event.preventDefault();
    };

    const onContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      showTip(event.clientX, event.clientY);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (isDevToolsShortcut(event)) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      const key = event.key.toLowerCase();
      if ((event.ctrlKey || event.metaKey) && (key === "c" || key === "x" || key === "a")) {
        if (!isInteractionInFormField(event.target)) {
          event.preventDefault();
        }
      }
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("cut", blockCut);
    document.addEventListener("selectstart", onSelectStart);
    document.addEventListener("dragstart", onDragStart);
    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      document.body.classList.remove("site-copy-protection");
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("cut", blockCut);
      document.removeEventListener("selectstart", onSelectStart);
      document.removeEventListener("dragstart", onDragStart);
      document.removeEventListener("keydown", onKeyDown, true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [showTip]);

  if (!tip) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed z-[9999] max-w-[min(240px,calc(100vw-1.5rem))] rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 shadow-lg shadow-slate-900/10"
      style={{ left: tip.x, top: tip.y }}
    >
      {TOOLTIP_TEXT}
    </div>
  );
}