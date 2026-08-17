# Ülke hero görselleri (6:4)

Bangladeş referans konseptiyle üretilen ülke kapak görselleri.

## Klasör yapısı

- `_reference/banglades-concept.png` - referans konsept (değiştirmeyin)
- `{slug}.png` - her ülke için 1200×800 (6:4) PNG
- `manifest.json` - üretim durumu

## Üretim

OpenAI API anahtarı gerekir (`OPENAI_API_KEY`):

```bash
npm run db:generate-country-heroes
```

Tek ülke:

```bash
npm run db:generate-country-heroes -- --slug avusturya
```

Parça parça (127 ülke uzun sürebilir):

```bash
npm run db:generate-country-heroes -- --from 0 --limit 20
```

## Cloudinary + veritabanı (item görseli)

Dosya adı ülke slug ile eşleşmeli (`avusturya.png` → `avusturya`).

```bash
npm run db:upload-country-item-images
npm run db:upload-country-item-images -- --slug avusturya
npm run db:upload-country-item-images -- --also-hero
```

Yükler: `Countries/{slug}/item` → `country.itemImage`

## Konsept

Referans görselle birebir: golden hour, mermer masa, vize başvuru panosu, pasaport, bayrak, miniature landmark, şehir manzarası arka plan.
