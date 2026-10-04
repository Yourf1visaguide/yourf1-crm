// lib/auth/require-permission.ts

import "server-only";

import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth/session";
import { ApiError } from "@/lib/api-error";
import { PERMISSIONS, type Permission } from "./permissions";
import { ROLES } from "@/prisma/generated/prisma/client";

const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: Object.values(PERMISSIONS),

  [ROLES.RECEPTION]: [
    PERMISSIONS.LEAD_READ_ASSIGNED,
    PERMISSIONS.EMPLOYEE_READ,
  ],

  [ROLES.TELECALLER]: [
    PERMISSIONS.LEAD_READ_ASSIGNED,
    PERMISSIONS.LEAD_CREATE,
    PERMISSIONS.LEAD_UPDATE,
  ],

  [ROLES.COUNSELOR]: [
    PERMISSIONS.LEAD_READ_ASSIGNED,
    PERMISSIONS.LEAD_UPDATE,
    PERMISSIONS.APPLICATION_READ_ASSIGNED,
    PERMISSIONS.APPLICATION_UPDATE,
  ],

  [ROLES.TEACHER]: [
    PERMISSIONS.APPLICATION_READ_ASSIGNED,
    PERMISSIONS.APPLICATION_UPDATE,
  ],

  [ROLES.FILING]: [
    PERMISSIONS.APPLICATION_READ_ASSIGNED,
    PERMISSIONS.APPLICATION_UPDATE,
    PERMISSIONS.DOCUMENT_READ,
    PERMISSIONS.DOCUMENT_UPLOAD,
    PERMISSIONS.CREDENTIAL_READ,
  ],

  [ROLES.FINANCE]: [
    PERMISSIONS.INVOICE_READ,
    PERMISSIONS.INVOICE_CREATE,
    PERMISSIONS.INVOICE_UPDATE,

    PERMISSIONS.PAYMENT_READ,
    PERMISSIONS.PAYMENT_CREATE,

    PERMISSIONS.EXPENSE_READ,
    PERMISSIONS.EXPENSE_CREATE,

    PERMISSIONS.FINANCE_REPORT_READ,
    PERMISSIONS.COMMISSION_READ,
  ],

  [ROLES.MARKETING]: [
    PERMISSIONS.LEAD_READ_ALL,
    PERMISSIONS.LEAD_CREATE,
    PERMISSIONS.LEAD_UPDATE,
  ],

  [ROLES.HR]: [
    // Employee management
    PERMISSIONS.EMPLOYEE_READ,
    PERMISSIONS.EMPLOYEE_CREATE,
    PERMISSIONS.EMPLOYEE_UPDATE,
    PERMISSIONS.EMPLOYEE_ROLE_MANAGE,

    // Salary
    PERMISSIONS.SALARY_READ,
    PERMISSIONS.SALARY_UPDATE,

    // Attendance
    PERMISSIONS.ATTENDANCE_READ,
    PERMISSIONS.ATTENDANCE_UPDATE,

    // HR
    PERMISSIONS.HR_READ,
    PERMISSIONS.HR_CREATE,

    // Employee commissions
    PERMISSIONS.COMMISSION_READ,
  ],
} satisfies Record<ROLES, readonly Permission[]>;

export async function requirePermission(
  permission: Permission
) {
  const userId = await getCurrentUserId();

  if (!userId) {
    throw new ApiError(
      "UNAUTHENTICATED",
      "Authentication required",
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

      employee: {
        select: {
          id: true,
          role: true,
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

  const roles = user.employee?.role ?? [];

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