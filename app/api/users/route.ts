import { NextRequest } from "next/server";

import { employeeFormSchema } from "@/features/users/schemas/user-schema";

import { requirePermission } from "@/lib/auth/require-permission";
import { PERMISSIONS } from "@/lib/auth/permissions";

import { ApiError } from "@/lib/api-error";
import {
  handleApiError,
  successResponse,
} from "@/lib/api-response";

import { createEmployee } from "@/features/users/services/employee-service";
import { getEmployees } from "@/features/users/queries/employee-queries";

import { ROLES } from "@/prisma/generated/prisma/enums";

// POST /api/employees
export async function POST(request: NextRequest) {
  try {
    const auth = await requirePermission(
      PERMISSIONS.EMPLOYEE_CREATE,
    );

    if (!auth) {
      throw new ApiError(
        "FORBIDDEN",
        "You do not have permission to create employees.",
        403,
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      throw new ApiError(
        "INVALID_JSON",
        "Invalid JSON body.",
        400,
      );
    }

    const data = employeeFormSchema.parse(body);

    // Prevent ordinary employee creators from assigning
    // privileged roles.
    const canAssignRole = await auth.can(
      "employee.roles.manage",
    );

    if (!canAssignRole && data.role !== ROLES.NONE) {
      throw new ApiError(
        "ROLE_ASSIGNMENT_FORBIDDEN",
        "You are not allowed to assign this role.",
        403,
      );
    }

    const employee = await createEmployee(data);

    return successResponse(employee, {
      status: 201,
      message: "Employee created successfully.",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// GET /api/employees?page=1&limit=20&search=rahul
export async function GET(request: NextRequest) {
  try {
    const auth = await requirePermission(
      PERMISSIONS.EMPLOYEE_READ,
    );

    if (!auth) {
      throw new ApiError(
        "FORBIDDEN",
        "You do not have permission to view employees.",
        403,
      );
    }

    const params = request.nextUrl.searchParams;

    const rawPage = Number(params.get("page") ?? 1);
    const rawLimit = Number(params.get("limit") ?? 20);

    if (
      !Number.isInteger(rawPage) ||
      !Number.isInteger(rawLimit)
    ) {
      throw new ApiError(
        "INVALID_PAGINATION",
        "Invalid pagination parameters.",
        400,
      );
    }

    const page = Math.max(1, rawPage);
    const limit = Math.min(100, Math.max(1, rawLimit));

    const search = params.get("search")?.trim();

    const result = await getEmployees({
      page,
      limit,
      search,
    });

    return successResponse(result);
  } catch (error) {
    return handleApiError(error);
  }
}