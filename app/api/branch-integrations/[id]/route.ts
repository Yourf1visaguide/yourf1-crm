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
  updateBranchIntegrationSchema,
} from "@/features/branch-integrations/schemas/branch-integration-schema";

import {
  deleteBranchIntegration,
  updateBranchIntegration,
} from "@/features/branch-integrations/services/branch-integration-service";

type RouteContext = {
  params: Promise<{ id: string }>;
};

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

async function getAuthorizedIntegrationBranch(
  id: string,
  actor: Awaited<ReturnType<typeof requirePermission>>,
) {
  const integration =
    await prisma.branchIntegrationEndpoint.findUnique({
      where: { id },
      select: {
        id: true,
        branchId: true,
      },
    });

  if (!integration) {
    throw new ApiError(
      "NOT_FOUND",
      "Integration configuration was not found.",
      404,
    );
  }

  await resolveBranchContext(
    actor,
    integration.branchId,
  );

  return integration;
}

/**
 * PATCH /api/branch-integrations/:id
 */
export async function PATCH(
  request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const actor = await requirePermission("BRANCH_UPDATE");

    const { id } = await params;

    await getAuthorizedIntegrationBranch(id, actor);

    const body = await getRequestBody(request);

    const input = updateBranchIntegrationSchema.parse(body);

    if (Object.keys(input).length === 0) {
      throw new ApiError(
        "BAD_REQUEST",
        "At least one field must be provided.",
        400,
      );
    }

    const integration =
      await updateBranchIntegration(id, input);

    return successResponse(integration, {
      message: "Integration updated successfully.",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE /api/branch-integrations/:id
 */
export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const actor = await requirePermission("BRANCH_UPDATE");

    const { id } = await params;

    await getAuthorizedIntegrationBranch(id, actor);

    const result = await deleteBranchIntegration(id);

    return successResponse(result, {
      message: "Integration deleted successfully.",
    });
  } catch (error) {
    return handleApiError(error);
  }
}