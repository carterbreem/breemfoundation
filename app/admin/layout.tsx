import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { getCurrentUser } from "@/lib/auth/session";

// Force every /admin/* page to render dynamically.
// This cascades to all child pages, so we don't need to add
// `export const dynamic` to each one individually.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // Not signed in or not admin → render children bare.
  // The /admin/login page needs to render; middleware handles
  // redirects for other routes.
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
