import type { assistanceTypeValues, genderValues } from "./validators/application";

type AssistanceType = (typeof assistanceTypeValues)[number];
type Gender = (typeof genderValues)[number];

export const assistanceTypeLabels: Record<AssistanceType, string> = {
  FINANCIAL: "Financial Assistance",
  FOOD: "Food Assistance",
  HOUSING: "Housing Assistance",
  MEDICAL: "Medical Assistance",
  EDUCATION: "Education Assistance",
  EMERGENCY: "Emergency Assistance",
  OTHER: "Other"
};

export const assistanceTypeDescriptions: Record<AssistanceType, string> = {
  FINANCIAL: "Rent, bills, or general financial relief",
  FOOD: "Groceries and food security",
  HOUSING: "Rent, mortgage, deposit, or shelter",
  MEDICAL: "Treatment, surgery, prescriptions",
  EDUCATION: "Tuition, books, school supplies",
  EMERGENCY: "Urgent crisis — fire, displacement, etc.",
  OTHER: "Something else not listed"
};

export const genderLabels: Record<Gender, string> = {
  MALE: "Male",
  FEMALE: "Female",
  OTHER: "Other",
  PREFER_NOT_TO_SAY: "Prefer not to say"
};

export const applicationStatusLabels: Record<string, string> = {
  SUBMITTED: "Submitted",
  UNDER_REVIEW: "Under Review",
  MORE_INFO_REQUIRED: "More Information Required",
  APPROVED: "Approved",
  REJECTED: "Rejected"
};

export const applicationStatusBadgeVariant: Record<
  string,
  "default" | "info" | "warning" | "success" | "danger" | "neutral" | "gold"
> = {
  SUBMITTED: "info",
  UNDER_REVIEW: "warning",
  MORE_INFO_REQUIRED: "gold",
  APPROVED: "success",
  REJECTED: "danger"
};
