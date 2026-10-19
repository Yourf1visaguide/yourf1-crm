"use client";

import {
  AlertTriangle,
  ClipboardCheck,
  ListChecks,
  Percent,
  RotateCcw,
  Target,
} from "lucide-react";

import { DataShowingCard } from "@/components/resuable-components/data-showing-card";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import {
  AlertCircle,
  RefreshCw,
} from "lucide-react";

import {
  useOfficeReportSummary,
} from "../api/use-office-report-summary";

import {
  formatDateRangeLabel,
  type DateRangeValue,
} from "@/lib/date-range";

type ReportsSummaryCardProps = DateRangeValue;

export function ReportsSummaryCard({
  from,
  to,
}: ReportsSummaryCardProps) {
  const {
    data,
    isPending,
    isError,
    refetch,
  } = useOfficeReportSummary({
    from,
    to,
  });

  const dateRangeLabel =
    formatDateRangeLabel({
      from,
      to,
    });

  if (isPending) {
    return (
      <section className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
          {Array.from({
            length: 5,
          }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-44 rounded-xl"
            />
          ))}
        </div>

        <Skeleton className="h-28 rounded-xl" />
      </section>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-[220px] items-center justify-center rounded-xl bg-card  ">
        <div className="flex max-w-sm flex-col items-center px-6 py-10 text-center">
          <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="size-5 text-destructive" />
          </div>

          <h3 className="text-sm font-semibold">
            Unable to load report summary
          </h3>

          <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
            We couldn't retrieve the summary for the selected period.
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
      </div>
    );
  }

  const missingReportDays = Math.max(
    data.reportDays -
      data.reportsCreated,
    0,
  );

  const coverageChange =
    missingReportDays === 0
      ? "Every day has a report"
      : `${missingReportDays} ${
          missingReportDays === 1
            ? "day"
            : "days"
        } without a report`;

  const issueRateChange =
    data.applicableChecks > 0
      ? `${data.issueRatePercent.toFixed(
          1,
        )}% of applicable checks`
      : "No applicable checks";

  return (
    <section className="space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 ">
        <DataShowingCard
          title="Report Coverage"
          dateRange={dateRangeLabel}
          value={`${data.reportsCreated} / ${data.reportDays}`}
          change={coverageChange}
          icon={ClipboardCheck}
          variant="primary"
        />

        <DataShowingCard
          title="Issues"
          dateRange={dateRangeLabel}
          value={data.issuesReported.toLocaleString()}
          change={`${data.issueReportDays} ${
            data.issueReportDays === 1
              ? "report day"
              : "report days"
          } affected`}
          icon={AlertTriangle}
          variant="danger"
        />

        {/* <DataShowingCard
          title="Issue Rate"
          dateRange={dateRangeLabel}
          value={`${data.issuesReported} / ${data.applicableChecks}`}
          change={issueRateChange}
          icon={Percent}
          variant="danger2"
        /> */}

        <DataShowingCard
          title="Clean Days"
          dateRange={dateRangeLabel}
          value={data.cleanDays.toLocaleString()}
          change="Days with no reported issues"
          icon={ListChecks}
          variant="success"
        />

        {/* <DataShowingCard
          title="Follow-ups"
          dateRange={dateRangeLabel}
          value={data.followUps.toLocaleString()}
          change={`${data.followUpDays} ${
            data.followUpDays === 1
              ? "report day"
              : "report days"
          } affected`}
          icon={RotateCcw}
          variant="warning"
        /> */}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <div className="flex items-center gap-3 ">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Target className="size-4" />
            </div>

            <div>
              <CardTitle>
                Office Insights
              </CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Key patterns from the selected reporting period.
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {data.topIssueCategory ||
          data.topIssueItem ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {data.topIssueCategory && (
                <div className="rounded-lg border bg-muted/20 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Most affected category
                  </p>

                  <div className="mt-2 flex items-end justify-between gap-4">
                    <p className="text-sm font-semibold">
                      {data.topIssueCategory.category}
                    </p>

                    <span className="text-sm font-medium tabular-nums text-destructive">
                      {
                        data.topIssueCategory
                          .count
                      }{" "}
                      {
                        data.topIssueCategory
                          .count === 1
                          ? "issue"
                          : "issues"
                      }
                    </span>
                  </div>
                </div>
              )}

              {data.topIssueItem && (
                <div className="rounded-lg border bg-muted/20 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Most reported issue
                  </p>

                  <div className="mt-2 flex items-end justify-between gap-4">
                    <p className="text-sm font-semibold">
                      {data.topIssueItem.label}
                    </p>

                    <span className="text-sm font-medium tabular-nums text-destructive">
                      {
                        data.topIssueItem
                          .count
                      }{" "}
                      {
                        data.topIssueItem
                          .count === 1
                          ? "issue"
                          : "issues"
                      }
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
              <ListChecks className="size-5 text-emerald-600 dark:text-emerald-400" />

              <div>
                <p className="text-sm font-medium">
                  No issues reported
                </p>

                <p className="text-sm text-muted-foreground">
                  No checklist issues were recorded during this period.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}