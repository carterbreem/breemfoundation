import type { Metadata } from "next";
import { CheckCircle2, Mail, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/shared/motion";
import { CopyButton } from "@/components/apply/copy-button";
import { siteConfig } from "@/lib/site-config";

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
  const referenceNumber = (ref ?? "").trim();

  const emailSubject = `Reference Number — ${referenceNumber}`;
  const emailBody = `Hello Breem Foundation,

My application reference number is: ${referenceNumber}

Please confirm receipt and locate my application.

Thank you.`;

  const mailtoHref = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
    emailSubject
  )}&body=${encodeURIComponent(emailBody)}`;

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
            Thank you — we&apos;ve got your application.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
            Our team will review it within 72 hours. Please save your
            reference number and submit it to us below so we can locate your
            application.
          </p>
        </FadeUp>

        <FadeUp delay={1}>
          <div className="mx-auto mt-10 max-w-xl rounded-2xl border-2 border-brand-200 bg-white p-6 shadow-lift sm:p-8">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
              Your Reference Number
            </p>

            {referenceNumber ? (
              <>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <p className="font-display text-2xl font-bold tracking-tight text-gradient-brand sm:text-3xl">
                    {referenceNumber}
                  </p>
                  <CopyButton value={referenceNumber} />
                </div>

                <div className="mt-5 rounded-xl bg-amber-50 p-4 text-left">
                  <p className="text-xs font-semibold text-amber-900">
                    ⚠️ Save this reference number
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-amber-800">
                    Write it down, take a screenshot, or copy it. You&apos;ll
                    need it — along with your full name — to track your
                    application status.
                  </p>
                </div>

                <div className="mt-6 border-t border-surface-border pt-6">
                  <p className="text-center text-sm font-semibold text-ink">
                    Submit your reference number to our team
                  </p>
                  <p className="mt-1 text-center text-xs leading-relaxed text-ink-muted">
                    Tap below to send it to us pre-filled — we&apos;ll use it
                    to locate and prioritize your application.
                  </p>

                  <a
                    href={mailtoHref}
                    className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-6 text-sm font-semibold text-white shadow-card transition-all hover:bg-brand-600 hover:shadow-glow active:scale-[0.98]"
                  >
                    <Mail className="h-4 w-4" />
                    Submit Reference Number
                  </a>
                  <p className="mt-3 text-center text-xs text-ink-muted">
                    Opens your email app — pre-filled and ready to send.
                  </p>
                </div>
              </>
            ) : (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-center">
                <p className="text-sm font-semibold text-red-900">
                  Reference number missing
                </p>
                <p className="mt-1 text-xs leading-relaxed text-red-800">
                  We couldn&apos;t generate a reference number. Please email
                  us at{" "}
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="font-semibold underline"
                  >
                    {siteConfig.contactEmail}
                  </a>{" "}
                  with your full name and we&apos;ll locate your application
                  manually.
                </p>
              </div>
            )}
          </div>
        </FadeUp>

        <FadeUp delay={2}>
          <p className="mt-10 flex items-center justify-center gap-1.5 text-center text-xs text-ink-muted">
            <ShieldCheck className="h-3 w-3" />
            Your data is encrypted and confidential.
          </p>
        </FadeUp>
      </Container>
    </section>
  );
}
