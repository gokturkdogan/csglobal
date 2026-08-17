# Arşiv script'leri

Bu klasördeki dosyalar tek seferlik migration, audit ve wipe işlemleri için kullanıldı. Rutin deploy veya seed akışının parçası değildir.

| Dosya | Açıklama |
|-------|----------|
| `migrate-to-visa-programs.ts` | Articles/services → `visa_programs` birleştirme |
| `migrate-article-category-links.ts` | Eski kategori link migration |
| `audit-internal-rehber-links.ts` | `/rehber/` iç link taraması ve düzeltme |
| `verify-visa-program-merge.ts` | Merge sonrası doğrulama |
| `wipe-guides-and-services.ts` | Eski rehber/hizmet verisi temizliği |
| `wipe-services.ts` | Hizmet tablosu wipe |

Çalıştırmak için (gerekirse) repo kökünden:

```bash
tsx prisma/archive/<dosya-adı>.ts
```

Import yolları `../src` ve `../lib` kullanır; çalıştırma öncesi schema ve DB durumunu kontrol edin.
