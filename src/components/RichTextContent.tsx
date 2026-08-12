import DOMPurify from "isomorphic-dompurify";
import { MarkdownContent } from "@/components/MarkdownContent";
import { isProbablyHtml } from "@/lib/rich-text";

const SANITIZE_OPTIONS = {
  ALLOWED_TAGS: ["p", "br", "strong", "b", "em", "i", "ul", "ol", "li", "a"],
  ALLOWED_ATTR: ["href", "target", "rel"],
  RETURN_TRUSTED_TYPE: false as const,
};

function sanitizeRichHtml(content: string): string {
  const sanitized = DOMPurify.sanitize(content, SANITIZE_OPTIONS);
  return sanitized.replace(
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
