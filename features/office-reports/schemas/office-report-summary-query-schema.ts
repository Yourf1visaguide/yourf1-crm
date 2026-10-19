import {
  officeReportDateRangeSchema,
} from "./office-report-date-range-schema";

export const officeReportSummaryQuerySchema =
  officeReportDateRangeSchema;

export type OfficeReportSummaryQuery =
  typeof officeReportSummaryQuerySchema._output;