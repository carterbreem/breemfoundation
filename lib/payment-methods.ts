/**
 * Payment methods accepted by Breem Foundation.
 * Each method has display info + optional details the admin will send to the donor.
 */

export type PaymentMethodKey =
  | "BANK_TRANSFER"
  | "CASH_APP"
  | "PAYPAL"
  | "ZELLE"
  | "VENMO";

export interface PaymentMethodInfo {
  key: PaymentMethodKey;
  label: string;
  description: string;
  icon: string;
  /** Short instruction shown to admin for what to send the donor. */
  adminNote: string;
  /** Optional pre-filled content for the admin's "Email Donor" template. */
  defaultDetails: string;
}

export const paymentMethods: PaymentMethodInfo[] = [
  {
    key: "BANK_TRANSFER",
    label: "Bank Transfer",
    description: "ACH, wire, or domestic transfer from your bank account",
    icon: "🏦",
    adminNote: "Send bank name, account name, routing number, and account number.",
    defaultDetails:
      "Bank Name: [ADD BANK NAME]\nAccount Name: Breem Foundation\nRouting Number (ABA): [ADD ROUTING NUMBER]\nAccount Number: [ADD ACCOUNT NUMBER]\nAccount Type: Checking\n\nPlease use your donation reference number as the memo/reference when sending."
  },
  {
    key: "CASH_APP",
    label: "Cash App",
    description: "Send from the Cash App mobile app",
    icon: "💵",
    adminNote: "Send your Cash App cashtag ($yourtag).",
    defaultDetails:
      "Cash App: $[ADD YOUR CASHTAG]\n\nPlease include your donation reference number in the note when sending."
  },
  {
    key: "PAYPAL",
    label: "PayPal",
    description: "Send via PayPal or PayPal Giving Fund",
    icon: "🅿️",
    adminNote: "Send your PayPal email or PayPal.me link.",
    defaultDetails:
      "PayPal: [ADD PAYPAL EMAIL OR PAYPAL.ME LINK]\n\nPlease include your donation reference number in the note when sending."
  },
  {
    key: "ZELLE",
    label: "Zelle",
    description: "Send directly through your bank's Zelle integration",
    icon: "⚡",
    adminNote: "Send your Zelle email or phone number.",
    defaultDetails:
      "Zelle: [ADD ZELLE EMAIL OR PHONE]\nRegistered Name: Breem Foundation\n\nPlease include your donation reference number in the memo when sending."
  },
  {
    key: "VENMO",
    label: "Venmo",
    description: "Send from the Venmo mobile app",
    icon: "💙",
    adminNote: "Send your Venmo handle (@yourhandle).",
    defaultDetails:
      "Venmo: @[ADD VENMO HANDLE]\n\nPlease include your donation reference number in the note when sending."
  }
];

export function getPaymentMethod(key: PaymentMethodKey): PaymentMethodInfo {
  const found = paymentMethods.find((m) => m.key === key);
  if (!found) {
    return paymentMethods[0];
  }
  return found;
}
