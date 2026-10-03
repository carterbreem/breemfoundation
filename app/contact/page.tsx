import type { Metadata } from "next";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Clock,
  MessageSquare,
  Sparkles
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { FadeUp } from "@/components/shared/motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactForm } from "@/components/marketing/contact-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Breem Foundation. Email, phone, or send us a message — we respond within one business day.",
  openGraph: {
    title: "Contact Breem Foundation",
    description:
      "Questions, partnerships, press, or applications — we'd love to hear from you."
  }
};

const socialIcons = [
  { key: "facebook", label: "Facebook", Icon: Facebook },
  { key: "twitter", label: "Twitter / X", Icon: Twitter },
  { key: "instagram", label: "Instagram", Icon: Instagram },
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
  { key: "youtube", label: "YouTube", Icon: Youtube }
] as const;

export default function ContactPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-white">
        <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
        <div
          className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-brand-100/40 blur-3xl"
          aria-hidden
        />
        <Container size="md" className="relative py-20 text-center lg:py-24">
          <FadeUp>
            <span className="eyebrow mx-auto">
              <Sparkles className="h-3.5 w-3.5" />
              Get In Touch
            </span>
          </FadeUp>
          <FadeUp delay={1}>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink text-balance sm:text-5xl lg:text-6xl">
              We&apos;d love to{" "}
              <span className="text-gradient-brand">hear from you.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={2}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
              Questions about applying, donating, partnering, or volunteering?
              Send us a message — a real human reads every single one.
            </p>
          </FadeUp>
        </Container>
      </section>

      {/* ── CONTACT GRID ─────────────────────────────────── */}
      <section className="section bg-white">
        <Container size="full">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
            {/* Left: contact details */}
            <div className="lg:col-span-2">
              <FadeUp>
                <SectionHeading
                  align="left"
                  eyebrow="Contact Details"
                  title="Reach us directly."
                  description="Prefer to skip the form? Here's how to find us."
                />
              </FadeUp>

              <div className="mt-10 space-y-6">
                <FadeUp delay={1}>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="group flex items-start gap-4 rounded-2xl border border-surface-border bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-all group-hover:bg-brand-500 group-hover:text-white">
                      <Mail className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                        Email
                      </p>
                      <p className="mt-1 break-all text-sm font-medium text-ink sm:text-base">
                        {siteConfig.contactEmail}
                      </p>
                    </div>
                  </a>
                </FadeUp>

                <FadeUp delay={2}>
                  <a
                    href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                    className="group flex items-start gap-4 rounded-2xl border border-surface-border bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-all group-hover:bg-brand-500 group-hover:text-white">
                      <Phone className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                        Phone
                      </p>
                      <p className="mt-1 text-sm font-medium text-ink sm:text-base">
                        {siteConfig.phone}
                      </p>
                    </div>
                  </a>
                </FadeUp>

                <FadeUp delay={3}>
                  <div className="flex items-start gap-4 rounded-2xl border border-surface-border bg-white p-5 shadow-card">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                        Location
                      </p>
                      <p className="mt-1 text-sm font-medium text-ink sm:text-base">
                        {siteConfig.address}
                      </p>
                    </div>
                  </div>
                </FadeUp>

                <FadeUp delay={4}>
                  <div className="flex items-start gap-4 rounded-2xl border border-surface-border bg-white p-5 shadow-card">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-600">
                      <Clock className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                        Response Time
                      </p>
                      <p className="mt-1 text-sm font-medium text-ink sm:text-base">
                        Within 1 business day
                      </p>
                    </div>
                  </div>
                </FadeUp>
              </div>

              {/* Social */}
              <FadeUp delay={5}>
                <div className="mt-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    Follow Us
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {socialIcons.map(({ key, label, Icon }) => (
                      <a
                        key={key}
                        href={siteConfig.social[key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-white text-ink-muted transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-600"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3">
              <FadeUp delay={1}>
                <div className="rounded-3xl border border-surface-border bg-white p-6 shadow-card sm:p-8 lg:p-10">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500 text-white shadow-glow">
                      <MessageSquare className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                        Send us a message
                      </h2>
                      <p className="text-sm text-ink-muted">
                        All fields marked with * are required.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <ContactForm />
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
