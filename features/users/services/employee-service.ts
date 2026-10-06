import "server-only";

import { Prisma } from "@/prisma/generated/prisma/client";

import { prisma } from "@/lib/prisma";
import { ApiError } from "@/lib/api-error";
import { auth } from "@/lib/auth";

import type { CreateEmployeeFormValues } from "@/features/users/schemas/user-schema";

function dateOnly(value: string) {
  return new Date(`${value}T00:00:00.000Z`);
}

export async function createEmployee(data: CreateEmployeeFormValues) {
  /*
   * First check whether the CRM identifiers already exist.
   */
  const normalizedEmail = data.email.trim().toLowerCase();
  const normalizedEmployeeCode = data.employeeCode.trim().toLowerCase();

  const [existingUser, existingEmployee] = await prisma.$transaction([
    prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
      select: {
        id: true,
        employee: {
          select: {
            id: true,
          },
        },
      },
    }),

    prisma.employee.findUnique({
      where: {
        employeeCode: data.employeeCode.trim(),
      },
      select: {
        id: true,
      },
    }),
  ]);

  if (existingUser?.employee) {
    throw new ApiError(
      "EMPLOYEE_EXISTS",
      "An employee with this email already exists.",
      409,
    );
  }

  if (existingUser && !existingUser.employee) {
    throw new ApiError(
      "EMAIL_ALREADY_EXISTS",
      "This email address is already associated with another account.",
      409,
    );
  }

  if (existingEmployee) {
    throw new ApiError(
      "EMPLOYEE_CODE_EXISTS",
      "An employee with this employee code already exists.",
      409,
    );
  }
  /*
   * Better Auth creates the authentication identity
   * and handles password hashing.
   */
  let authUser;

  try {
    const result = await auth.api.signUpEmail({
      body: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });

    if (!result.user) {
      throw new ApiError(
        "AUTH_USER_CREATE_FAILED",
        "Unable to create the employee account.",
        400,
      );
    }

    authUser = result.user;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      "AUTH_USER_CREATE_FAILED",
      "Unable to create the employee account.",
      400,
    );
  }

  /*
   * Now create the CRM employee records.
   */
  try {
    const employee = await prisma.employee.create({
      data: {
        employeeCode: data.employeeCode,
        name: data.name,
        department: data.department,
        designation: data.designation || null,
        joiningDate: dateOnly(data.joiningDate),
        employmentStatus: data.employmentStatus,

        user: {
          connect: {
            id: authUser.id,
          },
        },

        compensation: {
          create: {
            monthlySalary: new Prisma.Decimal(data.monthlySalary),
            effectiveFrom: dateOnly(data.salaryEffectiveFrom),
          },
        },

        schedules: {
          create: {
            startTime: data.startTime,
            endTime: data.endTime,
            effectiveFrom: dateOnly(data.scheduleEffectiveFrom),
          },
        },
      },

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

        compensation: {
          select: {
            id: true,
            monthlySalary: true,
            effectiveFrom: true,
            effectiveTo: true,
          },
        },

        schedules: {
          select: {
            id: true,
            startTime: true,
            endTime: true,
            effectiveFrom: true,
            effectiveTo: true,
          },
        },
      },
    });

    /*
     * Assign CRM roles after the auth user exists.
     */
    await prisma.user.update({
      where: {
        id: authUser.id,
      },
      data: {
        roles: {
          set: data.roles,
        },
      },
    });

    return employee;
  } catch (error) {
    /*
     * IMPORTANT:
     * The Better Auth user now exists, but CRM creation failed.
     *
     * This needs cleanup.
     */
    throw error;
  }
}
