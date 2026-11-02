import { NextRequest } from "next/server";

import { handleApiError, successResponse } from "@/lib/api-response";
import { ApiError } from "@/lib/api-error";
import { requirePermission } from "@/lib/auth/require-permission";
import { resolveRequestBranchContext } from "@/lib/auth/resolve-branch-context";
import { createLeadSchema } from "@/features/clients/schemas/leads-schema";
import { createLead } from "@/features/clients/services/lead-service";

export async function POST(request: NextRequest) {
  try {
    const actor = await requirePermission("LEAD_CREATE");
    const branchContext = await resolveRequestBranchContext(request, actor);

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return handleApiError(new ApiError("INVALID_JSON", "Invalid JSON body.", 400));
    }

    const data = createLeadSchema.parse(body);

    // A single-branch context must match the branch submitted by the form.
    // In ALL mode the service still verifies the actor's branch permissions.
    if (branchContext.branchId && data.branchId !== branchContext.branchId) {
      throw new ApiError("FORBIDDEN", "The submitted lead branch does not match your selected branch.", 403);
    }

    const lead = await createLead(data, actor);

    return successResponse(lead, {
      status: 201,
      message: "Lead created successfully.",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
