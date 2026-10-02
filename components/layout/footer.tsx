import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Heart
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/shared/logo";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/site-config";

const socialIcons = [
  { key: "facebook", label: "Facebook", Icon: Facebook },
  { key: "twitter", label: "Twitter / X", Icon: Twitter },
  { key: "instagram", label: "Instagram", Icon: Instagram },
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
  { key: "youtube", label: "YouTube", Icon: Youtube }
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-surface-border bg-surface-soft">
      <Container size="full" className="py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + mission + contact */}
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-muted">
              {siteConfig.description} Every dollar is stewarded with
              transparency, and every applicant is treated with dignity.
            </p>

            <ul className="mt-7 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-ink-muted transition-colors hover:text-brand-600"
                >
                  {siteConfig.contactEmail}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                <a
                  href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                  className="text-ink-muted transition-colors hover:text-brand-600"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                <span className="text-ink-muted">{siteConfig.address}</span>
              </li>
            </ul>

            {/* Social */}
            <div className="mt-7 flex flex-wrap items-center gap-2">
              {socialIcons.map(({ key, label, Icon }) => (
                <a
                  key={key}
                  href={siteConfig.social[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-surface-border bg-white text-ink-muted transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-600"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <FooterColumn title="Organization" links={[...siteConfig.footer.about]} />
            <FooterColumn title="Get Involved" links={[...siteConfig.footer.help]} />
            <FooterColumn title="Legal" links={[...siteConfig.footer.legal]} />
          </div>
        </div>

        {/* Divider */}
        <Separator className="my-10" />

        {/* Tax ID + copyright */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5 text-xs text-ink-muted">
            <p className="font-medium text-ink">
              Breem Foundation is a registered 501(c)(3) nonprofit organization.
            </p>
            <p>
              EIN / Tax ID:{" "}
              <span className="font-semibold text-ink">{siteConfig.taxId}</span>
            </p>
            <p>
              Donations are tax-deductible to the extent allowed by law.
            </p>
          </div>

          <div className="flex flex-col gap-1 text-xs text-ink-muted md:items-end">
            <p className="inline-flex items-center gap-1.5">
              Made with
              <Heart className="h-3.5 w-3.5 fill-gold-500 text-gold-500" />
              for families in need
            </p>
            <p>© {year} Breem Foundation. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-ink">
        {title}
      </h4>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-ink-muted transition-colors hover:text-brand-600"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
