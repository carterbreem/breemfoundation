import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  Copy,
  Mail,
  Clock,
  FileText,
  ArrowRight
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
            respond within 72 hours. Please save your reference number below —
            you&apos;ll need it to track your application.
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
              <p className="mt-4 text-xs leading-relaxed text-ink-muted">
                Save this somewhere safe. You&apos;ll use it to check your
                application status in the Applicant Portal.
              </p>
            </div>
          </div>
        </FadeUp>

        {/* Next steps */}
        <FadeUp delay={2}>
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
                body={`You'll receive an email from us at the address you provided. If we need more information, we'll ask. All updates will also appear in the Applicant Portal.`}
              />
              <StepRow
                icon={<FileText className="h-5 w-5" />}
                title="3. Support delivered"
                body="If approved, funds or resources are delivered directly to you. No middlemen. No fees."
              />
            </div>
          </div>
        </FadeUp>

        {/* Contact + CTA */}
        <FadeUp delay={3}>
          <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-surface-border bg-white p-6 shadow-card sm:p-8">
            <h3 className="font-display text-lg font-semibold text-ink">
              Questions in the meantime?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Email us anytime at{" "}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="font-semibold text-brand-600 underline-offset-4 hover:underline"
              >
                {siteConfig.contactEmail}
              </a>{" "}
              — we respond within one business day.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="primary" size="md">
                <Link href="/" className="gap-2">
                  Back to Home
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="md">
                <Link href="/portal/login">Go to Applicant Portal</Link>
              </Button>
            </div>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}

function StepRow({
  icon,
  title,
  body
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-surface-border bg-white p-5 shadow-card">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        {icon}
      </span>
      <div>
        <p className="font-semibold text-ink">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-muted">{body}</p>
      </div>
    </div>
  );
}
