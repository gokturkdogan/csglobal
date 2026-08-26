import { EagvsProgramRepairForm } from "@/components/admin/EagvsProgramRepairForm";
import { AdminPageHeader } from "@/components/admin/AdminUi";

export const dynamic = "force-dynamic";

export default function AdminEksikProgramTamamlamaPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Eksik Program Tamamlama"
        description="Mevcut vize programlarının EAGVS içeriğini canlı sayfayla karşılaştırın. Her seferde 100 program tarayın ve kesik içerikleri düzeltin."
      />

      <EagvsProgramRepairForm />
    </div>
  );
}
