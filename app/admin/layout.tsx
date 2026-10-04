import { headers } from "next/headers";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { requireAdminPage } from "@/lib/auth/admin-guard";

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const pathname =
    h.get("x-invoke-path") ??
    h.get("x-pathname") ??
    h.get("x-url") ??
    "";

  // Login page renders WITHOUT the admin shell
  if (pathname.includes("/admin/login")) {
    return <>{children}</>;
  }

  // All other admin routes require auth + shell
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
