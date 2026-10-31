"use client";

import {
  AlertCircle,
  BadgeCheck,
  RefreshCw,
  UserRoundX,
} from "lucide-react";

import { DataShowingCard } from "@/components/resuable-components/data-showing-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import {
  formatDateRangeLabel,
  type DateRangeValue,
} from "@/lib/date-range";

import { useLeadSummary } from "../api/use-lead-summary";

type LeadsSummaryCardProps = DateRangeValue;

export function LeadsSummaryCard({
  from,
  to,
}: LeadsSummaryCardProps) {
  const {
    data,
    isPending,
    isError,
    refetch,
  } = useLeadSummary({
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
      <section>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Skeleton className="h-44 rounded-xl" />
          <Skeleton className="h-44 rounded-xl" />
        </div>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-[220px] items-center justify-center rounded-xl bg-card">
        <div className="flex max-w-sm flex-col items-center px-6 py-10 text-center">
          <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="size-5 text-destructive" />
          </div>

          <h3 className="text-sm font-semibold">
            Unable to load lead summary
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

  return (
    <section>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <DataShowingCard
          title="Converted"
          dateRange={dateRangeLabel}
          value={data.converted.toLocaleString()}
          change={`${data.conversionRatePercent.toFixed(1)}% conversion rate`}
          icon={BadgeCheck}
          variant="success"
        />

        <DataShowingCard
          title="Unassigned"
          dateRange={dateRangeLabel}
          value={data.unassigned.toLocaleString()}
          change="Leads still waiting for ownership"
          icon={UserRoundX}
          variant="danger"
        />
      </div>
    </section>
  );
}
