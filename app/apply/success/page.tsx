import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  Copy,
  Mail,
  Clock,
  FileText,
  ArrowRight,
  Search
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/shared/motion";
import { siteConfig } from "@/lib/site-config";
import { CopyButton } from "@/components/apply/copy-button";

export const metadata: Metadata = {
  title: "Application Submitted",
  description: "Your application has been received.",
  robots: { index: false, follow: false }
};

interface PageProps {
  searchParams: Promise<{ ref?: string }>;
}

export default async function ApplySuccessPage({ searchParams }: PageProps) {
  const { ref } = await searchParams;
  const referenceNumber = ref ?? "BF-XXXX-XXXXXX";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/30 to-white">
      <div className="absolute inset-0 bg-grid opacity-20" aria-hidden />

      <Container size="md" className="relative py-16 lg:py-24">
        <FadeUp className="text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lift">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <Badge variant="success" size="lg" className="mt-6">
            Application Received
          </Badge>
          <h1 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-ink text-balance sm:text-4xl lg:text-5xl">
            Thank you —{" "}
            <span className="text-gradient-brand">
              we&apos;ve got your application.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
            A member of our team will personally review your application and
            respond within 72 hours. Please keep the reference number below
            safe — you&apos;ll need it to track your application.
          </p>
        </FadeUp>

        {/* Reference number */}
        <FadeUp delay={1}>
          <div className="mx-auto mt-10 max-w-xl">
            <div className="rounded-2xl border-2 border-brand-200 bg-white p-6 text-center shadow-lift sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
                Your Reference Number
              </p>
              <div className="mt-3 flex items-center justify-center gap-3">
                <p className="font-display text-2xl font-bold tracking-tight text-gradient-brand sm:text-3xl">
                  {referenceNumber}
                </p>
                <CopyButton value={referenceNumber} />
              </div>
              <div className="mt-4 rounded-xl bg-gold-50 p-3">
                <p className="text-xs font-semibold text-gold-900">
                  ⚠️ Save this reference number
                </p>
                <p className="mt-1 text-xs leading-relaxed text-gold-800">
                  Write it down or take a screenshot. You&apos;ll need it — along
                  with your full name — to track your application status.
                </p>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* CTA to track */}
        <FadeUp delay={2}>
          <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6 text-center shadow-card sm:p-8">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-glow">
              <Search className="h-6 w-6" />
            </span>
            <h2 className="mt-4 font-display text-xl font-semibold text-ink sm:text-2xl">
              Track your application anytime
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Use your full name and reference number to check your status —
              no account needed.
            </p>
            <Button asChild variant="primary" size="lg" className="mt-6 gap-2">
              <Link href="/track">
                <Search className="h-4 w-4" />
                Track My Application
              </Link>
            </Button>
          </div>
        </FadeUp>

        {/* Next steps */}
        <FadeUp delay={3}>
          <div className="mx-auto mt-12 max-w-2xl">
            <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
              What happens next
            </h2>

            <div className="mt-6 space-y-4">
              <StepRow
                icon={<Clock className="h-5 w-5" />}
                title="1. Review (within 72 hours)"
                body="A trained reviewer reads your application and documents carefully. We may reach out if we need clarification."
              />
              <StepRow
                icon={<Mail className="h-5 w-5" />}
                title="2. Decision"
                body="You'll receive an email at the address you provided. All updates will also appear when you track your application."
              />
