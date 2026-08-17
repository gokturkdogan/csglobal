-- CreateEnum extension for BLOG_POST
ALTER TYPE "SeoEntityType" ADD VALUE IF NOT EXISTS 'BLOG_POST';

-- CreateTable
CREATE TABLE "blog_posts" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT NOT NULL DEFAULT '',
    "hero_title" TEXT,
    "hero_subtitle" TEXT,
    "sections_json" TEXT,
    "cover_image" TEXT,
    "feature_image_1" TEXT,
    "feature_image_1_title" TEXT,
    "feature_image_1_text" TEXT,
    "feature_image_2" TEXT,
    "feature_image_2_title" TEXT,
    "feature_image_2_text" TEXT,
    "country_id" TEXT,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blog_posts_slug_key" ON "blog_posts"("slug");

-- CreateIndex
CREATE INDEX "blog_posts_is_active_published_at_idx" ON "blog_posts"("is_active", "published_at");

-- CreateIndex
CREATE INDEX "blog_posts_country_id_idx" ON "blog_posts"("country_id");

-- AddForeignKey
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
