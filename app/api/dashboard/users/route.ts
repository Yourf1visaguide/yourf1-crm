import { NextRequest } from "next/server";

import {
  handleApiError,
  successResponse,
} from "@/lib/api-response";

import { requirePermission } from "@/lib/auth/require-permission";

import {
  userDashboardQuerySchema,
} from "@/features/dashboard/schemas/user-dashboard-schema";

import {
  getUserDashboard,
} from "@/features/dashboard/queries/user-dashboard-queries";

const DEFAULT_PERIOD_DAYS = 30;

function getDefaultFrom() {
  const now = new Date();

  const from = new Date(now);

  from.setUTCDate(from.getUTCDate() - DEFAULT_PERIOD_DAYS);

  from.setUTCHours(0, 0, 0, 0);

  return from;
}

function getDefaultToExclusive() {
  const now = new Date();

  const to = new Date(now);

  to.setUTCDate(to.getUTCDate() + 1);

  to.setUTCHours(0, 0, 0, 0);

  return to;
}

export async function GET(request: NextRequest) {
  try {
    await requirePermission("EMPLOYEE_READ");

    const searchParams = Object.fromEntries(
      request.nextUrl.searchParams.entries(),
    );

    const query =
      userDashboardQuerySchema.parse(searchParams);

    const from = query.from
      ? new Date(`${query.from}T00:00:00.000Z`)
      : getDefaultFrom();

    const toExclusive = query.to
      ? new Date(
          new Date(`${query.to}T00:00:00.000Z`).getTime() +
            24 * 60 * 60 * 1000,
        )
      : getDefaultToExclusive();

    const data = await getUserDashboard({
      from,
      toExclusive,
    });

    return successResponse(data, {
      message: "User dashboard data fetched successfully.",
    });
  } catch (error) {
    return handleApiError(error);
  }
}