import { Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

interface Props {
  referenceNumber: string;
}

export function DonateSubmitReference({ referenceNumber }: Props) {
  const subject = `Donation Reference — ${referenceNumber}`;
  const body = `Hello Breem Foundation,

I have just made a donation intent on your website. My reference number is: ${referenceNumber}

Please send me the payment details for my chosen method.

Thank you.`;

  const mailtoHref = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  return (
    <div className="mt-6 border-t border-surface-border pt-6">
      <p className="text-center text-sm font-semibold text-ink">
        Let us know you&apos;ve submitted
      </p>
      <p className="mt-1.5 text-center text-xs leading-relaxed text-ink-muted">
        Tap below to send us your reference number — we&apos;ll reply with
        the payment details for your chosen method, usually within one
        business day. Your email is pre-filled and ready to send.
      </p>

      <a
        href={mailtoHref}
        className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-6 text-sm font-semibold text-white shadow-card transition-all hover:bg-brand-600 hover:shadow-glow active:scale-[0.98]"
      >
        <Mail className="h-4 w-4" />
        Submit Reference Number
      </a>

      <p className="mt-3 text-center text-[11px] leading-relaxed text-ink-muted">
        Prefer to copy it? Use the copy icon above. We&apos;ll also reach out
        automatically if you don&apos;t hear back within 24 hours.
      </p>
    </div>
  );
}
