ALTER TABLE "foreign_consultancy_contents" ADD COLUMN IF NOT EXISTS "feature_media_json" TEXT;
ALTER TABLE "foreign_consultancy_category_pages" ADD COLUMN IF NOT EXISTS "feature_media_json" TEXT;