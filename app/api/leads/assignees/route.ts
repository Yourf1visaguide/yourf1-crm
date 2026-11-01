import { NextRequest } from "next/server";

import { handleApiError, successResponse } from "@/lib/api-response";
import { requirePermission } from "@/lib/auth/require-permission";
import { resolveRequestBranchContext } from "@/lib/auth/resolve-branch-context";
import { prisma } from "@/lib/prisma";
import { ROLES } from "@/prisma/generated/prisma/client";
import { LeadAssignmentType } from "@/prisma/generated/prisma/enums";

export async function GET(request: NextRequest) {
  try {
    const actor = await requirePermission("LEAD_CREATE");
    const branchContext = await resolveRequestBranchContext(request, actor);

    const assignmentType = request.nextUrl.searchParams.get("type");
    const type =
      assignmentType === LeadAssignmentType.TELECALLING
        ? LeadAssignmentType.TELECALLING
        : LeadAssignmentType.COUNSELLING;
    const role =
      type === LeadAssignmentType.TELECALLING
        ? ROLES.TELECALLER
        : ROLES.COUNSELOR;

    const eligibleRoleWhere = {
      OR: [
        { roles: { has: ROLES.ADMIN } },
        {
          roles: { has: role },
          employee: { is: { employmentStatus: "ACTIVE" as const } },
        },
      ],
    };

    const users = await prisma.user.findMany({
      where: {
        isActive: true,
        ...(branchContext.branchId
          ? {
              AND: [
                {
                  OR: [
                    { branchId: branchContext.branchId },
                    {
                      branchAccesses: {
                        some: { branchId: branchContext.branchId },
                      },
                    },
                  ],
                },
                eligibleRoleWhere,
              ],
            }
          : eligibleRoleWhere),
      },
      select: {
        id: true,
        name: true,
        roles: true,
        employee: {
          select: {
            employeeCode: true,
            designation: true,
            department: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });

    return successResponse(users, {
      message: "Lead assignees fetched successfully.",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
