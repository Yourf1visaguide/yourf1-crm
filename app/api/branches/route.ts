import { NextRequest } from "next/server";
import { handleApiError, successResponse } from "@/lib/api-response";
import { requirePermission } from "@/lib/auth/require-permission";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    await requirePermission("BRANCH_READ");
    const activeOnly = request.nextUrl.searchParams.get("active") === "true";

    const branches = await prisma.branch.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      select: {
        id: true,
        branchCode: true,
        name: true,
        city: true,
        state: true,
      },
      orderBy: [{ name: "asc" }, { id: "asc" }],
    });

    return successResponse(branches, { message: "Branches fetched successfully." });
  } catch (error) {
    return handleApiError(error);
  }
}
