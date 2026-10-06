import "server-only";

import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "./get-current-user-id";
import { ApiError } from "@/lib/api-error";
import {  type Permission } from "./permissions";
import { ROLE_PERMISSIONS } from "./role-permissino-mapping";


export async function requirePermission(
  permission: Permission
) {
  const userId = await getCurrentUserId();

  if (!userId) {
    throw new ApiError(
      "UNAUTHENTICATED",
      "You do not have permission to create employees.",
      401
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      id: true,
      email: true,
      isActive: true,
      roles: true,

      employee: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!user || !user.isActive) {
    throw new ApiError(
      "UNAUTHENTICATED",
      "User is not authenticated or active",
      401
    );
  }

  const roles = user?.roles ?? [];

  const hasPermission = roles.some((role) =>
    ROLE_PERMISSIONS[role].includes(permission)
  );

  if (!hasPermission) {
    throw new ApiError(
      "FORBIDDEN",
      "You do not have permission to perform this action",
      403
    );
  }

  return {
    id: user.id,
    email: user.email,
    employeeId: user.employee?.id ?? null,
    roles,
  };
}