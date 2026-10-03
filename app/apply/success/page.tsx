import type { Metadata } from "next";
import { CheckCircle2, Mail, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
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
  const referenceNumber = ref ?? "BF-XXXX-XXXXXX";

  const emailSubject = `Reference Number — ${referenceNumber}`;
  const emailBody = `Hello Breem Foundation,\n\nMy application reference number is: ${referenceNumber}\n\nPlease confirm receipt and locate my application.\n\nThank you.`;

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
            Our team will review it within 72 hours. To help us locate your
            application quickly, save your reference number and send it to us
            using the button below.
          </p>
        </FadeUp>

        <FadeUp delay={1}>
          <div className="mx-auto mt-10 max-w-xl rounded-2xl border-2 border-brand-200 bg-white p-6 text-center shadow-lift sm:p-8">
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
              Tap the copy icon to save it. Screenshot this page if you prefer.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={2}>
          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6 text-center shadow-card sm:p-8">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-glow">
              <Mail className="h-6 w-6" />
            </span>
            <h2 className="mt-4 font-display text-xl font-semibold text-ink sm:text-2xl">
              Submit your reference number
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
              Copy your reference number above, then tap the button below to
              send it to our team. We&apos;ll use it to locate and prioritize
              your application.
            </p>
            <Button
              asChild
              variant="primary"
              size="lg"
              className="mt-6 gap-2"
            >
              <a href={mailtoHref}>
                <Mail className="h-4 w-4" />
                Submit Reference Number
              </a>
            </Button>
            <p className="mt-3 text-xs text-ink-muted">
              Opens your email app — pre-filled and ready to send.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={3}>
          <p className="mt-10 flex items-center justify-center gap-1.5 text-center text-xs text-ink-muted">
            <ShieldCheck className="h-3 w-3" />
            Your data is encrypted and confidential.
          </p>
        </FadeUp>
      </Container>
    </section>
  );
}
