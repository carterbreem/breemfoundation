"use client";

import {
  CheckCircle2,
  X,
  AlertCircle,
  Loader2,
  FileText,
  ImageIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

export type UploadedFile = {
  id: string;
  file: File;
  kind: "photo" | "supporting";
  status: "uploading" | "done" | "error";
  storagePath?: string;
  error?: string;
};

export function UploadProgress({
  item,
  onRemove
}: {
  item: UploadedFile;
  onRemove: () => void;
}) {
  const isImage = item.file.type.startsWith("image/");
  const sizeKB = Math.round(item.file.size / 1024);
  const sizeLabel =
    sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`;

  return (
    <li
      className={cn(
        "flex items-center gap-3 rounded-xl border bg-white p-3 transition-colors",
        item.status === "error"
          ? "border-red-300"
          : item.status === "done"
            ? "border-emerald-200"
            : "border-surface-border"
      )}
    >
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
          item.status === "error"
            ? "bg-red-50 text-red-600"
            : item.status === "done"
              ? "bg-emerald-50 text-emerald-600"
              : "bg-brand-50 text-brand-600"
        )}
      >
        {isImage ? (
          <ImageIcon className="h-4 w-4" />
        ) : (
          <FileText className="h-4 w-4" />
        )}
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ink">
          {item.file.name}
        </p>
        <p className="text-xs text-ink-muted">
          {item.status === "uploading" && "Uploading..."}
          {item.status === "done" && `Uploaded · ${sizeLabel}`}
          {item.status === "error" && (item.error ?? "Upload failed")}
        </p>
      </div>

      {item.status === "uploading" && (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin text-brand-500" />
      )}
      {item.status === "done" && (
        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
      )}
      {item.status === "error" && (
        <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
      )}

      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove file"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-red-50 hover:text-red-600"
      >
        <X className="h-4 w-4" />
      </button>
    </li>
  );
}
