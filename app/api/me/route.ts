import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  handleApiError,
  successResponse,
} from "@/lib/api-response";
import { ApiError } from "@/lib/api-error";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    console.log(session);
    if (!session) {
      throw new ApiError(
        "UNAUTHENTICATED",
        "Authentication required",
        401,
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        isActive: true,
        roles: true,

        employee: {
          select: {
            id: true,
            employeeCode: true,
            department: true,
            designation: true,
            employmentStatus: true,
          },
        },
      },
    });
    console.log(user);
    if (!user) {
      throw new ApiError(
        "UNAUTHENTICATED",
        "User account no longer exists.",
        401,
      );
    }

    if (!user.isActive) {
      throw new ApiError(
        "FORBIDDEN",
        "Your account has been disabled.",
        403,
      );
    }

    return successResponse(user, {
      message: "User fetched successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}