import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FadeUp } from "@/components/shared/motion";
import { siteConfig } from "@/lib/site-config";

interface CTABannerProps {
  title?: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function CTABanner({
  title = "Every dollar becomes someone's fresh start.",
  description = "Whether you need help or want to give it — you're welcome here. Apply for assistance or make a donation today.",
  primaryCta = siteConfig.navCta.apply,
  secondaryCta = siteConfig.navCta.donate
}: CTABannerProps) {
  return (
    <section className="relative overflow-hidden">
      <Container size="full" className="py-16 lg:py-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 px-6 py-14 shadow-lift sm:px-12 sm:py-20 lg:px-20">
          {/* Decorative shapes */}
          <div
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gold-400/20 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "24px 24px"
            }}
            aria-hidden
          />

          <div className="relative mx-auto max-w-3xl text-center">
            <FadeUp>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                Take Action
              </span>
            </FadeUp>
            <FadeUp delay={1}>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
                {title}
              </h2>
            </FadeUp>
            <FadeUp delay={2}>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 text-pretty sm:text-lg">
                {description}
              </p>
            </FadeUp>
            <FadeUp delay={3}>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  asChild
                  size="xl"
                  className="bg-white text-brand-700 hover:bg-white/90 hover:text-brand-800"
                >
                  <Link href={primaryCta.href} className="gap-2">
                    {primaryCta.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="xl"
                  className="bg-gold-500 text-ink hover:bg-gold-400"
                >
                  <Link href={secondaryCta.href} className="gap-2">
                    <Heart className="h-4 w-4" />
                    {secondaryCta.label}
                  </Link>
                </Button>
              </div>
            </FadeUp>
          </div>
        </div>
      </Container>
    </section>
  );
}
