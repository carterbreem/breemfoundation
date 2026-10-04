import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Target,
  Eye,
  Heart,
  ShieldCheck,
  Users,
  Sparkles,
  TrendingUp,
  HandHeart,
  Scale,
  Lightbulb,
  Compass,
  CheckCircle2
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeUp, Stagger, StaggerItem } from "@/components/shared/motion";
import { CTABanner } from "@/components/marketing/cta-banner";
import { Stats } from "@/components/marketing/stats";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Breem Foundation's mission, vision, and values. A U.S.-registered 501(c)(3) nonprofit helping families facing financial hardship across the world.",
  keywords: [
    "about Breem Foundation",
    "nonprofit mission",
    "charity values",
    "501c3 nonprofit"
  ],
  openGraph: {
    title: "About Breem Foundation",
    description:
      "Compassion in action — our mission, vision, and the values that guide every decision we make.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "About Breem Foundation",
    description: "Compassion in action — our mission, vision, and values."
  },
  alternates: { canonical: "/about" }
};

const values = [
  {
    icon: Heart,
    title: "Dignity First",
    description:
      "Every applicant is a person, not a case number. We listen, we respect, and we never make anyone feel small for asking for help."
  },
  {
    icon: ShieldCheck,
    title: "Radical Transparency",
    description:
      "91 cents of every dollar reaches families. We publish our numbers, our process, and our outcomes — openly and honestly."
  },
  {
    icon: Scale,
    title: "Fairness",
    description:
      "Need — not connections, geography, or background — determines who we help. Every application is reviewed on its own merits."
  },
  {
    icon: Lightbulb,
    title: "Practical Compassion",
    description:
      "We don't just write checks. We solve problems, connect families to resources, and follow through until help arrives."
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Breem Foundation is built by volunteers, donors, and neighbors who believe everyone deserves a safety net."
  },
  {
    icon: TrendingUp,
    title: "Measurable Impact",
    description:
      "We track outcomes, measure response times, and constantly improve. Real help means help that actually works."
  }
];

const whatWeDo = [
  {
    title: "Housing & Rent Assistance",
    description:
      "Emergency rent, mortgage relief, and deposit help to keep families safely housed.",
    icon: "🏠"
  },
  {
    title: "Medical Support",
    description:
      "Covering surgeries, treatments, prescriptions, and hospital bills that would otherwise be out of reach.",
    icon: "⚕️"
  },
  {
    title: "Food Security",
    description:
      "Grocery programs, food vouchers, and connections to local pantries for families in crisis.",
    icon: "🥗"
  },
  {
    title: "Education Grants",
    description:
      "Tuition support, books, and school supplies so students can finish what they started.",
    icon: "🎓"
  },
  {
    title: "Emergency Relief",
    description:
      "Utility shut-offs, fire recovery, displacement, and other sudden crises handled with speed.",
    icon: "🚨"
  },
  {
    title: "Micro-Financial Aid",
    description:
      "Small grants to rebuild livelihoods — sewing machines, tools, licenses, and startup essentials.",
    icon: "💼"
  }
];

const impact = [
  { value: "12,400+", label: "Families helped since 2019" },
  { value: "38", label: "Countries served" },
  { value: "91¢", label: "Of every $1 goes to families" },
  { value: "72hrs", label: "Average response time" }
];

const goals = [
  {
    year: "2026",
    title: "Double our reach",
    description:
      "Serve 25,000 families annually by expanding volunteer teams and partner organizations."
  },
  {
    year: "2027",
    title: "Launch the Breem Family Fund",
    description:
      "A permanent endowment ensuring we can respond to any crisis within 24 hours."
  },
  {
    year: "2028",
    title: "Open 3 regional hubs",
    description:
      "Physical service centers in West Africa, East Africa, and Southeast Asia to reduce turnaround to under 36 hours."
  }
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-white">
        <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
        <div
          className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-brand-100/40 blur-3xl"
          aria-hidden
        />
        <Container size="md" className="relative py-20 text-center lg:py-28">
          <FadeUp>
            <span className="eyebrow mx-auto">
              <Sparkles className="h-3.5 w-3.5" />
              About Breem Foundation
            </span>
          </FadeUp>
          <FadeUp delay={1}>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink text-balance sm:text-5xl lg:text-6xl">
              Compassion in action,{" "}
              <span className="text-gradient-brand">for everyone.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={2}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
              Breem Foundation exists because too many families fall through
              the cracks of traditional systems — waiting weeks for help that
              should have arrived in days. We move faster, because we know
              hope has an expiration date.
            </p>
          </FadeUp>
        </Container>
      </section>

      <section className="section bg-white">
        <Container size="full">
          <div className="grid gap-8 lg:grid-cols-2">
            <FadeUp>
              <div className="h-full rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-8 shadow-card sm:p-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-glow">
                  <Target className="h-6 w-6" />
                </span>
                <h2 className="mt-6 font-display text-2xl font-bold text-ink sm:text-3xl">
                  Our Mission
                </h2>
                <p className="mt-4 text-base leading-relaxed text-ink-muted">
                  To provide fast, dignified, and transparent financial
                  assistance to individuals and families facing hardship —
                  removing barriers, preserving hope, and helping people
                  rebuild with confidence.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Respond within 72 hours, always",
                    "Never charge a fee to apply",
                    "Deliver help directly, with no middlemen"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                      <span className="text-sm text-ink">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

            <FadeUp delay={1}>
              <div className="h-full rounded-3xl border border-gold-200 bg-gradient-to-br from-gold-50 to-white p-8 shadow-card sm:p-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500 text-ink shadow-card">
                  <Eye className="h-6 w-6" />
                </span>
                <h2 className="mt-6 font-display text-2xl font-bold text-ink sm:text-3xl">
                  Our Vision
                </h2>
                <p className="mt-4 text-base leading-relaxed text-ink-muted">
                  A world where financial hardship never has to mean
                  homelessness, untreated illness, or a child dropping out of
                  school — because help arrives before the crisis does.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Every family has access to a safety net",
                    "Crisis response under 24 hours globally",
                    "A permanent fund that outlives all of us"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                      <span className="text-sm text-ink">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>
        </Container>
      </section>

      <section className="section bg-surface-soft">
        <Container size="full">
          <SectionHeading
            eyebrow="Core Values"
            title="Six principles that guide every decision."
            description="These aren't words on a wall. They're the standards we hold ourselves to — publicly, and without exception."
          />

          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <StaggerItem key={value.title}>
                  <div className="h-full rounded-2xl border border-surface-border bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {value.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>

      <section className="section bg-white">
        <Container size="full">
          <SectionHeading
            eyebrow="What We Do"
            title="Six ways we answer the call."
            description="From emergency rent to long-term education, we fund the needs that matter most — fast, and without judgment."
          />

          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whatWeDo.map((item) => (
              <StaggerItem key={item.title}>
                <div className="h-full rounded-2xl border border-surface-border bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold-200 hover:shadow-lift">
                  <span className="text-3xl" aria-hidden>
                    {item.icon}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="section bg-surface-soft">
        <Container size="full">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <FadeUp>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-lift">
                <img
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&q=80&auto=format&fit=crop"
                  alt="Volunteers working together"
                  className="h-full w-full object-cover"
                />
              </div>
            </FadeUp>

            <FadeUp delay={1}>
              <Badge variant="gold" size="lg" className="mb-5">
                <Heart className="h-3.5 w-3.5" />
                Why Breem Foundation
              </Badge>
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink text-balance sm:text-4xl lg:text-5xl">
                Built for the people{" "}
                <span className="text-gradient-brand">
                  other systems miss.
                </span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ink-muted sm:text-lg">
                Traditional assistance programs are slow, complex, and often
                out of reach for the families who need them most. We built
                Breem Foundation to be different — faster, simpler, and
                genuinely human.
              </p>

              <div className="mt-8 space-y-5">
                {[
                  {
                    title: "72-hour average response",
                    body: "We review and respond to most applications within 3 days — not weeks."
                  },
                  {
                    title: "Zero application fees",
                    body: "Asking for help should never cost money. It's free, always."
                  },
                  {
                    title: "Direct delivery",
                    body: "Funds and resources go straight to you — no middlemen skimming the way."
                  },
                  {
                    title: "Worldwide access",
                    body: "We serve families in 38 countries and growing. Anyone, anywhere, can apply."
                  }
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{item.title}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" variant="primary">
                  <Link href="/apply" className="gap-2">
                    Apply for assistance
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/donate" className="gap-2">
                    <HandHeart className="h-4 w-4" />
                    Donate
                  </Link>
                </Button>
              </div>
            </FadeUp>
          </div>
        </Container>
      </section>

      <section className="section bg-white">
        <Container size="full">
          <SectionHeading
            eyebrow="Our Impact"
            title="The numbers behind the mission."
            description="Since 2019, we've turned donations into real, measurable change. Here's where we stand today."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {impact.map((item, i) => (
              <FadeUp key={item.label} delay={i}>
                <div className="rounded-2xl border border-surface-border bg-gradient-to-br from-brand-50/50 to-white p-8 text-center shadow-card">
                  <p className="font-display text-4xl font-bold text-gradient-brand sm:text-5xl">
                    {item.value}
                  </p>
                  <p className="mt-3 text-sm font-medium text-ink-muted">
                    {item.label}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      <Stats />

      <section className="section bg-surface-soft">
        <Container size="full">
          <SectionHeading
            eyebrow="Future Goals"
            title="Where we're headed next."
            description="Big goals, concrete deadlines. Here's the roadmap for the next three years."
          />

          <div className="mt-14 space-y-5">
            {goals.map((goal, i) => (
              <FadeUp key={goal.year} delay={i}>
                <div className="flex flex-col gap-6 rounded-2xl border border-surface-border bg-white p-6 shadow-card sm:flex-row sm:items-center sm:p-8">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-500 font-display text-lg font-bold text-white shadow-glow">
                    {goal.year}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {goal.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted sm:text-base">
                      {goal.description}
                    </p>
                  </div>
                  <Compass
                    className="hidden h-6 w-6 shrink-0 text-brand-300 sm:block"
                    aria-hidden
                  />
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner
        title="Be part of the story."
        description="Whether you need help or want to give it — you're welcome here. Let's build something that lasts."
      />
    </>
  );
}
