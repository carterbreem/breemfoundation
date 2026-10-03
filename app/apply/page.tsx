import type { Metadata } from "next";
import { ShieldCheck, Clock, Lock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FadeUp } from "@/components/shared/motion";
import { ApplicationForm } from "@/components/apply/application-form";

export const metadata: Metadata = {
  title: "Apply for Assistance",
  description:
    "Apply for financial assistance from Breem Foundation. Free, confidential, and reviewed within 72 hours. Housing, medical, food, education, and emergency support available.",
  openGraph: {
    title: "Apply for Assistance · Breem Foundation",
    description:
      "Free, confidential, and fast. Get the help you need within 72 hours."
  }
};

export default function ApplyPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-white">
        <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
        <Container size="md" className="relative py-14 text-center lg:py-20">
          <FadeUp>
            <span className="eyebrow mx-auto">
              <ShieldCheck className="h-3.5 w-3.5" />
              Apply for Assistance
            </span>
          </FadeUp>
          <FadeUp delay={1}>
            <h1 className="mt-5 font-display text-3xl font-bold leading-[1.05] tracking-tight text-ink text-balance sm:text-4xl lg:text-5xl">
              Help is{" "}
              <span className="text-gradient-brand">one application away.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={2}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
              It takes about 10 minutes. It&apos;s free, confidential, and a
              real human reviews every application — usually within 72 hours.
            </p>
          </FadeUp>

          <FadeUp delay={3}>
            <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-ink-muted sm:text-sm">
              <span className="inline-flex items-center gap-2">
                <Lock className="h-4 w-4 text-brand-500" />
                Fully encrypted
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand-500" />
                72-hour review
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-brand-500" />
                No fees, ever
              </span>
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* ── FORM ─────────────────────────────────────────── */}
      <section className="pb-20 pt-6 lg:pb-28">
        <Container size="full">
          <ApplicationForm />
        </Container>
      </section>
    </>
  );
}
