import { MarkdownContent } from "@/components/MarkdownContent";
import { isProbablyHtml } from "@/lib/rich-text";
import { sanitizeRichHtml } from "@/lib/sanitize-rich-html";

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
