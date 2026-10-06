import "server-only";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@/prisma/generated/prisma/client";

type GetEmployeesParams = {
  page: number;
  limit: number;
  search?: string;
};

export async function getEmployees({
  page,
  limit,
  search,
}: GetEmployeesParams) {
  const where: Prisma.EmployeeWhereInput = search
    ? {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            employeeCode: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            user: {
              is: {
                email: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      }
    : {};

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
            roles:true
          },
        },
      },

      orderBy: {
        name: "asc",
      },

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