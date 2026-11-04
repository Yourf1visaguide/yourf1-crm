import { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import { ApiError } from "@/lib/api-error";
import {
  handleApiError,
  successResponse,
} from "@/lib/api-response";

import { requirePermission } from "@/lib/auth/require-permission";
import { resolveBranchContext } from "@/lib/auth/resolve-branch-context";

import {
  createBranchIntegrationSchema,
} from "@/features/branch-integrations/schemas/branch-integration-schema";

import {
  createBranchIntegration,
  listBranchIntegrations,
} from "@/features/branch-integrations/services/branch-integration-service";

async function getRequestBody(request: NextRequest) {
  try {
    return await request.json();
  } catch {
    throw new ApiError(
      "INVALID_JSON",
      "Invalid JSON request body.",
      400,
    );
  }
}

/**
 * GET /api/branch-integrations?branchId=...
 *
 * Requires BRANCH_READ and access to the requested branch.
 */
export async function GET(request: NextRequest) {
  try {
    const actor = await requirePermission("BRANCH_READ");

    const requestedBranchId =
      request.nextUrl.searchParams.get("branchId");

    if (!requestedBranchId) {
      throw new ApiError(
        "BAD_REQUEST",
        "branchId is required.",
        400,
      );
    }

    const context = await resolveBranchContext(
      actor,
      requestedBranchId,
    );

    const integrations =
      await prisma.branchIntegrationEndpoint.findMany({
        where: {
          ...(context.branchId
            ? { branchId: context.branchId }
            : {}),
          branch: {
            isActive: true,
          },
        },
        include: {
          branch: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: [
          { provider: "asc" },
          { createdAt: "desc" },
        ],
      });

    const safeIntegrations = integrations.map(
      ({
        credentialsEncrypted,
        ...integration
      }) => ({
        ...integration,
        hasCredentials: Boolean(credentialsEncrypted),
      }),
    );

    return successResponse(safeIntegrations, {
      message: "Branch integrations fetched successfully.",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/branch-integrations
 *
 * Requires BRANCH_UPDATE and access to the target branch.
 */


export async function POST(request: NextRequest) {
  try {
    const actor = await requirePermission("BRANCH_UPDATE");

    const body = await getRequestBody(request);

    const input = createBranchIntegrationSchema.parse(body);

    await resolveBranchContext(actor, input.branchId);

    const integration =
      await createBranchIntegration(input);

    return successResponse(integration, {
      message: "Integration configured successfully.",
      status: 201,
    });
  } catch (error) {
    return handleApiError(error);
  }
}




