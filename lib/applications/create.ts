import { prisma } from "@/lib/prisma";
import type { AssistanceType, Gender } from "@prisma/client";

export interface StoredDocument {
  path: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
}

export interface CreateApplicationInput {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  homeAddress: string;
  maritalStatus: string;
  employmentStatus: string;
  assistanceType: string;
  amountRequested?: string;
  needExplanation: string;
  howItWillHelp: string;
  receivedBefore: boolean;
  receivedBeforeNote?: string;
  photoPath: string;
  photoMeta: { fileName: string; mimeType: string; sizeBytes: number };
  docs: StoredDocument[];
  ip?: string;
  userAgent?: string;
}

export interface CreateApplicationResult {
  ok: boolean;
  referenceNumber?: string;
  applicationId?: string;
  error?: string;
}

export async function createApplication(
  input: CreateApplicationInput,
  referenceNumber: string
): Promise<CreateApplicationResult> {
  try {
    let amountValue: number | null = null;
    if (input.amountRequested && input.amountRequested.trim() !== "") {
      const n = Number(input.amountRequested);
      if (!Number.isNaN(n) && n >= 0) amountValue = n;
    }

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
          create: [
            {
              kind: "APPLICANT_PHOTO",
              fileName: input.photoMeta.fileName,
              mimeType: input.photoMeta.mimeType,
              sizeBytes: input.photoMeta.sizeBytes,
              storagePath: input.photoPath
            },
            ...input.docs.map((d) => ({
              kind: "SUPPORTING" as const,
              fileName: d.fileName,
              mimeType: d.mimeType,
              sizeBytes: d.sizeBytes,
              storagePath: d.path
            }))
          ]
        }
      }
    });

    return {
      ok: true,
      referenceNumber,
      applicationId: application.id
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
