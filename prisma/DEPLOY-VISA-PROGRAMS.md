# Vize Programları birleştirme deploy checklist

Rehber (`articles`) ve program (`services`) tabloları `visa_programs` altında birleştirildi. URL formatı: `/{ülke-slug}/{program-slug}`. `/rehber/*` yönlendirme yok.

## Deploy öncesi

1. **pg_dump** (tam DB veya en az: `visa_programs`, `visa_program_category_links`, `seo_metadata`, child tablolar).
2. Snapshot kayıt:
   ```sql
   SELECT COUNT(*) FROM services;  -- migration öncesi
   SELECT COUNT(*) FROM articles; -- migration öncesi
   ```
3. Slug çakışma kontrolü (boş olmalı):
   ```sql
   SELECT a.slug, a.country_id FROM articles a
   INNER JOIN services s ON a.country_id = s.country_id AND a.slug = s.slug;
   ```

## Deploy sırası

1. `npx prisma migrate deploy`
2. `tsx prisma/archive/migrate-to-visa-programs.ts` (tek seferlik; bkz. `prisma/archive/README.md`)
3. `tsx prisma/archive/verify-visa-program-merge.ts`
4. Uygulama deploy (build + start)
5. `tsx prisma/archive/verify-visa-program-merge.ts` (tekrar)

## Deploy sonrası SQL

```sql
SELECT COUNT(*) FROM visa_programs;
SELECT COUNT(*) FROM visa_program_category_links;
SELECT COUNT(*) FROM fees f
LEFT JOIN visa_programs vp ON f.visa_program_id = vp.id WHERE vp.id IS NULL;
SELECT entity_type, COUNT(*) FROM seo_metadata
WHERE entity_type::text IN ('SERVICE','ARTICLE','VISA_PROGRAM') GROUP BY 1;
```

Beklenen: orphan FK = 0; `SERVICE`/`ARTICLE` SEO satırı yok (yalnızca `VISA_PROGRAM`).

## Manuel smoke URL

- `/{ülke-slug}` program sayısı (rehber dahil)
- `/{ülke-slug}/{eski-program-slug}`
- `/{ülke-slug}/{eski-rehber-slug}` (aynı URL kalıbı)
- `/{ülke-slug}/{kategori-slug}` birleşik liste
- `/admin/vize-programlari` liste + düzenle + kaydet
- Anasayfa son programlar
- `/hizmetlerimiz`
- `/sitemap.xml` (`/rehber` URL yok)

## Rollback

Migration geri almak zor. Rollback = pg_dump restore.
