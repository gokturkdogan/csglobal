import Link from "next/link";

const INSTAGRAM_HANDLE = "csglobaltr";
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

export const TRUST_CONTRACT_PDF_PATH = "/downloads/cs-global-guven-sozlesmesi-2026.pdf";
const TRUST_CONTRACT_DOWNLOAD_NAME = "CS-Global-Guven-Sozlesmesi-2026.pdf";

/** Hakkımda ile yasal bilgilendirme arasında, sabit kurumsal bilgi metni. */
export function GeneralInfoNotice() {
  return (
    <section className="home-band-navy" aria-label="Kurumsal bilgilendirme">
      <div className="site-container py-8 md:py-10">
        <p className="mx-auto max-w-4xl text-center text-sm leading-relaxed text-slate-100 md:text-[0.9375rem] md:leading-7">
          İşlemleriniz{" "}
          <a
            href={TRUST_CONTRACT_PDF_PATH}
            download={TRUST_CONTRACT_DOWNLOAD_NAME}
            className="cursor-pointer font-semibold text-amber-200 underline decoration-amber-200/50 underline-offset-2 transition hover:text-white hover:decoration-white/70"
          >
            fatura+sözleşme
          </a>{" "}
          yaparak başlatmaktayız,{" "}
          <strong className="font-bold text-white">yakın tarihte aldığımız onaylara</strong>{" "}
          Instagram:{" "}
          <Link
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer font-semibold text-white underline decoration-white/40 underline-offset-2 transition hover:decoration-white/70"
          >
            {INSTAGRAM_HANDLE}
          </Link>
          &apos;den göz atabilirsiniz. Kurumumuz konsolosluklara/Bakanlıklara yürüme mesafesinde
          olduğundan sizin adınıza hazırladığımız dosyayı elden alarak{" "}
          <strong className="font-bold text-white">yürüyerek kuruma teslim edebilirsiniz</strong>.
        </p>
      </div>
    </section>
  );
}