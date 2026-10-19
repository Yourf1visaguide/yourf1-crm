import { dateToInputValue } from "@/lib/utils";
import "server-only";

import { Prisma } from "@/prisma/generated/prisma/client";
import { prisma } from "@/lib/prisma";

import type { OfficeReportListQuery } from "../schemas/office-report-list-query-schema";

import type { OfficeReportListItem } from "../schemas/office-reports-schema";
import { dateOnly } from "@/lib/utils-server";

function getOrderBy(
  sortBy: OfficeReportListQuery["sortBy"],
  sortOrder: OfficeReportListQuery["sortOrder"],
): Prisma.OfficeDailyReportOrderByWithRelationInput {
  switch (sortBy) {
    case "createdAt":
      return {
        createdAt: sortOrder,
      };

    case "createdBy":
      return {
        createdBy: {
          name: sortOrder,
        },
      };

    case "reportDate":
    default:
      return {
        reportDate: sortOrder,
      };
  }
}

export async function getOfficeReports(query: OfficeReportListQuery): Promise<{
  reports: OfficeReportListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}> {
  const from = dateOnly(query.from);
  const to = dateOnly(query.to);

  const where: Prisma.OfficeDailyReportWhereInput = {
    reportDate: {
      gte: from,
      lte: to,
    },
  };

  const orderBy = getOrderBy(query.sortBy, query.sortOrder);

  const [reports, total] = await prisma.$transaction([
    prisma.officeDailyReport.findMany({
      where,

      select: {
        id: true,
        reportDate: true,
        generalNotes: true,
        createdAt: true,

        createdBy: {
          select: {
            id: true,
            name: true,
            
          },
        },

      checks: {
        select: {
          status: true,
          followUpRequired:true
        },
      },
      },

      orderBy: [
        orderBy,
        {
          id: "asc",
        },
      ],

      skip: (query.page - 1) * query.limit,
      take: query.limit,
    }),

    prisma.officeDailyReport.count({
      where,
    }),
  ]);

  return {
  reports: reports.map((report) => ({
    id: report.id,

    reportDate: dateToInputValue(
      report.reportDate,
    ),

    generalNotes: report.generalNotes,

    okChecks: report.checks.filter(
      (check) => check.status === "OK",
    ).length,

    issueChecks: report.checks.filter(
      (check) => check.status === "ISSUE",
    ).length,

    naChecks: report.checks.filter(
      (check) => check.status === "NA",
    ).length,
    followUpRequired:report.checks.filter(
      (check) => check.followUpRequired === true,
    ).length,
    createdAt: report.createdAt.toISOString(),

    createdBy: {
      id: report.createdBy.id,
      name: report.createdBy.name,
    },
  })),

  pagination: {
    page: query.page,
    limit: query.limit,
    total,
    totalPages: Math.ceil(
      total / query.limit,
    ),
  },
};
}
