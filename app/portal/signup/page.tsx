import type { Metadata } from "next";
import Link from "next/link";
import { UserPlus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SignupForm } from "@/components/portal/signup-form";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your Breem Foundation applicant account.",
  robots: { index: false, follow: false }
};

export default function PortalSignupPage() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-white py-16">
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
      <Container size="sm" className="relative max-w-md">
        <div className="rounded-3xl border border-surface-border bg-white p-6 shadow-lift sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500 text-white shadow-glow">
              <UserPlus className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-display text-xl font-bold text-ink sm:text-2xl">
                Create Account
              </h1>
              <p className="text-xs text-ink-muted">
                Track your application in real time
              </p>
            </div>
          </div>

          <div className="mt-8">
            <SignupForm />
          </div>

          <p className="mt-6 border-t border-surface-border pt-6 text-center text-sm text-ink-muted">
            Already have an account?{" "}
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
