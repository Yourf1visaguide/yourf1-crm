import { NextRequest } from "next/server";

import { handleApiError, successResponse } from "@/lib/api-response";
import { ApiError } from "@/lib/api-error";
import { requirePermission } from "@/lib/auth/require-permission";
import { createLeadSchema } from "@/features/clients/schemas/leads-schema";
import { createLead } from "@/features/clients/services/lead-service";

export async function POST(request: NextRequest) {
  try {
    const actor = await requirePermission("LEAD_CREATE");

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return handleApiError(new ApiError("INVALID_JSON", "Invalid JSON body.", 400));
    }

    const data = createLeadSchema.parse(body);
    const lead = await createLead(data, { id: actor.id });

    return successResponse(lead, {
      status: 201,
      message: "Lead created successfully.",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
