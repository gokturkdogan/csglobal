import type { ServiceContentSection } from "../../src/lib/service-page";
import { serializeServiceSections } from "../../src/lib/service-page";

const IMG = {
  travel: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80&auto=format",
};

const EVRAK_KONTROLU_IMAGE = "/images/foreign-consultancy/evrak-listesi-kontrolu.png";

export const OTURMA_IZNI_CATEGORY_PAGE_ID = "fc-cat-oturma-izni";

const sections: ServiceContentSection[] = [
  {
    title: "Türkiye'de oturma izni nedir?",
    content: `<p>Türkiye'de yasal olarak ikamet etmek isteyen yabancılar, ülkeye giriş için alınan vizeden ayrı olarak ikamet izni (oturma izni) almak zorundadır. İkamet izni, belirli bir süre Türkiye'de kalma hakkı verir; süre ve koşullar izin türüne göre değişir.</p>
<p>İkamet izinleri Göç İdaresi Genel Müdürlüğü nezdinde değerlendirilir. Başvurular çoğunlukla e-İkamet sistemi üzerinden yapılır; randevu, evrak teslimi ve kart basımı aşamaları izin türüne bağlı olarak farklılık gösterebilir.</p>
<p>Oturma izni ile çalışma izni aynı belge değildir. Türkiye'de çalışmak için ayrıca çalışma izni veya çalışma hakkı tanıyan bir ikamet statüsü gerekir. Başvuru öncesinde amacınıza uygun izin türünü netleştirmek önemlidir.</p>`,
  },
  {
    title: "Oturma izni türleri",
    content: `<p>Türkiye'de en sık başvurulan ikamet izin türleri aşağıdadır. Her türün şartları ve evrak listesi farklıdır; aşağıdaki liste genel bilgi amaçlıdır.</p>
<ul>
<li><strong>Kısa dönem ikamet izni:</strong> Turizm, ticari ilişki, konaklama veya benzeri kısa süreli kalış amaçları için. Süre genellikle bir yıla kadar verilir; yenileme koşulları başvuru gerekçesine bağlıdır.</li>
<li><strong>Aile ikamet izni:</strong> Türk vatandaşı veya Türkiye'de yasal ikamet eden eş, anne, baba veya bakmakla yükümlü olunan aile bireyleri için.</li>
<li><strong>Uzun dönem ikamet izni:</strong> Türkiye'de kesintisiz ve yasal olarak uzun süre ikamet eden yabancılara verilebilen süresiz statü. Belirli şartların karşılanması gerekir.</li>
<li><strong>Öğrenci ikamet izni:</strong> Türkiye'de kayıtlı eğitim kurumunda öğrenim gören yabancı öğrenciler için.</li>
<li><strong>İnsan kaynaklarına bağlı ikamet izni:</strong> Çalışma izni veya çalışma hakkı tanıyan statüye bağlı ikamet türleri.</li>
</ul>
<p>İzin türü seçimi, pasaport türü, önceki ikamet geçmişi ve başvuru gerekçesi birlikte değerlendirilir. Yanlış kategoride başvuru, ret veya ek süre kaybına yol açabilir.</p>`,
  },
  {
    title: "Başvuru şartları",
    content: `<p>İkamet izni başvurularında ortak olarak aranan koşullar izin türüne göre değişse de genel çerçeve şöyledir:</p>
<ul>
<li>Geçerli pasaport veya pasaport yerine geçen belge</li>
<li>Türkiye'ye giriş için gerekli vize veya vize muafiyeti (başvuru türüne bağlı)</li>
<li>İkamet amacını destekleyen belgeler (konaklama, eğitim kaydı, aile bağları vb.)</li>
<li>Sağlık sigortası (tür ve kapsam şartları değişebilir)</li>
<li>Biyometrik fotoğraf ve başvuru formu</li>
<li>Adres beyanı veya ikamet adresine ilişkin belgeler</li>
</ul>
<p>Bazı başvurularda harç, taahhütname veya ek mali belgeler istenebilir. Önceki ikamet ihlalleri, usulsüz çalışma veya ret geçmişi yeni başvuruları olumsuz etkileyebilir.</p>`,
  },
  {
    title: "Başvuru ve randevu süreci",
    content: `<p>İkamet izni başvuruları e-İkamet üzerinden başlatılır. Sistemde izin türü seçilir, form doldurulur ve randevu alınır. Randevu gününde başvuru sahibi veya yetkili temsilci, belirlenen Göç İdaresi birimine evrakları teslim eder.</p>
<p>Randevu öncesi evrakların eksiksiz ve güncel olması gerekir. Eksik belge nedeniyle başvuru işleme alınmayabilir veya randevunun yeniden planlanması gerekebilir. Yoğun dönemlerde randevu tarihleri ileri aylara kayabilir; planlama bu nedenle erken yapılmalıdır.</p>
<p>Değerlendirme sonrası onaylanan başvurularda ikamet kartı basımı ve teslim aşaması tamamlanır. Ret durumunda gerekçe bildirimi ve itiraz veya yeniden başvuru seçenekleri değerlendirilir.</p>`,
  },
  {
    title: "Süre, yenileme ve uzun dönem oturum",
    content: `<p>İkamet izinleri belirli sürelerle verilir; süre bitiminden önce yenileme başvurusu yapılmalıdır. Yenileme için ikamet amacının devam ettiğini gösteren belgeler ve güncel evraklar istenir.</p>
<p>Uzun dönem ikamet izni, Türkiye'de kesintisiz ve yasal olarak belirli süre ikamet eden yabancılara, şartlar sağlandığında verilebilen süresiz statüdür. Bu statü, belirli haklar ve yükümlülüklerle birlikte gelir; başvuru koşulları mevzuatta ayrıntılı tanımlanmıştır.</p>
<p>İkamet süresi dolduktan sonra Türkiye'de kalmaya devam etmek, yasal statü olmadan risk oluşturur. Süre takibi ve yenileme planı başvuru sürecinin ayrılmaz parçasıdır.</p>`,
  },
  {
    title: "CSGLOBAL danışmanlık kapsamı",
    content: `<p>CSGLOBAL, Türkiye oturma izni başvurularında evrak listesi hazırlığı, dosya kontrolü, randevu planlaması ve süreç takibi sunar. Her başvuru kişinin ikamet amacı, önceki statüsü ve aile durumuna göre ayrı değerlendirilir.</p>
<p>Web sitemiz üzerinden online başvuru veya belge yükleme yapılmaz. Sürecinizi telefon veya WhatsApp üzerinden uzman danışmanlarımızla yönetirsiniz; evrak ve randevu adımlarında net bir plan oluştururuz.</p>
<p>Oturma izni ile çalışma izni birlikte gerektiğinde, her iki sürecin zamanlaması ve evrak uyumu ayrıca planlanır. Detaylı bilgi ve ön değerlendirme için iletişim kanallarımızdan bize ulaşabilirsiniz.</p>`,
  },
];

export const oturmaIzniCategoryPageSeed = {
  id: OTURMA_IZNI_CATEGORY_PAGE_ID,
  category: "OTURMA_IZNI" as const,
  name: "Türkiye Oturma İzni",
  excerpt:
    "Türkiye ikamet izni başvurusu, yenileme ve uzun dönem oturum için evrak listesi, randevu planı ve süreç takibi. CSGLOBAL danışmanlık.",
  shortDescription:
    "İkamet izni başvurularınızı evrak, randevu ve yenileme adımlarıyla planlıyoruz.",
  heroTitle: "Türkiye oturma izni danışmanlığı",
  heroSubtitle:
    "Kısa dönem ikamet, aile birleşimi ve uzun dönem oturum başvurularında evrak ve randevu planını birlikte oluşturuyoruz.",
  sectionsJson: serializeServiceSections(sections),
  featureImage1: EVRAK_KONTROLU_IMAGE,
  featureImage1Title: "Evrak listesi ve dosya kontrolü",
  featureImage1Text:
    "İzin türüne göre evrak listesini çıkarıyoruz; pasaport, sigorta, adres ve destekleyici belgelerin uyumunu başvuru öncesinde kontrol ediyoruz. Eksik veya hatalı dosya nedeniyle randevu kaybı yaşanmaması için dosyayı birlikte gözden geçiriyoruz.",
  featureImage2: IMG.travel,
  featureImage2Title: "Randevu ve yenileme takibi",
  featureImage2Text:
    "e-İkamet randevusu, evrak teslimi ve kart teslim aşamalarını takvim üzerinde planlıyoruz. İzin süresi bitimine yakın yenileme başvurusu için hatırlatma ve güncel evrak listesiyle süreci yeniden organize ediyoruz.",
  isActive: true,
};

export const oturmaIzniCategorySeo = {
  metaTitle: "Türkiye Oturma İzni Danışmanlığı | CSGLOBAL",
  metaDescription: oturmaIzniCategoryPageSeed.excerpt,
};
