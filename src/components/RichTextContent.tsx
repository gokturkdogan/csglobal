import DOMPurify from "isomorphic-dompurify";
import { MarkdownContent } from "@/components/MarkdownContent";
import { isProbablyHtml, resolveRichTextLinkHref } from "@/lib/rich-text";

const SANITIZE_OPTIONS = {
  ALLOWED_TAGS: [
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
  ALLOWED_ATTR: ["href", "target", "rel"],
  RETURN_TRUSTED_TYPE: false as const,
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

function sanitizeRichHtml(content: string): string {
  const sanitized = DOMPurify.sanitize(content, SANITIZE_OPTIONS);
  const normalized = normalizeAnchorHrefs(sanitized);
  return normalized.replace(
    /<a\s(?![^>]*\btarget=)/gi,
    '<a target="_blank" rel="noopener noreferrer" ',
  );
}

export function RichTextContent({ content }: { content: string }) {
  const html = sanitizeRichHtml(content);

  return (
    <div
      className="prose-csg max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/** HTML veya eski markdown içeriği uygun şekilde gösterir. */
export function RichContent({ content }: { content: string }) {
  if (isProbablyHtml(content)) {
    return <RichTextContent content={content} />;
  }
  return <MarkdownContent content={content} />;
}
