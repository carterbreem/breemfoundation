import { z } from "zod";

/* ── Enums matching Prisma schema ──────────────────────── */

export const genderValues = [
  "MALE",
  "FEMALE",
  "OTHER",
  "PREFER_NOT_TO_SAY"
] as const;

export const assistanceTypeValues = [
  "FINANCIAL",
  "FOOD",
  "HOUSING",
  "MEDICAL",
  "EDUCATION",
  "EMERGENCY",
  "OTHER"
] as const;

export const maritalStatusValues = [
  "Single",
  "Married",
  "Divorced",
  "Widowed",
  "Separated",
  "Prefer not to say"
] as const;

export const employmentStatusValues = [
  "Employed full-time",
  "Employed part-time",
  "Self-employed",
  "Unemployed",
  "Retired",
  "Student",
  "Unable to work",
  "Prefer not to say"
] as const;

/* ── Step 1: Personal ──────────────────────────────────── */

export const step1Schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(120, "Full name is too long"),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((v) => {
      const d = new Date(v);
      if (Number.isNaN(d.getTime())) return false;
      const age = (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
      return age >= 0 && age < 120;
    }, "Please enter a valid date of birth"),
  gender: z.enum(genderValues, {
    errorMap: () => ({ message: "Please select a gender" })
  }),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(6, "Please enter a valid phone number")
    .max(30, "Phone number is too long")
});

/* ── Step 2: Location ──────────────────────────────────── */

export const step2Schema = z.object({
  country: z.string().min(1, "Please select a country"),
  state: z.string().min(1, "State / Province is required").max(100),
  city: z.string().min(1, "City is required").max(100),
  homeAddress: z
    .string()
    .trim()
    .min(5, "Please enter your home address")
    .max(400, "Address is too long"),
  maritalStatus: z.enum(maritalStatusValues, {
    errorMap: () => ({ message: "Please select a marital status" })
  }),
  employmentStatus: z.enum(employmentStatusValues, {
    errorMap: () => ({ message: "Please select an employment status" })
  })
});

/* ── Step 3: Assistance ────────────────────────────────── */

export const step3Schema = z.object({
  assistanceType: z.enum(assistanceTypeValues, {
    errorMap: () => ({ message: "Please select a type of assistance" })
  }),
  amountRequested: z
    .string()
    .optional()
    .refine(
      (v) => !v || /^\d+(\.\d{1,2})?$/.test(v),
      "Please enter a valid amount (e.g., 500 or 500.00)"
    ),
  needExplanation: z
    .string()
    .trim()
    .min(30, "Please describe your need in at least 30 characters")
    .max(4000, "Please keep this under 4000 characters"),
  howItWillHelp: z
    .string()
    .trim()
    .min(20, "Please describe how assistance will help in at least 20 characters")
    .max(4000, "Please keep this under 4000 characters"),
  receivedBefore: z.boolean(),
  receivedBeforeNote: z
    .string()
    .trim()
    .max(1000, "Please keep this under 1000 characters")
    .optional()
    .or(z.literal(""))
});

/* ── Step 4: Documents ─────────────────────────────────── */

export const step4Schema = z.object({
  applicantPhoto: z
    .custom<File>((v) => v instanceof File, "Applicant photo is required")
    .refine(
      (f) => f.size <= 10 * 1024 * 1024,
      "Photo must be under 10MB"
    )
    .refine(
      (f) => ["image/jpeg", "image/png", "image/webp"].includes(f.type),
      "Photo must be JPG, PNG, or WebP"
    ),
  supportingDocs: z
    .array(
      z
        .custom<File>((v) => v instanceof File)
        .refine(
          (f) => f.size <= 10 * 1024 * 1024,
          "Each file must be under 10MB"
        )
        .refine(
          (f) =>
            [
              "application/pdf",
              "image/jpeg",
              "image/png",
              "image/webp"
            ].includes(f.type),
          "Files must be PDF, JPG, PNG, or WebP"
        )
    )
    .min(1, "Please upload at least one supporting document")
    .max(5, "Maximum 5 supporting documents")
});

/* ── Step 5: Consent ───────────────────────────────────── */

export const step5Schema = z.object({
  agreeTruth: z
    .boolean()
    .refine((v) => v === true, "You must confirm the information is true"),
  agreePrivacy: z
    .boolean()
    .refine((v) => v === true, "You must agree to the Privacy Policy")
});

/* ── Full schema (used for final validation) ───────────── */

export const fullApplicationSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step5Schema);

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type Step4Data = z.infer<typeof step4Schema>;
export type Step5Data = z.infer<typeof step5Schema>;
export type FullApplicationData = z.infer<typeof fullApplicationSchema>;
