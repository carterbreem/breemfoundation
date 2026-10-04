import type { Metadata } from "next";
import { Heart, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FadeUp } from "@/components/shared/motion";
import { DonationForm } from "@/components/donate/donation-form";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Breem Foundation's mission to help families through financial hardship. One-time and monthly donations accepted via bank transfer, Cash App, PayPal, Zelle, or Venmo.",
  openGraph: {
    title: "Donate · Breem Foundation",
    description:
      "91 cents of every dollar reaches families in need. Give today."
  }
};

const trustPoints = [
  { icon: ShieldCheck, label: "501(c)(3) registered" },
  { icon: Sparkles, label: "91¢ of every $1 to families" },
  { icon: Heart, label: "100% secure & confidential" }
];

export default function DonatePage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-gold-50/30 to-white">
        <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
        <div
          className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-gold-100/40 blur-3xl"
          aria-hidden
        />
        <Container size="md" className="relative py-16 text-center lg:py-20">
          <FadeUp>
            <span className="eyebrow mx-auto">
              <Heart className="h-3.5 w-3.5" />
              Make a Donation
            </span>
          </FadeUp>
          <FadeUp delay={1}>
            <h1 className="mt-5 font-display text-3xl font-bold leading-[1.05] tracking-tight text-ink text-balance sm:text-4xl lg:text-5xl">
              Your gift becomes{" "}
              <span className="text-gradient-gold">
                someone&apos;s fresh start.
              </span>
            </h1>
          </FadeUp>
          <FadeUp delay={2}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
              Every donation — one-time or monthly — helps families facing
              housing, medical, food, education, or emergency crises. Choose
              an amount, pick a payment method, and we&apos;ll email you the
              details.
            </p>
          </FadeUp>
          <FadeUp delay={3}>
            <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-ink-muted sm:text-sm">
              {trustPoints.map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4 text-brand-500" />
                  {label}
                </span>
              ))}
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* ── Form ───────────────────────────────────── */}
      <section className="pb-20 pt-6 lg:pb-28">
        <Container size="md">
          <DonationForm />
        </Container>
      </section>
    </>
  );
}
