"use client";

import {
  BarChart3,
  Globe2,
  MessageSquareText,
  RefreshCw,
  Target,
  Users,
} from "lucide-react";

import {
  AlertCircle,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Skeleton,
} from "@/components/ui/skeleton";
import {
  formatDateRangeLabel,
} from "@/lib/date-range";

import {
  useLeadInsights,
} from "../api/use-lead-insights";

export default function LeadInsights({
  from,
  to,
}: {
  from: string;
  to: string;
}) {
  const {
    data,
    isPending,
    isError,
    refetch,
  } = useLeadInsights({
    from,
    to,
  });

  const dateRangeLabel = formatDateRangeLabel({
    from,
    to,
  });

  if (isPending) {
    return (
      <section className="mt-8 space-y-4">
        <div className="grid gap-4 lg:grid-cols-3">
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-48 rounded-xl lg:col-span-2" />
        </div>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section className="mt-8 flex min-h-[220px] items-center justify-center rounded-xl border bg-card">
        <div className="flex max-w-sm flex-col items-center px-6 py-10 text-center">
          <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="size-5 text-destructive" />
          </div>

          <h3 className="text-sm font-semibold">
            Unable to load lead insights
          </h3>

          <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
            We couldn't retrieve the insights for the selected period.
          </p>

          <Button
            variant="outline"
            size="sm"
            className="mt-5"
            onClick={() => refetch()}
          >
            <RefreshCw className="mr-2 size-4" />
            Try again
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BarChart3 className="size-4" />
            </div>

            <div>
              <CardTitle>Lead Insights</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Lead mix and source patterns for {dateRangeLabel.toLowerCase()}.
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-lg border bg-muted/20 p-4">
              <div className="flex items-center gap-2">
                <Target className="size-4 text-primary" />
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Interest
                </p>
              </div>

              <div className="mt-4 space-y-3">
                <InsightRow
                  label="Study Abroad"
                  count={data.studyAbroad}
                />

                <InsightRow
                  label="Tourist Visa"
                  count={data.touristVisa}
                />
              </div>
            </div>

            <div className="rounded-lg border bg-muted/20 p-4 lg:col-span-2">
              <div className="flex items-center gap-2">
                <MessageSquareText className="size-4 text-primary" />
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Lead Sources
                </p>
              </div>

              {data.sources.length > 0 ? (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {data.sources.map((source) => (
                    <InsightRow
                      key={source.source}
                      label={source.label}
                      count={source.count}
                    />
                  ))}
                </div>
              ) : (
                <EmptyInsight text="No lead sources in this period." />
              )}
            </div>

            <div className="rounded-lg border bg-muted/20 p-4 lg:col-span-3">
              <div className="flex items-center gap-2">
                <Globe2 className="size-4 text-primary" />
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Top Country
                </p>
              </div>

              {data.topCountry ? (
                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold">
                      {data.topCountry.country}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Most selected country in the period
                    </p>
                  </div>

                  <p className="text-sm font-semibold tabular-nums text-primary">
                    {data.topCountry.count.toLocaleString()} {data.topCountry.count === 1 ? "lead" : "leads"}
                  </p>
                </div>
              ) : (
                <EmptyInsight text="No country information is available for this period." />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function InsightRow({
  label,
  count,
}: {
  label: string;
  count: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border bg-background px-3 py-2.5">
      <div className="flex min-w-0 items-center gap-2">
        <Users className="size-4 shrink-0 text-muted-foreground" />
        <span className="truncate text-sm font-medium">
          {label}
        </span>
      </div>

      <span className="shrink-0 text-sm font-semibold tabular-nums">
        {count.toLocaleString()}
      </span>
    </div>
  );
}

function EmptyInsight({
  text,
}: {
  text: string;
}) {
  return (
    <p className="mt-4 rounded-md border border-dashed px-3 py-4 text-sm text-muted-foreground">
      {text}
    </p>
  );
}
