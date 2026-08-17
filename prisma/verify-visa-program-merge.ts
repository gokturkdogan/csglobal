import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function tableExists(name: string): Promise<boolean> {
  const rows = await prisma.$queryRaw<Array<{ exists: boolean }>>`
    SELECT EXISTS (
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = ${name}
    ) AS "exists"
  `;
  return rows[0]?.exists ?? false;
}

async function main() {
  const errors: string[] = [];

  if (!await tableExists("visa_programs")) {
    console.error("FAIL: visa_programs tablosu yok");
    process.exit(1);
  }

  if (await tableExists("articles")) {
    errors.push("articles tablosu hâlâ mevcut (migrate-to-visa-programs çalıştırılmalı)");
  }

  if (await tableExists("article_category_links")) {
    errors.push("article_category_links tablosu hâlâ mevcut");
  }

  const programCount = await prisma.visaProgram.count();
  const linkCount = await prisma.visaProgramCategoryLink.count();

  const orphanFees = await prisma.$queryRaw<Array<{ count: bigint }>>`
    SELECT COUNT(*)::bigint AS count FROM fees f
    LEFT JOIN visa_programs vp ON f.visa_program_id = vp.id
    WHERE vp.id IS NULL
  `;

  const orphanFaqs = await prisma.$queryRaw<Array<{ count: bigint }>>`
    SELECT COUNT(*)::bigint AS count FROM faqs f
    LEFT JOIN visa_programs vp ON f.visa_program_id = vp.id
    WHERE f.visa_program_id IS NOT NULL AND vp.id IS NULL
  `;

  const orphanSections = await prisma.$queryRaw<Array<{ count: bigint }>>`
    SELECT COUNT(*)::bigint AS count FROM service_sections s
    LEFT JOIN visa_programs vp ON s.visa_program_id = vp.id
    WHERE vp.id IS NULL
  `;

  const orphanDocs = await prisma.$queryRaw<Array<{ count: bigint }>>`
    SELECT COUNT(*)::bigint AS count FROM service_documents d
    LEFT JOIN visa_programs vp ON d.visa_program_id = vp.id
    WHERE vp.id IS NULL
  `;

  const seoTypes = await prisma.$queryRaw<Array<{ entity_type: string; count: bigint }>>`
    SELECT entity_type::text, COUNT(*)::bigint AS count
    FROM seo_metadata
    WHERE entity_type::text IN ('SERVICE', 'ARTICLE', 'VISA_PROGRAM')
    GROUP BY entity_type
  `;

  const activeWithoutSeo = await prisma.$queryRaw<Array<{ count: bigint }>>`
    SELECT COUNT(*)::bigint AS count
    FROM visa_programs vp
    WHERE vp.is_active = true
      AND NOT EXISTS (
        SELECT 1 FROM seo_metadata sm
        WHERE sm.entity_id = vp.id AND sm.entity_type = 'VISA_PROGRAM'::"SeoEntityType"
      )
  `;

  const programsWithoutCategoryLink = await prisma.$queryRaw<Array<{ id: string; name: string }>>`
    SELECT vp.id, vp.name
    FROM visa_programs vp
    WHERE NOT EXISTS (
      SELECT 1 FROM visa_program_category_links l WHERE l.visa_program_id = vp.id
    )
    AND vp.category_id IS NOT NULL
  `;

  console.log("=== Vize Program Birleştirme Doğrulama ===");
  console.log(`visa_programs: ${programCount}`);
  console.log(`visa_program_category_links: ${linkCount}`);
  console.log(`orphan fees: ${Number(orphanFees[0]?.count ?? 0)}`);
  console.log(`orphan faqs: ${Number(orphanFaqs[0]?.count ?? 0)}`);
  console.log(`orphan sections: ${Number(orphanSections[0]?.count ?? 0)}`);
  console.log(`orphan documents: ${Number(orphanDocs[0]?.count ?? 0)}`);
  console.log("SEO entity types:", seoTypes);
  console.log(`aktif program SEO eksik: ${Number(activeWithoutSeo[0]?.count ?? 0)}`);

  if (Number(orphanFees[0]?.count ?? 0) > 0) errors.push("orphan fees");
  if (Number(orphanFaqs[0]?.count ?? 0) > 0) errors.push("orphan faqs");
  if (Number(orphanSections[0]?.count ?? 0) > 0) errors.push("orphan sections");
  if (Number(orphanDocs[0]?.count ?? 0) > 0) errors.push("orphan documents");

  const legacySeo = seoTypes.filter(
    (r) => r.entity_type === "SERVICE" || r.entity_type === "ARTICLE",
  );
  if (legacySeo.length > 0) {
    errors.push(`legacy SEO rows: ${JSON.stringify(legacySeo)}`);
  }

  if (programsWithoutCategoryLink.length > 0) {
    console.warn(
      "Uyarı: junction satırı olmayan programlar (category_id ile panelde görünebilir):",
      programsWithoutCategoryLink.length,
    );
  }

  if (errors.length > 0) {
    console.error("FAIL:", errors.join("; "));
    process.exit(1);
  }

  console.log("PASS: tüm kontroller başarılı");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
