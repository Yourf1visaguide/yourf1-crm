import { NextRequest } from "next/server";

import {
  handleApiError,
  successResponse,
} from "@/lib/api-response";
import { requireLeadReadAccess } from "@/features/clients/api/lead-access";

import {
  getLeadInsights,
} from "@/features/clients/queries/lead-insight-queries";
import {
  leadInsightsQuerySchema,
} from "@/features/clients/schemas/lead-insights-schema";


export async function GET(request: NextRequest) {
  try {
    const access = await requireLeadReadAccess(request);
    const searchParams = request.nextUrl.searchParams;

    const query = leadInsightsQuerySchema.parse({
      from: searchParams.get("from"),
      to: searchParams.get("to"),
    });

    const result = await getLeadInsights(
      query,
      access,
    );

    return successResponse(result, {
      message: "Lead insights fetched successfully.",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
