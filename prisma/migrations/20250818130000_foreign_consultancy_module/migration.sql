-- ForeignConsultancyCategory enum
CREATE TYPE "ForeignConsultancyCategory" AS ENUM ('OTURMA_IZNI', 'CALISMA_IZNI');

-- SeoEntityType: FOREIGN_CONSULTANCY
ALTER TYPE "SeoEntityType" ADD VALUE IF NOT EXISTS 'FOREIGN_CONSULTANCY';

-- ForeignConsultancyContent table
CREATE TABLE "foreign_consultancy_contents" (
    "id" TEXT NOT NULL,
    "category" "ForeignConsultancyCategory" NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "short_description" TEXT,
    "content" TEXT NOT NULL DEFAULT '',
    "hero_title" TEXT,
    "hero_subtitle" TEXT,
    "sections_json" TEXT,
    "feature_image_1" TEXT,
    "feature_image_1_title" TEXT,
    "feature_image_1_text" TEXT,
    "feature_image_2" TEXT,
    "feature_image_2_title" TEXT,
    "feature_image_2_text" TEXT,
    "processing_time" TEXT,
    "requires_appointment" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "foreign_consultancy_contents_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "foreign_consultancy_contents_slug_key" ON "foreign_consultancy_contents"("slug");
CREATE INDEX "foreign_consultancy_contents_category_is_active_sort_order_idx" ON "foreign_consultancy_contents"("category", "is_active", "sort_order");

-- Remove visa_programs foreign consultancy flag (standalone module)
DROP INDEX IF EXISTS "visa_programs_is_foreign_consultancy_is_active_idx";
ALTER TABLE "visa_programs" DROP COLUMN IF EXISTS "is_foreign_consultancy";
