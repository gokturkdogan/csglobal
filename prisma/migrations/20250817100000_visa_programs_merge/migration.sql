-- Vize Programları: services -> visa_programs, child FK renames, article alanları

-- SeoEntityType: VISA_PROGRAM
ALTER TYPE "SeoEntityType" ADD VALUE IF NOT EXISTS 'VISA_PROGRAM';

-- Article alanları (services tablosuna, henüz rename öncesi)
ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "excerpt" TEXT;
ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "content" TEXT NOT NULL DEFAULT '';
ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "published_at" TIMESTAMP(3);
ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "show_in_category_panel" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "article_category_id" TEXT;

UPDATE "services" SET "show_in_category_panel" = true;

-- services -> visa_programs
ALTER TABLE "services" RENAME TO "visa_programs";

-- article_category_id FK
ALTER TABLE "visa_programs"
  ADD CONSTRAINT "visa_programs_article_category_id_fkey"
  FOREIGN KEY ("article_category_id") REFERENCES "article_categories"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

CREATE INDEX IF NOT EXISTS "visa_programs_is_active_published_at_idx"
  ON "visa_programs"("is_active", "published_at");
CREATE INDEX IF NOT EXISTS "visa_programs_country_id_is_active_idx"
  ON "visa_programs"("country_id", "is_active");

-- Child tablolar: service_id -> visa_program_id
ALTER TABLE "fees" RENAME COLUMN "service_id" TO "visa_program_id";
ALTER TABLE "service_sections" RENAME COLUMN "service_id" TO "visa_program_id";
ALTER TABLE "service_documents" RENAME COLUMN "service_id" TO "visa_program_id";
ALTER TABLE "faqs" RENAME COLUMN "service_id" TO "visa_program_id";

-- Yeni junction tablosu (article_category_links verisi migrate-to-visa-programs.ts ile taşınır)
CREATE TABLE IF NOT EXISTS "visa_program_category_links" (
  "id" TEXT NOT NULL,
  "visa_program_id" TEXT NOT NULL,
  "category_id" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "visa_program_category_links_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "visa_program_category_links_visa_program_id_category_id_key"
  ON "visa_program_category_links"("visa_program_id", "category_id");
CREATE INDEX IF NOT EXISTS "visa_program_category_links_category_id_idx"
  ON "visa_program_category_links"("category_id");

ALTER TABLE "visa_program_category_links"
  ADD CONSTRAINT "visa_program_category_links_visa_program_id_fkey"
  FOREIGN KEY ("visa_program_id") REFERENCES "visa_programs"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "visa_program_category_links"
  ADD CONSTRAINT "visa_program_category_links_category_id_fkey"
  FOREIGN KEY ("category_id") REFERENCES "categories"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
