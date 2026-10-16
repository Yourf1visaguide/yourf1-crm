import { NextRequest } from "next/server";

import {
  handleApiError,
  successResponse,
} from "@/lib/api-response";

import { ApiError } from "@/lib/api-error";
import { requirePermission } from "@/lib/auth/require-permission";

import {
  createOfficeReportSchema,
} from "@/features/office-reports/schemas/office-reports-schema";

import {
  createOfficeReport,
} from "@/features/office-reports/services/office-report-service";

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