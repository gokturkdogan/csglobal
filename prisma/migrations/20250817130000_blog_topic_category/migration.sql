-- CreateEnum
CREATE TYPE "BlogTopicCategory" AS ENUM ('VIZE', 'PASSAPORT', 'EK_HIZMETLER');

-- AlterTable
ALTER TABLE "blog_posts" ADD COLUMN "topic_category" "BlogTopicCategory";

-- CreateIndex
CREATE INDEX "blog_posts_topic_category_idx" ON "blog_posts"("topic_category");
