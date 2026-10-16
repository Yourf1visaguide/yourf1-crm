import { z } from "zod";

import { OFFICEREPORTCHECKSTATUS } from "@/prisma/generated/prisma/enums";
import { OFFICE_REPORT_ITEM_KEYS } from "../constants/office-report-checklist";

/* -------------------------------------------------------------------------- */
/* Shared                                                                     */
/* -------------------------------------------------------------------------- */

const dateOnlySchema = z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2}$/,
    "Date must be in YYYY-MM-DD format",
  )
  .refine((value) => {
    const [year, month, day] = value.split("-").map(Number);

    const date = new Date(0);
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCFullYear(year, month - 1, day);

    return (
      date.getUTCFullYear() === year &&
      date.getUTCMonth() === month - 1 &&
      date.getUTCDate() === day
    );
  }, "Enter a valid calendar date");

const optionalText = (max: number) =>
  z.string().trim().max(max).optional().or(z.literal(""));

/* -------------------------------------------------------------------------- */
/* Report check input                                                         */
/* -------------------------------------------------------------------------- */

export const officeReportCheckInputSchema = z
  .object({
    itemKey: z.enum(OFFICE_REPORT_ITEM_KEYS),

    status: z.enum(OFFICEREPORTCHECKSTATUS),

    issueNote: optionalText(1000),

    actionTaken: optionalText(1000),

    followUpRequired: z.boolean(),
  })
  .strict()
  .superRefine((check, ctx) => {
    if (check.status === "ISSUE" && !check.issueNote) {
      ctx.addIssue({
        code: "custom",
        path: ["issueNote"],
        message: "Issue note is required when status is ISSUE.",
      });
    }

    if (check.status === "OK" && check.issueNote) {
      ctx.addIssue({
        code: "custom",
        path: ["issueNote"],
        message: "Issue notes are not allowed when status is OK.",
      });
    }

    if (check.status === "OK" && check.followUpRequired) {
      ctx.addIssue({
        code: "custom",
        path: ["followUpRequired"],
        message: "Follow-up can only be required when status is ISSUE.",
      });
    }
  });

export type OfficeReportCheckInput = z.infer<
  typeof officeReportCheckInputSchema
>;

/* -------------------------------------------------------------------------- */
/* Create report                                                              */
/* -------------------------------------------------------------------------- */

export const createOfficeReportSchema = z
  .object({
    // reportDate: dateOnlySchema,

    generalNotes: optionalText(2000),

    checks: z
      .array(officeReportCheckInputSchema)
      .length(
        OFFICE_REPORT_ITEM_KEYS.length,
        "All checklist items are required.",
      ),
  })
  .strict()
  .superRefine((data, ctx) => {
    const keys = data.checks.map((check) => check.itemKey);

    const uniqueKeys = new Set(keys);

    if (uniqueKeys.size !== keys.length) {
      ctx.addIssue({
        code: "custom",
        path: ["checks"],
        message: "Duplicate checklist items are not allowed.",
      });
    }

    const missingKeys = OFFICE_REPORT_ITEM_KEYS.filter(
      (key) => !uniqueKeys.has(key),
    );

    if (missingKeys.length > 0) {
      ctx.addIssue({
        code: "custom",
        path: ["checks"],
        message: "All checklist items are required.",
      });
    }

    const notCheckedItems = data.checks.filter(
      (check) => check.status === "NOT_CHECKED",
    );

    if (notCheckedItems.length > 0) {
      ctx.addIssue({
        code: "custom",
        path: ["checks"],
        message: "All checklist items must be completed.",
      });
    }
  });

export type CreateOfficeReportInput = z.infer<typeof createOfficeReportSchema>;

/* -------------------------------------------------------------------------- */
/* API response: actor                                                        */
/* -------------------------------------------------------------------------- */

export const officeReportActorSchema = z
  .object({
    id: z.string(),
    name: z.string(),
  })
  .strict();

export type OfficeReportActor = z.infer<typeof officeReportActorSchema>;

/* -------------------------------------------------------------------------- */
/* API response: check                                                        */
/* -------------------------------------------------------------------------- */

export const officeReportCheckResponseSchema = z
  .object({
    id: z.string(),

    /*
     * Keep itemKey as a string in responses.
     * Historical data may contain an item that is later renamed/removed.
     */
    itemKey: z.string(),
    category: z.string(),
    label: z.string(),

    status: z.enum(OFFICEREPORTCHECKSTATUS),

    issueNote: z.string().nullable(),
    actionTaken: z.string().nullable(),

    followUpRequired: z.boolean(),
  })
  .strict();

export type OfficeReportCheck = z.infer<typeof officeReportCheckResponseSchema>;

/* -------------------------------------------------------------------------- */
/* API response: report                                                       */
/* -------------------------------------------------------------------------- */

export const officeReportSchema = z
  .object({
    id: z.string(),

    reportDate: z.string(),

    generalNotes: z.string().nullable(),

    createdAt: z.string(),

    createdBy: officeReportActorSchema,

    checks: z.array(officeReportCheckResponseSchema),
  })
  .strict();

export type OfficeReport = z.infer<typeof officeReportSchema>;

/* -------------------------------------------------------------------------- */
/* API response: list item                                                    */
/* -------------------------------------------------------------------------- */

export const officeReportListItemSchema = z
  .object({
    id: z.string(),

    reportDate: z.string(),

    generalNotes: z.string().nullable(),

    createdAt: z.string(),

    createdBy: officeReportActorSchema,
  })
  .strict();

export type OfficeReportListItem = z.infer<typeof officeReportListItemSchema>;

/* -------------------------------------------------------------------------- */
/* API response: paginated list                                               */
/* -------------------------------------------------------------------------- */

export const officeReportListResponseSchema = z
  .object({
    reports: z.array(officeReportListItemSchema),

    pagination: z
      .object({
        page: z.number(),
        limit: z.number(),
        total: z.number(),
        totalPages: z.number(),
      })
      .strict(),
  })
  .strict();

export type OfficeReportListResponse = z.infer<
  typeof officeReportListResponseSchema
>;

/* -------------------------------------------------------------------------- */
/* API response: dashboard summary                                            */
/* -------------------------------------------------------------------------- */

export const officeReportSummarySchema = z
  .object({
    reportsCreated: z.number(),
    issuesReported: z.number(),
    cleanDays: z.number(),
    followUps: z.number(),
  })
  .strict();

export type OfficeReportSummary = z.infer<typeof officeReportSummarySchema>;
