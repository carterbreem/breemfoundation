import type { Metadata } from "next";
import Link from "next/link";
import { Lock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ResetPasswordForm } from "@/components/portal/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
  robots: { index: false, follow: false }
};

interface PageProps {
  searchParams: Promise<{ token?: string; email?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: PageProps) {
  const { token, email } = await searchParams;

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-white py-16">
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
      <Container size="sm" className="relative max-w-md">
        <div className="rounded-3xl border border-surface-border bg-white p-6 shadow-lift sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500 text-white shadow-glow">
              <Lock className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-display text-xl font-bold text-ink sm:text-2xl">
                Reset Password
              </h1>
              <p className="text-xs text-ink-muted">
                Choose a new password for your account
              </p>
            </div>
          </div>

          <div className="mt-8">
            <ResetPasswordForm token={token ?? ""} email={email ?? ""} />
          </div>

          <p className="mt-6 border-t border-surface-border pt-6 text-center text-sm text-ink-muted">
            <Link
              href="/portal/login"
              className="font-semibold text-brand-600 underline-offset-4 hover:underline"
            >
              Back to Sign In
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
