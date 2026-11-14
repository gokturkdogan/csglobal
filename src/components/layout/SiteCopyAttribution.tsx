"use client";

import { useEffect } from "react";

function selectionAnchorElement(selection: Selection): Element | null {
  const node = selection.anchorNode;
  if (!node) return null;
  return node.nodeType === Node.ELEMENT_NODE ? (node as Element) : node.parentElement;
}

function isCopyFromFormField(selection: Selection): boolean {
  const el = selectionAnchorElement(selection);
  if (!el) return false;
  return !!el.closest('input, textarea, select, [contenteditable="true"]');
}

function buildAttributionSuffix(): string {
  const host = window.location.host || "www.csglobal.tr";
  return `(${host} sitesinden alınmıştır)`;
}

function appendAttributionToPlainText(text: string, suffix: string): string {
  const trimmed = text.replace(/\s+$/u, "");
  if (!trimmed) return text;
  return `${trimmed}\n\n${suffix}`;
}

function appendAttributionToHtml(html: string, suffix: string): string {
  const escaped = suffix
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return `${html}<p><em>${escaped}</em></p>`;
}

/** Kopya yine de gerçekleşirse panoya kaynak satırı ekler (engeller aşılırsa). */
export function SiteCopyAttribution() {
  useEffect(() => {
    const onCopy = (event: ClipboardEvent) => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return;
      if (isCopyFromFormField(selection)) return;

      const plain = selection.toString();
      if (!plain.trim()) return;

      const suffix = buildAttributionSuffix();
      const withAttribution = appendAttributionToPlainText(plain, suffix);

      const range = selection.getRangeAt(0);
      const fragmentHost = document.createElement("div");
      fragmentHost.appendChild(range.cloneContents());
      const htmlWithAttribution = appendAttributionToHtml(fragmentHost.innerHTML, suffix);

      event.clipboardData?.setData("text/plain", withAttribution);
      event.clipboardData?.setData("text/html", htmlWithAttribution);
      event.preventDefault();
    };

    document.addEventListener("copy", onCopy);
    return () => document.removeEventListener("copy", onCopy);
  }, []);

  return null;
}