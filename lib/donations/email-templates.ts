import {
  getPaymentMethod,
  type PaymentMethodKey
} from "@/lib/payment-methods";

/**
 * Builds a pre-filled email to send to a donor with the payment details
 * for their chosen method.
 *
 * The admin clicks "Email Donor" → this generates the mailto: link →
 * the admin's email client opens with everything pre-filled.
 */
export interface DonorEmailParams {
  donorEmail: string;
  donorName: string;
  isAnonymous: boolean;
  referenceNumber: string;
  amount: string;
  frequency: "ONE_TIME" | "MONTHLY";
  paymentMethod: PaymentMethodKey;
  /** Optional admin override of the payment details body. */
  customDetails?: string;
}

export function buildDonorEmail(params: DonorEmailParams): {
  subject: string;
  body: string;
  mailto: string;
} {
  const method = getPaymentMethod(params.paymentMethod);

  const subject = `Your donation to Breem Foundation — Reference ${params.referenceNumber}`;

  const greeting = params.isAnonymous
    ? "Hello,"
    : `Hello ${params.donorName.split(" ")[0] || "friend"},`;

  const frequencyLabel =
    params.frequency === "MONTHLY" ? "monthly" : "one-time";

  const details = params.customDetails?.trim() || method.defaultDetails;

  const body = `${greeting}

Thank you so much for your generosity toward Breem Foundation. Your commitment means real help will reach a family in need.

Here are the payment details to complete your ${frequencyLabel} donation of $${params.amount}:

──────────────
Method: ${method.label}
──────────────

${details}

──────────────
Reference: ${params.referenceNumber}
──────────────

Please use the reference above when sending so we can match your donation to your record.

Once we confirm receipt, we'll email you an official tax-deductible receipt (Breem Foundation is a registered 501(c)(3), EIN 74-2655302).

If you have any questions or need a different payment method, just reply to this email.

With gratitude,
Breem Foundation
breemsfoundation.org@proton.me`;

  const mailto = `mailto:${params.donorEmail}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  return { subject, body, mailto };
}
