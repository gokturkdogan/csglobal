import sanitizeHtml from "sanitize-html";
import { resolveRichTextLinkHref } from "@/lib/rich-text";

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "p",
    "br",
    "strong",
    "b",
    "em",
    "i",
    "ul",
    "ol",
    "li",
    "a",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel"],
  },
};

function normalizeAnchorHrefs(html: string): string {
  return html.replace(
    /<a\b([^>]*?)\shref=(["'])(.*?)\2([^>]*)>/gi,
    (match, before, quote, href, after) => {
      const resolved = resolveRichTextLinkHref(href);
      if (resolved === href) return match;
      return `<a${before} href=${quote}${resolved}${quote}${after}>`;
    },
  );
}

/** Sunucu ve istemicide jsdom gerektirmeyen HTML temizleme. */
export function sanitizeRichHtml(content: string): string {
  const sanitized = sanitizeHtml(content, SANITIZE_OPTIONS);
  const normalized = normalizeAnchorHrefs(sanitized);
  return normalized.replace(
    /<a\s(?![^>]*\btarget=)/gi,
    '<a target="_blank" rel="noopener noreferrer" ',
  );
}
