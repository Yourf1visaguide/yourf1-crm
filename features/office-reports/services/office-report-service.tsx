import "server-only";

import { Prisma } from "@/prisma/generated/prisma/client";

import { prisma } from "@/lib/prisma";
import { ApiError } from "@/lib/api-error";

import type {
  CreateOfficeReportInput,
} from "@/features/office-reports/schemas/office-reports-schema";

import {
  OFFICE_REPORT_CHECKLIST,
} from "@/features/office-reports/constants/office-report-checklist";
import { todayOfficeDate } from "@/lib/utils-server";
import { dateToInputValue } from "@/lib/utils";

function dateOnly(value: string) {
  return new Date(`${value}T00:00:00.000Z`);
}

const CHECKLIST_BY_KEY = new Map(
  OFFICE_REPORT_CHECKLIST.map((item) => [
    item.key,
    item,
  ]),
);

export async function createOfficeReport(
  data: CreateOfficeReportInput,
  createdById: string,
) {
  // const reportDate = dateOnly(data.reportDate);
  const officeDate = todayOfficeDate();
  const reportDate =  dateOnly(officeDate);
  
  /*
   * Preflight check.
   *
   * The database unique constraint remains the
   * final protection against concurrent creation.
   */
  const existingReport =
    await prisma.officeDailyReport.findUnique({
      where: {
        reportDate,
      },

      select: {
        id: true,
      },
    });

  if (existingReport) {
    throw new ApiError(
      "CONFLICT",
      "An office report already exists for this date.",
      409,
    );
  }

  try {
    return await prisma.$transaction(async (tx) => {
      const report =
        await tx.officeDailyReport.create({
          data: {
            reportDate,

            generalNotes:
              data.generalNotes?.trim() || null,

            createdBy: {
              connect: {
                id: createdById,
              },
            },

            checks: {
              create: data.checks.map((check) => {
                const checklistItem =
                  CHECKLIST_BY_KEY.get(
                    check.itemKey,
                  );

                /*
                 * This should already be guaranteed by
                 * the Zod schema, but keeping the server
                 * check makes the service defensive.
                 */
                if (!checklistItem) {
                  throw new ApiError(
                    "BAD_REQUEST",
                    `Invalid office report checklist item: ${check.itemKey}`,
                    400,
                  );
                }

                return {
                  itemKey: checklistItem.key,
                  category: checklistItem.category,
                  label: checklistItem.label,

                  status: check.status,

                  issueNote:
                    check.issueNote?.trim() || null,

                  actionTaken:
                    check.actionTaken?.trim() || null,

                  followUpRequired:
                    check.followUpRequired,
                };
              }),
            },
          },

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
                id: true,
                itemKey: true,
                category: true,
                label: true,
                status: true,
                issueNote: true,
                actionTaken: true,
                followUpRequired: true,
              },
            },
          },
        });

      return report;
    });
  } catch (error) {
    /*
     * Preflight checks cannot protect against two requests
     * arriving at the same time.
     *
     * @@unique([reportDate]) is the final protection.
     */
    if (
      error instanceof
      Prisma.PrismaClientKnownRequestError
    ) {
      if (error.code === "P2002") {
        throw new ApiError(
          "CONFLICT",
          "An office report already exists for this date.",
          409,
        );
      }
    }

    if (error instanceof ApiError) {
      throw error;
    }

    console.error(
      "Office report creation failed",
      {
        createdById,
        reportDate,
        error,
      },
    );

    throw new ApiError(
      "INTERNAL_SERVER_ERROR",
      "The office report could not be created. Please try again.",
      500,
    );
  }
}


export async function getOfficeReportById(
  reportId: string,
) {
  const report =
    await prisma.officeDailyReport.findUnique({
      where: {
        id: reportId,
      },

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
            id: true,
            itemKey: true,
            category: true,
            label: true,
            status: true,
            issueNote: true,
            actionTaken: true,
            followUpRequired: true,
          },
        },
      },
    });

  if (!report) {
    throw new ApiError(
      "NOT_FOUND",
      "Office report not found.",
      404,
    );
  }

  return {
    id: report.id,

    reportDate: dateToInputValue(
      report.reportDate,
    ),

    generalNotes: report.generalNotes,

    createdAt: report.createdAt.toISOString(),

    createdBy: {
      id: report.createdBy.id,
      name: report.createdBy.name,
    },

    checks: report.checks,
  };
}