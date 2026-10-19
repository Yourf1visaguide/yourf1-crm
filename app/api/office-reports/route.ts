import { NextRequest } from "next/server";

import {
  handleApiError,
  successResponse,
} from "@/lib/api-response";

import { ApiError } from "@/lib/api-error";
import { requirePermission } from "@/lib/auth/require-permission";

import { officeReportListQuerySchema } from "@/features/office-reports/schemas/office-report-list-query-schema";
import { createOfficeReportSchema, } from "@/features/office-reports/schemas/office-reports-schema";
import { createOfficeReport, } from "@/features/office-reports/services/office-report-service";
import {getOfficeReports} from "@/features/office-reports/queries/office-report-queries"

export async function POST(
  request: NextRequest,
) {
  try {
    const currentUser =
      await requirePermission(
        "OFFICE_REPORT_CREATE",
      );

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      throw new ApiError(
        "INVALID_JSON",
        "Invalid JSON body.",
        400,
      );
    }

    const data =
      createOfficeReportSchema.parse(body);
    const report =
      await createOfficeReport(
        data,
        currentUser.id,
      );

    return successResponse(report, {
      status: 201,
      message:
        "Office report created successfully.",
    });
  } catch (error) {
    return handleApiError(error);
  }
}


export async function GET(request: NextRequest) {
  try {
    await requirePermission(
      "OFFICE_REPORT_READ",
    );

    const searchParams =
      request.nextUrl.searchParams;

    const query =
      officeReportListQuerySchema.parse({
        from: searchParams.get("from"),
        to: searchParams.get("to"),

        page:
          searchParams.get("page") ??
          undefined,

        limit:
          searchParams.get("limit") ??
          undefined,

        sortBy:
          searchParams.get("sortBy") ??
          undefined,

        sortOrder:
          searchParams.get("sortOrder") ??
          undefined,
      });

    const result =
      await getOfficeReports(query);

    return successResponse(result, {
      message:
        "Office reports fetched successfully.",
    });
  } catch (error) {
    return handleApiError(error);
  }
}