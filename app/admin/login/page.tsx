import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Shield } from "lucide-react";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { getCurrentUser } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Admin Sign In",
  robots: { index: false, follow: false }
};

export default async function AdminLoginPage() {
  const user = await getCurrentUser();
  if (user && user.role === "ADMIN") {
    redirect("/admin");
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-ink px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-lg sm:p-8">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-white">
            <Shield className="h-6 w-6" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-bold text-white">
            Admin Access
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Authorized personnel only
          </p>
        </div>

        <div className="mt-8">
          <AdminLoginForm />
        </div>
      </div>
    </section>
  );
}
