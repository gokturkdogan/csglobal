-- SeoEntityType: FOREIGN_CONSULTANCY_CATEGORY
ALTER TYPE "SeoEntityType" ADD VALUE IF NOT EXISTS 'FOREIGN_CONSULTANCY_CATEGORY';

CREATE TABLE "foreign_consultancy_category_pages" (
    "id" TEXT NOT NULL,
    "category" "ForeignConsultancyCategory" NOT NULL,
    "name" TEXT NOT NULL,
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
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "foreign_consultancy_category_pages_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "foreign_consultancy_category_pages_category_key" ON "foreign_consultancy_category_pages"("category");

INSERT INTO "foreign_consultancy_category_pages" ("id", "category", "name", "short_description", "content", "is_active", "updated_at", "created_at")
VALUES
  (
    'fc-cat-oturma-izni',
    'OTURMA_IZNI',
    'Oturma izni',
    'Türkiye''de ikamet, aile birleşimi ve uzun süreli oturum başvuruları için danışmanlık.',
    '',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'fc-cat-calisma-izni',
    'CALISMA_IZNI',
    'Çalışma izni',
    'Türkiye''de yabancı personel çalışma izni, işveren başvuruları ve süreç takibi.',
    '',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  )
ON CONFLICT ("category") DO NOTHING;
