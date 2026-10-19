import "server-only";

import {
  differenceInCalendarDays,
} from "date-fns";

import {
  prisma,
} from "@/lib/prisma";

import type {
  OfficeReportSummaryQuery,
} from "../schemas/office-report-summary-query-schema";

function dateOnly(value: string) {
  return new Date(
    `${value}T00:00:00.000Z`,
  );
}

type CategoryCount = {
  category: string;
  count: number;
};

type ItemCount = {
  itemKey: string;
  label: string;
  count: number;
};

export async function getOfficeReportSummary(
  query: OfficeReportSummaryQuery,
) {
  const from = dateOnly(query.from);
  const to = dateOnly(query.to);

  const reports =
    await prisma.officeDailyReport.findMany({
      where: {
        reportDate: {
          gte: from,
          lte: to,
        },
      },

      select: {
        reportDate: true,

        checks: {
          select: {
            status: true,
            followUpRequired: true,
            category: true,
            itemKey: true,
            label: true,
          },
        },
      },

      orderBy: {
        reportDate: "asc",
      },
    });

  const reportDays =
    differenceInCalendarDays(
      to,
      from,
    ) + 1;

  let issuesReported = 0;
  let applicableChecks = 0;
  let followUps = 0;
  let cleanDays = 0;

  const issueReportDays =
    new Set<string>();

  const followUpDays =
    new Set<string>();

  const categoryCounts =
    new Map<string, number>();

  const itemCounts =
    new Map<
      string,
      {
        label: string;
        count: number;
      }
    >();

  for (const report of reports) {
    const reportDate =
      report.reportDate
        .toISOString()
        .slice(0, 10);

    let reportHasIssue = false;

    for (const check of report.checks) {
      if (
        check.status === "OK" ||
        check.status === "ISSUE"
      ) {
        applicableChecks += 1;
      }

      if (
        check.status === "ISSUE"
      ) {
        issuesReported += 1;

        reportHasIssue = true;

        issueReportDays.add(
          reportDate,
        );

        categoryCounts.set(
          check.category,
          (categoryCounts.get(
            check.category,
          ) ?? 0) + 1,
        );

        const existingItem =
          itemCounts.get(
            check.itemKey,
          );

        itemCounts.set(
          check.itemKey,
          {
            label: check.label,
            count:
              (existingItem?.count ?? 0) +
              1,
          },
        );
      }

      if (check.followUpRequired) {
        followUps += 1;

        followUpDays.add(
          reportDate,
        );
      }
    }

    if (!reportHasIssue) {
      cleanDays += 1;
    }
  }

  const topIssueCategory =
    getTopIssueCategory(
      categoryCounts,
    );

  const topIssueItem =
    getTopIssueItem(
      itemCounts,
    );

  const issueRatePercent =
    applicableChecks > 0
      ? Number(
          (
            (issuesReported /
              applicableChecks) *
            100
          ).toFixed(1),
        )
      : 0;

  return {
    reportsCreated:
      reports.length,

    reportDays,

    issuesReported,

    issueReportDays:
      issueReportDays.size,

    applicableChecks,

    issueRatePercent,

    cleanDays,

    followUps,

    followUpDays:
      followUpDays.size,

    topIssueCategory,

    topIssueItem,
  };
}

function getTopIssueCategory(
  counts: Map<string, number>,
): CategoryCount | null {
  const entries = Array.from(
    counts.entries(),
  );

  if (entries.length === 0) {
    return null;
  }

  entries.sort(
    ([categoryA, countA], [categoryB, countB]) =>
      countB - countA ||
      categoryA.localeCompare(
        categoryB,
      ),
  );

  const [category, count] =
    entries[0];

  return {
    category,
    count,
  };
}

function getTopIssueItem(
  counts: Map<
    string,
    {
      label: string;
      count: number;
    }
  >,
) {
  const entries = Array.from(
    counts.entries(),
  );

  if (entries.length === 0) {
    return null;
  }

  entries.sort(
    ([itemKeyA, itemA], [itemKeyB, itemB]) =>
      itemB.count - itemA.count ||
      itemKeyA.localeCompare(
        itemKeyB,
      ),
  );

  const [
    itemKey,
    item,
  ] = entries[0];

  return {
    itemKey,
    label: item.label,
    count: item.count,
  };
}