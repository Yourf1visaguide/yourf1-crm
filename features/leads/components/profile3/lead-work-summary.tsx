import {
  IconCalendarEvent,
  IconChecklist,
  IconFileCheck,
  IconFiles,
  IconUserCheck,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { LeadProfileViewModel } from "./lead-profile.types";

function SummaryItem({
  label,
  value,
  detail,
  icon,
  tone = "primary",
}: {
  label: string;
  value: string;
  detail: string;
  icon: React.ReactNode;
  tone?: "primary" | "warning" | "success" | "info";
}) {
  const tones = {
    primary: "bg-primary/10 text-primary",
    warning: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    success: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    info: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  };

  return (
    <div className="flex min-w-0 items-start gap-3 rounded-xl border border-border/80 bg-background/70 p-3">
      <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg [&>svg]:size-[18px]", tones[tone])}>
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-0.5 truncate text-sm font-semibold">{value}</p>
        <p className="mt-0.5 text-xs leading-4 text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
}

export function LeadWorkSummary({ profile }: { profile: LeadProfileViewModel }) {
  const { summary, lead } = profile;
  const documentLabel = {
    NOT_ASSESSED: "Not assessed",
    IN_PROGRESS: "In progress",
    READY: "Ready",
  }[summary.documentReadiness ?? "NOT_ASSESSED"];

  return (
    <Card className="gap-3 py-4">
      <CardHeader className="flex flex-row items-center justify-between px-4 sm:px-5">
        <div>
          <CardTitle className="text-sm font-semibold">Work summary</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">A quick view of ownership and outstanding work.</p>
        </div>
        <Badge variant="outline" className="hidden sm:inline-flex">Overview</Badge>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-2 px-4 sm:grid-cols-2 sm:px-5 xl:grid-cols-4">
        <SummaryItem
          label="Lead status"
          value={lead.status.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
          detail="Current lead stage"
          icon={<IconUserCheck aria-hidden="true" />}
        />
        <SummaryItem
          label="Next follow-up"
          value={summary.nextFollowUp || "Not scheduled"}
          detail={summary.nextFollowUp ? "Upcoming follow-up" : "Needs scheduling"}
          icon={<IconCalendarEvent aria-hidden="true" />}
          tone={summary.nextFollowUp ? "success" : "warning"}
        />
        <SummaryItem
          label="Applications"
          value={String(summary.applicationCount)}
          detail={summary.applicationCount === 0 ? "No applications recorded" : "Linked applications"}
          icon={<IconFiles aria-hidden="true" />}
          tone="info"
        />
        <SummaryItem
          label="Documents"
          value={documentLabel}
          detail={`${summary.openTaskCount} open task${summary.openTaskCount === 1 ? "" : "s"}`}
          icon={summary.documentReadiness === "READY" ? <IconFileCheck aria-hidden="true" /> : <IconChecklist aria-hidden="true" />}
          tone={summary.documentReadiness === "READY" ? "success" : "primary"}
        />
      </CardContent>
    </Card>
  );
}
