# Google Search Console SEO kontrol listesi

Production deploy ve `db:seed-seo-metadata` sonrası bu adımları tamamlayın.

## 1. Sitemap

- [ ] `https://csglobal.com/sitemap.xml` açılıyor ve aktif program URL'leri listeleniyor
- [ ] Search Console > Sitemaps > `sitemap.xml` gönderildi
- [ ] "Sitemap okundu" durumu birkaç gün içinde yeşile döndü
- [ ] Yeni program ekledikten sonra URL sitemap'te görünüyor (admin kayıt + revalidate)

## 2. Canonical ve domain

- [ ] `NEXT_PUBLIC_SITE_URL` production'da tek canonical domain (www veya non-www, tutarlı)
- [ ] Örnek program sayfasında `rel=canonical` doğru `/{ülke}/{program}` yolunu gösteriyor
- [ ] `seo_metadata.canonical_url` değerleri aynı domain ile uyumlu

## 3. Coverage ve 404 izleme

- [ ] Search Console > Sayfa dizine ekleme: kritik hatalar gözden geçirildi
- [ ] `/rehber/*` için 404 bekleniyor (yönlendirme yok). GSC'te 404 sayısı izleniyor
- [ ] Eski `/rehber/` iç linkler: `tsx prisma/archive/audit-internal-rehber-links.ts` ile kontrol, gerekirse `--fix`

## 4. Metadata kalitesi

- [ ] `npm run db:seed-seo-metadata` çalıştırıldı (711+ VISA_PROGRAM kaydı)
- [ ] Örnek 5 program: title ve description Google önizlemesine uygun uzunlukta
- [ ] Open Graph ve Twitter kartları sosyal önizlemede doğru görünüyor

## 5. Yapısal veri

- [ ] Anasayfa: Organization + FAQ JSON-LD hatasız (Rich Results Test)
- [ ] Program sayfası: BreadcrumbList + FAQPage (varsa) geçerli
- [ ] Admin'den eklenen `structuredData` JSON-LD sayfada render ediliyor

## 6. robots.txt

- [ ] `https://csglobal.com/robots.txt` sitemap satırını içeriyor
- [ ] `/admin` ve `/api` disallow aktif

## 7. Periyodik izleme (aylık)

- [ ] GSC 404 raporu: beklenmeyen URL kalıpları
- [ ] Sitemap URL sayısı ile aktif program sayısı uyumlu
- [ ] Thin content: boş kategori sayfaları sitemap'te yok (yalnızca program içeren ülke-kategori çiftleri)

## Komutlar

```bash
npm run db:seed-seo-metadata
tsx prisma/archive/audit-internal-rehber-links.ts
tsx prisma/archive/audit-internal-rehber-links.ts --fix
```
