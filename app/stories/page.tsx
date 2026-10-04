import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { StoryCard } from "@/components/marketing/story-card";
import { CTABanner } from "@/components/marketing/cta-banner";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeUp, Stagger, StaggerItem } from "@/components/shared/motion";
import { stories } from "@/lib/dummy-data";

export const metadata: Metadata = {
  title: "Success Stories",
  description:
    "Real stories of families and individuals whose lives changed through Breem Foundation. Housing, medical, food, education, and emergency assistance in action.",
  keywords: [
    "Breem Foundation stories",
    "charity success stories",
    "family assistance stories"
  ],
  openGraph: {
    title: "Success Stories · Breem Foundation",
    description: "Real families. Real change. See the impact of your generosity.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Success Stories · Breem Foundation",
    description: "Real families. Real change. See the impact."
  },
  alternates: { canonical: "/stories" }
};

export default function StoriesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-white">
        <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
        <div
          className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-gold-100/40 blur-3xl"
          aria-hidden
        />
        <Container size="md" className="relative py-20 text-center lg:py-24">
          <FadeUp>
            <span className="eyebrow mx-auto">
              <Sparkles className="h-3.5 w-3.5" />
              Success Stories
            </span>
          </FadeUp>
          <FadeUp delay={1}>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink text-balance sm:text-5xl lg:text-6xl">
              Every story starts with{" "}
              <span className="text-gradient-brand">
                someone saying yes.
              </span>
            </h1>
          </FadeUp>
          <FadeUp delay={2}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
              Behind every number is a family, a person, a story. These are
              the lives your generosity has touched — and the reason we keep
              showing up.
            </p>
          </FadeUp>
        </Container>
      </section>

      <section className="border-y border-surface-border bg-surface-soft">
        <Container size="full" className="py-8">
          <div className="grid gap-6 text-center sm:grid-cols-3 sm:divide-x sm:divide-surface-border">
            {[
              { value: "12,400+", label: "Families helped" },
              { value: "38", label: "Countries served" },
              { value: "91¢", label: "Of every $1 to families" }
            ].map((stat) => (
              <div key={stat.label} className="px-4">
                <p className="font-display text-3xl font-bold text-gradient-brand sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-sm font-medium text-ink-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section bg-white">
        <Container size="full">
          <SectionHeading
            eyebrow="Featured Stories"
            title="Lives changed, one story at a time."
            description="Every application represents a moment of courage. Every approval represents a fresh start."
          />

          <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <StaggerItem key={story.id}>
                <StoryCard story={story} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="section bg-surface-soft">
        <Container size="md">
          <FadeUp>
            <div className="rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-8 text-center shadow-card sm:p-12">
              <Badge variant="gold" size="lg" className="mx-auto">
                <Sparkles className="h-3.5 w-3.5" />
                Your Story Matters
              </Badge>
              <h2 className="mt-5 font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl lg:text-4xl">
                Received help from Breem Foundation?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
                We&apos;d be honored to share your journey — with your
                permission, and at whatever level of detail you&apos;re
                comfortable with. Your story might be exactly what another
                family needs to hear today.
              </p>
              <a
                href="mailto:breemsfoundation.org@proton.me?subject=My%20Breem%20Foundation%20Story"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-glow"
              >
                Share your story
              </a>
            </div>
          </FadeUp>
        </Container>
      </section>

      <CTABanner
        title="Your donation writes the next story."
        description="Every gift — one-time or monthly — becomes someone's rent, someone's surgery, someone's graduation."
      />
    </>
  );
}
