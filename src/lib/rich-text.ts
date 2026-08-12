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
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href=\"$2\">$1</a>");
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

export function normalizeLinkUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (/^(https?:\/\/|mailto:|tel:)/i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}
