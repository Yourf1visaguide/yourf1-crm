import { NextRequest } from "next/server";

import { ApiError } from "@/lib/api-error";
import {
  handleApiError,
  successResponse,
} from "@/lib/api-response";
import { requirePermission } from "@/lib/auth/require-permission";

import {
  getLeadSummary,
} from "@/features/clients/queries/lead-summary-queries";
import {
  leadSummaryQuerySchema,
} from "@/features/clients/schemas/lead-summary-schema";

async function requireLeadReadAccess() {
  try {
    const user = await requirePermission("LEAD_READ_ALL");

    return {
      userId: user.id,
      canReadAll: true,
    };
  } catch (error) {
    if (!(error instanceof ApiError) || error.code !== "FORBIDDEN") {
      throw error;
    }

    const user = await requirePermission("LEAD_READ_ASSIGNED");

    return {
      userId: user.id,
      canReadAll: false,
    };
  }
}

export async function GET(request: NextRequest) {
  try {
    const access = await requireLeadReadAccess();
    const searchParams = request.nextUrl.searchParams;

    const query = leadSummaryQuerySchema.parse({
      from: searchParams.get("from"),
      to: searchParams.get("to"),
    });

    const summary = await getLeadSummary(
      query,
      access,
    );

    return successResponse(summary, {
      message: "Lead summary fetched successfully.",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
