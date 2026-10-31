"use client";

import { useState } from "react";
import { AlertCircle, FileText, Plus, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { LeadJourneyOverview } from "./lead-journey-overview";
import { LeadProfileHeader } from "./lead-profile-header";
import { LeadProfileNavigation } from "./lead-profile-navigation";
import { ProfileInfoCard } from "./profile-info-card";
import type { LeadProfileTabId, LeadProfileViewModel } from "./lead-profile.types";

export function LeadProfileWorkspace({ profile }: { profile: LeadProfileViewModel }) {
  const [activeTab, setActiveTab] = useState<LeadProfileTabId>("overview");

  return (
    <main className="mx-auto w-full max-w-[1600px] space-y-4 px-3 py-4 sm:space-y-5 sm:px-5 sm:py-5 lg:px-7">
      <LeadProfileHeader profile={profile} />

      <LeadJourneyOverview profile={profile} />

      <LeadProfileNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <section
        id="lead-profile-panel"
        role="tabpanel"
        aria-labelledby={`lead-profile-tab-${activeTab}`}
        className="min-w-0"
      >
        {activeTab === "overview" ? (
          <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
            <div className="min-w-0 space-y-4">
              <ProfileInfoCard section={profile.sections.personal} />
              <ProfileInfoCard section={profile.sections.address} />
              <ProfileInfoCard section={profile.sections.family} />
            </div>
            <div className="min-w-0 space-y-4">
              <ProfileInfoCard section={profile.sections.education} />
              <ProfileInfoCard section={profile.sections.tests} />
              <ProfileInfoCard section={profile.sections.work} />
              <ProfileInfoCard section={profile.sections.passport} />
            </div>
          </div>
        ) : (
          <PlaceholderPanel tab={activeTab} />
        )}
      </section>

      <p className="flex items-start gap-2 rounded-lg border border-border/70 bg-muted/20 px-3 py-2.5 text-xs leading-5 text-muted-foreground">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
        Static UI preview. Profile values are sample data; editing, assignment, documents, and other workflow actions are not connected yet.
      </p>
    </main>
  );
}

function PlaceholderPanel({ tab }: { tab: LeadProfileTabId }) {
  const labels: Record<Exclude<LeadProfileTabId, "overview">, { title: string; description: string }> = {
    applications: { title: "Applications", description: "Applications connected to this client will appear here when the existing Application records are connected." },
    documents: { title: "Documents", description: "Document requirements, uploads, review status, and outstanding items will be integrated in a later step." },
    notes: { title: "Notes", description: "A structured notes workflow will be added after we inspect the existing notes model and permissions." },
    "follow-ups": { title: "Follow-ups", description: "Follow-up schedules and outcomes will use the existing task workflow where appropriate." },
    tasks: { title: "Tasks", description: "Tasks related to this lead will be loaded from the existing task system in a later phase." },
    payments: { title: "Payments", description: "Authorized staff will see relevant registration and invoice information here; sensitive finance details will stay permission-gated." },
    timeline: { title: "Activity timeline", description: "Lead status and assignment history will be connected after confirming existing audit-writing behavior." },
  };
  const content = labels[tab as Exclude<LeadProfileTabId, "overview">];

  return (
    <Card className="min-h-64 justify-center gap-4 py-8 text-center">
      <CardHeader className="items-center">
        <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {tab === "documents" ? <FileText className="size-5" /> : tab === "notes" ? <Plus className="size-5" /> : <AlertCircle className="size-5" />}
        </span>
        <CardTitle className="text-base">{content.title}</CardTitle>
      </CardHeader>
      <CardContent className="mx-auto max-w-lg space-y-4">
        <p className="text-sm leading-6 text-muted-foreground">{content.description}</p>
        <Badge variant="outline">Not connected yet</Badge>
        <div>
          <Button type="button" variant="outline" disabled>Available in a later phase</Button>
        </div>
      </CardContent>
    </Card>
  );
}
