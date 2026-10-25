import { NextRequest } from "next/server";

import {
  handleApiError,
  successResponse,
} from "@/lib/api-response";

import { requirePermission } from "@/lib/auth/require-permission";

import {
  workScheduleSchema,
} from "@/features/users/schemas/user-schema";

import {
  changeEmployeeSchedule,
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
    await requirePermission("EMPLOYEE_UPDATE");

    const { employeeId } = await params;

    const body = await request.json();

    const data = workScheduleSchema.parse(body);

    const schedule =
      await changeEmployeeSchedule(
        employeeId,
        data,
      );

    return successResponse(schedule, {
      status: 201,
      message: "Schedule updated successfully.",
    });
  } catch (error) {
    return handleApiError(error);
  }
}