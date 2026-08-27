/**
 * Mihci kaynak metninden Yabancı Danışmanlık çalışma izni içeriği oluşturur.
 * Run: node prisma/scripts/import-yabancilarin-sirket-kurmasi.mjs
 */
import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../../src/generated/prisma/client";
import { resolvePgConnectionString } from "../../src/lib/pg-connection";
import { serializeServiceSections } from "../../src/lib/service-page";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MD_PATH = path.join(__dirname, "../data/yabancilarin-turkiyede-sirket-kurmasi-source.md");

const SLUG = "yabancilarin-turkiyede-sirket-kurmasi";
const NAME = "Yabancıların Türkiye'de Şirket Kurması";
const EXCERPT =
  "Yabancıların Türkiye'de şirket kurması, mevzuatta belirtilen şartların sağlanması ve gerekli belgelerle başvuru yapılmasıyla mümkündür. MERSİS, anonim ve limited şirket kuruluşu, belgeler, maliyet ve sonrası süreçler.";
const HERO_SUBTITLE = EXCERPT;

const LINK_REPLACEMENTS = [
  {
    pattern: /"yabancıların banka hesabı açması" başlıklı makalemizi inceleyebilirsiniz\.?/gi,
    replacement:
      "banka hesabı açma süreci için uzman ekibimizle iletişime geçebilirsiniz.",
  },
  {
    pattern: /"yabancı çalışma izni" yazımızı inceleyerek daha fazla bilgi sahibi olabilirsiniz\.?/gi,
    replacement:
      '<a href="/yabanci-danismanlik/calisma-izni/calisma-izni">yabancı çalışma izni</a> içeriğimizi inceleyebilirsiniz.',
  },
  {
    pattern: /"çalışma izni muafiyeti" yazımızı inceleyerek ulaşabilirsiniz\.?/gi,
    replacement:
      '<a href="/yabanci-danismanlik/calisma-izni/calisma-izni-muafiyeti">çalışma izni muafiyeti</a> içeriğimizi inceleyebilirsiniz.',
  },
  {
    pattern: /"yabancı şirketlerin Türkiye'de şube açması" başlıklı makalede detaylı şekilde açıklanmaktadır\.?/gi,
    replacement: "şube açma süreci için danışmanlık alabilirsiniz.",
  },
  {
    pattern: /"yabancı şirketlerin Türkiye'de irtibat bürosu açması" başlıklı makalemizi inceleyebilirsiniz\.?/gi,
    replacement: "irtibat bürosu kurulumu için danışmanlık alabilirsiniz.",
  },
  {
    pattern: /"yabancıların Türkiye'den gayrimenkul alması" başlıklı makalemizde bulunmaktadır\.?/gi,
    replacement: "gayrimenkul edinimi için danışmanlık alabilirsiniz.",
  },
  {
    pattern: /yabancılar hukuku avukatından danışmanlık almaları önerilir\.?/gi,
    replacement: "uzman danışmanlık ekibimize başvurmaları önerilir.",
  },
  {
    pattern: /yabancılar avukatına danışılması faydalı olacaktır\.?/gi,
    replacement: "CSGLOBAL uzman ekibine danışılması faydalı olacaktır.",
  },
  {
    pattern: /Şahıs şirketi kuruluş maliyeti ise yaklaşık TL'dir\.?/gi,
    replacement: "Şahıs şirketi kuruluş maliyeti tabloda belirtilen tutarlara tabidir.",
  },
];

function cleanLine(line) {
  let text = line.replace(/\*\*/g, "").trim();
  for (const { pattern, replacement } of LINK_REPLACEMENTS) {
    text = text.replace(pattern, replacement);
  }
  return text.replace(/—/g, "-");
}

function inlineHtml(text) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/DİKKAT:/g, "<strong>DİKKAT:</strong>");
}

function parseMarkdownSections(raw) {
  const lines = raw.split("\n");
  let startIdx = lines.findIndex((l) => l.startsWith("## "));
  if (startIdx < 0) throw new Error("## başlık bulunamadı");

  const introLines = [];
  for (let i = 4; i < startIdx; i++) {
    const line = cleanLine(lines[i]);
    if (line && !line.startsWith("İçindekiler") && !line.startsWith("-")) {
      introLines.push(line);
    }
  }

  const sections = [];
  if (introLines.length) {
    sections.push({
      title: NAME,
      content: `<p>${inlineHtml(introLines.join(" "))}</p>`,
    });
  }

  let current = null;
  let buffer = [];

  const flush = () => {
    if (!current) return;
    sections.push({ title: current.title, content: blockToHtml(buffer) });
    buffer = [];
    current = null;
  };

  for (let i = startIdx; i < lines.length; i++) {
    const rawLine = lines[i];
    if (rawLine.startsWith("Bülten:")) break;
    if (rawLine.startsWith("## ")) {
      flush();
      current = { title: cleanLine(rawLine.replace(/^##\s+/, "")) };
      continue;
    }
    if (!current) continue;
    buffer.push(rawLine);
  }
  flush();

  return sections;
}

function blockToHtml(blockLines) {
  const parts = [];
  let listItems = [];
  let tableRows = [];

  const flushList = () => {
    if (listItems.length) {
      parts.push(`<ul>\n${listItems.map((li) => `<li>${inlineHtml(li)}</li>`).join("\n")}\n</ul>`);
      listItems = [];
    }
  };

  const flushTable = () => {
    if (tableRows.length < 2) {
      tableRows = [];
      return;
    }
    const header = tableRows[0];
    const body = tableRows.slice(2);
    parts.push(
      `<table><thead><tr>${header.map((c) => `<th>${inlineHtml(c)}</th>`).join("")}</tr></thead><tbody>${body
        .map((row) => `<tr>${row.map((c) => `<td>${inlineHtml(c)}</td>`).join("")}</tr>`)
        .join("")}</tbody></table>`,
    );
    tableRows = [];
  };

  for (const rawLine of blockLines) {
    const line = rawLine.trimEnd();
    if (!line.trim()) {
      flushList();
      flushTable();
      continue;
    }
    if (line.startsWith("### ")) {
      flushList();
      flushTable();
      parts.push(`<h3>${inlineHtml(cleanLine(line.replace(/^###\s+/, "")))}</h3>`);
      continue;
    }
    if (line.startsWith("|")) {
      flushList();
      const cells = line
        .split("|")
        .slice(1, -1)
        .map((c) => cleanLine(c.trim()));
      if (cells.every((c) => /^-+$/.test(c))) continue;
      tableRows.push(cells);
      continue;
    }
    if (line.startsWith("- ")) {
      flushTable();
      listItems.push(cleanLine(line.replace(/^- /, "")));
      continue;
    }
    flushList();
    flushTable();
    parts.push(`<p>${inlineHtml(cleanLine(line))}</p>`);
  }
  flushList();
  flushTable();
  return parts.join("");
}

async function main() {
  if (!fs.existsSync(MD_PATH)) {
    console.error("Markdown bulunamadı:", MD_PATH);
    process.exit(1);
  }

  const raw = fs.readFileSync(MD_PATH, "utf8");
  const sections = parseMarkdownSections(raw);
  const sectionsJson = serializeServiceSections(sections);

  const pool = new Pool({
    connectionString: resolvePgConnectionString(process.env.DATABASE_URL),
  });
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

  const data = {
    category: "CALISMA_IZNI",
    name: NAME,
    slug: SLUG,
    excerpt: EXCERPT,
    shortDescription: EXCERPT,
    content: "",
    heroTitle: NAME,
    heroSubtitle: HERO_SUBTITLE,
    sectionsJson,
    isActive: true,
    sortOrder: 0,
    publishedAt: new Date(),
  };

  const existing = await prisma.foreignConsultancyContent.findUnique({ where: { slug: SLUG } });
  if (existing) {
    await prisma.foreignConsultancyContent.update({ where: { slug: SLUG }, data });
    console.log("Güncellendi:", SLUG, "sections:", sections.length);
  } else {
    await prisma.foreignConsultancyContent.create({ data });
    console.log("Oluşturuldu:", SLUG, "sections:", sections.length);
  }

  const outDir = path.join(__dirname, "../data/fc-batch4-sources");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    path.join(outDir, `${SLUG}.json`),
    JSON.stringify({ slug: SLUG, name: NAME, excerpt: EXCERPT, sections }, null, 2),
    "utf8",
  );
  console.log("Kaynak JSON yazıldı:", SLUG);

  await prisma.$disconnect();
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
