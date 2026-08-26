import "dotenv/config";
import { scrapeEagvsPage } from "../../src/lib/eagvs-scrape.ts";
import { scrapeEagvsCountryHub } from "../../src/lib/eagvs-country-hub-scrape.ts";
import { prisma } from "../../src/lib/prisma.ts";
import { parseServiceSectionsJson } from "../../src/lib/service-page.ts";

function oldSanitize(content) {
  const markers = [
    '<div class="col-sm-4 col-sm-pull-8">',
    "EUROASIA GLOBAL",
    "Bilgilendirme",
    "ile ilgili merak ettiklerinizi sorun",
  ];
  let end = content.length;
  for (const m of markers) {
    const idx = content.toLowerCase().indexOf(m.toLowerCase());
    if (idx !== -1 && idx < end) end = idx;
  }
  return content.slice(0, end).trim();
}

function plainLen(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().length;
}

function sectionStats(sections) {
  const lengths = sections.map((s) => plainLen(s.content));
  return {
    count: sections.length,
    total: lengths.reduce((a, b) => a + b, 0),
    lengths,
  };
}

async function auditLivePrograms(hubUrl, maxPrograms = 6) {
  const hub = await scrapeEagvsCountryHub(hubUrl);
  const links = hub.sidebarLinks.filter((l) => l.type === "rehber").slice(0, maxPrograms);
  console.log(`\n=== LIVE ${hubUrl} (${links.length} sampled) ===`);
  let buggy = 0;
  for (const link of links) {
    const scraped = await scrapeEagvsPage(link.url);
    const cur = sectionStats(scraped.sections);
    const oldSections = scraped.sections.map((s) => ({
      title: s.title,
      content: oldSanitize(s.content),
    }));
    const old = sectionStats(oldSections);
    const ratio = old.total / (cur.total || 1);
    const wasBuggy = ratio < 0.85;
    if (wasBuggy) buggy++;
    console.log(
      `${wasBuggy ? "!" : " "} ${link.label.slice(0, 50)} | ${cur.count} sec | live ${cur.total} | old_bug ${old.total} (${Math.round(ratio * 100)}%)`,
    );
  }
  console.log(`Old bug would truncate: ${buggy}/${links.length}`);
}

async function auditDbPrograms(limit = 40) {
  const programs = await prisma.visaProgram.findMany({
    take: limit,
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      name: true,
      slug: true,
      sectionsJson: true,
      country: { select: { slug: true, name: true } },
    },
  });

  let suspicious = [];
  for (const p of programs) {
    const sections = parseServiceSectionsJson(p.sectionsJson);
    const stats = sectionStats(sections);
    const shortBody = sections.filter((s) => plainLen(s.content) < 150);
    const hasEuroasiaCut = sections.some((s) => {
      const plain = s.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      return (
        plain.includes("Euroasia Global") &&
        plainLen(s.content) < 400 &&
        !plain.endsWith(".")
      );
    });
    if (stats.total < 500 || shortBody.length >= 2 || hasEuroasiaCut) {
      suspicious.push({
        country: p.country.slug,
        slug: p.slug,
        name: p.name,
        sections: stats.count,
        totalChars: stats.total,
        shortSections: shortBody.map((s) => s.title),
      });
    }
  }

  console.log(`\n=== DB audit (${programs.length} recent programs) ===`);
  console.log(`Suspicious (short/t truncated pattern): ${suspicious.length}`);
  for (const row of suspicious.slice(0, 15)) {
    console.log(
      `- ${row.country}/${row.slug}: ${row.totalChars} chars, ${row.sections} sec, short: ${row.shortSections.join("; ") || "-"}`,
    );
  }

  // Compare a few suspicious with live scrape if we can guess URL
  const toCompare = suspicious.slice(0, 5);
  for (const row of toCompare) {
    const guesses = [
      `https://www.eagvs.com/${row.country}-${row.slug}`,
      `https://www.eagvs.com/${row.slug}`,
      `https://www.eagvs.com/${row.country}/${row.slug}`,
    ];
    for (const url of guesses) {
      try {
        const scraped = await scrapeEagvsPage(url);
        const live = sectionStats(scraped.sections);
        const db = sectionStats(parseServiceSectionsJson(
          programs.find((p) => p.slug === row.slug)?.sectionsJson,
        ));
        const ratio = db.total / (live.total || 1);
        console.log(
          `  compare ${row.slug} @ ${url}: DB ${db.total} vs LIVE ${live.total} (${Math.round(ratio * 100)}%)`,
        );
        break;
      } catch {
        // try next url
      }
    }
  }
}

const hubs = [
  "https://www.eagvs.com/mozambik/",
  "https://www.eagvs.com/almanya/",
  "https://www.eagvs.com/avusturya-vizesi",
];

for (const hub of hubs) {
  await auditLivePrograms(hub, 6);
}

await auditDbPrograms(60);

await prisma.$disconnect();
