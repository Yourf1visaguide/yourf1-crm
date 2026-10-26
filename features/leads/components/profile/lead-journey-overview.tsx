import { ArrowRight, Circle, CircleCheck, Clock3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { LeadProfileViewModel } from "./lead-profile.types";

const journey = [
  { label: "New", description: "Lead received", state: "current" },
  { label: "Contacted", description: "First conversation", state: "upcoming" },
  { label: "Counselling", description: "Needs assessment", state: "upcoming" },
  { label: "Registered", description: "Client onboarding", state: "upcoming" },
] as const;

export function LeadJourneyOverview({ profile }: { profile: LeadProfileViewModel }) {
  const current = profile.status === "CONVERTED" ? 3 : 0;

  return (
    <Card className="gap-0 py-0">
      <CardHeader className="flex flex-row items-start justify-between gap-3 px-4 py-4 sm:px-5">
        <div className="space-y-1">
          <CardTitle className="text-sm sm:text-base">Lead journey</CardTitle>
          <p className="text-xs text-muted-foreground">A quick view of the lead handoff and next milestone.</p>
        </div>
        <Badge variant="outline" className="shrink-0 gap-1.5">
          <Clock3 className="size-3.5" />
          Static preview
        </Badge>
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-5 sm:pb-5">
        <ol className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-2">
          {journey.map((step, index) => {
            const complete = index < current;
            const active = index === current;
            return (
              <li key={step.label} className="relative min-w-0">
                {index < journey.length - 1 ? (
                  <span className="absolute left-8 right-[-0.5rem] top-4 hidden h-px bg-border sm:block" aria-hidden="true" />
                ) : null}
                <div className="relative flex items-start gap-2.5 sm:flex-col sm:gap-2">
                  <span className={`flex size-8 shrink-0 items-center justify-center rounded-full border ${complete ? "border-primary bg-primary text-primary-foreground" : active ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted/50 text-muted-foreground"}`}>
                    {complete ? <CircleCheck className="size-4" /> : active ? <Circle className="size-3 fill-current" /> : <span className="text-xs font-semibold">{index + 1}</span>}
                  </span>
                  <div className="min-w-0 pt-0.5 sm:pt-0">
                    <p className={`text-xs font-semibold sm:text-sm ${active ? "text-primary" : "text-foreground"}`}>{step.label}</p>
                    <p className="mt-0.5 text-[11px] leading-4 text-muted-foreground sm:text-xs">{step.description}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="mt-4 flex flex-col gap-2 rounded-lg border border-primary/15 bg-primary/5 p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2">
            <Clock3 className="mt-0.5 size-4 shrink-0 text-primary" />
            <div>
              <p className="text-xs font-semibold text-foreground">Suggested next action</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Confirm contact details and record the first conversation.</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
            Planned for a later phase <ArrowRight className="size-3.5" />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
