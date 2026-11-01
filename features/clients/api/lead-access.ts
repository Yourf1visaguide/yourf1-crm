import "server-only";

import type { NextRequest } from "next/server";

import { ApiError } from "@/lib/api-error";
import { requirePermission } from "@/lib/auth/require-permission";
import { resolveRequestBranchContext } from "@/lib/auth/resolve-branch-context";
import type { BranchAccessActor } from "@/lib/auth/branch-access";

export type LeadBranchAccess = {
  userId: string;
  canReadAll: boolean;
  /** null means all branches; otherwise queries must match this branch exactly. */
  branchId: string | null;
};

export async function requireLeadReadAccess(
  request: NextRequest,
): Promise<LeadBranchAccess> {
  let actor: Awaited<ReturnType<typeof requirePermission>> & BranchAccessActor;
  let canReadAll = true;

  try {
    actor = await requirePermission("LEAD_READ_ALL");
  } catch (error) {
    if (!(error instanceof ApiError) || error.code !== "FORBIDDEN") {
      throw error;
    }

    actor = await requirePermission("LEAD_READ_ASSIGNED");
    canReadAll = false;
  }

  const branchContext = await resolveRequestBranchContext(request, actor);

  return {
    userId: actor.id,
    canReadAll,
    branchId: branchContext.branchId,
  };
}
