import { EagvsCountryBatchForm } from "@/components/admin/EagvsCountryBatchForm";
import { AdminPageHeader } from "@/components/admin/AdminUi";

export const dynamic = "force-dynamic";

export default function AdminEagvsCountryBatchPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="EAGVS Ülke Detay Senkron"
        description="Eksik ülke detay içeriklerini EAGVS'ten toplu çekin. Ne çekildi / ne atlandı raporunu canlı görün."
      />

      <EagvsCountryBatchForm />
    </div>
  );
}
