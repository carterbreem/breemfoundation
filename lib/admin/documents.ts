import { getSignedFileUrl } from "@/lib/supabase/storage";

export interface DocumentWithUrl {
  id: string;
  kind: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  storagePath: string;
  status: string;
  uploadedAt: Date;
  signedUrl: string | null;
}

/**
 * Enrich a list of document rows with short-lived signed URLs
 * so they can be previewed/downloaded by admins.
 */
export async function enrichDocumentsWithUrls(
  docs: {
    id: string;
    kind: string;
    fileName: string;
    mimeType: string;
    sizeBytes: number;
    storagePath: string;
    status: string;
    uploadedAt: Date;
  }[]
): Promise<DocumentWithUrl[]> {
  return Promise.all(
    docs.map(async (d) => ({
      ...d,
      signedUrl: await getSignedFileUrl(d.storagePath, 3600)
    }))
  );
}
