import { NextRequest } from "next/server";

import {
  handleApiError,
  successResponse,
} from "@/lib/api-response";

import { requirePermission } from "@/lib/auth/require-permission";

import {
  getOfficeReportById,
} from "@/features/office-reports/services/office-report-service";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: NextRequest,
  { params }: RouteContext,
) {
  try {
    await requirePermission(
      "OFFICE_REPORT_READ",
    );

    const { id } = await params;

    const report =
      await getOfficeReportById(id);

    return successResponse(report, {
      message:
        "Office report fetched successfully.",
    });
  } catch (error) {
    return handleApiError(error);
  }
}