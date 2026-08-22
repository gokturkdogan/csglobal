import { RejectionSidebar, RejectionMobileSelector } from "@/components/tools/rejection/RejectionSidebar";
import { RejectionDisclaimer } from "@/components/tools/rejection/RejectionContent";
import { rejectionReasons } from "@/lib/rejection-guide-data";

type Props = {
  activeSlug?: string;
  children: React.ReactNode;
};

export function RejectionGuideShell({ activeSlug, children }: Props) {
  const sidebarItems = rejectionReasons.map((item) => ({
    slug: item.slug,
    title: item.title,
    code: item.code,
    shortDescription: item.shortDescription,
    icon: item.icon,
  }));

  return (
    <div className="space-y-5 md:space-y-6">
      <RejectionMobileSelector reasons={sidebarItems} activeSlug={activeSlug} />

      <div className="hidden lg:grid lg:grid-cols-[minmax(260px,300px)_minmax(0,1fr)] lg:items-start lg:gap-5">
        <aside className="country-panel-sticky z-30 min-w-0 self-start">
          <RejectionSidebar reasons={sidebarItems} activeSlug={activeSlug} />
        </aside>
        {children}
      </div>

      <div className="lg:hidden">{children}</div>

      <RejectionDisclaimer />
    </div>
  );
}
