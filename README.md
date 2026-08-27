# CSGLOBAL: Vize & Göçmenlik Platformu

Country-driven, database-driven vize / oturum / çalışma izni bilgi ve hizmet platformu.

**Stack:** Next.js 16, TypeScript, Tailwind CSS, Prisma 7, Neon PostgreSQL, Vercel.

## Özellikler

- Ülke → kategori ağacı (recursive) → hizmet → içerik bölümleri
- Evrak kütüphanesi, başvuru profilleri, ücretler, FAQ
- Rehber / makaleler (`/rehber`)
- SEO metadata, sitemap, structured data
- Admin panel (`/admin`): içerik kod değişikliği olmadan yönetilir
- WhatsApp + iletişim CTA (online başvuru / belge yükleme yok)

## Kurulum

```bash
cp .env.example .env
# DATABASE_URL, AUTH_SECRET, NEXT_PUBLIC_SITE_URL

npm install
npm run db:push
npm run db:seed
npm run dev
```

## Ortam değişkenleri

| Değişken | Açıklama |
|----------|----------|
| `DATABASE_URL` | Neon PostgreSQL bağlantı URL'i |
| `AUTH_SECRET` | Admin oturumu için gizli anahtar (Vercel Production ortamında zorunlu) |
| `AUTH_URL` | Canlı site kök URL (ör. `https://csglobal-neon.vercel.app`) |
| `NEXT_PUBLIC_SITE_URL` | Canlı site URL (SEO / sitemap) |

## Admin

- URL: `/admin`
- Varsayılan: `admin@csglobal.com` / `admin123`
- Üretimde şifreyi değiştirin.

## Dokümantasyon

- `rules.md`: mimari kurallar
- `docs/architecture.md`, `docs/database.md`, `docs/seo.md`, `docs/admin.md`, `docs/content-model.md`

## Seed verisi

- **Almanya**: tam kategori ağacı (vizeler, oturma, çalışma, vatandaşlık)
- **Fransa**: farklı yapı (yalnızca vizeler + vatandaşlık)

## Vercel deploy

1. Neon veritabanı + env değişkenleri
2. `npm run build`
3. İlk deploy: `npm run db:push` ve `npm run db:seed`
