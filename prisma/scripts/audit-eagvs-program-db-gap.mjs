import "dotenv/config";
import { scrapeEagvsPage } from "../../src/lib/eagvs-scrape.ts";
import { scrapeEagvsCountryHub } from "../../src/lib/eagvs-country-hub-scrape.ts";
import { slugFromEagvsUrl } from "../../src/lib/eagvs-scrape.ts";
import { prisma } from "../../src/lib/prisma.ts";
import { parseServiceSectionsJson } from "../../src/lib/service-page.ts";

function plainLen(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().length;
}

function totalChars(sectionsJson) {
  const sections = parseServiceSectionsJson(sectionsJson);
  return sections.reduce((n, s) => n + plainLen(s.content), 0);
}

async function compareCountryPrograms(countrySlug, hubUrl) {
  const hub = await scrapeEagvsCountryHub(hubUrl);
  const programLinks = hub.sidebarLinks.filter((l) => l.type === "rehber");

  const dbPrograms = await prisma.visaProgram.findMany({
    where: { country: { slug: countrySlug } },
    select: { slug: true, name: true, sectionsJson: true },
  });
  const dbBySlug = new Map(dbPrograms.map((p) => [p.slug, p]));

  const gaps = [];
  for (const link of programLinks) {
    const slug = slugFromEagvsUrl(link.url);
    const db = dbBySlug.get(slug);
    if (!db) continue;

    const dbTotal = totalChars(db.sectionsJson);
    try {
      const scraped = await scrapeEagvsPage(link.url);
      const liveTotal = scraped.sections.reduce((n, s) => n + plainLen(s.content), 0);
      const ratio = dbTotal / (liveTotal || 1);
      if (ratio < 0.75) {
        gaps.push({
          slug,
          name: db.name,
          dbTotal,
          liveTotal,
          ratio,
          url: link.url,
        });
      }
    } catch (e) {
      gaps.push({
        slug,
        name: db.name,
        dbTotal,
        liveTotal: 0,
        ratio: 0,
        url: link.url,
        error: e.message,
      });
    }
  }

  console.log(`\n=== ${countrySlug} (${programLinks.length} hub links, ${dbPrograms.length} in DB) ===`);
  console.log(`Programs with DB < 75% of live scrape: ${gaps.length}`);
  for (const g of gaps.sort((a, b) => a.ratio - b.ratio).slice(0, 12)) {
    console.log(
      `  ${Math.round(g.ratio * 100)}% | ${g.slug} | DB ${g.dbTotal} / LIVE ${g.liveTotal}${g.error ? ` ERR ${g.error}` : ""}`,
    );
  }
  return gaps.length;
}

const samples = [
  { slug: "mozambik", url: "https://www.eagvs.com/mozambik/" },
  { slug: "almanya", url: "https://www.eagvs.com/almanya/" },
  { slug: "avusturya", url: "https://www.eagvs.com/avusturya-vizesi" },
  { slug: "rusya", url: "https://www.eagvs.com/rusya-vizesi" },
  { slug: "romanya", url: "https://www.eagvs.com/romanya-vizesi" },
  { slug: "uganda", url: "https://www.eagvs.com/uganda-vizesi" },
];

let totalGaps = 0;
for (const c of samples) {
  try {
    totalGaps += await compareCountryPrograms(c.slug, c.url);
  } catch (e) {
    console.log(`\n=== ${c.slug} FAILED: ${e.message} ===`);
  }
}

// Global heuristic: programs with very short sections mentioning Euroasia mid-content
const all = await prisma.visaProgram.findMany({
  select: {
    slug: true,
    sectionsJson: true,
    country: { select: { slug: true } },
  },
});
let truncatedPattern = 0;
for (const p of all) {
  const sections = parseServiceSectionsJson(p.sectionsJson);
  for (const s of sections) {
    const plain = s.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (
      plain.includes("Euroasia Global") &&
      plainLen(s.content) < 500 &&
      plainLen(s.content) > 80
    ) {
      truncatedPattern++;
      break;
    }
  }
}
console.log(`\n=== Global heuristic ===`);
console.log(`Programs with short section containing "Euroasia Global" (likely old bug): ${truncatedPattern} / ${all.length}`);

await prisma.$disconnect();
