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
        user: {
          name: sortOrder,
        },
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
