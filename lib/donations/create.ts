import { prisma } from "@/lib/prisma";
import type { PaymentMethod, DonationFrequency } from "@prisma/client";

export interface CreateDonationInput {
  amount: number;
  currency?: string;
  frequency: string;
  donorName: string;
  donorEmail: string;
  isAnonymous: boolean;
  paymentMethod: string;
  dedication?: string;
  ip?: string;
  userAgent?: string;
}

export interface CreateDonationResult {
  ok: boolean;
  referenceNumber?: string;
  donationId?: string;
  error?: string;
}

export async function createDonation(
  input: CreateDonationInput,
  referenceNumber: string
): Promise<CreateDonationResult> {
  try {
    const donation = await prisma.donation.create({
      data: {
        referenceNumber,
        donorName: input.donorName,
        donorEmail: input.donorEmail,
        isAnonymous: input.isAnonymous,
        amount: input.amount,
        currency: input.currency ?? "USD",
        frequency: input.frequency as DonationFrequency,
        paymentMethod: input.paymentMethod as PaymentMethod,
        dedication: input.dedication?.trim() || null,
        submittedIp: input.ip ?? null,
        submittedUserAgent: input.userAgent ?? null,
        status: "PENDING_PAYMENT"
      }
    });

    return {
      ok: true,
      referenceNumber,
      donationId: donation.id
    };
  } catch (err) {
    console.error("[donations] Persist failed:", err);
    return {
      ok: false,
      error:
        err instanceof Error
          ? err.message
          : "Failed to save donation to database."
    };
  }
}
