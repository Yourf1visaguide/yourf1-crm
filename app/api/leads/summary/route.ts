import { NextRequest } from "next/server";

import {
  handleApiError,
  successResponse,
} from "@/lib/api-response";
import { requireLeadReadAccess } from "@/features/clients/api/lead-access";

import {
  getLeadSummary,
} from "@/features/clients/queries/lead-summary-queries";
import {
  leadSummaryQuerySchema,
} from "@/features/clients/schemas/lead-summary-schema";


export async function GET(request: NextRequest) {
  try {
    const access = await requireLeadReadAccess(request);
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
