import { z } from "zod";
import {
  type PaymentMethodKey
} from "@/lib/payment-methods";

export const donationFrequencyValues = ["ONE_TIME", "MONTHLY"] as const;
export const paymentMethodValues: readonly PaymentMethodKey[] = [
  "BANK_TRANSFER",
  "CASH_APP",
  "PAYPAL",
  "ZELLE",
  "VENMO"
] as const;

const presetAmounts = [25, 50, 100, 250, 500];

export const donationSchema = z.object({
  amount: z
    .string()
    .trim()
    .min(1, "Please enter a donation amount")
    .refine(
      (v) => /^\d+(\.\d{1,2})?$/.test(v),
      "Please enter a valid amount (e.g., 50 or 50.00)"
    )
    .refine((v) => Number(v) >= 1, "Minimum donation is $1")
    .refine((v) => Number(v) <= 1_000_000, "Maximum donation is $1,000,000"),

  frequency: z.enum(donationFrequencyValues, {
    errorMap: () => ({ message: "Please choose one-time or monthly" })
  }),

  donorName: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(120, "Name is too long"),

  donorEmail: z
    .string()
    .trim()
    .email("Please enter a valid email address"),

  isAnonymous: z.boolean().default(false),

  paymentMethod: z.enum(paymentMethodValues as [string, ...string[]], {
    errorMap: () => ({ message: "Please choose a payment method" })
  }),

  dedication: z
    .string()
    .trim()
    .max(500, "Dedication must be under 500 characters")
    .optional()
    .or(z.literal(""))
});

export type DonationInput = z.infer<typeof donationSchema>;

export { presetAmounts };
