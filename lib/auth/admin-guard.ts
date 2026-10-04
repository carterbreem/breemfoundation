import { redirect } from "next/navigation";
import { getCurrentUser, type SessionUser } from "@/lib/auth/session";

/**
 * Server-side guard for admin pages.
 * - If not signed in → redirect to /admin/login
 * - If signed in but not admin → redirect to /
 * - Otherwise returns the admin user
 */
export async function requireAdminPage(): Promise<SessionUser> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/admin/login");
  }

  if (user.role !== "ADMIN") {
    redirect("/");
  }

  return user;
}
