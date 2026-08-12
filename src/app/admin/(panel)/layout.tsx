import { auth } from "@/auth";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <AdminShell userName={session?.user?.name} userEmail={session?.user?.email}>
      {children}
    </AdminShell>
  );
}
