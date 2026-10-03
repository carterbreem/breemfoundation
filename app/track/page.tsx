import type { Metadata } from "next";
import { Search, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FadeUp } from "@/components/shared/motion";
import { TrackForm } from "@/components/track/track-form";

export const metadata: Metadata = {
  title: "Track Application",
  description:
    "Track the status of your Breem Foundation application using your full name and reference number.",
  robots: { index: false, follow: false }
};

export default function TrackPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-white">
        <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
        <Container size="md" className="relative py-14 text-center lg:py-20">
          <FadeUp>
            <span className="eyebrow mx-auto">
              <Search className="h-3.5 w-3.5" />
              Track Your Application
            </span>
          </FadeUp>
          <FadeUp delay={1}>
            <h1 className="mt-5 font-display text-3xl font-bold leading-[1.05] tracking-tight text-ink text-balance sm:text-4xl lg:text-5xl">
              Where does your{" "}
              <span className="text-gradient-brand">application stand?</span>
            </h1>
          </FadeUp>
          <FadeUp delay={2}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
              Enter your full name and the reference number we sent you. You
              can find it on your application confirmation page or in your
              email.
            </p>
          </FadeUp>
        </Container>
      </section>

      <section className="pb-20 pt-6 lg:pb-28">
        <Container size="md">
          <TrackForm />
        </Container>
      </section>
    </>
  );
}
