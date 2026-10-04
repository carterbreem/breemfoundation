import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/shared/motion";
import { CopyButton } from "@/components/apply/copy-button";
import { DonateSubmitReference } from "@/components/donate/donate-submit-reference";
import { ImpactCard } from "@/components/donate/impact-card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Donation Received",
  description: "Thank you for supporting Breem Foundation.",
  robots: { index: false, follow: false }
};

interface PageProps {
  searchParams: Promise<{ ref?: string }>;
}

export default async function DonateSuccessPage({ searchParams }: PageProps) {
  const { ref } = await searchParams;
  const referenceNumber = (ref ?? "").trim();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-gold-50/30 to-white">
      <div className="absolute inset-0 bg-grid opacity-20" aria-hidden />

      <Container size="md" className="relative py-16 lg:py-24">
        <FadeUp className="text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lift">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <Badge variant="success" size="lg" className="mt-6">
            Donation Received
          </Badge>
          <h1 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-ink text-balance sm:text-4xl lg:text-5xl">
            Thank you —{" "}
            <span className="text-gradient-gold">you made a difference.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
            We&apos;ve received your donation intent and our team will email
            you the exact payment details shortly. Please save your reference
            number below.
          </p>
        </FadeUp>

        <FadeUp delay={1}>
          <div className="mx-auto mt-10 max-w-xl rounded-2xl border-2 border-brand-200 bg-white p-6 shadow-lift sm:p-8">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
              Your Donation Reference
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
                    ⚠️ What happens next
                  </p>
                  <ol className="mt-2 space-y-1.5 text-xs leading-relaxed text-amber-800">
                    <li>
                      <strong>1.</strong> Tap the button below to send us your
                      reference number.
                    </li>
                    <li>
                      <strong>2.</strong> We reply with the exact payment
                      details for your chosen method.
                    </li>
                    <li>
                      <strong>3.</strong> You send the donation, and we confirm
                      receipt with a tax-deductible receipt.
                    </li>
                  </ol>
                </div>

                <DonateSubmitReference referenceNumber={referenceNumber} />
              </>
            ) : (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4">
                <p className="text-sm font-semibold text-red-900">
                  Reference number missing
                </p>
                <p className="mt-1 text-xs leading-relaxed text-red-800">
                  Please email us at{" "}
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="font-semibold underline"
                  >
                    {siteConfig.contactEmail}
                  </a>{" "}
                  with your name and donation amount so we can locate your
                  intent.
                </p>
              </div>
            )}
          </div>
        </FadeUp>

        <FadeUp delay={2}>
          <ImpactCard />
        </FadeUp>

        <FadeUp delay={3}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-full bg-brand-500 px-6 text-sm font-semibold text-white shadow-card transition-all hover:bg-brand-600 hover:shadow-glow"
            >
              Back to Home
            </Link>
            <Link
              href="/stories"
              className="inline-flex h-11 items-center justify-center rounded-full border border-surface-border bg-white px-6 text-sm font-semibold text-ink transition-all hover:border-brand-200 hover:text-brand-600"
            >
              See Your Impact
            </Link>
          </div>
        </FadeUp>

        <FadeUp delay={4}>
          <p className="mt-10 flex items-center justify-center gap-1.5 text-center text-xs text-ink-muted">
            <ShieldCheck className="h-3 w-3" />
            Your information is encrypted and confidential.
          </p>
        </FadeUp>
      </Container>
    </section>
  );
}
