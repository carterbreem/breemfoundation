import type { Metadata } from "next";
import Link from "next/link";
import { KeyRound } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ForgotPasswordForm } from "@/components/portal/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password",
  robots: { index: false, follow: false }
};

export default function ForgotPasswordPage() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-white py-16">
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
      <Container size="sm" className="relative max-w-md">
        <div className="rounded-3xl border border-surface-border bg-white p-6 shadow-lift sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500 text-white shadow-glow">
              <KeyRound className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-display text-xl font-bold text-ink sm:text-2xl">
                Forgot Password
              </h1>
              <p className="text-xs text-ink-muted">
                We&apos;ll send you reset instructions
              </p>
            </div>
          </div>

          <div className="mt-8">
            <ForgotPasswordForm />
          </div>

          <p className="mt-6 border-t border-surface-border pt-6 text-center text-sm text-ink-muted">
            Remembered it?{" "}
            <Link
              href="/portal/login"
              className="font-semibold text-brand-600 underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
