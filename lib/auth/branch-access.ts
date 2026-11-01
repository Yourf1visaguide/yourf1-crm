import "server-only";

import {
  Prisma,
  ROLES,
} from "@/prisma/generated/prisma/client";
import { PERMISSIONS, type Permission } from "./permissions";
import { ROLE_PERMISSIONS } from "./role-permission-mapping";
import { ApiError } from "@/lib/api-error";

export type BranchAccessActor = {
  branchId: string | null;
  branchAccesses: {
    branchId: string;
  }[];
  roles: ROLES[];
};

/**
 * Checks whether one of the actor's roles grants a permission.
 */
export function hasPermission(
  roles: ROLES[],
  permission: Permission,
): boolean {
  return roles.some((role) =>
    ROLE_PERMISSIONS[role]?.includes(permission),
  );
}

/**
 * Returns:
 * - null: unrestricted access to all branches.
 * - string[]: only the listed branches are accessible.
 *
 * An empty array means no branch access.
 */
export function getAccessibleBranchIds(
  actor: BranchAccessActor,
): string[] | null {
  if (
    hasPermission(actor.roles, PERMISSIONS.BRANCH_ACCESS_ALL)
  ) {
    return null;
  }

  const branchIds = new Set<string>();

  if (actor.branchId) {
    branchIds.add(actor.branchId);
  }

  for (const access of actor.branchAccesses) {
    branchIds.add(access.branchId);
  }

  return [...branchIds];
}

/**
 * Validates that a branch exists and is active.
 */
export async function assertActiveBranch(
  tx: Prisma.TransactionClient,
  branchId: string,
) {
  const branch = await tx.branch.findFirst({
    where: {
      id: branchId,
      isActive: true,
    },
    select: {
      id: true,
    },
  });

  if (!branch) {
    throw new ApiError(
      "BAD_REQUEST",
      "Selected branch does not exist or is inactive.",
      400,
    );
  }
}