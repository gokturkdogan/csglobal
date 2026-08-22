import { GocIdaresiGuideBreadcrumb } from "@/components/tools/goc-idaresi/GocIdaresiGuideBreadcrumb";
import { GocIdaresiGuideShell } from "@/components/tools/goc-idaresi/GocIdaresiGuideShell";

export default function GocIdaresiGuideLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="border-b border-slate-200/60">
      <div className="site-container py-8 md:py-12">
        <GocIdaresiGuideBreadcrumb />

        <div className="mt-5">
          <GocIdaresiGuideShell>{children}</GocIdaresiGuideShell>
        </div>
      </div>
    </section>
  );
}
