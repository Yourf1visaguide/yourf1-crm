import "server-only";

import { prisma } from "@/lib/prisma";
import { Prisma, ROLES } from "@/prisma/generated/prisma/client";
import { getAccessibleBranchIds } from "@/lib/auth/branch-access";

import type { EmployeeListQuery } from "@/features/users/schemas/employee-list-schema";


function getOrderBy(
  sortBy: EmployeeListQuery["sortBy"],
  sortOrder: EmployeeListQuery["sortOrder"],
): Prisma.EmployeeOrderByWithRelationInput {
  switch (sortBy) {
    case "employeeCode":
      return {
        employeeCode: sortOrder,
      };

    case "department":
      return {
        department: sortOrder,
      };

    case "designation":
      return {
        designation: sortOrder,
      };

    case "joiningDate":
      return {
        joiningDate: sortOrder,
      };

    case "employmentStatus":
      return {
        employmentStatus: sortOrder,
      };

    case "name":
    default:
      return {
        user: {
          name: sortOrder,
        },
      };
  }
}


type EmployeeListActor = {
  id: string;
  email: string;
  employeeId: string | null;
  roles: ROLES[];
  branchId: string | null;
  branchAccesses: {
    branchId: string;
  }[];
};


export async function getEmployees(
  query: EmployeeListQuery,
  actor: EmployeeListActor,
) {
  const {
    page,
    limit,
    search,
    sortBy,
    sortOrder,
  } = query;

  const normalizedSearch = search?.trim();

const accessibleBranchIds = getAccessibleBranchIds(actor);

const branchWhere: Prisma.EmployeeWhereInput =
  accessibleBranchIds === null
    ? {}
    : {
        user: {
          is: {
            branchId: {
              in: accessibleBranchIds,
            },
          },
        },
      };

const searchWhere: Prisma.EmployeeWhereInput =
  normalizedSearch
    ? {
        OR: [
          {
            employeeCode: {
              contains: normalizedSearch,
              mode: "insensitive",
            },
          },
          {
            user: {
              is: {
                email: {
                  contains: normalizedSearch,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            user: {
              is: {
                name: {
                  contains: normalizedSearch,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      }
    : {};

const where: Prisma.EmployeeWhereInput = {
  AND: [branchWhere, searchWhere],
};

  const orderBy = getOrderBy(sortBy, sortOrder);

  const [employees, total] = await prisma.$transaction([
    prisma.employee.findMany({
      where,

      select: {
        id: true,
        employeeCode: true,
        department: true,
        designation: true,
        joiningDate: true,
        employmentStatus: true,

        user: {
          select: {
            id: true,
            email: true,
            isActive: true,
            roles: true,
            name: true,
            branchId: true,
            branch: {
              select: {
                id: true,
                name: true,
                branchCode: true,
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

      skip: (page - 1) * limit,
      take: limit,
    }),

    prisma.employee.count({
      where,
    }),
  ]);

  return {
    employees: employees.map((employee) => ({
      id: employee.id,
      employeeCode: employee.employeeCode,
      name: employee.user.name,
      department: employee.department,
      designation: employee.designation,
      joiningDate: employee.joiningDate,
      employmentStatus: employee.employmentStatus,

      user: {
        id: employee.user.id,
        email: employee.user.email,
        isActive: employee.user.isActive,
        roles: employee.user.roles,
        branchId: employee.user.branchId,
        branch: employee.user.branch,
      },
    })),

    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
