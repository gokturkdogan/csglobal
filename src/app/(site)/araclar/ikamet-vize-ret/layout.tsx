import { RejectionGuideBreadcrumb } from "@/components/tools/rejection/RejectionGuideBreadcrumb";
import { RejectionGuideShell } from "@/components/tools/rejection/RejectionGuideShell";

export default function RejectionGuideLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="border-b border-slate-200/60">
      <div className="site-container py-8 md:py-12">
        <RejectionGuideBreadcrumb />

        <div className="mt-5">
          <RejectionGuideShell>{children}</RejectionGuideShell>
        </div>
      </div>
    </section>
  );
}
