import "dotenv/config";
import { prisma } from "../src/lib/prisma";

/**
 * article_services satırındaki hizmetlerin category_id değerlerine göre
 * article_category_links tablosunu doldurur (tek seferlik taşıma).
 */
async function main() {
  const tableCheck = await prisma.$queryRaw<Array<{ exists: boolean }>>`
    SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name = 'article_services'
    ) AS "exists"
  `;

  if (!tableCheck[0]?.exists) {
    console.log("article_services tablosu yok; taşıma atlandı (zaten tamamlanmış olabilir).");
    return;
  }

  const pairs = await prisma.$queryRaw<Array<{ article_id: string; category_id: string }>>`
    SELECT DISTINCT as.article_id, s.category_id
    FROM article_services as
    INNER JOIN services s ON s.id = as.service_id
  `;

  if (pairs.length === 0) {
    console.log("Taşınacak hizmet bağlantısı yok.");
    return;
  }

  const result = await prisma.articleCategoryLink.createMany({
    data: pairs.map((row) => ({
      articleId: row.article_id,
      categoryId: row.category_id,
    })),
    skipDuplicates: true,
  });

  console.log(`${result.count} kategori bağlantısı oluşturuldu.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
