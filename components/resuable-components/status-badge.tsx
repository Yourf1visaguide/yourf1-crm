import {
  CircleAlert,
  CircleCheck,
  CircleMinus,
  CircleX,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: string | null | undefined;
  className?: string;
};

type StatusConfig = {
  label: string;
  icon: LucideIcon;
  className: string;
};

const statusConfig: Record<string, StatusConfig> = {
  ACTIVE: {
    label: "Active",
    icon: CircleCheck,
    className:
      "border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },

  INACTIVE: {
    label: "Inactive",
    icon: CircleX,
    className:
      "border-rose-500/25 bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },

  TERMINATED: {
    label: "Terminated",
    icon: CircleMinus,
    className:
      "border-border bg-muted/70 text-muted-foreground",
  },

  SUSPENDED: {
    label: "Suspended",
    icon: CircleAlert,
    className:
      "border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
};

const fallbackStatus: StatusConfig = {
  label: "Unknown",
  icon: CircleAlert,
  className:
    "border-border bg-muted/70 text-muted-foreground",
};

export function StatusBadge({
  status,
  className,
}: StatusBadgeProps) {
  const normalizedStatus = status?.trim().toUpperCase();

  const config: StatusConfig =
    (normalizedStatus
      ? statusConfig[normalizedStatus]
      : undefined) ?? fallbackStatus;

  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium",
        config.className,
        className,
      )}
    >
      <Icon
        className="size-3.5"
        strokeWidth={2}
      />

      <span>{config.label}</span>
    </Badge>
  );
}