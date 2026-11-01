import "server-only";

import { ApiError } from "@/lib/api-error";
import { prisma } from "@/lib/prisma";
import { getAccessibleBranchIds, hasPermission, type BranchAccessActor } from "@/lib/auth/branch-access";
import { PERMISSIONS } from "@/lib/auth/permissions";
import type { NextRequest } from "next/server";

export type BranchContext =
  | { mode: "SINGLE"; branchId: string; branchIds: string[] }
  | { mode: "ALL"; branchId: null; branchIds: null };

export async function resolveBranchContext(actor: BranchAccessActor, requestedBranchId: string | null): Promise<BranchContext> {
  if (requestedBranchId === "all") {
    if (!hasPermission(actor.roles, PERMISSIONS.BRANCH_ACCESS_ALL)) throw new ApiError("FORBIDDEN", "You are not allowed to view data across all branches.", 403);
    return { mode: "ALL", branchId: null, branchIds: null };
  }
  const branchId = requestedBranchId ?? actor.branchId;
  if (!branchId) throw new ApiError("FORBIDDEN", "Your account does not have a primary branch assigned.", 403);
  const accessibleIds = getAccessibleBranchIds(actor);
  if (accessibleIds !== null && !accessibleIds.includes(branchId)) throw new ApiError("FORBIDDEN", "You do not have access to the selected branch.", 403);
  const branch = await prisma.branch.findFirst({ where: { id: branchId, isActive: true }, select: { id: true } });
  if (!branch) throw new ApiError("BAD_REQUEST", "The selected branch does not exist or is inactive.", 400);
  return { mode: "SINGLE", branchId, branchIds: [branchId] };
}

/** Resolve branch context from the client header. Call only after authenticating the actor. */
export function getRequestedBranchId(request: NextRequest): string | null {
  const value = request.headers.get("x-branch-id");
  return value?.trim() || null;
}

export async function resolveRequestBranchContext(request: NextRequest, actor: BranchAccessActor): Promise<BranchContext> {
  return resolveBranchContext(actor, getRequestedBranchId(request));
}
