import { Badge } from "@/components/ui/badge";
import {
  applicationStatusLabels,
  applicationStatusBadgeVariant
} from "@/lib/assistance-labels";

const donationStatusLabels: Record<string, string> = {
  PENDING_PAYMENT: "Pending Payment",
  PAYMENT_DETAILS_SENT: "Details Sent",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  REFUNDED: "Refunded"
};

const donationStatusVariants: Record<
  string,
  "default" | "info" | "warning" | "success" | "danger" | "neutral" | "gold"
> = {
  PENDING_PAYMENT: "warning",
  PAYMENT_DETAILS_SENT: "info",
  COMPLETED: "success",
  CANCELLED: "neutral",
  REFUNDED: "danger"
};

export function ApplicationStatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant={applicationStatusBadgeVariant[status] ?? "neutral"}
      size="sm"
    >
      {applicationStatusLabels[status] ?? status}
    </Badge>
  );
}

export function DonationStatusBadge({ status }: { status: string }) {
  return (
    <Badge variant={donationStatusVariants[status] ?? "neutral"} size="sm">
      {donationStatusLabels[status] ?? status}
    </Badge>
  );
}
