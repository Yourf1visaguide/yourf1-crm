"use client";

import * as React from "react";
import { IconArrowRight, IconBell, IconLock, IconMessagePlus, IconUserCheck } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

import { LeadJourneyOverview } from "./lead-journey-overview";
import { LeadProfileHeader } from "./lead-profile-header";
import { LeadProfileNavigation } from "./lead-profile-navigation";
import { LeadWorkSummary } from "./lead-work-summary";
import { ProfileInfoCard } from "./profile-info-card";
import type { LeadProfileSection, LeadProfileWorkspaceProps } from "./lead-profile.types";

const placeholderContent: Partial<Record<LeadProfileSection, { title: string; description: string }>> = {
  applications: { title: "Applications", description: "Application records will be connected in a later phase." },
  documents: { title: "Documents", description: "Required, uploaded, rejected, and expired documents will appear here when connected." },
  notes: { title: "Notes", description: "Authorized staff notes and communication summaries will appear here." },
  "follow-ups": { title: "Follow-ups", description: "Scheduled follow-ups, owners, due dates, and completion state will appear here." },
  tasks: { title: "Tasks", description: "Open and completed tasks related to this lead will appear here." },
  payments: { title: "Payments", description: "Financial information will be shown only to roles authorized to view it." },
  timeline: { title: "Activity timeline", description: "Assignment changes and meaningful profile events will appear here." },
};

function OverviewAside({ profile }: { profile: LeadProfileWorkspaceProps["profile"] }) {
  return (
    <aside className="space-y-3 xl:sticky xl:top-4 xl:self-start">
      <LeadJourneyOverview />
      <Card className="gap-3 py-4">
        <CardHeader className="flex flex-row items-center justify-between px-4">
          <CardTitle className="text-sm">Quick actions</CardTitle>
          <Badge variant="outline">Preview</Badge>
        </CardHeader>
        <CardContent className="space-y-1 px-3">
          <QuickAction icon={<IconMessagePlus />} label="Add note" />
          <QuickAction icon={<IconBell />} label="Schedule follow-up" />
          <QuickAction icon={<IconUserCheck />} label="Change assignment" />
          <QuickAction icon={<IconArrowRight />} label="Mark as converted" />
        </CardContent>
      </Card>
      <Card className="gap-3 py-4">
        <CardHeader className="flex flex-row items-center justify-between px-4">
          <CardTitle className="text-sm">Record context</CardTitle>
          <IconLock className="size-4 text-muted-foreground" aria-hidden="true" />
        </CardHeader>
        <CardContent className="space-y-3 px-4 text-xs">
          <div className="flex items-start justify-between gap-3">
            <span className="text-muted-foreground">Lead created</span>
            <span className="text-right font-medium">{profile.lead.createdAt ? formatDate(profile.lead.createdAt) : "Not available"}</span>
          </div>
          <div className="flex items-start justify-between gap-3">
            <span className="text-muted-foreground">Client record</span>
            <span className="text-right font-medium">{profile.client.code || "Not available"}</span>
          </div>
          <p className="border-t border-border/70 pt-3 leading-5 text-muted-foreground">Sensitive details should be returned only by an authorized server response.</p>
        </CardContent>
      </Card>
    </aside>
  );
}

function QuickAction({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Button type="button" variant="ghost" className="h-9 w-full justify-start gap-2.5 px-2 text-sm" disabled>
      <span className="text-primary [&>svg]:size-4">{icon}</span>
      <span className="flex-1 text-left">{label}</span>
      <IconArrowRight className="size-3.5 text-muted-foreground" aria-hidden="true" />
    </Button>
  );
}

export function LeadProfileWorkspace({
  profile,
  onEditSection,
  onEditProfile,
  onAssignLead,
  onSectionChange,
}: LeadProfileWorkspaceProps) {
  const [activeSection, setActiveSection] = React.useState<LeadProfileSection>("overview");

  const changeSection = React.useCallback((section: LeadProfileSection) => {
    setActiveSection(section);
    onSectionChange?.(section);
  }, [onSectionChange]);

  const content = placeholderContent[activeSection];

  return (
    <main className="mx-auto w-full max-w-[1600px] space-y-4 px-3 pb-8 pt-3 sm:space-y-5 sm:px-5 lg:px-6">
      <LeadProfileHeader profile={profile} onEditProfile={onEditProfile} onAssignLead={onAssignLead} />
      <LeadWorkSummary profile={profile} />
      <LeadProfileNavigation activeSection={activeSection} onChange={changeSection} />

      {activeSection === "overview" ? (
        <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(285px,0.36fr)] xl:items-start">
          <section aria-label="Client profile information" className="grid min-w-0 gap-3 md:grid-cols-2">
            <ProfileInfoCard group={profile.groups.personal} onEdit={onEditSection} />
            <ProfileInfoCard group={profile.groups.education} onEdit={onEditSection} />
            <ProfileInfoCard group={profile.groups.addresses} onEdit={onEditSection} />
            <ProfileInfoCard group={profile.groups.tests} onEdit={onEditSection} />
            <ProfileInfoCard group={profile.groups.family} onEdit={onEditSection} />
            <ProfileInfoCard group={profile.groups.workExperience} onEdit={onEditSection} />
            <ProfileInfoCard group={profile.groups.passport} onEdit={onEditSection} />
          </section>
          <OverviewAside profile={profile} />
        </div>
      ) : (
        <Card className="min-h-64 justify-center py-10">
          <CardContent className="mx-auto flex max-w-lg flex-col items-center px-5 text-center">
            <span className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <IconLock className="size-5" aria-hidden="true" />
            </span>
            <h2 className="text-base font-semibold">{content?.title ?? "Section"}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{content?.description ?? "This section will be connected in a later phase."}</p>
            <Badge variant="outline" className="mt-4">Static preview</Badge>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
