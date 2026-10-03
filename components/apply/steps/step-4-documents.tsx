"use client";

import * as React from "react";
import { Upload, ShieldCheck, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { uploadFileDirect, makeSessionId } from "@/lib/upload-client";
import {
  UploadProgress,
  type UploadedFile
} from "@/components/apply/upload-progress";

export interface UploadedPaths {
  photoPath: string | null;
  photoMeta: { fileName: string; mimeType: string; sizeBytes: number } | null;
  docs: {
    path: string;
    fileName: string;
    mimeType: string;
    sizeBytes: number;
  }[];
}

interface Props {
  uploads: UploadedPaths;
  errors: {
    applicantPhoto?: string;
    supportingDocs?: string;
  };
  onUploadsChange: (uploads: UploadedPaths) => void;
}

const ALLOWED_DOC_MIME = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp"
];
const ALLOWED_PHOTO_MIME = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_MB = 10;
const MAX_FILE_SIZE = MAX_FILE_MB * 1024 * 1024;
const MAX_DOCS = 3;

export function Step4Documents({ uploads, errors, onUploadsChange }: Props) {
  const sessionIdRef = React.useRef<string>("");
  if (!sessionIdRef.current) {
    sessionIdRef.current = makeSessionId();
  }

  const [photoItem, setPhotoItem] = React.useState<UploadedFile | null>(null);
  const [docItems, setDocItems] = React.useState<UploadedFile[]>([]);
  const [localError, setLocalError] = React.useState("");

  const photoInputRef = React.useRef<HTMLInputElement>(null);
  const docsInputRef = React.useRef<HTMLInputElement>(null);

  /* Sync state → parent */
  const sync = (
    photo: UploadedFile | null,
    docs: UploadedFile[]
  ) => {
    const photoPath =
      photo?.status === "done" && photo.storagePath ? photo.storagePath : null;
    const photoMeta =
      photo?.status === "done" && photo.storagePath
        ? {
            fileName: photo.file.name,
            mimeType: photo.file.type,
            sizeBytes: photo.file.size
          }
        : null;

    const docPaths = docs
      .filter((d) => d.status === "done" && d.storagePath)
      .map((d) => ({
        path: d.storagePath!,
        fileName: d.file.name,
        mimeType: d.file.type,
        sizeBytes: d.file.size
      }));

    onUploadsChange({
      photoPath,
      photoMeta,
      docs: docPaths
    });
  };

  /* ── Photo ───────────────────────────────────────── */
  async function handlePhoto(file: File | null) {
    if (!file) return;
    setLocalError("");

    if (!ALLOWED_PHOTO_MIME.includes(file.type)) {
      setLocalError("Photo must be JPG, PNG, or WebP.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setLocalError(`Photo must be under ${MAX_FILE_MB}MB.`);
      return;
    }

    const item: UploadedFile = {
      id: `photo-${Date.now()}`,
      file,
      kind: "photo",
      status: "uploading"
    };
    setPhotoItem(item);

    const res = await uploadFileDirect({
      file,
      kind: "photo",
      sessionId: sessionIdRef.current
    });

    const next = res.ok
      ? { ...item, status: "done" as const, storagePath: res.path }
      : { ...item, status: "error" as const, error: res.error };

    setPhotoItem(next);
    sync(next, docItems);
  }

  /* ── Docs ────────────────────────────────────────── */
  async function handleDocs(files: FileList | null) {
    if (!files || files.length === 0) return;
    setLocalError("");

    const incoming = Array.from(files);
    if (docItems.length + incoming.length > MAX_DOCS) {
      setLocalError(`Maximum ${MAX_DOCS} supporting documents allowed.`);
      return;
    }

    const valid: UploadedFile[] = [];
    for (const file of incoming) {
      if (!ALLOWED_DOC_MIME.includes(file.type)) {
        setLocalError(`"${file.name}" must be PDF, JPG, PNG, or WebP.`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        setLocalError(`"${file.name}" exceeds ${MAX_FILE_MB}MB.`);
        continue;
      }
      valid.push({
        id: `${Date.now()}-${file.name}`,
        file,
        kind: "supporting",
        status: "uploading"
      });
    }

    if (valid.length === 0) return;

    const withPending = [...docItems, ...valid];
    setDocItems(withPending);
    sync(photoItem, withPending);

    const results = await Promise.all(
      valid.map((item) =>
        uploadFileDirect({
          file: item.file,
          kind: "supporting",
          sessionId: sessionIdRef.current
        })
      )
    );

    const finalItems = [
      ...docItems,
      ...valid.map((item, idx) => {
        const r = results[idx];
        return r.ok
          ? { ...item, status: "done" as const, storagePath: r.path }
          : { ...item, status: "error" as const, error: r.error };
      })
    ];

    setDocItems(finalItems);
    sync(photoItem, finalItems);
  }

  function removePhoto() {
    setPhotoItem(null);
    sync(null, docItems);
  }

  function removeDoc(id: string) {
    const filtered = docItems.filter((d) => d.id !== id);
    setDocItems(filtered);
    sync(photoItem, filtered);
  }

  const uploading =
    photoItem?.status === "uploading" ||
    docItems.some((d) => d.status === "uploading");

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 rounded-xl border border-brand-100 bg-brand-50/60 p-4">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
        <div className="text-sm leading-relaxed text-ink">
          <p className="font-semibold">Your privacy is protected.</p>
          <p className="mt-1 text-ink-muted">
            All documents are uploaded directly to our secure storage,
            encrypted, and accessible only to our trained review team.
          </p>
        </div>
      </div>

      {/* Photo */}
      <div>
        <label className="block text-sm font-medium text-ink">
          One Clear Picture of You <span className="text-red-500">*</span>
        </label>
        <p className="mt-1 text-xs text-ink-muted">
          A recent, well-lit photo of your face — used only to verify your
          identity. Up to {MAX_FILE_MB}MB.
        </p>

        {!photoItem && (
          <>
            <div
              role="button"
              tabIndex={0}
              onClick={() => photoInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  photoInputRef.current?.click();
                }
              }}
              className={cn(
                "mt-3 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-surface-soft px-6 py-8 text-center transition-all",
                "border-surface-border hover:border-brand-300 hover:bg-brand-50/50",
                errors.applicantPhoto && "border-red-300"
              )}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-600 shadow-card">
                <Upload className="h-5 w-5" />
              </span>
              <p className="mt-3 text-sm font-medium text-ink">
                Click to upload{" "}
                <span className="text-ink-muted">or drag and drop</span>
              </p>
              <p className="mt-1 text-xs text-ink-muted">
                JPG, PNG, or WebP · Up to {MAX_FILE_MB}MB
              </p>
            </div>
            <input
              ref={photoInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={(e) => handlePhoto(e.target.files?.[0] ?? null)}
            />
          </>
        )}

        {photoItem && (
          <ul className="mt-3">
            <UploadProgress item={photoItem} onRemove={removePhoto} />
          </ul>
        )}

        {(errors.applicantPhoto || localError) && !photoItem && (
          <p className="mt-2 text-xs font-medium text-red-600">
            {localError || errors.applicantPhoto}
          </p>
        )}
      </div>

      {/* Docs */}
      <div className="border-t border-surface-border pt-6">
        <label className="block text-sm font-medium text-ink">
          Supporting Documents <span className="text-red-500">*</span>
        </label>
        <p className="mt-1 text-xs text-ink-muted">
          Up to {MAX_DOCS} documents that verify your situation — bill,
          invoice, eviction notice, medical report, ID. Each up to{" "}
          {MAX_FILE_MB}MB.
        </p>

        {docItems.length < MAX_DOCS && (
          <>
            <div
              role="button"
              tabIndex={0}
              onClick={() => docsInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  docsInputRef.current?.click();
                }
              }}
              className={cn(
                "mt-3 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-surface-soft px-6 py-8 text-center transition-all",
                "border-surface-border hover:border-brand-300 hover:bg-brand-50/50",
                errors.supportingDocs &&
                  docItems.length === 0 &&
                  "border-red-300"
              )}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-600 shadow-card">
                <Upload className="h-5 w-5" />
              </span>
              <p className="mt-3 text-sm font-medium text-ink">
                Add documents{" "}
                <span className="text-ink-muted">
                  ({docItems.length}/{MAX_DOCS})
                </span>
              </p>
              <p className="mt-1 text-xs text-ink-muted">
                PDF, JPG, PNG, or WebP · Up to {MAX_FILE_MB}MB each
              </p>
            </div>
            <input
              ref={docsInputRef}
              type="file"
              accept="application/pdf,image/jpeg,image/png,image/webp"
              multiple
              className="sr-only"
              onChange={(e) => handleDocs(e.target.files)}
            />
          </>
        )}

        {docItems.length > 0 && (
          <ul className="mt-3 space-y-2">
            {docItems.map((doc) => (
              <UploadProgress
                key={doc.id}
                item={doc}
                onRemove={() => removeDoc(doc.id)}
              />
            ))}
          </ul>
        )}

        {errors.supportingDocs && docItems.length === 0 && (
          <p className="mt-2 text-xs font-medium text-red-600">
            {errors.supportingDocs}
          </p>
        )}
        {localError && docItems.length > 0 && (
          <p className="mt-2 text-xs font-medium text-red-600">{localError}</p>
        )}
      </div>

      {uploading && (
        <div className="flex items-start gap-2 rounded-xl border border-brand-100 bg-brand-50/60 p-3 text-xs text-brand-900">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <p>Please wait for all files to finish uploading before continuing.</p>
        </div>
      )}

      <div className="flex items-start gap-3 rounded-xl bg-surface-soft p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
        <p className="text-xs leading-relaxed text-ink-muted">
          By uploading, you confirm these documents are authentic and relate
          to your genuine situation.
        </p>
      </div>
    </div>
  );
}
