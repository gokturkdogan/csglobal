import { getPublicSiteOrigin } from "@/lib/site-url";

/** HTML içerik boş mu (yalnızca boş etiketler / whitespace). */
export function isEmptyHtml(html: string): boolean {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .trim()
    .length === 0;
}

export function isProbablyHtml(content: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(content.trim());
}

export function normalizeRichTextContent(
  value: string | null | undefined,
): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || isEmptyHtml(trimmed)) return null;
  return trimmed;
}

function inlineMarkdownToHtml(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/__(.+?)__/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
      const normalized = normalizeLinkUrl(href);
      return `<a href="${normalized}">${label}</a>`;
    });
}

/** Eski markdown içerikleri editörde düzenlenebilir HTML'e çevirir. */
export function contentForRichTextEditor(value: string): string {
  if (!value.trim()) return "";
  if (isProbablyHtml(value)) return value;

  const lines = value.replace(/\r\n/g, "\n").split("\n");
  const blocks: string[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length === 0) return;
    blocks.push(
      `<ul>${listItems
        .map((item) => `<li>${inlineMarkdownToHtml(item)}</li>`)
        .join("")}</ul>`,
    );
    listItems = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    const listMatch = trimmed.match(/^[-*]\s+(.*)$/);
    if (listMatch) {
      listItems.push(listMatch[1]);
      continue;
    }
    flushList();
    if (trimmed) {
      blocks.push(`<p>${inlineMarkdownToHtml(trimmed)}</p>`);
    }
  }
  flushList();

  return blocks.join("") || "<p></p>";
}

function looksLikeExternalHost(input: string): boolean {
  const hostPart = input.split("/")[0]?.split("?")[0] ?? "";
  if (!hostPart) return false;
  if (/^localhost(:\d+)?$/i.test(hostPart)) return true;
  return hostPart.includes(".");
}

function internalPathFromAbsoluteUrl(url: URL): string {
  const path = url.pathname + url.search + url.hash;
  return path || "/";
}

function isSameSiteOrigin(url: URL): boolean {
  return url.origin === getPublicSiteOrigin();
}

/**
 * Bağlantı kaydı: dış site tam URL, site içi yol (/asset/..., /rehber/...).
 */
export function normalizeLinkUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "";

  if (/^(mailto:|tel:)/i.test(trimmed)) {
    return trimmed;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const parsed = new URL(trimmed);
      if (isSameSiteOrigin(parsed)) {
        return internalPathFromAbsoluteUrl(parsed);
      }
      return parsed.href;
    } catch {
      return trimmed;
    }
  }

  if (trimmed.startsWith("/")) {
    return trimmed.replace(/\/{2,}/g, "/");
  }

  if (looksLikeExternalHost(trimmed)) {
    return `https://${trimmed}`;
  }

  return `/${trimmed.replace(/^\/+/, "")}`;
}

/** Editör modalında gösterim: site URL'si yol olarak, dış link tam URL. */
export function linkUrlForEditor(href: string): string {
  const trimmed = href.trim();
  if (!trimmed) return "";

  if (/^(mailto:|tel:)/i.test(trimmed)) {
    return trimmed;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const parsed = new URL(trimmed);
      if (isSameSiteOrigin(parsed)) {
        return internalPathFromAbsoluteUrl(parsed);
      }
      return parsed.href;
    } catch {
      return trimmed;
    }
  }

  return trimmed;
}

/** Sitede gösterim öncesi href düzeltmesi (eski tam site URL'leri yola çevirir). */
export function resolveRichTextLinkHref(href: string): string {
  return normalizeLinkUrl(href);
}
