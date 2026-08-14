import fs from "fs";
import path from "path";

/** EAGVS sayfa listesi: slug -> tam URL */
export const EAGVS_PAGES = [
  {
    slug: "amerika-f2-m2-ogrenci-ailesi-vizesi",
    url: "https://www.eagvs.com/amerika/amerika-f2-/-m2-ogrenci-ailesi-vizesi-",
  },
  {
    slug: "j1-amerika-degisim-programi-vizesi",
    url: "https://www.eagvs.com/amerika/j1-amerika-degisim-programi-vizesi-",
  },
  {
    slug: "j2-amerika-degisim-programi-aile-vizesi",
    url: "https://www.eagvs.com/amerika/j2-amerika-degisim-programi-aile-vizesi-",
  },
  {
    slug: "amerika-vize-yenileme",
    url: "https://www.eagvs.com/amerika/amerika-vize-yenileme",
  },
  {
    slug: "green-card-basvurusu",
    url: "https://www.eagvs.com/amerika/green-card-basvurusu-",
  },
  {
    slug: "calisma-yoluyla-green-card",
    url: "https://www.eagvs.com/amerika/calisma-yoluyla-green-card-",
  },
  {
    slug: "nisanlilik-yoluyla-green-card-k-1-vizesi",
    url: "https://www.eagvs.com/amerika/nisanlilik-yoluyla-green-card-k-1-vizesi",
  },
  {
    slug: "akrabalik-yoluyla-green-card",
    url: "https://www.eagvs.com/amerika/akrabalik-yoluyla-green-card-",
  },
  {
    slug: "gocmen-yatirimci-yoluyla-green-card-e-5-vizesi",
    url: "https://www.eagvs.com/amerika/gocmen-yatirimci-yoluyla-green-card-e-5-vizesi",
  },
  {
    slug: "amerika-o-vizesi",
    url: "https://www.eagvs.com/amerika/amerika-o-vizesi-olaganustu-yetenek-ve-basariya-sahip-bireyler",
  },
  {
    slug: "e2-amerika-yatirimci-vizesi",
    url: "https://www.eagvs.com/amerika/e2-amerika-yatirimci-vizesi-",
  },
  {
    slug: "amerika-i-vizesi",
    url: "https://www.eagvs.com/amerika/-amerika-i-vizesi-basin-mensubu-ve-gazeteciler-",
  },
  {
    slug: "amerika-p-vizesi",
    url: "https://www.eagvs.com/amerika/amerika-p-vizesi-sporcular-sanatcilar-ve-gosteri-grubu-uyeleri-",
  },
  {
    slug: "amerika-q-1-kulturel-degisim-programi-vizesi",
    url: "https://www.eagvs.com/amerika/amerika-q-1-kulturel-degisim-programi-vizesi-",
  },
  {
    slug: "amerika-r-vizesi",
    url: "https://www.eagvs.com/amerika/amerika-r-vizesi-din-gorevlileri",
  },
  {
    slug: "amerika-l-1-sirket-ici-transfer-vizesi",
    url: "https://www.eagvs.com/amerika/amerika-l-1-sirket-ici-transfer-vizesi-",
  },
  {
    slug: "h-1b-h-2a-h-2b-ve-h3-gecici-calisma-vizesi",
    url: "https://www.eagvs.com/amerika/h-1b-h-2a-h-2b-ve-h3-gecici-calisma-vizesi",
  },
  {
    slug: "e1-amerika-tuccar-vizesi",
    url: "https://www.eagvs.com/amerika/e1-amerika-tuccar-vizesi-",
  },
];

const FOOTER_MARKERS = [
  "Amerika ile ilgili merak ettiklerinizi sorun",
  "Bilgilendirme",
];

function stripTags(html) {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function extractPoiText(html) {
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1Title = h1Match ? stripTags(h1Match[1]) : "";

  const poiMarker = '<div class="poi-txt">';
  const poiStart = html.indexOf(poiMarker);
  if (poiStart === -1) throw new Error("poi-txt not found");

  let poiHtml = html.slice(poiStart + poiMarker.length);

  let end = poiHtml.length;
  for (const marker of FOOTER_MARKERS) {
    const idx = poiHtml.indexOf(marker);
    if (idx !== -1 && idx < end) end = idx;
  }
  const sidebarIdx = poiHtml.indexOf("<h4 class=\"p-sm\"");
  if (sidebarIdx !== -1 && sidebarIdx < end) end = sidebarIdx;

  poiHtml = poiHtml.slice(0, end);

  return { h1Title, poiHtml };
}

function cleanContentHtml(html) {
  let out = html;
  out = out.replace(/<!--[\s\S]*?-->/g, "");
  out = out.replace(/<img\b[^>]*>/gi, "");
  out = out.replace(/<script[\s\S]*?<\/script>/gi, "");
  out = out.replace(
    /<a\b[^>]*href="[^"]*"[^>]*>([\s\S]*?)<\/a>/gi,
    (_, inner) => {
      const label = stripTags(inner);
      if (!label) return "";
      return `<a href="">${label}</a>`;
    },
  );
  out = out.replace(/<span class="__cf_email__"[^>]*>([\s\S]*?)<\/span>/gi, "$1");
  out = out.replace(/\s+/g, " ");
  out = out.replace(/>\s+</g, "><");
  return out.trim();
}

function splitSections(h1Title, poiHtml) {
  const sections = [];
  const headingRe = /<(h2|h3|h4)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  const headings = [];
  let match;

  while ((match = headingRe.exec(poiHtml)) !== null) {
    const title = stripTags(match[2]);
    if (!title) continue;
  headings.push({
      tag: match[1].toLowerCase(),
      title,
      index: match.index,
      fullLength: match[0].length,
    });
  }

  const introEnd = headings.length > 0 ? headings[0].index : poiHtml.length;
  const introHtml = poiHtml.slice(0, introEnd).trim();
  if (h1Title && introHtml) {
    const content = cleanContentHtml(introHtml);
    if (content && !/^<p>\s*<\/p>$/i.test(content)) {
      sections.push({ title: h1Title, content });
    }
  }

  for (let i = 0; i < headings.length; i++) {
    const start = headings[i].index + headings[i].fullLength;
    const end = i + 1 < headings.length ? headings[i + 1].index : poiHtml.length;
    const body = poiHtml.slice(start, end).trim();
    let content = cleanContentHtml(body);
    if (!content || /^<p>\s*<\/p>$/i.test(content)) {
      content = "<p>-</p>";
    }
    sections.push({ title: headings[i].title, content });
  }

  return sections;
}

export async function scrapeEagvsPage(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  const html = await res.text();
  const { h1Title, poiHtml } = extractPoiText(html);
  return splitSections(h1Title, poiHtml);
}

const outDir = path.join(process.cwd(), "prisma/eagvs-content");
fs.mkdirSync(outDir, { recursive: true });

const pages = process.argv[2]
  ? EAGVS_PAGES.filter((p) => p.slug === process.argv[2])
  : EAGVS_PAGES;

if (pages.length === 0) {
  console.error("Sayfa bulunamadı:", process.argv[2]);
  process.exit(1);
}

for (const page of pages) {
  const sections = await scrapeEagvsPage(page.url);

  fs.writeFileSync(
    path.join(outDir, `${page.slug}.json`),
    JSON.stringify(sections, null, 2),
    "utf8",
  );

  console.log(`${page.slug}: ${sections.length} sections`);
  sections.forEach((s, i) => {
    console.log(`  ${i + 1}. ${s.title} (${s.content.length} chars)`);
  });
}
