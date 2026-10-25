import "server-only";

import { Prisma } from "@/prisma/generated/prisma/client";
import { Country } from "@/prisma/generated/prisma/enums";
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
      return {
        client: {
          givenName: sortOrder,
        },
      };

    case "phone":
      return {
        client: {
          phone: sortOrder,
        },
      };

    case "status":
      return {
        status: sortOrder,
      };

    case "source":
      return {
        source: sortOrder,
      };

    case "createdAt":
    default:
      return {
        createdAt: sortOrder,
      };
  }
}

function buildSearchWhere(search?: string): Prisma.LeadWhereInput | undefined {
  const value = search?.trim();

  if (!value) {
    return undefined;
  }

  const matchedCountry = getSearchCountry(value);

  return {
    OR: [
      {
        leadCode: {
          contains: value,
          mode: "insensitive",
        },
      },
      {
        client: {
          givenName: {
            contains: value,
            mode: "insensitive",
          },
        },
      },
      {
        client: {
          middleName: {
            contains: value,
            mode: "insensitive",
          },
        },
      },
      {
        client: {
          surname: {
            contains: value,
            mode: "insensitive",
          },
        },
      },
      {
        client: {
          phone: {
            contains: value,
            mode: "insensitive",
          },
        },
      },
      {
        client: {
          email: {
            contains: value,
            mode: "insensitive",
          },
        },
      },
      {
        client: {
          applications: {
            some: {
              otherCountry: {
                contains: value,
                mode: "insensitive",
              },
            },
          },
        },
      },
      ...(matchedCountry
        ? [
            {
              client: {
                applications: {
                  some: {
                    preferredCountry: matchedCountry,
                  },
                },
              },
            },
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
      client: {
        applications: {
          some: applicationWhere,
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
        },
      },
    });
  }

  const searchWhere = buildSearchWhere(query.search);

  if (searchWhere) {
    andConditions.push(searchWhere);
  }

  return {
    AND: andConditions,
  };
}

function addAssignmentCondition(
  where: Prisma.LeadWhereInput,
  scope: LeadListQuery["assignmentScope"],
): Prisma.LeadWhereInput {
  if (scope === "ASSIGNED") {
    return {
      AND: [
        where,
        {
          assignments: {
            some: {
              endedAt: null,
            },
          },
        },
      ],
    };
  }

  if (scope === "UNASSIGNED") {
    return {
      AND: [
        where,
        {
          assignments: {
            none: {
              endedAt: null,
            },
          },
        },
      ],
    };
  }

  return where;
}

function addStatusCondition(
  where: Prisma.LeadWhereInput,
  status: LeadListQuery["status"],
): Prisma.LeadWhereInput {
  return status
    ? {
        AND: [
          where,
          {
            status,
          },
        ],
      }
    : where;
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
    status: {
      NEW: number;
      NOT_PICKED: number;
      JUST_INFO: number;
      NOT_INTERESTED: number;
      CONVERTED: number;
    };
  };
}> {
  const commonWhere = buildCommonWhere(query, access);

  const filteredWhere = addAssignmentCondition(
    addStatusCondition(commonWhere, query.status),
    query.assignmentScope,
  );

  const orderBy = getOrderBy(query.sortBy, query.sortOrder);

  const applicationWhereForList =
    query.applicationType || query.preferredCountry
      ? {
          ...(query.applicationType ? { type: query.applicationType } : {}),
          ...(query.preferredCountry
            ? { preferredCountry: query.preferredCountry }
            : {}),
        }
      : undefined;

  const [
    leads,
    total,
    allCount,
    assignedCount,
    unassignedCount,
    newCount,
    notPickedCount,
    justInfoCount,
    notInterestedCount,
    convertedCount,
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

              applications: {
                ...(applicationWhereForList
                  ? { where: applicationWhereForList }
                  : {}),
                orderBy: {
                  createdAt: "desc",
                },
                take: 1,
                select: {
                  type: true,
                },
              },
            },
          },

          assignments: {
            where: {
              endedAt: null,
            },
            orderBy: {
              assignedAt: "desc",
            },
            take: 1,
            select: {
              assignedTo: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },

        orderBy: [
          orderBy,
          {
            id: "asc",
          },
        ],

        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),

      prisma.lead.count({
        where: filteredWhere,
      }),

      prisma.lead.count({
        where: commonWhere,
      }),

      prisma.lead.count({
        where: {
          AND: [
            commonWhere,
            {
              assignments: {
                some: {
                  endedAt: null,
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
                },
              },
            },
          ],
        },
      }),

      prisma.lead.count({
        where: {
          AND: [commonWhere, { status: "NEW" }],
        },
      }),

      prisma.lead.count({
        where: {
          AND: [commonWhere, { status: "NOT_PICKED" }],
        },
      }),

      prisma.lead.count({
        where: {
          AND: [commonWhere, { status: "JUST_INFO" }],
        },
      }),

      prisma.lead.count({
        where: {
          AND: [commonWhere, { status: "NOT_INTERESTED" }],
        },
      }),

      prisma.lead.count({
        where: {
          AND: [commonWhere, { status: "CONVERTED" }],
        },
      }),
    ]);

  const statusCounts = {
    NEW: newCount,
    NOT_PICKED: notPickedCount,
    JUST_INFO: justInfoCount,
    NOT_INTERESTED: notInterestedCount,
    CONVERTED: convertedCount,
  };

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

        applicationType: lead.client.applications[0]?.type ?? null,

        status: lead.status,
        source: lead.source,

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
      status: statusCounts,
    },
  };
}
