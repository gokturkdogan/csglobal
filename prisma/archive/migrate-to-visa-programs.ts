import "dotenv/config";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "../../src/lib/prisma";

type SlugFix = { articleId: string; originalSlug: string; fixedSlug: string; countryId: string };

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
  const hasArticles = await tableExists("articles");
  const hasArticleLinks = await tableExists("article_category_links");
  const hasVisaPrograms = await tableExists("visa_programs");

  if (!hasVisaPrograms) {
    console.error("visa_programs tablosu yok. Önce prisma migrate deploy çalıştırın.");
    process.exit(1);
  }

  if (!hasArticles) {
    console.log("articles tablosu yok; veri taşıması zaten tamamlanmış olabilir.");
    await mirrorServiceCategoryLinks();
    return;
  }

  const snapshot = {
    services: await prisma.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(*)::bigint AS count FROM visa_programs
    `,
    articles: await prisma.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(*)::bigint AS count FROM articles
    `,
  };

  const serviceCountBefore = Number(snapshot.services[0]?.count ?? 0);
  const articleCountBefore = Number(snapshot.articles[0]?.count ?? 0);
  console.log(`Snapshot: visa_programs=${serviceCountBefore}, articles=${articleCountBefore}`);

  const slugConflicts = await prisma.$queryRaw<
    Array<{ article_id: string; slug: string; country_id: string }>
  >`
    SELECT a.id AS article_id, a.slug, a.country_id
    FROM articles a
    INNER JOIN visa_programs vp ON a.country_id = vp.country_id AND a.slug = vp.slug
  `;

  const idConflicts = await prisma.$queryRaw<Array<{ id: string }>>`
    SELECT a.id FROM articles a INNER JOIN visa_programs vp ON a.id = vp.id
  `;

  if (idConflicts.length > 0) {
    console.error("Article id ile visa_program id çakışması:", idConflicts);
    process.exit(1);
  }

  const slugFixes: SlugFix[] = [];

  await prisma.$transaction(async (tx) => {
    for (const row of slugConflicts) {
      const fixedSlug = `${row.slug}-rehber`;
      slugFixes.push({
        articleId: row.article_id,
        originalSlug: row.slug,
        fixedSlug,
        countryId: row.country_id,
      });
      await tx.$executeRaw`
        UPDATE articles SET slug = ${fixedSlug} WHERE id = ${row.article_id}
      `;
    }

    const articlesWithoutCategory = await tx.$queryRaw<
      Array<{ id: string; title: string; country_id: string }>
    >`
      SELECT a.id, a.title, a.country_id
      FROM articles a
      WHERE NOT EXISTS (
        SELECT 1 FROM article_category_links acl WHERE acl.article_id = a.id
      )
    `;

    if (articlesWithoutCategory.length > 0) {
      console.warn(
        "Kategori bağlantısı olmayan makaleler için ülke bazlı varsayılan kategori atanıyor:",
        articlesWithoutCategory.map((a) => a.title),
      );

      const globalFallback = await tx.$queryRaw<Array<{ id: string }>>`
        SELECT id FROM categories WHERE is_active = true ORDER BY sort_order ASC LIMIT 1
      `;
      const globalCategoryId = globalFallback[0]?.id;
      if (!globalCategoryId) {
        throw new Error("Varsayılan kategori bulunamadı");
      }

      for (const row of articlesWithoutCategory) {
        const countryFallback = await tx.$queryRaw<Array<{ category_id: string }>>`
          SELECT acl.category_id
          FROM article_category_links acl
          INNER JOIN articles a2 ON a2.id = acl.article_id
          WHERE a2.country_id = ${row.country_id}
          GROUP BY acl.category_id
          ORDER BY COUNT(*)::int DESC
          LIMIT 1
        `;
        const categoryId = countryFallback[0]?.category_id ?? globalCategoryId;
        await tx.$executeRaw`
          INSERT INTO article_category_links (id, article_id, category_id, created_at)
          VALUES (${`fix_${row.id}`}, ${row.id}, ${categoryId}, NOW())
          ON CONFLICT DO NOTHING
        `;
      }
    }

    const articles = await tx.$queryRaw<
      Array<{
        id: string;
        country_id: string;
        article_category_id: string | null;
        title: string;
        slug: string;
        excerpt: string | null;
        content: string;
        hero_title: string | null;
        hero_subtitle: string | null;
        sections_json: string | null;
        feature_image: string | null;
        feature_image_title: string | null;
        feature_image_text: string | null;
        published_at: Date | null;
        is_published: boolean;
        show_in_category_panel: boolean;
        created_at: Date;
        updated_at: Date;
        primary_category_id: string;
      }>
    >`
      SELECT
        a.id,
        a.country_id,
        a.article_category_id,
        a.title,
        a.slug,
        a.excerpt,
        a.content,
        a.hero_title,
        a.hero_subtitle,
        a.sections_json,
        a.feature_image,
        a.feature_image_title,
        a.feature_image_text,
        a.published_at,
        a.is_published,
        a.show_in_category_panel,
        a.created_at,
        a.updated_at,
        (
          SELECT acl.category_id
          FROM article_category_links acl
          WHERE acl.article_id = a.id
          ORDER BY acl.created_at ASC
          LIMIT 1
        ) AS primary_category_id
      FROM articles a
    `;

    for (const article of articles) {
      await tx.$executeRaw`
        INSERT INTO visa_programs (
          id, country_id, category_id, article_category_id,
          name, slug, excerpt, content,
          hero_title, hero_subtitle, sections_json,
          feature_image_1, feature_image_1_title, feature_image_1_text,
          is_active, show_in_category_panel, published_at,
          sort_order, created_at, updated_at,
          is_featured, requires_appointment
        ) VALUES (
          ${article.id},
          ${article.country_id},
          ${article.primary_category_id},
          ${article.article_category_id},
          ${article.title},
          ${article.slug},
          ${article.excerpt},
          ${article.content},
          ${article.hero_title},
          ${article.hero_subtitle},
          ${article.sections_json},
          ${article.feature_image},
          ${article.feature_image_title},
          ${article.feature_image_text},
          ${article.is_published},
          ${article.show_in_category_panel},
          ${article.published_at},
          0,
          ${article.created_at},
          ${article.updated_at},
          false,
          false
        )
      `;
    }

    if (hasArticleLinks) {
      await tx.$executeRaw`
        INSERT INTO visa_program_category_links (id, visa_program_id, category_id, created_at)
        SELECT acl.id, acl.article_id, acl.category_id, acl.created_at
        FROM article_category_links acl
        ON CONFLICT (visa_program_id, category_id) DO NOTHING
      `;
    }

    await mirrorServiceCategoryLinks(tx);

    await tx.$executeRaw`
      UPDATE seo_metadata sm
      SET entity_type = 'VISA_PROGRAM'::"SeoEntityType"
      WHERE sm.entity_type IN ('SERVICE'::"SeoEntityType", 'ARTICLE'::"SeoEntityType")
    `;

    const programsWithCountry = await tx.$queryRaw<
      Array<{ id: string; slug: string; country_slug: string; canonical_url: string | null }>
    >`
      SELECT vp.id, vp.slug, c.slug AS country_slug, sm.canonical_url
      FROM visa_programs vp
      INNER JOIN countries c ON c.id = vp.country_id
      LEFT JOIN seo_metadata sm ON sm.entity_id = vp.id
        AND sm.entity_type = 'VISA_PROGRAM'::"SeoEntityType"
      WHERE sm.canonical_url IS NOT NULL AND sm.canonical_url LIKE '%/rehber/%'
    `;

    for (const row of programsWithCountry) {
      const newCanonical = `/${row.country_slug}/${row.slug}`;
      await tx.$executeRaw`
        UPDATE seo_metadata
        SET canonical_url = ${newCanonical}
        WHERE entity_id = ${row.id} AND entity_type = 'VISA_PROGRAM'::"SeoEntityType"
      `;
    }

    await tx.$executeRaw`DROP TABLE IF EXISTS article_services`;
    await tx.$executeRaw`DROP TABLE IF EXISTS article_category_links`;
    await tx.$executeRaw`DROP TABLE IF EXISTS articles`;
  }, { timeout: 600000, maxWait: 60000 });

  if (slugFixes.length > 0) {
    const logDir = path.join(process.cwd(), "prisma", "migration-logs");
    await mkdir(logDir, { recursive: true });
    const logPath = path.join(logDir, "visa-program-slug-fixes.json");
    await writeFile(logPath, JSON.stringify(slugFixes, null, 2), "utf8");
    console.log(`Slug düzeltmeleri kaydedildi: ${logPath}`);
  }

  const finalCount = await prisma.visaProgram.count();
  const expected = serviceCountBefore + articleCountBefore;
  console.log(`Tamamlandı: visa_programs=${finalCount}, beklenen=${expected}`);

  if (finalCount !== expected) {
    console.error("Satır sayısı eşleşmiyor!");
    process.exit(1);
  }
}

type TxClient = Parameters<Parameters<typeof prisma.$transaction>[0]>[0];

async function mirrorServiceCategoryLinks(tx?: TxClient) {
  const client = tx ?? prisma;
  await client.$executeRaw`
    INSERT INTO visa_program_category_links (id, visa_program_id, category_id, created_at)
    SELECT
      'mirror_' || vp.id || '_' || vp.category_id,
      vp.id,
      vp.category_id,
      NOW()
    FROM visa_programs vp
  ON CONFLICT (visa_program_id, category_id) DO NOTHING
  `;
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
