-- CreateEnum
CREATE TYPE "RejectionSectionType" AS ENUM (
  'OVERVIEW',
  'LEGAL_BASIS',
  'MEANING',
  'CONDITIONS',
  'REASONS',
  'DOCUMENTS',
  'REAPPLY',
  'APPEAL',
  'STEPS',
  'WARNING',
  'INFO',
  'FAQ',
  'CTA',
  'CUSTOM'
);

-- AlterEnum
ALTER TYPE "SeoEntityType" ADD VALUE 'REJECTION_REASON';

-- CreateTable
CREATE TABLE "rejection_reasons" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "code" TEXT,
    "subtitle" TEXT,
    "short_description" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "cta_title" TEXT,
    "cta_subtitle" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rejection_reasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rejection_reason_sections" (
    "id" TEXT NOT NULL,
    "rejection_reason_id" TEXT NOT NULL,
    "section_type" "RejectionSectionType" NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rejection_reason_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rejection_reason_articles" (
    "id" TEXT NOT NULL,
    "rejection_reason_id" TEXT NOT NULL,
    "article_number" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "rejection_reason_articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rejection_reason_relations" (
    "id" TEXT NOT NULL,
    "source_reason_id" TEXT NOT NULL,
    "target_reason_id" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "rejection_reason_relations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rejection_reasons_slug_key" ON "rejection_reasons"("slug");

-- CreateIndex
CREATE INDEX "rejection_reasons_is_active_sort_order_idx" ON "rejection_reasons"("is_active", "sort_order");

-- CreateIndex
CREATE INDEX "rejection_reason_sections_rejection_reason_id_sort_order_idx" ON "rejection_reason_sections"("rejection_reason_id", "sort_order");

-- CreateIndex
CREATE INDEX "rejection_reason_articles_rejection_reason_id_idx" ON "rejection_reason_articles"("rejection_reason_id");

-- CreateIndex
CREATE UNIQUE INDEX "rejection_reason_articles_rejection_reason_id_article_number_key" ON "rejection_reason_articles"("rejection_reason_id", "article_number");

-- CreateIndex
CREATE INDEX "rejection_reason_relations_source_reason_id_idx" ON "rejection_reason_relations"("source_reason_id");

-- CreateIndex
CREATE UNIQUE INDEX "rejection_reason_relations_source_reason_id_target_reason_id_key" ON "rejection_reason_relations"("source_reason_id", "target_reason_id");

-- AddForeignKey
ALTER TABLE "rejection_reason_sections" ADD CONSTRAINT "rejection_reason_sections_rejection_reason_id_fkey" FOREIGN KEY ("rejection_reason_id") REFERENCES "rejection_reasons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rejection_reason_articles" ADD CONSTRAINT "rejection_reason_articles_rejection_reason_id_fkey" FOREIGN KEY ("rejection_reason_id") REFERENCES "rejection_reasons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rejection_reason_relations" ADD CONSTRAINT "rejection_reason_relations_source_reason_id_fkey" FOREIGN KEY ("source_reason_id") REFERENCES "rejection_reasons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rejection_reason_relations" ADD CONSTRAINT "rejection_reason_relations_target_reason_id_fkey" FOREIGN KEY ("target_reason_id") REFERENCES "rejection_reasons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
