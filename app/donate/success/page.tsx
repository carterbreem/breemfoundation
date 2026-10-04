import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Mail, ShieldCheck, Heart } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/shared/motion";
import { CopyButton } from "@/components/apply/copy-button";
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

  const emailSubject = `Donation Reference — ${referenceNumber}`;
  const emailBody = `Hello Breem Foundation,

My donation reference number is: ${referenceNumber}

Please send me the payment details for my chosen method.

Thank you.`;

  const mailtoHref = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
    emailSubject
  )}&body=${encodeURIComponent(emailBody)}`;

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
            <span className="text-gradient-gold">
              you made a difference.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
            We&apos;ve received your donation intent and our team will email
            you the exact payment details shortly. Please save your reference
            number below.
          </p>
        </FadeUp>

        <FadeUp delay={1}>
          <div className="mx-auto mt-10 max-w-xl rounded-2xl border-2 border-brand-200 bg-white p-6 text-center shadow-lift sm:p-8">
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
                      <strong>1.</strong> We&apos;ll email you the exact
                      payment details for your chosen method.
                    </li>
                    <li>
                      <strong>2.</strong> You send the donation using those
                      details.
                    </li>
                    <li>
                      <strong>3.</strong> We confirm receipt and email you a
                      tax-deductible receipt.
                    </li>
                  </ol>
                </div>
              </>
            ) : (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-center">
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
          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6 text-center shadow-card sm:p-8">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-glow">
              <Mail className="h-6 w-6" />
            </span>
            <h2 className="mt-4 font-display text-xl font-semibold text-ink sm:text-2xl">
              Want payment details right away?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
              Tap below to email us with your reference number pre-filled —
              we&apos;ll reply with the payment details within one business
              day.
            </p>
            <a
              href={mailtoHref}
              className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-500 px-6 text-sm font-semibold text-white shadow-card transition-all hover:bg-brand-600 hover:shadow-glow active:scale-[0.98]"
            >
              <Mail className="h-4 w-4" />
              Email Us Now
            </a>
            <p className="mt-3 text-center text-xs text-ink-muted">
              Opens your email app — pre-filled and ready to send.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={3}>
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-surface-border bg-white p-6 shadow-card sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-50 text-gold-600">
                <Heart className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg font-semibold text-ink">
                What your donation supports
              </h3>
            </div>
            <ul classNamespan="mt-5 space-y-3 text-sm>
 leading-relaxed text-ink-muted">
                <span              <li className="flex gap-3">
                <span className="text-brand-500">•</>Emergency rent and utility relief for families at risk of losing their home</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-500">•</span>
                <span>Medical and surgical support for individuals facing life-threatening conditions</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-500">•</span>
                <span>Food security and grocery assistance for households in crisis</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-500">•</span>
                <span>Education grants so students can finish what they started</span>
              </li>
            </ul>
            <p className="mt-6 border-t border-surface-border pt-5 text-xs text-ink-muted">
              <strong className="text-ink">91 cents</strong> of every dollar
              reaches families directly.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={4}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-500 px-6 text-sm font-semibold text-white shadow-card transition-all hover:bg-brand-600 hover:shadow-glow"
            >
              Back to Home
            </Link>
            <Link
              href="/stories"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-surface-border bg-white px-6 text-sm font-semibold text-ink transition-all hover:border-brand-200 hover:text-brand-600"
            >
              See Your Impact
            </Link>
          </div>
        </FadeUp>

        <FadeUp delay={5}>
          <p className="mt-10 flex items-center justify-center gap-1.5 text-center text-xs text-ink-muted">
            <ShieldCheck className="h-3 w-3" />
            Your information is encrypted and confidential.
          </p>
        </FadeUp>
      </Container>
    </section>
  );
}
