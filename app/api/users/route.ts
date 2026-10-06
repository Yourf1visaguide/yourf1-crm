import { NextRequest } from "next/server";

import {
  handleApiError,
  successResponse,
} from "@/lib/api-response";

import { ApiError } from "@/lib/api-error";
import { requirePermission } from "@/lib/auth/require-permission";

import { employeeFormSchema } from "@/features/users/schemas/user-schema";
import { createEmployee } from "@/features/users/services/employee-service";
import { getEmployees } from "@/features/users/queries/employee-queries";

export async function POST(request: NextRequest) {
  try {
    await requirePermission("EMPLOYEE_CREATE");

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return handleApiError(
        new ApiError(
          "INVALID_JSON",
          "Invalid JSON body.",
          400,
        ),
      );
    }

    const data = employeeFormSchema.parse(body);

    const employee = await createEmployee(data);

    return successResponse(employee, {
      status: 201,
      message: "Employee created successfully.",
    });
  } catch (error) {
    return handleApiError(error);
  }
}