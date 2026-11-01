import { handleApiError, successResponse } from "@/lib/api-response";
import { requirePermission } from "@/lib/auth/require-permission";
import { prisma } from "@/lib/prisma";
import { ROLES } from "@/prisma/generated/prisma/client";
import { LeadAssignmentType } from "@/prisma/generated/prisma/enums";

export async function GET(request: Request) {
  try {
    await requirePermission("LEAD_CREATE");

    const { searchParams } = new URL(request.url);
    const assignmentType = searchParams.get("type");
    const type =
      assignmentType === LeadAssignmentType.TELECALLING
        ? LeadAssignmentType.TELECALLING
        : LeadAssignmentType.COUNSELLING;

    const role = type === LeadAssignmentType.TELECALLING
      ? ROLES.TELECALLER
      : ROLES.COUNSELOR;

    const users = await prisma.user.findMany({
      where: {
        isActive: true,
        OR: [
          { roles: { has: ROLES.ADMIN } },
          {
            roles: { has: role },
            employee: { is: { employmentStatus: "ACTIVE" } },
          },
        ],
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
