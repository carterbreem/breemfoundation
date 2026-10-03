import { prisma } from "@/lib/prisma";
import { uploadApplicantFile } from "@/lib/supabase/storage";
import type {
  AssistanceType,
  Gender
} from "@prisma/client";

export interface CreateApplicationInput {
  // Personal
  fullName: string;
  dateOfBirth: string; // ISO string
  gender: string;
  email: string;
  phone: string;
  // Location
  country: string;
  state: string;
  city: string;
  homeAddress: string;
  maritalStatus: string;
  employmentStatus: string;
  // Assistance
  assistanceType: string;
  amountRequested?: string;
  needExplanation: string;
  howItWillHelp: string;
  receivedBefore: boolean;
  receivedBeforeNote?: string;
  // Files
  applicantPhoto: File;
  supportingDocs: File[];
  // Meta
  ip?: string;
  userAgent?: string;
}

export interface CreateApplicationResult {
  ok: boolean;
  referenceNumber?: string;
  applicationId?: string;
  error?: string;
  storageWarning?: string;
}

/**
 * Persist an application to the database + upload its files to storage.
 * Gracefully degrades: if storage or DB is unavailable, returns ok=false with a clear error,
 * but the API route will still surface a friendly message.
 */
export async function createApplication(
  input: CreateApplicationInput,
  referenceNumber: string
): Promise<CreateApplicationResult> {
  try {
    // 1. Upload files to storage first (so we have paths to save)
    const uploadedDocs: {
      kind: "APPLICANT_PHOTO" | "SUPPORTING";
      fileName: string;
      mimeType: string;
      sizeBytes: number;
      storagePath: string;
    }[] = [];

    let storageWarning: string | undefined;

    // Photo
    const photoResult = await uploadApplicantFile({
      referenceNumber,
      file: input.applicantPhoto,
      kind: "photo"
    });

    if ("error" in photoResult) {
      storageWarning = `Photo upload failed: ${photoResult.error}`;
      console.warn("[applications]", storageWarning);
    } else {
      uploadedDocs.push({
        kind: "APPLICANT_PHOTO",
        fileName: input.applicantPhoto.name || "photo",
        mimeType: input.applicantPhoto.type || "application/octet-stream",
        sizeBytes: input.applicantPhoto.size,
        storagePath: photoResult.path
      });
    }

    // Supporting docs
    for (const doc of input.supportingDocs) {
      const r = await uploadApplicantFile({
        referenceNumber,
        file: doc,
        kind: "supporting"
      });
      if ("error" in r) {
        storageWarning = `Document upload failed: ${r.error}`;
        console.warn("[applications]", storageWarning);
        continue;
      }
      uploadedDocs.push({
        kind: "SUPPORTING",
        fileName: doc.name || "document",
        mimeType: doc.type || "application/octet-stream",
        sizeBytes: doc.size,
        storagePath: r.path
      });
    }

    // 2. Parse optional amount
    let amountValue: number | null = null;
    if (input.amountRequested && input.amountRequested.trim() !== "") {
      const n = Number(input.amountRequested);
      if (!Number.isNaN(n) && n >= 0) amountValue = n;
    }

    // 3. Create application row + nested documents
    const application = await prisma.application.create({
      data: {
        referenceNumber,
        fullName: input.fullName,
        dateOfBirth: new Date(input.dateOfBirth),
        gender: input.gender as Gender,
        email: input.email,
        phone: input.phone,
        country: input.country,
        state: input.state,
        city: input.city,
        homeAddress: input.homeAddress,
        maritalStatus: input.maritalStatus,
        employmentStatus: input.employmentStatus,
        assistanceType: input.assistanceType as AssistanceType,
        amountRequested: amountValue,
        needExplanation: input.needExplanation,
        howItWillHelp: input.howItWillHelp,
        receivedBefore: input.receivedBefore,
        receivedBeforeNote: input.receivedBeforeNote || null,
        submittedIp: input.ip ?? null,
        submittedUserAgent: input.userAgent ?? null,
        documents: {
          create: uploadedDocs.map((d) => ({
            kind: d.kind,
            fileName: d.fileName,
            mimeType: d.mimeType,
            sizeBytes: d.sizeBytes,
            storagePath: d.storagePath
          }))
        }
      }
    });

    return {
      ok: true,
      referenceNumber,
      applicationId: application.id,
      storageWarning
    };
  } catch (err) {
    console.error("[applications] Persist failed:", err);
    return {
      ok: false,
      error:
        err instanceof Error
          ? err.message
          : "Failed to save application to database."
    };
  }
}
