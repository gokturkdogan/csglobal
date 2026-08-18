import type { ServiceContentSection } from "../../src/lib/service-page";
import { serializeServiceSections } from "../../src/lib/service-page";

const IMG = {
  team: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80&auto=format",
};

const EVRAK_KONTROLU_IMAGE = "/images/foreign-consultancy/evrak-listesi-kontrolu.png";

export const CALISMA_IZNI_CATEGORY_PAGE_ID = "fc-cat-calisma-izni";

const sections: ServiceContentSection[] = [
  {
    title: "Türkiye'de çalışma izni nedir?",
    content: `<p>Türkiye'de yasal olarak çalışmak isteyen yabancılar, ikamet statüsünden bağımsız olarak çalışma izni veya çalışma hakkı tanıyan bir statüye sahip olmalıdır. Çalışma izni, belirli bir işveren ve meslek kapsamında Türkiye'de çalışma yetkisi verir; süre ve koşullar izin türüne göre değişir.</p>
<p>Çalışma izni başvuruları Çalışma ve Sosyal Güvenlik Bakanlığı nezdinde değerlendirilir. Başvurular çoğunlukla e-Devlet veya yetkili online sistemler üzerinden yapılır; işveren ve yabancı personel adına farklı evrak setleri ve onay adımları uygulanabilir.</p>
<p>Çalışma izni ile oturma izni aynı belge değildir. Türkiye'de ikamet etmek için ikamet izni, çalışmak için ise çalışma izni veya çalışma hakkı içeren ikamet statüsü gerekir. Başvuru öncesinde her iki sürecin zamanlaması ve evrak uyumu planlanmalıdır.</p>`,
  },
  {
    title: "Çalışma izni türleri",
    content: `<p>Türkiye'de en sık başvurulan çalışma izin türleri aşağıdadır. Her türün şartları, harçları ve evrak listesi farklıdır; aşağıdaki liste genel bilgi amaçlıdır.</p>
<ul>
<li><strong>Süreli çalışma izni:</strong> Belirli işveren ve pozisyon için verilen, genellikle bir yıla kadar süreli izin. Yenileme ve işveren değişikliği koşullara bağlıdır.</li>
<li><strong>Süresiz çalışma izni:</strong> Türkiye'de uzun süre yasal çalışma geçmişi ve belirli şartları karşılayan yabancılara verilebilen süresiz statü.</li>
<li><strong>Turkuaz Kart:</strong> Nitelikli yabancı personel için tanımlanan özel statü; çalışma ve ikamet hakları birlikte düzenlenir.</li>
<li><strong>Öğrenci çalışma izni:</strong> Türkiye'de öğrenim gören yabancı öğrencilerin belirli koşullarda çalışmasına izin veren başvuru türü.</li>
<li><strong>Serbest meslek ve özel durumlar:</strong> Meslek türü, sektör veya anlaşmaya bağlı özel çalışma izin kategorileri.</li>
</ul>
<p>İzin türü seçimi, pozisyon, eğitim düzeyi, işveren türü ve yabancının önceki çalışma geçmişi birlikte değerlendirilir. Yanlış kategoride başvuru, ret veya süre kaybına yol açabilir.</p>`,
  },
  {
    title: "Başvuru şartları",
    content: `<p>Çalışma izni başvurularında işveren ve yabancı personel için aranan koşullar izin türüne göre değişse de genel çerçeve şöyledir:</p>
<ul>
<li>Geçerli pasaport ve uygun ikamet statüsü veya ikamet başvurusu planı</li>
<li>İşveren tarafından sunulan iş sözleşmesi, pozisyon tanımı ve şirket belgeleri</li>
<li>Eğitim ve mesleki yeterlilik belgeleri (diploma, sertifika, denklik süreçleri gerekebilir)</li>
<li>İşverenin yasal faaliyet belgeleri ve SGK kayıtları</li>
<li>Başvuru formu, taahhütname ve harç ödemeleri</li>
<li>Bazı sektörlerde ek lisans, izin veya bakanlık onayları</li>
</ul>
<p>Önceki çalışma ihlalleri, usulsüz istihdam veya ret geçmişi yeni başvuruları olumsuz etkileyebilir. İşveren değişikliği, pozisyon değişikliği veya şirket yapısındaki güncellemeler ayrı başvuru veya bildirim gerektirebilir.</p>`,
  },
  {
    title: "Başvuru ve değerlendirme süreci",
    content: `<p>Çalışma izni başvurusu çoğunlukla işveren veya yetkili temsilci aracılığıyla online başlatılır. Sistemde izin türü seçilir, evraklar yüklenir ve başvuru tamamlanır. Değerlendirme aşamasında eksik belge bildirimi veya ek bilgi talebi gelebilir.</p>
<p>Başvuru öncesi evrakların eksiksiz ve güncel olması gerekir. Eksik dosya nedeniyle başvuru işleme alınmayabilir veya süre uzayabilir. Yoğun dönemlerde değerlendirme süreleri uzayabilir; işe başlama planı bu nedenle gerçekçi bir takvimle yapılmalıdır.</p>
<p>Onay sonrası çalışma izni belgesi düzenlenir; ikamet izni ile uyum, SGK işe giriş bildirimi ve yasal çalışma başlangıcı birlikte planlanmalıdır. Ret durumunda gerekçe bildirimi ve yeniden başvuru veya itiraz seçenekleri değerlendirilir.</p>`,
  },
  {
    title: "Süre, yenileme ve işveren değişikliği",
    content: `<p>Çalışma izinleri belirli sürelerle verilir; süre bitiminden önce yenileme başvurusu yapılmalıdır. Yenileme için iş ilişkisinin devam ettiğini gösteren belgeler, güncel SGK kayıtları ve güncel evraklar istenir.</p>
<p>İşveren değişikliği, pozisyon değişikliği veya şirket birleşmesi gibi durumlarda yeni başvuru veya bildirim gerekebilir. Eski işverene bağlı izinle yeni işe başlamak yasal risk oluşturur; geçiş planı önceden netleştirilmelidir.</p>
<p>Çalışma izni süresi dolduktan sonra yasal statü olmadan çalışmaya devam etmek hem işveren hem yabancı personel için ciddi yaptırımlara yol açabilir. Süre takibi ve yenileme planı sürecin ayrılmaz parçasıdır.</p>`,
  },
  {
    title: "CSGLOBAL danışmanlık kapsamı",
    content: `<p>CSGLOBAL, Türkiye çalışma izni başvurularında evrak listesi hazırlığı, işveren ve personel dosya kontrolü, başvuru planlaması ve süreç takibi sunar. Her başvuru pozisyon, sektör, işveren yapısı ve yabancının önceki statüsüne göre ayrı değerlendirilir.</p>
<p>Web sitemiz üzerinden online başvuru veya belge yükleme yapılmaz. Sürecinizi telefon veya WhatsApp üzerinden uzman danışmanlarımızla yönetirsiniz; evrak ve zamanlama adımlarında net bir plan oluştururuz.</p>
<p>Çalışma izni ile oturma izni birlikte gerektiğinde, her iki sürecin zamanlaması ve evrak uyumu ayrıca planlanır. Detaylı bilgi ve ön değerlendirme için iletişim kanallarımızdan bize ulaşabilirsiniz.</p>`,
  },
];

export const calismaIzniCategoryPageSeed = {
  id: CALISMA_IZNI_CATEGORY_PAGE_ID,
  category: "CALISMA_IZNI" as const,
  name: "Türkiye Çalışma İzni",
  excerpt:
    "Türkiye çalışma izni başvurusu, yenileme ve işveren değişikliği için evrak listesi, başvuru planı ve süreç takibi. CSGLOBAL danışmanlık.",
  shortDescription:
    "Yabancı personel çalışma izni başvurularınızı evrak, zamanlama ve yenileme adımlarıyla planlıyoruz.",
  heroTitle: "Türkiye çalışma izni danışmanlığı",
  heroSubtitle:
    "Süreli çalışma izni, Turkuaz Kart ve öğrenci çalışma izni başvurularında evrak ve başvuru planını birlikte oluşturuyoruz.",
  sectionsJson: serializeServiceSections(sections),
  featureImage1: EVRAK_KONTROLU_IMAGE,
  featureImage1Title: "Evrak listesi ve dosya kontrolü",
  featureImage1Text:
    "İzin türüne ve pozisyona göre evrak listesini çıkarıyoruz; iş sözleşmesi, şirket belgeleri, diploma ve SGK kayıtlarının uyumunu başvuru öncesinde kontrol ediyoruz. Eksik veya hatalı dosya nedeniyle ret riskini azaltmak için dosyayı birlikte gözden geçiriyoruz.",
  featureImage2: IMG.team,
  featureImage2Title: "Başvuru ve yenileme takibi",
  featureImage2Text:
    "Online başvuru, değerlendirme ve izin belgesi aşamalarını takvim üzerinde planlıyoruz. Süre bitimine yakın yenileme başvurusu, işveren değişikliği ve ikamet izni uyumu için hatırlatma ve güncel evrak listesiyle süreci yeniden organize ediyoruz.",
  isActive: true,
};

export const calismaIzniCategorySeo = {
  metaTitle: "Türkiye Çalışma İzni Danışmanlığı | CSGLOBAL",
  metaDescription: calismaIzniCategoryPageSeed.excerpt,
};
