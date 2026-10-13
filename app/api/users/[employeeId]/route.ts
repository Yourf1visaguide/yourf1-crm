import { NextRequest } from "next/server";

import { ApiError } from "@/lib/api-error";
import {
  handleApiError,
  successResponse,
} from "@/lib/api-response";
import {
  editEmployeeFormSchema,
} from "@/features/users/schemas/user-schema";

import {
  updateEmployee,
} from "@/features/users/services/employee-service";
import { requirePermission } from "@/lib/auth/require-permission";
type RouteContext = {
  params: Promise<{
    employeeId: string;
  }>;
};

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const actor = await requirePermission(
      "EMPLOYEE_UPDATE",
    );

    const { employeeId } = await params;

    const body = await request.json();

    const data = editEmployeeFormSchema.parse(body);

    const employee = await updateEmployee(
      employeeId,
      data,
      actor,
    );

    return successResponse(employee, {
      message: "Employee updated successfully.",
    });
  } catch (error) {
    return handleApiError(error);
  }
}