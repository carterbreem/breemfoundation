import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/shared/motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { Heart, ArrowRight, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* Hero placeholder — full build in Phase 2 */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface to-brand-50/40">
        <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
        <Container size="lg" className="relative py-20 lg:py-32">
          <FadeUp className="flex flex-col items-center text-center">
            <Badge variant="gold" size="lg" className="mb-6">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Registered 501(c)(3) · EIN {siteConfig.taxId}
            </Badge>
            <h1 className="font-display text-4xl font-bold tracking-tight text-ink text-balance sm:text-5xl lg:text-6xl">
              When hardship hits,{" "}
              <span className="text-gradient-brand">no one should face it alone.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
              Breem Foundation helps individuals and families navigate
              financial hardship with fast, dignified assistance — housing,
              medical, food, education, and emergency support.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="xl" variant="primary">
                <Link href={siteConfig.navCta.apply.href} className="gap-2">
                  {siteConfig.navCta.apply.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="gold">
                <Link href={siteConfig.navCta.donate.href} className="gap-2">
                  <Heart className="h-4 w-4" />
                  {siteConfig.navCta.donate.label}
                </Link>
              </Button>
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* Phase marker */}
      <section className="section">
        <Container size="md">
          <SectionHeading
            eyebrow="Phase 1 · Foundation Complete"
            title="The structure is live."
            description="Nav, footer, design system, motion primitives, and visitor tracking are all wired up. The full home page lands in Phase 2."
          />
        </Container>
      </section>
    </>
  );
}
