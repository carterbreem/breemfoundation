import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FadeUp } from "@/components/shared/motion";
import { siteConfig } from "@/lib/site-config";

interface HeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  imageUrl: string;
  imageAlt: string;
}

export function Hero({
  eyebrow = "Registered 501(c)(3) Nonprofit",
  title,
  description,
  primaryCta = siteConfig.navCta.apply,
  secondaryCta = siteConfig.navCta.donate,
  imageUrl,
  imageAlt
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-white">
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
      <div
        className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-brand-100/40 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-gold-100/40 blur-3xl"
        aria-hidden
      />

      <Container size="full" className="relative py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Copy */}
          <div className="lg:col-span-6">
            <FadeUp>
              <span className="eyebrow">
                <ShieldCheck className="h-3.5 w-3.5" />
                {eyebrow}
              </span>
            </FadeUp>

            <FadeUp delay={1}>
              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink text-balance sm:text-5xl lg:text-6xl">
                {title}
              </h1>
            </FadeUp>

            <FadeUp delay={2}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
                {description}
              </p>
            </FadeUp>

            <FadeUp delay={3}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="xl" variant="primary">
                  <Link href={primaryCta.href} className="gap-2">
                    {primaryCta.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="xl" variant="gold">
                  <Link href={secondaryCta.href} className="gap-2">
                    <Heart className="h-4 w-4" />
                    {secondaryCta.label}
                  </Link>
                </Button>
              </div>
            </FadeUp>

            <FadeUp delay={4}>
              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&q=80&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&q=80&auto=format&fit=crop"
                  ].map((src, i) => (
                    <span
                      key={i}
                      className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-sm"
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </span>
                  ))}
                </div>
                <div className="text-xs leading-tight text-ink-muted">
                  <p className="font-semibold text-ink">12,400+ families helped</p>
                  <p>across 38 countries</p>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Image */}
          <div className="relative lg:col-span-6">
            <FadeUp delay={2}>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-lift sm:aspect-[5/5] lg:aspect-[4/5]">
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent"
                  aria-hidden
                />
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-6 -left-4 hidden max-w-[260px] rounded-2xl border border-surface-border bg-white/95 p-4 shadow-lift backdrop-blur sm:block">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      91¢ of every $1
                    </p>
                    <p className="text-xs text-ink-muted">
                      goes directly to families
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </Container>
    </section>
  );
}
