import { NextRequest } from "next/server";

import {
  handleApiError,
  successResponse,
} from "@/lib/api-response";

import {
  requirePermission,
} from "@/lib/auth/require-permission";

import {
  officeReportSummaryQuerySchema,
} from "@/features/office-reports/schemas/office-report-summary-query-schema";

import {
  getOfficeReportSummary,
} from "@/features/office-reports/queries/office-report-summary-queries";

export async function GET(
  request: NextRequest,
) {
  try {
    await requirePermission(
      "OFFICE_REPORT_READ",
    );

    const searchParams =
      request.nextUrl.searchParams;

    const query =
      officeReportSummaryQuerySchema.parse({
        from:
          searchParams.get("from"),
        to:
          searchParams.get("to"),
      });

    const summary =
      await getOfficeReportSummary(
        query,
      );

    return successResponse(
      summary,
      {
        message:
          "Office report summary fetched successfully.",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}