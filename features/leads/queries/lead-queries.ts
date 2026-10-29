
import "server-only";

import { Prisma } from "@/prisma/generated/prisma/client";
import { Country, LeadStatus } from "@/prisma/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

import type { LeadListItem, LeadListQuery } from "../schemas/lead-list-schema";

export type LeadListAccess = {
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

function formatCountryLabel(value: string) {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function getSearchCountry(search: string) {
  const normalized = search.trim().toLowerCase();

  return Object.values(Country).find(
    (country) => formatCountryLabel(country).toLowerCase() === normalized,
  );
}

function getOrderBy(
  sortBy: LeadListQuery["sortBy"],
  sortOrder: LeadListQuery["sortOrder"],
): Prisma.LeadOrderByWithRelationInput {
  switch (sortBy) {
    case "clientName":
      return { client: { givenName: sortOrder } };
    case "phone":
      return { client: { phone: sortOrder } };
    case "status":
      return { status: sortOrder };
    case "source":
      return { source: sortOrder };
    case "createdAt":
    default:
      return { createdAt: sortOrder };
  }
}

function buildSearchWhere(search?: string): Prisma.LeadWhereInput | undefined {
  const value = search?.trim();
  if (!value) return undefined;

  const matchedCountry = getSearchCountry(value);

  return {
    OR: [
      { leadCode: { contains: value, mode: "insensitive" } },
      { client: { givenName: { contains: value, mode: "insensitive" } } },
      { client: { middleName: { contains: value, mode: "insensitive" } } },
      { client: { surname: { contains: value, mode: "insensitive" } } },
      { client: { phone: { contains: value, mode: "insensitive" } } },
      { client: { email: { contains: value, mode: "insensitive" } } },
      {
        originatedApplication: {
          is: {
            otherCountry: { contains: value, mode: "insensitive" },
          },
        },
      },
      ...(matchedCountry
        ? [
            {
              originatedApplication: {
                is: { preferredCountry: matchedCountry },
              },
            } satisfies Prisma.LeadWhereInput,
          ]
        : []),
    ],
  };
}

function buildCommonWhere(
  query: LeadListQuery,
  access: LeadListAccess,
): Prisma.LeadWhereInput {
  const andConditions: Prisma.LeadWhereInput[] = [
    {
      createdAt: {
        gte: officeDateStart(query.from),
        lt: officeDateEndExclusive(query.to),
      },
    },
  ];

  if (query.applicationType || query.preferredCountry) {
    const applicationWhere: Prisma.ApplicationWhereInput = {};

    if (query.applicationType) {
      applicationWhere.type = query.applicationType;
    }

    if (query.preferredCountry) {
      applicationWhere.preferredCountry = query.preferredCountry;
    }

    andConditions.push({
      originatedApplication: { is: applicationWhere },
    });
  }

  if (query.assignmentType) {
    andConditions.push({
      assignments: {
        some: {
          type: query.assignmentType,
          endedAt: null,
        },
      },
    });
  }

  if (!access.canReadAll) {
    andConditions.push({
      assignments: {
        some: {
          assignedToId: access.userId,
          endedAt: null,
          ...(query.assignmentType ? { type: query.assignmentType } : {}),
        },
      },
    });
  }

  const searchWhere = buildSearchWhere(query.search);

  if (searchWhere) {
    andConditions.push(searchWhere);
  }

  return { AND: andConditions };
}

function addAssignmentCondition(
  where: Prisma.LeadWhereInput,
  scope: LeadListQuery["assignmentScope"],
  assignmentType?: LeadListQuery["assignmentType"],
): Prisma.LeadWhereInput {
  const activeAssignment = {
    endedAt: null,
    ...(assignmentType ? { type: assignmentType } : {}),
  };

  if (scope === "ASSIGNED") {
    return { AND: [where, { assignments: { some: activeAssignment } }] };
  }

  if (scope === "UNASSIGNED") {
    return { AND: [where, { assignments: { none: activeAssignment } }] };
  }

  return where;
}

function addStatusCondition(
  where: Prisma.LeadWhereInput,
  status: LeadListQuery["status"],
): Prisma.LeadWhereInput {
  return status ? { AND: [where, { status }] } : where;
}

export async function getLeads(
  query: LeadListQuery,
  access: LeadListAccess,
): Promise<{
  leads: LeadListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  counts: {
    all: number;
    assigned: number;
    unassigned: number;
    status: Record<LeadStatus, number>;
  };
}> {
  const commonWhere = buildCommonWhere(query, access);

  const filteredWhere = addAssignmentCondition(
    addStatusCondition(commonWhere, query.status),
    query.assignmentScope,
    query.assignmentType,
  );

  const orderBy = getOrderBy(query.sortBy, query.sortOrder);

  const activeAssignmentType = query.assignmentType
    ? { type: query.assignmentType }
    : {};

  const [
    leads,
    total,
    allCount,
    assignedCount,
    unassignedCount,
    statusGroups,
  ] = await prisma.$transaction([
    prisma.lead.findMany({
      where: filteredWhere,
      select: {
        id: true,
        leadCode: true,
        status: true,
        source: true,
        createdAt: true,
        client: {
          select: {
            id: true,
            givenName: true,
            middleName: true,
            surname: true,
            phone: true,
          },
        },
        originatedApplication: {
          select: { type: true },
        },
        assignments: {
          where: {
            endedAt: null,
            ...activeAssignmentType,
          },
          orderBy: { assignedAt: "desc" },
          take: 1,
          select: {
            type: true,
            assignedTo: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: [orderBy, { id: "asc" }],
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    }),

    prisma.lead.count({ where: filteredWhere }),

    prisma.lead.count({ where: commonWhere }),

    prisma.lead.count({
      where: {
        AND: [
          commonWhere,
          {
            assignments: {
              some: {
                endedAt: null,
                ...activeAssignmentType,
              },
            },
          },
        ],
      },
    }),

    prisma.lead.count({
      where: {
        AND: [
          commonWhere,
          {
            assignments: {
              none: {
                endedAt: null,
                ...activeAssignmentType,
              },
            },
          },
        ],
      },
    }),

    prisma.lead.groupBy({
      by: ["status"],
      where: commonWhere,
      _count: {
        _all: true,
      },
      orderBy: {
        status: "asc",
      },
    }),
  ]);

  const statusCountMap = Object.fromEntries(
    Object.values(LeadStatus).map((status) => [status, 0]),
  ) as Record<LeadStatus, number>;

  for (const group of statusGroups) {
    // Prisma's generated groupBy result may infer _count as a boolean
    // or a count object. Narrow the union before accessing _all.
    const count = group._count;

    if (count && typeof count === "object" && "_all" in count) {
      statusCountMap[group.status] = count._all ?? 0;
    }
  }

  return {
    leads: leads.map((lead) => {
      const name = [
        lead.client.givenName,
        lead.client.middleName,
        lead.client.surname,
      ]
        .filter(Boolean)
        .join(" ")
        .trim();

      return {
        id: lead.id,
        leadCode: lead.leadCode,
        clientId: lead.client.id,
        clientName: name || "Unnamed client",
        phone: lead.client.phone,
        applicationType: lead.originatedApplication?.type ?? null,
        status: lead.status,
        source: lead.source,
        assignmentType: lead.assignments[0]?.type ?? null,
        assignedTo: lead.assignments[0]?.assignedTo ?? null,
        createdAt: lead.createdAt.toISOString(),
      };
    }),

    pagination: {
      page: query.page,
      limit: query.limit,
      total,
      totalPages: Math.ceil(total / query.limit),
    },

    counts: {
      all: allCount,
      assigned: assignedCount,
      unassigned: unassignedCount,
      status: statusCountMap,
    },
  };
}
