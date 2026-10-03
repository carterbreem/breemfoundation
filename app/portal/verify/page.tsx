import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Verify Email",
  robots: { index: false, follow: false }
};

interface PageProps {
  searchParams: Promise<{ token?: string; email?: string }>;
}

export default async function VerifyPage({ searchParams }: PageProps) {
  const { token, email } = await searchParams;
  let ok = false;
  let errorMessage = "";

  if (token && email) {
    try {
      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
      const res = await fetch(
        `${siteUrl}/api/auth/verify?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`,
        { cache: "no-store" }
      );
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) ok = true;
      else errorMessage = data?.error ?? "Verification failed.";
    } catch {
      errorMessage = "Verification failed. Please try again.";
    }
  } else {
    errorMessage = "Missing verification details.";
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-white py-16">
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
      <Container size="sm" className="relative max-w-md">
        <div className="rounded-3xl border border-surface-border bg-white p-6 text-center shadow-lift sm:p-10">
          {ok ? (
            <>
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-card">
                <CheckCircle2 className="h-8 w-8" />
              </span>
              <h1 className="mt-6 font-display text-2xl font-bold text-ink">
                Email verified
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Your account is now active. Sign in to view your application
                status and receive updates.
              </p>
              <Button asChild variant="primary" size="lg" className="mt-6">
                <Link href="/portal/login">Continue to Sign In</Link>
              </Button>
            </>
          ) : (
            <>
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500 text-white shadow-card">
                <XCircle className="h-8 w-8" />
              </span>
              <h1 className="mt-6 font-display text-2xl font-bold text-ink">
                Verification failed
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {errorMessage || "The link may have expired or already been used."}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button asChild variant="primary" size="md">
                  <Link href="/portal/login">Go to Sign In</Link>
                </Button>
                <Button asChild variant="outline" size="md" className="gap-2">
                  <a href="mailto:breemsfoundation.org@proton.me">
                    <Mail className="h-4 w-4" />
                    Contact Support
                  </a>
                </Button>
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
