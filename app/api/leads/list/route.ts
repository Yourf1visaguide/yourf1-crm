import { NextRequest } from "next/server";

import {
  handleApiError,
  successResponse,
} from "@/lib/api-response";
import { ApiError } from "@/lib/api-error";
import { requirePermission } from "@/lib/auth/require-permission";

import {
  leadListQuerySchema,
} from "@/features/leads/schemas/lead-list-schema";
import {
  getLeads,
} from "@/features/leads/queries/lead-queries";

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

    const query = leadListQuerySchema.parse({
      from: searchParams.get("from"),
      to: searchParams.get("to"),

      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,

      search: searchParams.get("search") ?? undefined,

      status: searchParams.get("status") ?? undefined,
      applicationType:
        searchParams.get("applicationType") ?? undefined,
      preferredCountry:
        searchParams.get("preferredCountry") ?? undefined,

      sortBy: searchParams.get("sortBy") ?? undefined,
      sortOrder: searchParams.get("sortOrder") ?? undefined,
    });

    const result = await getLeads(query, access);

    return successResponse(result, {
      message: "Leads fetched successfully.",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
