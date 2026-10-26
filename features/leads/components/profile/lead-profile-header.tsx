import {
  CalendarDays,
  Check,
  ChevronRight,
  ClipboardList,
  Mail,
  MapPin,
  MoreHorizontal,
  PencilLine,
  Phone,
  UserRound,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import type { LeadProfileViewModel } from "./lead-profile.types";

const statusLabels: Record<LeadProfileViewModel["status"], string> = {
  NEW: "New",
  NOT_PICKED: "Not picked",
  JUST_INFO: "Information only",
  NOT_INTERESTED: "Not interested",
  CONVERTED: "Converted",
};

const statusVariants: Record<LeadProfileViewModel["status"], "info" | "outline" | "warning" | "neutral" | "success"> = {
  NEW: "info",
  NOT_PICKED: "outline",
  JUST_INFO: "warning",
  NOT_INTERESTED: "neutral",
  CONVERTED: "success",
};

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

type LeadProfileHeaderProps = {
  profile: LeadProfileViewModel;
};

export function LeadProfileHeader({ profile }: LeadProfileHeaderProps) {
  return (
    <div className="space-y-3">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
        <span>Leads</span>
        <ChevronRight className="size-3.5" aria-hidden="true" />
        <span className="font-medium text-foreground">{profile.leadCode}</span>
      </nav>

      <Card className="gap-0 overflow-hidden py-0">
        <div className="h-1 bg-primary" aria-hidden="true" />
        <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,1fr)] xl:items-center">
          <div className="flex min-w-0 items-start gap-3 sm:gap-4">
            <Avatar className="size-12 border border-primary/15 bg-primary/10 text-primary sm:size-16">
              <AvatarFallback className="bg-primary/10 text-base font-semibold text-primary sm:text-lg">
                {initials(profile.fullName)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={statusVariants[profile.status]}>
                  {statusLabels[profile.status]}
                </Badge>
                <span className="font-mono text-[11px] text-muted-foreground sm:text-xs">
                  {profile.leadCode}
                </span>
              </div>
              <h1 className="break-words text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {profile.fullName}
              </h1>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-muted-foreground sm:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <ClipboardList className="size-3.5" />
                  {profile.source}
                </span>
                {profile.applicationType ? (
                  <span className="inline-flex items-center gap-1.5">
                    <UserRound className="size-3.5" />
                    {profile.applicationType === "STUDY" ? "Study visa" : "Tourist visa"}
                  </span>
                ) : null}
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="size-3.5" />
                  Added {profile.createdAtLabel}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {profile.phone ? (
                  <a className="inline-flex min-h-8 items-center gap-2 rounded-lg border border-border px-2.5 text-xs font-medium text-foreground transition-colors hover:bg-muted" href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}>
                    <Phone className="size-3.5 text-primary" />
                    {profile.phone}
                  </a>
                ) : null}
                {profile.email ? (
                  <a className="inline-flex min-h-8 max-w-full items-center gap-2 rounded-lg border border-border px-2.5 text-xs font-medium text-foreground transition-colors hover:bg-muted" href={`mailto:${profile.email}`}>
                    <Mail className="size-3.5 shrink-0 text-primary" />
                    <span className="truncate">{profile.email}</span>
                  </a>
                ) : null}
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:border-l xl:border-border/70 xl:pl-5">
            <div className="rounded-xl border border-border/70 bg-muted/25 p-3">
              <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                <UserRound className="size-3.5" />
                Current owner
              </div>
              <p className="text-sm font-semibold text-foreground">
                {profile.assignment.assigneeName ?? "Unassigned"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {profile.assignment.assignedAt ?? "No active assignment"}
              </p>
            </div>
            <div className="rounded-xl border border-border/70 bg-muted/25 p-3">
              <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="size-3.5" />
                Branch
              </div>
              <p className="text-sm font-semibold text-foreground">
                {profile.assignment.branchName ?? "Not assigned"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Updated {profile.updatedAtLabel}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/70 bg-muted/20 px-4 py-3 sm:px-5">
          <p className="text-xs text-muted-foreground">
            Client ID <span className="font-mono text-foreground">{profile.clientCode}</span>
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Button type="button" size="sm" variant="outline" disabled>
              <PencilLine className="size-3.5" />
              Edit profile
            </Button>
            <Button type="button" size="sm" variant="outline" disabled>
              <Check className="size-3.5" />
              Assign lead
            </Button>
            <Button type="button" size="icon-sm" variant="ghost" aria-label="More actions" disabled>
              <MoreHorizontal className="size-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
