import "server-only";

import { Prisma } from "@/prisma/generated/prisma/client";
import { LeadStatus } from "@/prisma/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

import type { LeadSummaryQuery } from "../schemas/lead-summary-schema";

export type LeadSummaryAccess = {
  userId: string;
  canReadAll: boolean;
};

function officeDateStart(value: string) {
  return new Date(`${value}T00:00:00.000+05:30`);
}

function officeDateEndExclusive(value: string) {
  const date = officeDateStart(value);
  date.setUTCDate(date.getUTCDate() + 1);
  return date;
}

function buildAccessWhere(
  access: LeadSummaryAccess,
): Prisma.LeadWhereInput | undefined {
  if (access.canReadAll) {
    return undefined;
  }

  return {
    assignments: {
      some: {
        assignedToId: access.userId,
        endedAt: null,
      },
    },
  };
}

export async function getLeadSummary(
  query: LeadSummaryQuery,
  access: LeadSummaryAccess,
) {
  const createdAt = {
    gte: officeDateStart(query.from),
    lt: officeDateEndExclusive(query.to),
  };

  const accessWhere = buildAccessWhere(access);
  const baseWhere: Prisma.LeadWhereInput = {
    createdAt,
    ...(accessWhere ?? {}),
  };
const [total, converted, unassigned] = await prisma.$transaction(
  async (tx) => {
    const totalPromise = tx.lead.count({
      where: baseWhere,
    });

    const convertedPromise = tx.lead.count({
      where: {
        AND: [baseWhere, { status: LeadStatus.CONVERTED }],
      },
    });

    const unassignedPromise = access.canReadAll
      ? tx.lead.count({
          where: {
            createdAt,
            assignments: {
              none: { endedAt: null },
            },
          },
        })
      : Promise.resolve(0);

    return Promise.all([
      totalPromise,
      convertedPromise,
      unassignedPromise,
    ]);
  },
);
  const conversionRatePercent =
    total > 0 ? Number(((converted / total) * 100).toFixed(1)) : 0;

  return {
    total,
    converted,
    conversionRatePercent,
    unassigned,
  };
}
