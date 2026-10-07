import { NextRequest } from "next/server";

import { z } from "zod";

import {
  handleApiError,
  successResponse,
} from "@/lib/api-response";

import { ApiError } from "@/lib/api-error";
import { requirePermission } from "@/lib/auth/require-permission";
import { prisma } from "@/lib/prisma";

const deactivateUsersSchema = z.object({
  employeeIds: z
    .array(z.string().min(1))
    .min(1, "Select at least one employee.")
    .max(100, "You can deactivate up to 100 employees at once.")
    .refine(
      (ids) => new Set(ids).size === ids.length,
      "Duplicate employee IDs are not allowed.",
    ),
});

export async function POST(request: NextRequest) {
  try {
    const currentUser = await requirePermission(
      "EMPLOYEE_DELETE",
    );

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

    const { employeeIds } =
      deactivateUsersSchema.parse(body);

    const result = await prisma.$transaction(
      async (tx) => {
        const employees =
          await tx.employee.findMany({
            where: {
              id: {
                in: employeeIds,
              },
            },
            select: {
              id: true,
              userId: true,
              employmentStatus: true,
            },
          });

        if (employees.length !== employeeIds.length) {
          throw new ApiError(
            "NOT_FOUND",
            "One or more selected employees could not be found.",
            404,
          );
        }

        const userIds = employees.map(
          (employee) => employee.userId,
        );

        // Prevent an administrator from accidentally
        // removing their own access.
        if (userIds.includes(currentUser.id)) {
          throw new ApiError(
            "SELF_DEACTIVATION_NOT_ALLOWED",
            "You cannot deactivate your own account.",
            400,
          );
        }

        const activeEmployees = employees.filter(
          (employee) =>
            employee.employmentStatus === "ACTIVE",
        );

        if (activeEmployees.length === 0) {
          return {
            count: 0,
          };
        }

        const activeEmployeeIds =
          activeEmployees.map(
            (employee) => employee.id,
          );

        const activeUserIds =
          activeEmployees.map(
            (employee) => employee.userId,
          );

        await tx.employee.updateMany({
          where: {
            id: {
              in: activeEmployeeIds,
            },
          },
          data: {
            employmentStatus: "INACTIVE",
          },
        });

        await tx.user.updateMany({
          where: {
            id: {
              in: activeUserIds,
            },
          },
          data: {
            isActive: false,
          },
        });

        // Revoke existing Better Auth sessions
        // immediately.
        await tx.session.deleteMany({
          where: {
            userId: {
              in: activeUserIds,
            },
          },
        });

        return {
          count: activeEmployees.length,
        };
      },
    );

    return successResponse(result, {
      message: `${result.count} employee${
        result.count === 1 ? "" : "s"
      } deactivated successfully.`,
    });
  } catch (error) {
    return handleApiError(error);
  }
}