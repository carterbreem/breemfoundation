import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { getCurrentUser } from "@/lib/auth/session";

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // Not signed in → render children as-is (middleware handles redirect)
  // Signed in as admin → render with shell
  if (!user || user.role !== "ADMIN") {
    return <>{children}</>;
  }

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
