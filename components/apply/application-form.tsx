"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Send,
  Loader2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/apply/progress-bar";
import { StepWrapper } from "@/components/apply/step-wrapper";
import { Step1Personal } from "@/components/apply/steps/step-1-personal";
import { Step2Location } from "@/components/apply/steps/step-2-location";
import { Step3Assistance } from "@/components/apply/steps/step-3-assistance";
import {
  Step4Documents,
  type UploadedPaths
} from "@/components/apply/steps/step-4-documents";
import { Step5Consent } from "@/components/apply/steps/step-5-consent";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step5Schema,
  type Step1Data,
  type Step2Data,
  type Step3Data,
  type Step5Data
} from "@/lib/validators/application";

const STEPS = [
  "Personal",
  "Location",
  "Assistance",
  "Documents",
  "Review"
] as const;

interface FormState {
  step1: Partial<Step1Data>;
  step2: Partial<Step2Data>;
  step3: Partial<Step3Data>;
  uploads: UploadedPaths;
  step5: Partial<Step5Data>;
}

const EMPTY_UPLOADS: UploadedPaths = {
  photoPath: null,
  photoMeta: null,
  docs: []
};

export function ApplicationForm() {
  const router = useRouter();
  const [current, setCurrent] = React.useState(1);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const [form, setForm] = React.useState<FormState>({
    step1: {} as Partial<Step1Data>,
    step2: {},
    step3: {
      receivedBefore: false,
      receivedBeforeNote: ""
    } as Partial<Step3Data>,
    uploads: EMPTY_UPLOADS,
    step5: {
      agreeTruth: false,
      agreePrivacy: false
    } as Partial<Step5Data>
  });

  const update1 = <K extends keyof Step1Data>(key: K, value: Step1Data[K]) =>
    setForm((f) => ({ ...f, step1: { ...f.step1, [key]: value } }));

  const update2 = <K extends keyof Step2Data>(key: K, value: Step2Data[K]) =>
    setForm((f) => ({ ...f, step2: { ...f.step2, [key]: value } }));

  const update3 = <K extends keyof Step3Data>(key: K, value: Step3Data[K]) =>
    setForm((f) => ({ ...f, step3: { ...f.step3, [key]: value } }));

  const update5 = <K extends keyof Step5Data>(key: K, value: Step5Data[K]) =>
    setForm((f) => ({ ...f, step5: { ...f.step5, [key]: value } }));

  function validateStep(step: number): boolean {
    setErrors({});
    let result;

    if (step === 1) {
      result = step1Schema.safeParse(form.step1);
    } else if (step === 2) {
      result = step2Schema.safeParse(form.step2);
    } else if (step === 3) {
      result = step3Schema.safeParse(form.step3);
    } else if (step === 4) {
      // Custom validation for step 4
      const newErrors: Record<string, string> = {};
      if (!form.uploads.photoPath) {
        newErrors.applicantPhoto =
          "Please upload a photo of yourself.";
      }
      if (form.uploads.docs.length === 0) {
        newErrors.supportingDocs =
          "Please upload at least one supporting document.";
      }
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return false;
      }
      return true;
    } else if (step === 5) {
      result = step5Schema.safeParse(form.step5);
    } else {
      return true;
    }

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const path = issue.path[0] as string;
        if (!newErrors[path]) newErrors[path] = issue.message;
      }
      setErrors(newErrors);
      return false;
    }
    return true;
  }

  const next = () => {
    if (!validateStep(current)) return;
    setCurrent((c) => Math.min(c + 1, STEPS.length));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setErrors({});
    setCurrent((c) => Math.max(c - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  async function submit() {
    if (!validateStep(1)) {
      setCurrent(1);
      return;
    }
    if (!validateStep(2)) {
      setCurrent(2);
      return;
    }
    if (!validateStep(3)) {
      setCurrent(3);
      return;
    }
    if (!validateStep(4)) {
      setCurrent(4);
      return;
    }
    if (!validateStep(5)) {
      setCurrent(5);
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const payload = {
        ...form.step1,
        ...form.step2,
        ...form.step3,
        ...form.step5,
        photoPath: form.uploads.photoPath,
        photoMeta: form.uploads.photoMeta,
        docs: form.uploads.docs
      };

      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error ?? "Submission failed. Please try again.");
      }

      router.push(
        `/apply/success?ref=${encodeURIComponent(data.referenceNumber)}`
      );
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong."
      );
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-10">
        <ProgressBar steps={[...STEPS]} currentStep={current} />
      </div>

      <div className="rounded-3xl border border-surface-border bg-white p-6 shadow-card sm:p-8 lg:p-10">
        <AnimatePresence mode="wait">
          <StepWrapper stepKey={`step-${current}`}>
            {current === 1 && (
              <>
                <StepHeader
                  title="Let's start with the basics"
                  description="Tell us a little about yourself. All information is kept strictly confidential."
                />
                <Step1Personal
                  data={form.step1}
                  errors={errors}
                  update={update1}
                />
              </>
            )}

            {current === 2 && (
              <>
                <StepHeader
                  title="Where can we reach you?"
                  description="We serve families worldwide. Tell us where you're located."
                />
                <Step2Location
                  data={form.step2}
                  errors={errors}
                  update={update2}
                />
              </>
            )}

            {current === 3 && (
              <>
                <StepHeader
                  title="What do you need help with?"
                  description="There's no wrong answer here. Be honest — we're here to help."
                />
                <Step3Assistance
                  data={form.step3}
                  errors={errors}
                  update={update3}
                />
              </>
            )}

            {current === 4 && (
              <>
                <StepHeader
                  title="Upload your documents"
                  description="These help us verify your situation and process your application faster."
                />
                <Step4Documents
                  uploads={form.uploads}
                  errors={{
                    applicantPhoto: errors.applicantPhoto,
                    supportingDocs: errors.supportingDocs
                  }}
                  onUploadsChange={(uploads) =>
                    setForm((f) => ({ ...f, uploads }))
                  }
                />
              </>
            )}

            {current === 5 && (
              <>
                <StepHeader
                  title="One last step"
                  description="Please confirm the following before submitting your application."
                />
                <Step5Consent
                  agreeTruth={form.step5.agreeTruth ?? false}
                  agreePrivacy={form.step5.agreePrivacy ?? false}
                  errors={{
                    agreeTruth: errors.agreeTruth,
                    agreePrivacy: errors.agreePrivacy
                  }}
                  update={update5}
                />
              </>
            )}
          </StepWrapper>
        </AnimatePresence>

        {submitError && (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{submitError}</p>
          </div>
        )}

        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-surface-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={back}
            disabled={current === 1 || submitting}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          {current < STEPS.length ? (
            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={next}
              className="gap-2"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="gold"
              size="lg"
              onClick={submit}
              disabled={submitting}
              className="gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Application
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-ink-muted">
        Your information is encrypted and confidential. We never share your
        details with third parties.
      </p>
    </div>
  );
}

function StepHeader({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8">
      <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-base">
        {description}
      </p>
    </div>
  );
}
