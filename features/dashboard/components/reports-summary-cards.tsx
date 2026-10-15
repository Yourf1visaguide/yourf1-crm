import {
  UserRound,
  UserCheck,
  UserPlus,
} from "lucide-react";

import { DataShowingCard } from "@/components/resuable-components/data-showing-card";

import type { UserDashboardData } from "../types";

type UserSummaryCardsProps = {
  data: UserDashboardData;
  dateRangeLabel: string;
};

function formatPercentage(value: number | null) {
  if (value === null) {
    return "No previous data";
  }

  if (value > 0) {
    return `+${value}% from last period`;
  }

  return `${value}% from last period`;
}

export function UserSummaryCards({
  data,
  dateRangeLabel,
}: UserSummaryCardsProps) {
  const activePercentage =
    data.totalUsers > 0
      ? (
          (data.activeUsers / data.totalUsers) *
          100
        ).toFixed(1)
      : "0.0";

  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      <DataShowingCard
        title="Total Employee"
        dateRange="Current"
        value={data.totalUsers.toLocaleString()}
        change={`${data.activeUsers} active accounts`}
        icon={UserRound}
        variant="primary"
      />

      <DataShowingCard
        title="Active Employee"
        dateRange="Current"
        value={data.activeUsers.toLocaleString()}
        change={`${activePercentage}% of all accounts`}
        icon={UserCheck}
        variant="success"
      />

      <DataShowingCard
        title="New Employee"
        dateRange={dateRangeLabel}
        value={data.newUsers.current.toLocaleString()}
        change={formatPercentage(
          data.newUsers.changePercent,
        )}
        icon={UserPlus}
        variant="success"
      />
    </section>
  );
}