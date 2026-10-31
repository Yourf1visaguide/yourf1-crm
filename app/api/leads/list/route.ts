import { NextRequest } from "next/server";

import { handleApiError, successResponse } from "@/lib/api-response";
import { ApiError } from "@/lib/api-error";
import { requirePermission } from "@/lib/auth/require-permission";
import { getLeads } from "@/features/clients/queries/lead-queries";
import { leadListQuerySchema } from "@/features/clients/schemas/lead-list-schema";

export async function GET(request: NextRequest) {
  try {
    let actor;
    let canReadAll = true;

    try {
      actor = await requirePermission("LEAD_READ_ALL");
    } catch {
      try {
        actor = await requirePermission("LEAD_READ_ASSIGNED");
        canReadAll = false;
      } catch {
        throw new ApiError("FORBIDDEN", "You are not allowed to view leads.", 403);
      }
    }

    const query = leadListQuerySchema.parse(
      Object.fromEntries(request.nextUrl.searchParams.entries()),
    );

    const result = await getLeads(query, {
      userId: actor.id,
      canReadAll,
    });

    return successResponse(result, { message: "Leads fetched successfully." });
  } catch (error) {
    return handleApiError(error);
  }
}
