import { z } from "zod";

import {
  officeReportDateRangeSchema,
} from "./office-report-date-range-schema";

export const officeReportListQuerySchema =
  officeReportDateRangeSchema.extend({
    page: z.coerce
      .number()
      .int()
      .min(1)
      .default(1),

    limit: z.coerce
      .number()
      .int()
      .min(1)
      .max(100)
      .default(10),

    sortBy: z
      .enum([
        "reportDate",
        "createdAt",
        "createdBy",
      ])
      .default("reportDate"),

    sortOrder: z
      .enum(["asc", "desc"])
      .default("desc"),
  });

export type OfficeReportListQuery =
  z.infer<
    typeof officeReportListQuerySchema
  >;