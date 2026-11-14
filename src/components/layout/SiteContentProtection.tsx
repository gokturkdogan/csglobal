"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const TOOLTIP_TEXT = "Bu site sağ tıklamayı engellemiştir.";
const TOOLTIP_VISIBLE_MS = 2200;

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
    const onContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      showTip(event.clientX, event.clientY);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (isDevToolsShortcut(event)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
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