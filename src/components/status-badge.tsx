import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const tone: Record<string, string> = {
  ACTIVE: "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  SUCCESS: "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  VERIFIED: "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  PENDING: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  INITIATED: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  CREATED: "border-primary/25 bg-primary/10 text-primary",
  PAUSED: "border-border bg-muted text-muted-foreground",
  EXPIRED: "border-border bg-muted text-muted-foreground",
  REJECTED: "border-destructive/25 bg-destructive/10 text-destructive",
  FAILED: "border-destructive/25 bg-destructive/10 text-destructive",
  REFUNDED: "border-sky-500/25 bg-sky-500/10 text-sky-700 dark:text-sky-400",
};

const label: Record<string, string> = {
  PENDING: "Pending",
  ACTIVE: "Active",
  CREATED: "Created",
  EXPIRED: "Expired",
  PAUSED: "Paused",
  REJECTED: "Rejected",
  SUCCESS: "Success",
  FAILED: "Failed",
  REFUNDED: "Refunded",
  INITIATED: "Initiated",
  VERIFIED: "Verified",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <Badge
      variant="outline"
      className={cn("rounded-full px-2 py-0.5 text-xs font-medium", tone[status] ?? "", className)}
    >
      {label[status] ?? status}
    </Badge>
  );
}
