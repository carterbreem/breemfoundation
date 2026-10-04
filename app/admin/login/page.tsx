import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Shield } from "lucide-react";
import { Container } from "@/components/ui/container";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { getCurrentUser } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Admin Sign In",
  description: "Breem Foundation admin access.",
  robots: { index: false, follow: false }
};

export default async function AdminLoginPage() {
  // If already signed in as admin, go straight to dashboard
  const user = await getCurrentUser();
  if (user && user.role === "ADMIN") {
    redirect("/admin");
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink py-16">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "24px 24px"
        }}
        aria-hidden
      />
      <div
        className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl"
        aria-hidden
      />

      <Container size="sm" className="relative max-w-md">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lift backdrop-blur-lg sm:p-8">
          <div className="flex flex-col items-center text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-glow">
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

        <p className="mt-6 text-center text-xs text-white/40">
          Breem Foundation · Internal
        </p>
      </Container>
    </section>
  );
}
