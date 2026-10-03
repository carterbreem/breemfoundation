import type { Metadata } from "next";
import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { LoginForm } from "@/components/portal/login-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Breem Foundation account.",
  robots: { index: false, follow: false }
};

export default function PortalLoginPage() {
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
                Sign In
              </h1>
              <p className="text-xs text-ink-muted">
                Access your Breem Foundation account
              </p>
            </div>
          </div>

          <div className="mt-8">
            <LoginForm />
          </div>

          <div className="mt-6 space-y-3 border-t border-surface-border pt-6 text-center text-sm">
            <p className="text-ink-muted">
              Don&apos;t have an account?{" "}
              <Link
                href="/portal/signup"
                className="font-semibold text-brand-600 underline-offset-4 hover:underline"
              >
                Create one
              </Link>
            </p>
            <p>
              <Link
                href="/portal/forgot-password"
                className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-brand-600"
              >
                Forgot your password?
                <ArrowRight className="h-3 w-3" />
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-ink-muted">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="underline-offset-4 hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline-offset-4 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
