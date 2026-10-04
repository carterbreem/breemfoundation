import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, Mail, MessageSquare } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeUp } from "@/components/shared/motion";
import { CTABanner } from "@/components/marketing/cta-banner";
import { FaqList } from "@/components/marketing/faq-list";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about applying for assistance, eligibility, documents, timelines, and donations at Breem Foundation.",
  keywords: [
    "Breem Foundation FAQ",
    "charity eligibility",
    "how to apply for assistance",
    "donation questions"
  ],
  openGraph: {
    title: "FAQ · Breem Foundation",
    description:
      "Everything you need to know before applying for assistance or making a donation.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ · Breem Foundation",
    description: "Everything you need to know."
  },
  alternates: { canonical: "/faq" }
};

export default function FaqPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-white">
        <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
        <Container size="md" className="relative py-20 text-center lg:py-24">
          <FadeUp>
            <span className="eyebrow mx-auto">
              <HelpCircle className="h-3.5 w-3.5" />
              Frequently Asked Questions
            </span>
          </FadeUp>
          <FadeUp delay={1}>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink text-balance sm:text-5xl lg:text-6xl">
              Answers,{" "}
              <span className="text-gradient-brand">
                without the runaround.
              </span>
            </h1>
          </FadeUp>
          <FadeUp delay={2}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
              Everything you need to know before applying for assistance or
              making a donation. Can&apos;t find your answer? Reach out — we
              respond within one business day.
            </p>
          </FadeUp>
        </Container>
      </section>

      <section className="section bg-white">
        <Container size="md">
          <FaqList />
        </Container>
      </section>

      <section className="section bg-surface-soft">
        <Container size="md">
          <FadeUp>
            <div className="rounded-3xl border border-surface-border bg-white p-8 text-center shadow-card sm:p-12">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-glow">
                <MessageSquare className="h-6 w-6" />
              </span>
              <h2 className="mt-6 font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
                Still have questions?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
                Our team is here to help. Whether you&apos;re unsure about
                eligibility, need help with your application, or want to
                explore partnership opportunities — we&apos;d love to hear
                from you.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" variant="primary">
                  <Link href="/contact" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Contact Us
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    {siteConfig.contactEmail}
                  </a>
                </Button>
              </div>
            </div>
          </FadeUp>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
