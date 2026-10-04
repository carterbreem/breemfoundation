import { headers } from "next/headers";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { requireAdminPage } from "@/lib/auth/admin-guard";

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-invoke-path") ?? headersList.get("x-pathname") ?? "";
  const isLoginPage = pathname.startsWith("/admin/login");

  // Public login page — no shell
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Protected pages — require admin
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
