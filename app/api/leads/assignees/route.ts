import { handleApiError, successResponse } from "@/lib/api-response";
import { requirePermission } from "@/lib/auth/require-permission";
import { prisma } from "@/lib/prisma";
import { ROLES } from "@/prisma/generated/prisma/client";

export async function GET() {
  try {
    await requirePermission("LEAD_CREATE");

    const users = await prisma.user.findMany({
      where: {
        isActive: true,
        OR: [
          { roles: { has: ROLES.ADMIN } },
          {
            roles: { has: ROLES.COUNSELOR },
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

    return successResponse(users, { message: "Lead assignees fetched successfully." });
  } catch (error) {
    return handleApiError(error);
  }
}
