"use client";

import { FileDropzone } from "@/components/apply/file-dropzone";
import { FieldError } from "@/components/apply/field-error";
import { ShieldCheck, Info } from "lucide-react";

interface Props {
  applicantPhoto: File | null;
  supportingDocs: File[];
  errors: {
    applicantPhoto?: string;
    supportingDocs?: string;
  };
  onPhotoChange: (files: File[]) => void;
  onDocsChange: (files: File[]) => void;
}

export function Step4Documents({
  applicantPhoto,
  supportingDocs,
  errors,
  onPhotoChange,
  onDocsChange
}: Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 rounded-xl border border-brand-100 bg-brand-50/60 p-4">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
        <div className="text-sm leading-relaxed text-ink">
          <p className="font-semibold">Your privacy is protected.</p>
          <p className="mt-1 text-ink-muted">
            All documents are encrypted, stored privately, and accessible
            only to our trained review team. Files are never made public,
            shared, or sold.
          </p>
        </div>
      </div>

      <div>
        <FileDropzone
          id="applicantPhoto"
          label="One Clear Picture of You *"
          description="A recent, well-lit photo of your face — used only to verify your identity."
          accept="image/jpeg,image/png,image/webp"
          multiple={false}
          maxFiles={1}
          maxSizeMB={10}
          files={applicantPhoto ? [applicantPhoto] : []}
          onChange={onPhotoChange}
          error={errors.applicantPhoto}
        />
      </div>

      <div className="border-t border-surface-border pt-6">
        <FileDropzone
          id="supportingDocs"
          label="Supporting Documents *"
          description="Upload up to 5 documents that verify your situation — e.g., bill, invoice, eviction notice, medical report, ID."
          accept="application/pdf,image/jpeg,image/png,image/webp"
          multiple={true}
          maxFiles={5}
          maxSizeMB={10}
          files={supportingDocs}
          onChange={onDocsChange}
          error={errors.supportingDocs}
        />
      </div>

      <div className="flex items-start gap-3 rounded-xl bg-surface-soft p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
        <p className="text-xs leading-relaxed text-ink-muted">
          By uploading, you confirm these documents are authentic and relate
          to your genuine situation. Fraudulent submissions may result in
          rejection and, in some cases, referral to authorities.
        </p>
      </div>
    </div>
  );
}
