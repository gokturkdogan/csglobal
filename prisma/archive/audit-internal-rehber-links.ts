import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../../src/generated/prisma/client";
import { resolvePgConnectionString } from "../../src/lib/pg-connection";

type Match = {
  table: string;
  id: string;
  field: string;
  oldUrl: string;
  newUrl: string | null;
};

const REHBER_PATTERN = /\/rehber\/([a-z0-9-]+)/gi;

function extractRehberSlugs(text: string): string[] {
  const slugs: string[] = [];
  for (const match of text.matchAll(REHBER_PATTERN)) {
    if (match[1]) slugs.push(match[1]);
  }
  return slugs;
}

function replaceRehberLinks(
  text: string,
  slugToPath: Map<string, string>,
): { updated: string; replacements: Array<{ oldUrl: string; newUrl: string }> } {
  const replacements: Array<{ oldUrl: string; newUrl: string }> = [];
  const updated = text.replace(REHBER_PATTERN, (full, slug: string) => {
    const path = slugToPath.get(slug);
    if (!path) return full;
    replacements.push({ oldUrl: full, newUrl: path });
    return path;
  });
  return { updated, replacements };
}

async function buildSlugPathMap(prisma: PrismaClient) {
  const programs = await prisma.visaProgram.findMany({
    where: { isActive: true },
    select: { slug: true, country: { select: { slug: true } } },
  });

  const map = new Map<string, string>();
  for (const program of programs) {
    const path = `/${program.country.slug}/${program.slug}`;
    map.set(program.slug, path);
    if (program.slug.endsWith("-rehber")) {
      const base = program.slug.slice(0, -"-rehber".length);
      if (!map.has(base)) map.set(base, path);
    }
  }
  return map;
}

async function main() {
  const fix = process.argv.includes("--fix");
  const pool = new Pool({
    connectionString: resolvePgConnectionString(process.env.DATABASE_URL!),
  });
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });
  const slugToPath = await buildSlugPathMap(prisma);
  const matches: Match[] = [];
  let updatedRows = 0;

  const programs = await prisma.visaProgram.findMany({
    select: {
      id: true,
      sectionsJson: true,
      featureImage1Text: true,
      featureImage2Text: true,
      sections: { select: { id: true, content: true } },
    },
  });

  for (const program of programs) {
    const fields: Array<{ field: string; value: string | null; sectionId?: string }> = [
      { field: "sectionsJson", value: program.sectionsJson },
      { field: "featureImage1Text", value: program.featureImage1Text },
      { field: "featureImage2Text", value: program.featureImage2Text },
    ];
    for (const section of program.sections) {
      fields.push({
        field: "visa_program_sections.content",
        value: section.content,
        sectionId: section.id,
      });
    }

    for (const { field, value, sectionId } of fields) {
      if (!value || !value.includes("/rehber/")) continue;
      const slugs = extractRehberSlugs(value);
      const { updated, replacements } = replaceRehberLinks(value, slugToPath);

      for (const slug of slugs) {
        const oldUrl = `/rehber/${slug}`;
        const newUrl = slugToPath.get(slug) ?? null;
        matches.push({
          table: sectionId ? "visa_program_sections" : "visa_programs",
          id: sectionId ?? program.id,
          field,
          oldUrl,
          newUrl,
        });
      }

      if (fix && updated !== value && replacements.length > 0) {
        if (sectionId) {
          await prisma.visaProgramSection.update({
            where: { id: sectionId },
            data: { content: updated },
          });
        } else if (field === "sectionsJson") {
          await prisma.visaProgram.update({
            where: { id: program.id },
            data: { sectionsJson: updated },
          });
        } else if (field === "featureImage1Text") {
          await prisma.visaProgram.update({
            where: { id: program.id },
            data: { featureImage1Text: updated },
          });
        } else if (field === "featureImage2Text") {
          await prisma.visaProgram.update({
            where: { id: program.id },
            data: { featureImage2Text: updated },
          });
        }
        updatedRows++;
      }
    }
  }

  const countries = await prisma.country.findMany({
    select: { id: true, detailSectionsJson: true, detailParagraph1: true, detailParagraph2: true },
  });

  for (const country of countries) {
    const fields: Array<{ field: string; value: string | null }> = [
      { field: "detailSectionsJson", value: country.detailSectionsJson },
      { field: "detailParagraph1", value: country.detailParagraph1 },
      { field: "detailParagraph2", value: country.detailParagraph2 },
    ];

    for (const { field, value } of fields) {
      if (!value || !value.includes("/rehber/")) continue;
      const slugs = extractRehberSlugs(value);
      const { updated, replacements } = replaceRehberLinks(value, slugToPath);

      for (const slug of slugs) {
        matches.push({
          table: "countries",
          id: country.id,
          field,
          oldUrl: `/rehber/${slug}`,
          newUrl: slugToPath.get(slug) ?? null,
        });
      }

      if (fix && updated !== value && replacements.length > 0) {
        await prisma.country.update({
          where: { id: country.id },
          data: { [field]: updated },
        });
        updatedRows++;
      }
    }
  }

  const consulates = await prisma.consulate.findMany({
    select: { id: true, sectionsJson: true },
  });

  for (const consulate of consulates) {
    const value = consulate.sectionsJson;
    if (!value || !value.includes("/rehber/")) continue;
    const slugs = extractRehberSlugs(value);
    const { updated, replacements } = replaceRehberLinks(value, slugToPath);

    for (const slug of slugs) {
      matches.push({
        table: "consulates",
        id: consulate.id,
        field: "sectionsJson",
        oldUrl: `/rehber/${slug}`,
        newUrl: slugToPath.get(slug) ?? null,
      });
    }

    if (fix && updated !== value && replacements.length > 0) {
      await prisma.consulate.update({
        where: { id: consulate.id },
        data: { sectionsJson: updated },
      });
      updatedRows++;
    }
  }

  const unresolved = matches.filter((m) => !m.newUrl);
  const resolved = matches.filter((m) => m.newUrl);

  console.log(`Mod: ${fix ? "fix" : "audit"}`);
  console.log(`Toplam /rehber/ referansı: ${matches.length}`);
  console.log(`Eşleşen (güncellenebilir): ${resolved.length}`);
  console.log(`Eşleşmeyen slug: ${unresolved.length}`);
  console.log(`Güncellenen satır: ${updatedRows}`);

  if (unresolved.length > 0) {
    console.log("\nEşleşmeyen referanslar:");
    for (const row of unresolved) {
      console.log(`  ${row.table} ${row.id} ${row.field}: ${row.oldUrl}`);
    }
  }

  if (!fix && resolved.length > 0) {
    console.log("\nDüzeltmek için: npm run db:fix-rehber-links");
  }

  await prisma.$disconnect();
  await pool.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
