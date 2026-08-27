# Google Search Console SEO kontrol listesi

Production deploy ve `db:seed-seo-metadata` sonrası bu adımları tamamlayın.

## 0. Deploy sonrası veritabanı (yeni site sayfaları)

Performans/SEO güncellemesi sonrası production'da bir kez çalıştırın:

```bash
npx prisma migrate deploy
npm run db:seed-seo-metadata
```

`db:seed` (tam seed) production'da çalıştırmayın; yalnızca `db:seed-seo-metadata` yeterli.

Yeni `site_pages` kayıtları (`home`, `ulkeler`, `hizmetlerimiz`) için `seed.ts` güncellemesi yalnızca tam seed ile gelir. Production'da bu sayfalar yoksa metadata fallback çalışır; SEO DB satırları için `db:seed-seo-metadata` sonrası `site_pages` tablosunda slug'lar mevcut olmalı (admin veya tek seferlik upsert).

## 1. Sitemap

- [ ] `NEXT_PUBLIC_SITE_URL` production'da canonical domain (ör. `https://www.csglobal.com.tr`, trailing slash yok)
- [ ] `https://<canonical-domain>/sitemap.xml` açılıyor ve aktif program URL'leri listeleniyor
- [ ] Search Console > Sitemaps > `sitemap.xml` gönderildi
- [ ] "Sitemap okundu" durumu birkaç gün içinde yeşile döndü
- [ ] Yeni program ekledikten sonra URL sitemap'te görünüyor (admin kayıt + revalidate)

## 2. Canonical ve domain

- [ ] `NEXT_PUBLIC_SITE_URL` production'da tek canonical domain (www veya non-www, tutarlı)
- [ ] Örnek program sayfasında `rel=canonical` doğru `/{ülke}/{program}` yolunu gösteriyor
- [ ] `seo_metadata.canonical_url` değerleri aynı domain ile uyumlu
- [ ] Anasayfa `<title>` içinde site adı yalnızca bir kez görünüyor (çift `CSGLOBAL` yok)

## 3. Coverage ve 404 izleme

- [ ] Search Console > Sayfa dizine ekleme: kritik hatalar gözden geçirildi
- [ ] `/rehber/*` için 404 bekleniyor (yönlendirme yok). GSC'te 404 sayısı izleniyor
- [ ] Eski `/rehber/` iç linkler: `tsx prisma/archive/audit-internal-rehber-links.ts` ile kontrol, gerekirse `--fix`

## 4. Metadata kalitesi

- [ ] `npm run db:seed-seo-metadata` çalıştırıldı (711+ VISA_PROGRAM kaydı)
- [ ] Örnek 5 program: title ve description Google önizlemesine uygun uzunlukta
- [ ] Open Graph ve Twitter kartları sosyal önizlemede doğru görünüyor
- [ ] `/ulkeler` ve `/hizmetlerimiz` title DB'den geliyor (view-source)
- [ ] Blog detay: `og:type` article (view-source veya sosyal önizleme)

## 5. Yapısal veri

- [ ] Anasayfa: Organization + FAQ JSON-LD hatasız (Rich Results Test)
- [ ] Program sayfası: BreadcrumbList + FAQPage (varsa) geçerli
- [ ] Ülke detay: BreadcrumbList JSON-LD
- [ ] Kategori sayfası: BreadcrumbList JSON-LD
- [ ] Konsolosluk sayfası: BreadcrumbList JSON-LD
- [ ] Admin'den eklenen `structuredData` JSON-LD sayfada render ediliyor

## 6. robots.txt ve index hijyeni

- [ ] `https://<canonical-domain>/robots.txt` sitemap satırını içeriyor
- [ ] `/admin`, `/admin/`, `/api/`, `/asset/` disallow aktif
- [ ] Asset/döküman URL'leri `noindex` (view-source `robots` meta)
- [ ] Eski araç URL'leri 301: `goc-idaresi-rehberi` → `goc-idaresi-bul`, `tehdit-kodlari` → `tahdit-kodlari`

## 7. Performans izleme (Neon / hosting)

- [ ] Neon dashboard: ortalama query süresi ve connection timeout izleniyor
- [ ] Program sayfası response time (ör. `/{ülke}/{program}`) kabul edilebilir
- [ ] Blog listesi ve `sitemap.xml` response time kontrol edildi
- [ ] `PG_POOL_MAX` ve Neon pooler ayarları dokümante (varsayılan pool max: 10)

## 8. Fonksiyonel regresyon (deploy smoke)

- [ ] Ülkeye bağlı blog: sol panel benzer içerikler çalışıyor
- [ ] Ülkesiz blog: kategori paneli (VİZE / PASSAPORT / EK HİZMETLER) çalışıyor
- [ ] Admin içerik kaydı sonrası public sayfa güncelleniyor

## 9. Periyodik izleme (aylık)

- [ ] GSC 404 raporu: beklenmeyen URL kalıpları
- [ ] Sitemap URL sayısı ile aktif program sayısı uyumlu
- [ ] Thin content: boş kategori sayfaları sitemap'te yok (yalnızca program içeren ülke-kategori çiftleri)

## Komutlar

```bash
npx prisma migrate deploy
npm run db:seed-seo-metadata
tsx prisma/archive/audit-internal-rehber-links.ts
tsx prisma/archive/audit-internal-rehber-links.ts --fix
```
