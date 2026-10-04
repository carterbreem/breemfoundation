import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Mail, ArrowRight, Lock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/shared/motion";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Breem Foundation collects, uses, protects, and shares your personal information. Committed to your privacy and data security.",
  keywords: [
    "Breem Foundation privacy",
    "charity privacy policy",
    "data protection"
  ],
  openGraph: {
    title: "Privacy Policy · Breem Foundation",
    description:
      "Transparency about how we handle your data — because trust is earned.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy · Breem Foundation",
    description: "Transparency about how we handle your data."
  },
  alternates: { canonical: "/privacy" }
};

const LAST_UPDATED = "January 2026";

export default function PrivacyPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-white">
        <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
        <Container size="md" className="relative py-16 text-center lg:py-20">
          <FadeUp>
            <span className="eyebrow mx-auto">
              <ShieldCheck className="h-3.5 w-3.5" />
              Privacy Policy
            </span>
          </FadeUp>
          <FadeUp delay={1}>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink text-balance sm:text-5xl">
              Your privacy is{" "}
              <span className="text-gradient-brand">non-negotiable.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={2}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-muted text-pretty">
              We built Breem Foundation on trust. This policy explains — in
              plain English — what we collect, why, how we protect it, and the
              rights you have over your information.
            </p>
          </FadeUp>
          <FadeUp delay={3}>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
              Last updated: {LAST_UPDATED}
            </p>
          </FadeUp>
        </Container>
      </section>

      <section className="bg-white pb-8">
        <Container size="md">
          <FadeUp>
            <div className="rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6 shadow-card sm:p-8">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white shadow-glow">
                  <Lock className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="font-display text-lg font-semibold text-ink sm:text-xl">
                    The short version
                  </h2>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-muted sm:text-base">
                    <li className="flex gap-2">
                      <span className="text-brand-500">•</span>
                      We only collect what we need to process your application
                      or donation.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand-500">•</span>
                      Your data is encrypted, stored securely, and never sold.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand-500">•</span>
                      Only trained staff and vetted volunteers can access
                      applications.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand-500">•</span>
                      You can request a copy of, correction of, or deletion of
                      your data at any time.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeUp>
        </Container>
      </section>

      <section className="section bg-white pt-8">
        <Container size="md">
          <div className="space-y-10">
            <Section title="1. Who We Are">
              <p>
                Breem Foundation (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
                &ldquo;our&rdquo;) is a registered 501(c)(3) nonprofit
                organization based in the United States. Our registered
                Employer Identification Number (EIN) is{" "}
                <strong>{siteConfig.taxId}</strong>. You can contact us at{" "}
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="font-medium text-brand-600 underline-offset-4 hover:underline"
                >
                  {siteConfig.contactEmail}
                </a>
                .
              </p>
            </Section>

            <Section title="2. Information We Collect">
              <p>We collect the following categories of information:</p>
              <ul>
                <li>
                  <strong>Application data:</strong> Your name, date of birth,
                  gender, email, phone, address, marital status, employment
                  status, type of assistance requested, reason for need, and
                  supporting documents you choose to upload.
                </li>
                <li>
                  <strong>Donation data:</strong> Donor name, email, chosen
                  payment method, donation amount, and any optional dedication
                  message.
                </li>
                <li>
                  <strong>Contact data:</strong> Name, email, subject, and
                  message content when you reach out via our contact form.
                </li>
                <li>
                  <strong>Technical data:</strong> An anonymous visitor ID, country,
                  referrer, and timestamp — used only for aggregate analytics
                  and fraud prevention.
                </li>
              </ul>
            </Section>

            <Section title="3. How We Use Your Information">
              <p>We use your information strictly to:</p>
              <ul>
                <li>Review and respond to your application for assistance.</li>
                <li>Communicate with you about your application status or donation.</li>
                <li>Verify eligibility and prevent fraudulent submissions.</li>
                <li>Send confirmations, receipts, and requested updates.</li>
                <li>Comply with legal and tax obligations.</li>
                <li>Improve our services through aggregated, anonymized analytics.</li>
              </ul>
              <p className="mt-3">
                <strong>We never sell, rent, or trade your personal data.</strong>{" "}
                We don&apos;t run ads.
              </p>
            </Section>

            <Section title="4. Legal Basis for Processing">
              <p>
                If you are located in the European Economic Area (EEA), the
                United Kingdom, or another jurisdiction with similar laws, we
                process your personal data under the following legal bases:
                (a) your consent, (b) performance of a contract, (c) our
                legitimate interest in preventing fraud and maintaining
                secure services, and (d) compliance with legal obligations.
              </p>
            </Section>

            <Section title="5. How We Protect Your Data">
              <p>
                All personal data is encrypted in transit (TLS/HTTPS) and at
                rest. Documents you upload are stored in a private,
                access-controlled storage bucket — never publicly accessible.
                Access is limited to trained staff and volunteers who have
                signed confidentiality agreements.
              </p>
              <p>
                We retain application data for a maximum of 7 years, after
                which it is securely deleted — unless a longer retention
                period is required by law.
              </p>
            </Section>

            <Section title="6. Sharing With Third Parties">
              <p>
                We share data only with service providers who help us operate
                — for example, secure cloud hosting and email delivery — and
                only to the extent necessary. All providers are bound by
                contracts that require them to protect your data.
              </p>
              <p>
                We may disclose information if required by law, court order,
                or to protect the safety of our staff, applicants, or the
                public.
              </p>
            </Section>

            <Section title="7. Your Rights">
              <p>Depending on your location, you may have the right to:</p>
              <ul>
                <li>Access the personal data we hold about you.</li>
                <li>Request correction of inaccurate information.</li>
                <li>Request deletion of your data (subject to legal retention).</li>
                <li>Withdraw consent at any time.</li>
                <li>Object to or restrict certain processing.</li>
                <li>File a complaint with your local data protection authority.</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, email us at{" "}
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="font-medium text-brand-600 underline-offset-4 hover:underline"
                >
                  {siteConfig.contactEmail}
                </a>
                . We respond within 30 days.
              </p>
            </Section>

            <Section title="8. Cookies & Tracking">
              <p>
                We use a single first-party cookie to assign you an anonymous
                visitor ID for basic analytics (how many people visit, which
                countries they&apos;re from). This cookie contains no personal
                data and cannot be used to identify you. You may clear your
                cookies at any time without affecting site functionality.
              </p>
            </Section>

            <Section title="9. Children's Privacy">
              <p>
                Our services are intended for adults 18 and older. If we
                become aware that we have collected personal information from
                a child under 13, we will delete it promptly.
              </p>
            </Section>

            <Section title="10. Changes to This Policy">
              <p>
                We may update this policy from time to time. When we do, we
                will revise the &ldquo;Last updated&rdquo; date at the top of
                this page. Continued use of the site after changes constitutes
                acceptance.
              </p>
            </Section>

            <Section title="11. Contact Us">
              <p>Questions about this policy? We&apos;re here to help.</p>
              <div className="mt-4 flex flex-col gap-3 rounded-xl border border-surface-border bg-surface-soft p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                      Email
                    </p>
                    <p className="break-all text-sm font-medium text-ink">
                      {siteConfig.contactEmail}
                    </p>
                  </div>
                </div>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline"
                >
                  Send email
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </Section>
          </div>

          <div className="mt-16 border-t border-surface-border pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-sm text-ink-muted">
                Also read our{" "}
                <Link
                  href="/terms"
                  className="font-semibold text-brand-600 underline-offset-4 hover:underline"
                >
                  Terms of Service
                </Link>
                .
              </p>
              <Badge variant="neutral" size="md">
                EIN {siteConfig.taxId}
              </Badge>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function Section({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-muted sm:text-base [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_strong]:text-ink">
        {children}
      </div>
    </div>
  );
}
