import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { resolvePgConnectionString } from "../src/lib/pg-connection";
import {
  isJunkEagvsSection,
  sanitizeEagvsSectionContent,
} from "../src/lib/eagvs-content-sanitize";
import { serializeServiceSections } from "../src/lib/service-page";

const pool = new Pool({
  connectionString: resolvePgConnectionString(process.env.DATABASE_URL!),
});
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

type Section = { title: string; content: string };

function excerptFromSections(sections: Section[]): string | null {
  const intro = sections[0]?.content ?? "";
  const text = intro.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (!text) return null;
  return text.length > 220 ? `${text.slice(0, 217)}...` : text;
}

function cleanSections(raw: Section[]): Section[] {
  const cleaned: Section[] = [];
  for (const section of raw) {
    const content = sanitizeEagvsSectionContent(section.content ?? "");
    const title = section.title?.trim() ?? "";
    if (!content || /^<p>\s*<\/p>$/i.test(content)) continue;
    if (isJunkEagvsSection(title, content)) continue;
    cleaned.push({ title, content });
  }
  return cleaned;
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const posts = await prisma.blogPost.findMany({
    select: { id: true, slug: true, title: true, sectionsJson: true },
    orderBy: { title: "asc" },
  });

  let updated = 0;
  let skipped = 0;

  for (const post of posts) {
    const raw = JSON.parse(post.sectionsJson || "[]") as Section[];
    const cleaned = cleanSections(raw);
    const beforeHasJunk = (post.sectionsJson || "").includes("Benzer İçerikler");

    if (cleaned.length === 0) {
      console.warn(`SKIP (empty after clean): ${post.slug}`);
      skipped++;
      continue;
    }

    const nextJson = serializeServiceSections(cleaned);
    if (nextJson === post.sectionsJson) {
      if (beforeHasJunk) {
        console.warn(`UNCHANGED but had junk?: ${post.slug}`);
      }
      continue;
    }

    updated++;
    console.log(`${dryRun ? "[dry-run] " : ""}${post.slug}: ${raw.length} -> ${cleaned.length} sections`);

    if (!dryRun) {
      await prisma.blogPost.update({
        where: { id: post.id },
        data: {
          sectionsJson: nextJson,
          excerpt: excerptFromSections(cleaned),
        },
      });
    }
  }

  console.log(`\nDone. Updated ${updated}, skipped ${skipped}, total ${posts.length}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
