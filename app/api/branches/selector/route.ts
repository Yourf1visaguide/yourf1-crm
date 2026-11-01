import { NextResponse } from "next/server";
import { handleApiError, successResponse } from "@/lib/api-response";
import { getCurrentUserId } from "@/lib/auth/get-current-user-id";
import { getAccessibleBranchIds, hasPermission } from "@/lib/auth/branch-access";
import { PERMISSIONS } from "@/lib/auth/permissions";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: "UNAUTHENTICATED", message: "Authentication is required." } },
        { status: 401 },
      );
    }

    const actor = await prisma.user.findFirst({
      where: { id: userId, isActive: true },
      select: {
        id: true,
        branchId: true,
        roles: true,
        branchAccesses: { select: { branchId: true } },
      },
    });

    if (!actor) {
      return NextResponse.json(
        { success: false, error: { code: "UNAUTHENTICATED", message: "User is not active." } },
        { status: 401 },
      );
    }

    const accessibleIds = getAccessibleBranchIds(actor);
    const branches = await prisma.branch.findMany({
      where: {
        isActive: true,
        ...(accessibleIds === null ? {} : { id: { in: accessibleIds } }),
      },
      select: { id: true, branchCode: true, name: true, city: true, state: true },
      orderBy: [{ name: "asc" }, { id: "asc" }],
    });

    return successResponse({
      branches,
      primaryBranchId: actor.branchId,
      canSelectAll: hasPermission(actor.roles, PERMISSIONS.BRANCH_ACCESS_ALL),
    }, { message: "Branch options fetched successfully." });
  } catch (error) {
    return handleApiError(error);
  }
}
