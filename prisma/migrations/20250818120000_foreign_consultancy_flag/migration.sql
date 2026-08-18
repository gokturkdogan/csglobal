-- AlterTable
ALTER TABLE "visa_programs" ADD COLUMN "is_foreign_consultancy" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "visa_programs_is_foreign_consultancy_is_active_idx" ON "visa_programs"("is_foreign_consultancy", "is_active");
