import "server-only";

import { prisma } from "@/lib/prisma";

type GetUserDashboardParams = {
  from: Date;
  toExclusive: Date;
};

function calculatePercentageChange(
  current: number,
  previous: number,
): number | null {
  if (previous === 0) {
    return null;
  }

  return Number(
    (((current - previous) / previous) * 100).toFixed(1),
  );
}

export async function getUserDashboard({
  from,
  toExclusive,
}: GetUserDashboardParams) {
  const periodDurationMs =
    toExclusive.getTime() - from.getTime();

  const previousFrom = new Date(
    from.getTime() - periodDurationMs,
  );

  const previousToExclusive = from;

  const [
    totalUsers,
    activeUsers,
    inactiveUsers,
    newUsers,
    previousPeriodNewUsers,
  ] = await prisma.$transaction([
    prisma.user.count(),

    prisma.user.count({
      where: {
        isActive: true,
      },
    }),

    prisma.user.count({
      where: {
        isActive: false,
      },
    }),

    prisma.user.count({
      where: {
        createdAt: {
          gte: from,
          lt: toExclusive,
        },
      },
    }),

    prisma.user.count({
      where: {
        createdAt: {
          gte: previousFrom,
          lt: previousToExclusive,
        },
      },
    }),
  ]);

  const newUsersChange = calculatePercentageChange(
    newUsers,
    previousPeriodNewUsers,
  );

  return {
    totalUsers,
    activeUsers,
    inactiveUsers,

    newUsers: {
      current: newUsers,
      previous: previousPeriodNewUsers,
      changePercent: newUsersChange,
    },
  };
}