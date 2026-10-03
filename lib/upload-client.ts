"use client";

export interface UploadResult {
  ok: boolean;
  path?: string;
  error?: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  kind: "photo" | "supporting";
}

export async function uploadFileDirect(params: {
  file: File;
  kind: "photo" | "supporting";
  sessionId: string;
}): Promise<UploadResult> {
  const { file, kind, sessionId } = params;

  try {
    const signRes = await fetch("/api/upload-sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        kind,
        fileName: file.name,
        mimeType: file.type,
        fileSize: file.size
      })
    });

    const signData = await signRes.json().catch(() => ({}));
    if (!signRes.ok || !signData?.signedUrl) {
      return {
        ok: false,
        error: signData?.error ?? "Could not prepare upload.",
        fileName: file.name,
        mimeType: file.type,
        sizeBytes: file.size,
        kind
      };
    }

    const uploadRes = await fetch(signData.signedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type || "application/octet-stream"
      },
      body: file
    });

    if (!uploadRes.ok) {
      const text = await uploadRes.text().catch(() => "");
      console.error("[upload] Supabase PUT failed:", uploadRes.status, text);
      return {
        ok: false,
        error: "Upload failed. Please try again.",
        fileName: file.name,
        mimeType: file.type,
        sizeBytes: file.size,
        kind
      };
    }

    return {
      ok: true,
      path: signData.path,
      fileName: file.name,
      mimeType: file.type,
      sizeBytes: file.size,
      kind
    };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Upload failed.",
      fileName: file.name,
      mimeType: file.type,
      sizeBytes: file.size,
      kind
    };
  }
}

export function makeSessionId(): string {
  const bytes = new Uint8Array(12);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 12; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
