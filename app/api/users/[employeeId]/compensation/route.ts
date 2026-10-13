import { NextRequest } from "next/server";

import {
  handleApiError,
  successResponse,
} from "@/lib/api-response";

import { requirePermission } from "@/lib/auth/require-permission";

import {
  compensationSchema,
} from "@/features/users/schemas/user-schema";

import {
  changeEmployeeSalary,
} from "@/features/users/services/employee-service";

type RouteContext = {
  params: Promise<{
    employeeId: string;
  }>;
};

export async function POST(
  request: NextRequest,
  { params }: RouteContext,
) {
  try {
    await requirePermission("SALARY_UPDATE");

    const { employeeId } = await params;

    const body = await request.json();

    const data = compensationSchema.parse(body);

    const compensation =
      await changeEmployeeSalary(
        employeeId,
        data,
      );

    return successResponse(compensation, {
      status: 201,
      message: "Salary updated successfully.",
    });
  } catch (error) {
    return handleApiError(error);
  }
}