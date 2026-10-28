import { IconArrowRight, IconBolt, IconCircleCheck, IconClock } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const steps = [
  { title: "New", description: "Lead received" },
  { title: "Contacted", description: "First conversation" },
  { title: "Counselling", description: "Needs assessment" },
  { title: "Registered", description: "Client onboarding" },
];

type LeadJourneyOverviewProps = {
  currentStep?: number;
  nextAction?: string;
  onViewDetails?: () => void;
  onAddFollowUp?: () => void;
};

export function LeadJourneyOverview({
  currentStep = 0,
  nextAction = "Confirm contact details and record the first conversation.",
  onViewDetails,
  onAddFollowUp,
}: LeadJourneyOverviewProps) {
  return (
    <Card className="gap-3 py-4">
      <CardHeader className="flex flex-row items-start justify-between gap-3 px-4 sm:px-5">
        <div>
          <CardTitle className="text-sm font-semibold">Lead journey</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">Progress at a glance. Workflow stages are illustrative until connected to business rules.</p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={onViewDetails} disabled={!onViewDetails} className="shrink-0">
          View details
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 px-4 sm:px-5">
        <ol className="grid grid-cols-2 gap-x-3 gap-y-4 md:grid-cols-4">
          {steps.map((step, index) => {
            const complete = index < currentStep;
            const current = index === currentStep;
            return (
              <li key={step.title} className="relative min-w-0">
                {index > 0 ? (
                  <span className="absolute -left-3 top-4 hidden h-px w-3 bg-border md:block" aria-hidden="true" />
                ) : null}
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                      complete && "border-primary bg-primary text-primary-foreground",
                      current && "border-primary bg-primary/10 text-primary ring-4 ring-primary/10",
                      !complete && !current && "border-border bg-muted/60 text-muted-foreground",
                    )}
                  >
                    {complete ? <IconCircleCheck className="size-4" aria-hidden="true" /> : index + 1}
                  </span>
                  <span className={cn("truncate text-sm font-medium", current ? "text-foreground" : "text-muted-foreground")}>{step.title}</span>
                </div>
                <p className="mt-2 pl-10 text-xs leading-4 text-muted-foreground">{step.description}</p>
              </li>
            );
          })}
        </ol>

        <div className="flex flex-col gap-3 rounded-xl border border-primary/15 bg-primary/5 p-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
          <div className="flex min-w-0 items-start gap-2.5">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <IconBolt className="size-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium">Suggested next action</p>
                <Badge variant="outline" className="text-[10px]">Preview</Badge>
              </div>
              <p className="mt-0.5 text-xs leading-5 text-muted-foreground">{nextAction}</p>
            </div>
          </div>
          <Button type="button" size="sm" onClick={onAddFollowUp} disabled={!onAddFollowUp} className="shrink-0">
            <IconClock className="size-3.5" aria-hidden="true" />
            Add follow-up
            <IconArrowRight className="size-3.5" aria-hidden="true" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
