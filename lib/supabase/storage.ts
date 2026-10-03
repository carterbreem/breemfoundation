import { createAdminClient } from "./admin";

const BUCKET = "applicant-documents";

/**
 * Upload a file to Supabase Storage and return the storage path.
 * Uses the service-role client (server-side only).
 * Path structure: applications/<referenceNumber>/<kind>/<timestamp>-<safeName>
 */
export async function uploadApplicantFile(params: {
  referenceNumber: string;
  file: File;
  kind: "photo" | "supporting" | "additional";
}): Promise<{ path: string } | { error: string }> {
  const { referenceNumber, file, kind } = params;

  try {
    const supabase = createAdminClient();

    // Sanitize filename: keep extension, strip everything risky
    const originalName = file.name || "file";
    const ext = originalName.includes(".")
      ? originalName.split(".").pop()?.toLowerCase() ?? "bin"
      : "bin";
    const safeExt = ext.replace(/[^a-z0-9]/g, "").slice(0, 6) || "bin";
    const timestamp = Date.now();
    const random = Math.random().toString(36).slice(2, 8);
    const fileName = `${timestamp}-${random}.${safeExt}`;
    const path = `applications/${referenceNumber}/${kind}/${fileName}`;

    // Read file as ArrayBuffer (works in Node runtime)
    const arrayBuffer = await file.arrayBuffer();

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, arrayBuffer, {
        contentType: file.type || "application/octet-stream",
        cacheControl: "3600",
        upsert: false
      });

    if (error) {
      console.error("[storage] Upload failed:", error);
      return { error: error.message };
    }

    return { path };
  } catch (err) {
    console.error("[storage] Unexpected error:", err);
    return {
      error: err instanceof Error ? err.message : "Upload failed."
    };
  }
}

/**
 * Generate a signed URL for viewing a private file.
 * Default expiry: 1 hour.
 */
export async function getSignedFileUrl(
  storagePath: string,
  expiresIn = 3600
): Promise<string | null> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(storagePath, expiresIn);
    if (error) {
      console.error("[storage] Signed URL failed:", error);
      return null;
    }
    return data.signedUrl;
  } catch (err) {
    console.error("[storage] Unexpected error:", err);
    return null;
  }
}

/**
 * Delete a file from storage by path.
 */
export async function deleteFile(storagePath: string): Promise<boolean> {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.storage
      .from(BUCKET)
      .remove([storagePath]);
    if (error) {
      console.error("[storage] Delete failed:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[storage] Unexpected error:", err);
    return false;
  }
}
