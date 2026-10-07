import "server-only";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@/prisma/generated/prisma/client";
import "server-only";

import type { EmployeeListQuery } from "@/features/users/schemas/employee-list-schema";


type GetEmployeesParams = {
  page: number;
  limit: number;
  search?: string;
};





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
        name: sortOrder,
      };
  }
}

export async function getEmployees({
  page,
  limit,
  search,
  sortBy,
  sortOrder,
}: EmployeeListQuery) {
  const normalizedSearch = search?.trim();

  const where: Prisma.EmployeeWhereInput = normalizedSearch
    ? {
        OR: [
          {
            name: {
              contains: normalizedSearch,
              mode: "insensitive",
            },
          },
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
        ],
      }
    : {};

  const orderBy = getOrderBy(sortBy, sortOrder);

  const [employees, total] = await prisma.$transaction([
    prisma.employee.findMany({
      where,

      select: {
        id: true,
        employeeCode: true,
        name: true,
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
    employees,

    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}