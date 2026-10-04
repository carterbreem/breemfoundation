import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Mail, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/shared/motion";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms and conditions that govern your use of Breem Foundation's website, application process, and donation services.",
  keywords: [
    "Breem Foundation terms",
    "charity terms of service",
    "user agreement"
  ],
  openGraph: {
    title: "Terms of Service · Breem Foundation",
    description: "Clear, plain-English terms for using our services.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service · Breem Foundation",
    description: "Clear, plain-English terms for using our services."
  },
  alternates: { canonical: "/terms" }
};

const LAST_UPDATED = "January 2026";

export default function TermsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-white">
        <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
        <Container size="md" className="relative py-16 text-center lg:py-20">
          <FadeUp>
            <span className="eyebrow mx-auto">
              <FileText className="h-3.5 w-3.5" />
              Terms of Service
            </span>
          </FadeUp>
          <FadeUp delay={1}>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink text-balance sm:text-5xl">
              The ground rules,{" "}
              <span className="text-gradient-brand">in plain English.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={2}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-muted text-pretty">
              These terms explain the agreement between you and Breem
              Foundation when you use our website, apply for assistance, or
              make a donation.
            </p>
          </FadeUp>
          <FadeUp delay={3}>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
              Last updated: {LAST_UPDATED}
            </p>
          </FadeUp>
        </Container>
      </section>

      <section className="section bg-white">
        <Container size="md">
          <div className="space-y-10">
            <Section title="1. Acceptance of Terms">
              <p>
                By accessing or using the Breem Foundation website
                (&ldquo;Site&rdquo;), submitting an application, or making a
                donation, you agree to be bound by these Terms of Service. If
                you do not agree, please do not use the Site.
              </p>
            </Section>

            <Section title="2. About Breem Foundation">
              <p>
                Breem Foundation is a registered 501(c)(3) nonprofit
                organization in the United States (EIN{" "}
                <strong>{siteConfig.taxId}</strong>). Our mission is to
                provide timely, dignified financial assistance to individuals
                and families facing hardship. We are not a bank, lender, or
                financial advisor.
              </p>
            </Section>

            <Section title="3. Eligibility to Apply for Assistance">
              <p>
                Anyone aged 18 or older, anywhere in the world, may apply for
                assistance. By submitting an application, you confirm that:
              </p>
              <ul>
                <li>
                  You are 18 years or older, or a legal guardian is applying
                  on behalf of a minor.
                </li>
                <li>
                  The information you provide is truthful, accurate, and
                  complete to the best of your knowledge.
                </li>
                <li>
                  Any documents you upload are authentic and relate to your
                  genuine situation.
                </li>
                <li>
                  You understand that submitting an application does not
                  guarantee approval.
                </li>
              </ul>
            </Section>

            <Section title="4. Application Review & Decisions">
              <p>
                Every application is reviewed on its own merits by trained
                staff. We aim to respond within 72 hours but do not guarantee
                a specific timeframe. All decisions are made at Breem
                Foundation&apos;s sole discretion. We do not discriminate on
                the basis of race, religion, gender, nationality, disability,
                or any other protected characteristic.
              </p>
            </Section>

            <Section title="5. Prohibited Conduct">
              <p>You agree not to:</p>
              <ul>
                <li>Submit false, misleading, or fraudulent information.</li>
                <li>Impersonate another person.</li>
                <li>Submit multiple applications to circumvent review.</li>
                <li>Use automated tools, bots, or scripts to interact with the Site.</li>
                <li>Attempt to access other users&apos; data or our internal systems.</li>
                <li>Upload malicious files or content that infringes third-party rights.</li>
                <li>Use the Site for any unlawful purpose.</li>
              </ul>
              <p className="mt-3">
                Violation may result in immediate termination of access,
                rejection of your application, and — where appropriate —
                referral to law enforcement.
              </p>
            </Section>

            <Section title="6. Donations">
              <p>
                Donations made through the Site support Breem Foundation&apos;s
                charitable programs. By donating, you confirm:
              </p>
              <ul>
                <li>You are legally permitted to make the donation.</li>
                <li>
                  You understand donations are voluntary and non-refundable
                  except in cases of documented error or fraud.
                </li>
                <li>
                  You understand that Breem Foundation is a U.S. 501(c)(3)
                  nonprofit and, subject to applicable law, your donation may
                  be tax-deductible.
                </li>
                <li>You consent to receive an email confirmation.</li>
              </ul>
            </Section>

            <Section title="7. Payment Methods">
              <p>
                Donations may be made via bank transfer, Cash App, PayPal,
                Zelle, or Venmo. After you submit a donation intent, our team
                will email you the exact payment details for your chosen
                method. Donations are confirmed once receipt has been
                verified.
              </p>
            </Section>

            <Section title="8. Intellectual Property">
              <p>
                All content on the Site — text, graphics, logos, images, and
                code — is the property of Breem Foundation or its licensors.
                You may not copy, reproduce, or create derivative works
                without our prior written consent, except for personal,
                non-commercial use.
              </p>
            </Section>

            <Section title="9. Third-Party Links">
              <p>
                The Site may contain links to third-party websites. We are not
                responsible for the content, privacy practices, or terms of
                those sites. Your use of them is at your own risk.
              </p>
            </Section>

            <Section title="10. Disclaimer of Warranties">
              <p>
                The Site and its content are provided &ldquo;as is&rdquo; and
                &ldquo;as available.&rdquo; To the fullest extent permitted by
                law, Breem Foundation disclaims all warranties, express or
                implied.
              </p>
            </Section>

            <Section title="11. Limitation of Liability">
              <p>
                To the fullest extent permitted by law, Breem Foundation and
                its directors, officers, employees, and volunteers shall not
                be liable for any indirect, incidental, special, consequential,
                or punitive damages arising from your use of the Site. Our
                total liability shall not exceed one hundred U.S. dollars
                (US$100).
              </p>
            </Section>

            <Section title="12. Indemnification">
              <p>
                You agree to indemnify, defend, and hold harmless Breem
                Foundation and its affiliates from any claims arising from
                your violation of these Terms, your misuse of the Site, or
                your violation of any third party&apos;s rights.
              </p>
            </Section>

            <Section title="13. Termination">
              <p>
                We reserve the right to suspend or terminate your access to
                the Site at any time, without notice, if we believe you have
                violated these Terms.
              </p>
            </Section>

            <Section title="14. Governing Law">
              <p>
                These Terms are governed by the laws of the United States and
                the State of Delaware, without regard to conflict-of-law
                principles. Any dispute shall be resolved exclusively in the
                state or federal courts located in Delaware.
              </p>
            </Section>

            <Section title="15. Changes to Terms">
              <p>
                We may update these Terms from time to time. When we do, we
                will revise the &ldquo;Last updated&rdquo; date at the top of
                this page. Continued use of the Site after changes
                constitutes acceptance.
              </p>
            </Section>

            <Section title="16. Contact">
              <p>Questions about these Terms? Reach out:</p>
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
                  href="/privacy"
                  className="font-semibold text-brand-600 underline-offset-4 hover:underline"
                >
                  Privacy Policy
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
