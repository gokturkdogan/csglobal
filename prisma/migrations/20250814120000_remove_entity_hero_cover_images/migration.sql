-- Görseller ülke bazında (countries.hero_image, countries.item_image).
ALTER TABLE "services" DROP COLUMN IF EXISTS "hero_image";
ALTER TABLE "articles" DROP COLUMN IF EXISTS "hero_image";
ALTER TABLE "articles" DROP COLUMN IF EXISTS "cover_image";
ALTER TABLE "consulates" DROP COLUMN IF EXISTS "hero_image";
