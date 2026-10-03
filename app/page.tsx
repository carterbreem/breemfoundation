import Link from "next/link";
import {
  ArrowRight,
  Heart,
  ShieldCheck,
  HandHeart,
  Sparkles,
  HelpCircle,
  Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Hero } from "@/components/marketing/hero";
import { Stats } from "@/components/marketing/stats";
import { StepCard } from "@/components/marketing/step-card";
import { StoryCard } from "@/components/marketing/story-card";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { CTABanner } from "@/components/marketing/cta-banner";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeUp, Stagger, StaggerItem } from "@/components/shared/motion";
import { siteConfig } from "@/lib/site-config";
import { stories, testimonials, howItWorks, faqs } from "@/lib/dummy-data";

export default function HomePage() {
  const featuredStories = stories.filter((s) => s.featured).slice(0, 3);
  const topTestimonials = testimonials.slice(0, 3);
  const faqPreview = faqs.slice(0, 5);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <Hero
        eyebrow="Registered 501(c)(3) Nonprofit"
        title={
          <>
            When hardship hits,{" "}
            <span className="text-gradient-brand">
              no one should face it alone.
            </span>
          </>
        }
        description="Breem Foundation helps individuals and families navigate financial hardship with fast, dignified assistance — housing, medical, food, education, and emergency support."
        imageUrl="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=80&auto=format&fit=crop"
        imageAlt="A volunteer sharing a warm moment with a family"
      />

      {/* ── TRUST BAR ────────────────────────────────────── */}
      <section className="border-y border-surface-border bg-white">
        <Container size="full" className="py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm">
            {[
              { icon: ShieldCheck, label: "501(c)(3) Registered" },
              { icon: HandHeart, label: "91¢ of every $1 to families" },
              { icon: Sparkles, label: "72-hour average response" },
              { icon: Heart, label: "Serving 38 countries" }
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 text-ink-muted"
              >
                <Icon className="h-4 w-4 text-brand-500" />
                <span className="font-medium text-ink">{label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <Stats />

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className="section bg-white">
        <Container size="full">
          <SectionHeading
            eyebrow="How It Works"
            title="Getting help is simple, fast, and dignified."
            description="From application to relief, our process is designed to take the weight off your shoulders — not add to it."
          />

          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step) => (
              <StaggerItem key={step.number}>
                <StepCard step={step} />
              </StaggerItem>
            ))}
          </Stagger>

          <FadeUp delay={3} className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/apply" className="gap-2">
                Start your application
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </FadeUp>
        </Container>
      </section>

      {/* ── FEATURED STORIES ─────────────────────────────── */}
      <section className="section bg-surface-soft">
        <Container size="full">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              align="left"
              eyebrow="Success Stories"
              title="Real people. Real change."
              description="Every story below represents a family who found hope through Breem Foundation. Their resilience inspires us — and reminds us why this work matters."
              className="max-w-2xl"
            />
            <Button asChild variant="outline" size="md" className="shrink-0">
              <Link href="/stories" className="gap-2">
                See all stories
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredStories.map((story) => (
              <StaggerItem key={story.id}>
                <StoryCard story={story} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="section bg-white">
        <Container size="full">
          <SectionHeading
            eyebrow="Testimonials"
            title="Voices from the families we serve."
            description="Dignity, speed, and genuine care — in their own words."
          />

          <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topTestimonials.map((t) => (
              <StaggerItem key={t.id}>
                <TestimonialCard testimonial={t} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ── MISSION SPLIT ────────────────────────────────── */}
      <section className="section bg-surface-soft">
        <Container size="full">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <FadeUp>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-lift">
                <img
                  src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=900&q=80&auto=format&fit=crop"
                  alt="Community members working together"
                  className="h-full w-full object-cover"
                />
              </div>
            </FadeUp>

            <FadeUp delay={1}>
              <Badge variant="gold" size="lg" className="mb-5">
                <Heart className="h-3.5 w-3.5" />
                Our Mission
              </Badge>
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink text-balance sm:text-4xl lg:text-5xl">
                Compassion with{" "}
                <span className="text-gradient-gold">zero red tape.</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ink-muted sm:text-lg">
                We believe help should arrive before hope runs out. That's why
                we've stripped away the bureaucracy that keeps families waiting
                — and built a system that moves fast, treats every applicant
                with dignity, and keeps our promises.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  "Applications reviewed within 72 hours",
                  "No fees, no hidden costs, ever",
                  "Direct delivery — no middlemen",
                  "Confidential, encrypted, secure"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                      <ArrowRight className="h-3 w-3" />
                    </span>
                    <span className="text-sm leading-relaxed text-ink sm:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" variant="primary">
                  <Link href="/about" className="gap-2">
                    Learn more about us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/contact">Get in touch</Link>
                </Button>
              </div>
            </FadeUp>
          </div>
        </Container>
      </section>

      {/* ── FAQ PREVIEW ──────────────────────────────────── */}
      <section className="section bg-white">
        <Container size="md">
          <SectionHeading
            eyebrow="Frequently Asked"
            title="Questions, answered."
            description="A few things people ask before applying or donating. See our full FAQ for more."
          />

          <div className="mt-12 space-y-3">
            {faqPreview.map((faq, i) => (
              <FadeUp key={faq.id} delay={i}>
                <details className="group rounded-2xl border border-surface-border bg-white p-5 transition-all open:border-brand-200 open:shadow-card">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <span className="font-display text-base font-semibold text-ink sm:text-lg">
                      {faq.question}
                    </span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-surface-border text-ink-muted transition-transform group-open:rotate-45 group-open:border-brand-300 group-open:text-brand-600">
                      <svg
                        className="h-3.5 w-3.5"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M7 2v10M2 7h10" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
                    {faq.answer}
                  </p>
                </details>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={5} className="mt-10 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/faq" className="gap-2">
                <HelpCircle className="h-4 w-4" />
                See all FAQs
              </Link>
            </Button>
          </FadeUp>
        </Container>
      </section>

      {/* ── QUOTE / IMPACT ───────────────────────────────── */}
      <section className="border-y border-surface-border bg-surface-soft">
        <Container size="md" className="py-16 lg:py-24">
          <FadeUp className="text-center">
            <Quote
              className="mx-auto h-10 w-10 text-brand-200"
              aria-hidden
            />
            <p className="mt-6 font-display text-2xl font-medium leading-snug text-ink text-balance sm:text-3xl lg:text-4xl">
              &ldquo;Breem Foundation didn&apos;t just meet our need — they
              restored our{" "}
              <span className="text-gradient-brand">belief in kindness.</span>
              &rdquo;
            </p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-ink-muted">
              — Sarah M., Dallas, TX
            </p>
          </FadeUp>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <CTABanner />
    </>
  );
}
