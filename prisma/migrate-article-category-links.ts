import "dotenv/config";
import { prisma } from "../src/lib/prisma";

/**
 * Eski article_services / article_category_links taşıması.
 * Birleşik visa_programs migration sonrası kullanılmaz.
 */
async function main() {
  console.log(
    "Bu script birleşik Vize Programları migration sonrası devre dışı. Atlanıyor.",
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
