import {
  AlertTriangle,
  ClipboardCheck,
  ListChecks,
  RotateCcw,
} from "lucide-react";

import { DataShowingCard } from "@/components/resuable-components/data-showing-card";

type ReportsSummaryData = {
  reportsCreated: number;
  issuesReported: number;
  cleanDays: number;
  followUps: number;
};

type ReportsSummaryCardProps = {
  data?: ReportsSummaryData;
  dateRangeLabel: string;
  from: Date;
  toExclusive: Date;
};

export function ReportsSummaryCard({
  data,
  dateRangeLabel,
}: ReportsSummaryCardProps) {
  const summary = data ?? {
    reportsCreated: 0,
    issuesReported: 0,
    cleanDays: 0,
    followUps: 0,
  };

  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2  xl:grid-cols-3">
      <DataShowingCard
        title="Reports"
        dateRange={dateRangeLabel}
        value={summary.reportsCreated.toLocaleString()}
        change="Reports created"
        icon={ClipboardCheck}
        variant="primary"
      />

      <DataShowingCard
        title="Issues"
        dateRange={dateRangeLabel}
        value={summary.issuesReported.toLocaleString()}
        change="Issues reported"
        icon={AlertTriangle}
        variant="danger"
      />

      <DataShowingCard
        title="Clean Days"
        dateRange={dateRangeLabel}
        value={summary.cleanDays.toLocaleString()}
        change="Days with no reported issues"
        icon={ListChecks}
        variant="success"
      />

      <DataShowingCard
        title="Follow-ups"
        dateRange={dateRangeLabel}
        value={summary.followUps.toLocaleString()}
        change="Items requiring attention"
        icon={RotateCcw}
        variant="primary"
      />
    </section>
  );
}