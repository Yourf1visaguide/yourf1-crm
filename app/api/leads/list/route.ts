import { NextRequest } from "next/server";

import { handleApiError, successResponse } from "@/lib/api-response";
import { requireLeadReadAccess } from "@/features/clients/api/lead-access";
import { getLeads } from "@/features/clients/queries/lead-queries";
import { leadListQuerySchema } from "@/features/clients/schemas/lead-list-schema";

export async function GET(request: NextRequest) {
  try {
    const access = await requireLeadReadAccess(request);

    const query = leadListQuerySchema.parse(
      Object.fromEntries(request.nextUrl.searchParams.entries()),
    );

    const result = await getLeads(query, access);

    return successResponse(result, { message: "Leads fetched successfully." });
  } catch (error) {
    return handleApiError(error);
  }
}
