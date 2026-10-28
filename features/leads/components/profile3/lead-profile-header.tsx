import {
  IconCalendar,
  IconCheck,
  IconChevronRight,
  IconDots,
  IconEdit,
  IconMapPin,
  IconPhone,
  IconUserCircle,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

import type { LeadProfileViewModel } from "./lead-profile.types";

const statusLabels: Record<LeadProfileViewModel["lead"]["status"], string> = {
  NEW: "New",
  NOT_PICKED: "Not picked",
  JUST_INFO: "Just information",
  NOT_INTERESTED: "Not interested",
  CONVERTED: "Converted",
};

function initials(firstName: string, surname?: string | null) {
  return `${firstName.trim().charAt(0)}${surname?.trim().charAt(0) ?? ""}`.toUpperCase();
}

function formatOptionalDate(value?: string | null) {
  return value ? formatDate(value) : "—";
}

type LeadProfileHeaderProps = {
  profile: LeadProfileViewModel;
  onEditProfile?: () => void;
  onAssignLead?: () => void;
};

export function LeadProfileHeader({ profile, onEditProfile, onAssignLead }: LeadProfileHeaderProps) {
  const { lead, client, assignment } = profile;
  const fullName = [client.givenName, client.middleName, client.surname].filter(Boolean).join(" ");

  return (
    <div className="space-y-3">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <span>Leads</span>
        <IconChevronRight className="size-3.5" aria-hidden="true" />
        <span className="font-medium text-foreground">{lead.code}</span>
      </nav>

      <Card className="overflow-hidden gap-0 py-0">
        <div className="h-1 bg-primary" />
        <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.72fr)] xl:items-center xl:gap-7">
          <div className="flex min-w-0 items-start gap-3.5 sm:gap-4">
            <Avatar className="size-12 sm:size-16">
              <AvatarFallback className="bg-primary/10 text-base font-semibold text-primary sm:text-xl">
                {initials(client.givenName, client.surname)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={lead.status === "CONVERTED" ? "success" : "secondary"}>
                  {statusLabels[lead.status]}
                </Badge>
                <span className="text-xs text-muted-foreground">{lead.code}</span>
              </div>
              <div>
                <h1 className="break-words text-xl font-semibold tracking-tight sm:text-2xl">{fullName}</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {client.code ? `Client ID ${client.code}` : "Client profile"}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2 text-xs text-muted-foreground sm:text-sm">
                {lead.source ? <span>{lead.source}</span> : null}
                {lead.preferredVisaType ? <span>{lead.preferredVisaType}</span> : null}
                {lead.createdAt ? (
                  <span className="inline-flex items-center gap-1.5">
                    <IconCalendar className="size-3.5" aria-hidden="true" />
                    Added {formatOptionalDate(lead.createdAt)}
                  </span>
                ) : null}
              </div>
              {client.phone ? (
                <a
                  href={`tel:${client.phone.replace(/[^+\d]/g, "")}`}
                  className="inline-flex min-h-8 items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <IconPhone className="size-4 text-primary" aria-hidden="true" />
                  {client.phone}
                </a>
              ) : null}
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <div className="min-w-0 rounded-xl border border-border/80 bg-muted/25 p-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <IconUserCircle className="size-4" aria-hidden="true" /> Current owner
              </div>
              <p className="mt-1.5 truncate text-sm font-semibold">{assignment?.ownerName || "Unassigned"}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {assignment?.ownerDepartment || "No department"}
                {assignment?.assignedAt ? ` · Since ${formatOptionalDate(assignment.assignedAt)}` : ""}
              </p>
            </div>
            <div className="min-w-0 rounded-xl border border-border/80 bg-muted/25 p-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <IconMapPin className="size-4" aria-hidden="true" /> Branch
              </div>
              <p className="mt-1.5 truncate text-sm font-semibold">{assignment?.branchName || "No branch"}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {assignment?.branchUpdatedAt ? `Updated ${formatOptionalDate(assignment.branchUpdatedAt)}` : "Branch details"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border/80 bg-muted/15 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p className="text-xs text-muted-foreground">
            Client ID <span className="font-medium text-foreground">{client.code || "Not available"}</span>
          </p>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
            <Button type="button" variant="outline" size="sm" onClick={onEditProfile} disabled={!onEditProfile}>
              <IconEdit className="size-3.5" aria-hidden="true" /> Edit profile
            </Button>
            <Button type="button" size="sm" onClick={onAssignLead} disabled={!onAssignLead}>
              <IconCheck className="size-3.5" aria-hidden="true" /> Assign lead
            </Button>
            <Button type="button" variant="ghost" size="icon-sm" className="hidden sm:inline-flex" aria-label="More lead actions" disabled>
              <IconDots className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
