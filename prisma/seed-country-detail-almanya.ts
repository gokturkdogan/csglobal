import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../src/generated/prisma/client";

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const notes = [
  "Almanya Schengen bölgesindedir; geçerli Schengen vizesi ile Almanya'ya giriş yapılabilir. Ana seyahat ülkesi ve vize kapsamı başvuru şartlarına uygun olmalıdır.",
  "Bordo (umuma mahsus) pasaport sahipleri kısa ve uzun süreli seyahatler için uygun vize türüne başvuru yapmalıdır. Yeşil ve gri pasaportlar için farklı kurallar geçerli olabilir.",
  "Kısa süreli turistik ve ticari vizeler için seyahat sağlık sigortası, konaklama belgesi ve günlük harcama limitini karşılayan finansal evrak genellikle zorunludur.",
  "Vize başvuruları randevu ile yapılır; biyometri (fotoğraf ve parmak izi) işlemleri başvuru merkezinde tamamlanır.",
  "Daha önce vize reddi veya sınır dışı edilme geçmişi olan başvurularda ek evrak ve detaylı hazırlık gerekebilir.",
  "Uzun süreli oturum, çalışma izni ve öğrenci oturumu başvuruları kısa süreli vizeden farklı prosedür ve evrak seti gerektirir.",
  "Başvuru merkezi hizmet bedeli ve konsolosluk vize ücreti ayrı kalemlerdir; tutarlar vize türüne göre değişir.",
  "Yoğun seyahat dönemlerinde (yaz, bayram, okul tatilleri) randevu ve işlem süreleri uzayabilir; erken planlama önerilir.",
  "Davetiye ile yapılan ticari ve aile ziyareti başvurularında davet eden tarafın belgeleri eksiksiz hazırlanmalıdır.",
  "CSGLOBAL üzerinden online başvuru veya belge yükleme yapılmaz; tüm süreç WhatsApp ve telefon ile uzman danışman desteğinde yönetilir.",
];

const faqs = [
  {
    question: "Almanya vizesi için hangi pasaport türleri başvuru yapabilir?",
    answer:
      "Bordo pasaport sahipleri vizeye tabidir. Yeşil ve gri pasaport sahipleri için farklı muafiyet veya ek şartlar olabilir. Pasaport türünüze göre danışmanlarımızdan ön bilgi alabilirsiniz.",
    sortOrder: 1,
  },
  {
    question: "Almanya turistik vize ne kadar sürede çıkar?",
    answer:
      "Standart işlem süresi genellikle 10–15 iş günüdür. Yoğun dönemlerde, ek inceleme gerektiren dosyalarda veya eksik evrak nedeniyle süre uzayabilir.",
    sortOrder: 2,
  },
  {
    question: "Almanya vizesi için randevu şart mı?",
    answer:
      "Evet. Kısa süreli vize başvuruları yetkili vize başvuru merkezleri üzerinden randevu ile yapılır. Randevu planlaması ve evrak hazırlığı sürecinizde size destek veriyoruz.",
    sortOrder: 3,
  },
  {
    question: "Schengen vizesi ile başka ülkelere gidebilir miyim?",
    answer:
      "Geçerli Schengen vizesi ile Schengen bölgesindeki ülkelere seyahat edebilirsiniz. İlk giriş veya ana seyahat ülkesi kurallarına uyulması önemlidir; vize türü ve süresi başvuru amacınızla uyumlu olmalıdır.",
    sortOrder: 4,
  },
  {
    question: "Almanya vize başvurusunda hangi belgeler gerekir?",
    answer:
      "Vize türüne göre değişir. Genel olarak pasaport, başvuru formu, biyometrik fotoğraf, seyahat sigortası, konaklama ve finansal evrak istenir. Ticari ve aile vizelerinde davetiye ve ek belgeler gerekebilir. Ülkeye özel listeyi danışmanlarımızdan alabilirsiniz.",
    sortOrder: 5,
  },
];

async function main() {
  const germany = await prisma.country.update({
    where: { slug: "almanya" },
    data: {
      shortDescription:
        "Almanya vize, oturum, çalışma izni ve vatandaşlık süreçlerinde uzman danışmanlık. Evrak hazırlığından randevu planlamasına kadar yanınızdayız.",
      visaRegion: "Schengen · Avrupa Birliği",
      requiresAppointment: true,
      averageProcessingTime: "10–15 iş günü",
      detailParagraph1:
        "Almanya, Schengen bölgesinin en önemli ülkelerinden biri olarak turistik, ticari, aile ve uzun süreli oturum başvurularında yoğun talep görür. Bordo pasaport sahipleri kısa ve uzun süreli seyahatler için uygun vize türüne başvuru yapmalıdır.",
      detailParagraph2:
        "CSGLOBAL ile online başvuru veya belge yükleme yok; sürecinizi WhatsApp ve telefon üzerinden uzman danışmanlarımızla yönetirsiniz. Ülkeye özel evrak listesi, ücretler ve süre bilgileri şeffaf şekilde paylaşılır; randevu ve başvuru sonrası takip desteği sunulur.",
      importantNotesJson: JSON.stringify(notes),
    },
  });

  await prisma.faq.deleteMany({
    where: { countryId: germany.id, serviceId: null, categoryId: null },
  });
  await prisma.faq.createMany({
    data: faqs.map((f) => ({
      countryId: germany.id,
      question: f.question,
      answer: f.answer,
      sortOrder: f.sortOrder,
      isActive: true,
    })),
  });

  console.log(
    `Almanya detay güncellendi: ${notes.length} not, ${faqs.length} SSS.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
