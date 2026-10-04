/**
 * Generate human-readable reference numbers.
 * - Applications: BF-2026-AB12CD
 * - Donations:    DN-2026-AB12CD
 *
 * Uses an alphabet that excludes easily confused characters
 * (I, O, 0, 1, etc.)
 */

const SAFE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateReferenceNumber(prefix = "BF"): string {
  const year = new Date().getFullYear();
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += SAFE_ALPHABET[Math.floor(Math.random() * SAFE_ALPHABET.length)];
  }
  return `${prefix}-${year}-${code}`;
}

export function generateApplicationReference(): string {
  return generateReferenceNumber("BF");
}

export function generateDonationReference(): string {
  return generateReferenceNumber("DN");
}

export function isReferenceNumber(value: string): boolean {
  return /^(BF|DN)-\d{4}-[A-HJ-NP-Z2-9]{6}$/.test(value);
}
