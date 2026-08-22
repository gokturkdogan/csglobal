-- CreateTable
CREATE TABLE "immigration_offices" (
    "id" TEXT NOT NULL,
    "institution_name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT,
    "address" TEXT NOT NULL,
    "phone" TEXT,
    "working_hours" TEXT,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "maps_url" TEXT,
    "short_description" TEXT,
    "notes" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "immigration_offices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "immigration_offices_slug_key" ON "immigration_offices"("slug");

-- CreateIndex
CREATE INDEX "immigration_offices_is_active_sort_order_idx" ON "immigration_offices"("is_active", "sort_order");

-- CreateIndex
CREATE INDEX "immigration_offices_city_is_active_idx" ON "immigration_offices"("city", "is_active");

-- DEV TEST DATA (geliştirme ortamı test kayıtları, production seed değildir)
INSERT INTO "immigration_offices" (
    "id",
    "institution_name",
    "slug",
    "city",
    "district",
    "address",
    "phone",
    "working_hours",
    "latitude",
    "longitude",
    "maps_url",
    "short_description",
    "notes",
    "is_active",
    "sort_order",
    "created_at",
    "updated_at"
) VALUES
(
    'dev_test_goc_istanbul_il',
    '[DEV TEST] İstanbul İl Göç İdaresi Müdürlüğü',
    'dev-test-istanbul-il-goc-idaresi',
    'İstanbul',
    'Fatih',
    'Dev test adresi: Fatih, İstanbul',
    '+90 212 000 00 01',
    'Pazartesi–Cuma 08:30–17:00',
    41.0082000,
    28.9784000,
    NULL,
    'Geliştirme ortamı test kaydı.',
    'DEV TEST DATA - production seed değildir, silinebilir.',
    true,
    0,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'dev_test_goc_ankara_il',
    '[DEV TEST] Ankara İl Göç İdaresi Müdürlüğü',
    'dev-test-ankara-il-goc-idaresi',
    'Ankara',
    'Çankaya',
    'Dev test adresi: Çankaya, Ankara',
    '+90 312 000 00 02',
    'Pazartesi–Cuma 08:30–17:00',
    39.9334000,
    32.8597000,
    NULL,
    'Geliştirme ortamı test kaydı.',
    'DEV TEST DATA - production seed değildir, silinebilir.',
    true,
    1,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'dev_test_goc_antalya_il',
    '[DEV TEST] Antalya İl Göç İdaresi Müdürlüğü',
    'dev-test-antalya-il-goc-idaresi',
    'Antalya',
    'Muratpaşa',
    'Dev test adresi: Muratpaşa, Antalya',
    NULL,
    'Pazartesi–Cuma 08:30–17:00',
    NULL,
    NULL,
    'https://maps.google.com/?q=Antalya',
    'Geliştirme ortamı test kaydı.',
    'DEV TEST DATA - production seed değildir, silinebilir.',
    true,
    2,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);
