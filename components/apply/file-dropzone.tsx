"use client";

import * as React from "react";
import { Upload, X, FileText, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileDropzoneProps {
  id: string;
  label: string;
  description?: string;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSizeMB?: number;
  files: File[];
  onChange: (files: File[]) => void;
  error?: string;
}

export function FileDropzone({
  id,
  label,
  description,
  accept = "application/pdf,image/jpeg,image/png,image/webp",
  multiple = false,
  maxFiles = 1,
  maxSizeMB = 10,
  files,
  onChange,
  error
}: FileDropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = React.useState(false);
  const [localError, setLocalError] = React.useState<string>("");

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    setLocalError("");

    const incomingArr = Array.from(incoming);
    const combined = multiple ? [...files, ...incomingArr] : incomingArr.slice(0, 1);

    if (combined.length > maxFiles) {
      setLocalError(`Maximum ${maxFiles} file${maxFiles > 1 ? "s" : ""} allowed.`);
      return;
    }

    const tooBig = combined.find((f) => f.size > maxSizeMB * 1024 * 1024);
    if (tooBig) {
      setLocalError(`"${tooBig.name}" exceeds ${maxSizeMB}MB.`);
      return;
    }

    onChange(combined);
  };

  const removeFile = (idx: number) => {
    onChange(files.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      {description && (
        <p className="mt-1 text-xs text-ink-muted">{description}</p>
      )}

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          "mt-3 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-surface-soft px-6 py-8 text-center transition-all",
          dragOver
            ? "border-brand-400 bg-brand-50"
            : "border-surface-border hover:border-brand-300 hover:bg-brand-50/50",
          (error || localError) && "border-red-300"
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
          PDF, JPG, PNG, or WebP · Up to {maxSizeMB}MB
          {multiple && ` · Max ${maxFiles} files`}
        </p>
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {(error || localError) && (
        <p className="mt-2 text-xs font-medium text-red-600">
          {localError || error}
        </p>
      )}

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((file, idx) => {
            const isImage = file.type.startsWith("image/");
            const sizeKB = Math.round(file.size / 1024);
            const sizeLabel =
              sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`;

            return (
              <li
                key={`${file.name}-${idx}`}
                className="flex items-center gap-3 rounded-xl border border-surface-border bg-white p-3"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  {isImage ? (
                    <ImageIcon className="h-4 w-4" />
                  ) : (
                    <FileText className="h-4 w-4" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">
                    {file.name}
                  </p>
                  <p className="text-xs text-ink-muted">{sizeLabel}</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(idx);
                  }}
                  aria-label={`Remove ${file.name}`}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
