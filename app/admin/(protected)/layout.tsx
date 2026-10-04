import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { requireAdminPage } from "@/lib/auth/admin-guard";

export default async function ProtectedAdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdminPage();

  return (
    <div className="flex min-h-screen bg-surface-soft">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminTopbar email={user.email} name={user.name} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
