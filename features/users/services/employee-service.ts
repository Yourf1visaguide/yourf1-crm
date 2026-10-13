import "server-only";

import { Prisma } from "@/prisma/generated/prisma/client";

import { prisma } from "@/lib/prisma";
import { ApiError } from "@/lib/api-error";
import { auth } from "@/lib/auth";

import type { CreateEmployeeFormValues } from "@/features/users/schemas/user-schema";

function dateOnly(value: string) {
  return new Date(`${value}T00:00:00.000Z`);
}

async function cleanupAuthUser(userId: string) {
  try {
    /*
     * Better Auth stores sessions/accounts against the User.
     * Your Prisma schema uses cascading relations, so deleting
     * the user also removes those dependent auth records.
     */
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    /*
     * This is important operationally:
     * if cleanup itself fails, we need a server-side log because
     * an orphaned authentication account may now exist.
     */
    console.error("CRITICAL: Failed to clean up auth user", {
      userId,
      error,
    });
  }
}

export async function createEmployee(data: CreateEmployeeFormValues) {
  const normalizedEmail = data.email.trim().toLowerCase();
  const normalizedEmployeeCode = data.employeeCode.trim().toUpperCase();
  const normalizedName = data.name.trim();

  /*
   * Preflight checks improve UX, but they are NOT sufficient for
   * concurrency. Database unique constraints remain authoritative.
   */
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
        employeeCode: normalizedEmployeeCode,
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
   * Step 1:
   * Let Better Auth create the authentication identity and password.
   */
  let authUserId: string;

  try {
    const result = await auth.api.signUpEmail({
      body: {
        name: normalizedName,
        email: normalizedEmail,
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

    authUserId = result.user.id;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    console.error("Better Auth employee signup failed", {
      email: normalizedEmail,
      error,
    });

    throw new ApiError(
      "AUTH_USER_CREATE_FAILED",
      "Unable to create the employee account.",
      400,
    );
  }

  /*
   * Step 2:
   * CRM creation is ONE transaction.
   *
   * If employee, compensation, schedule, or role assignment fails,
   * everything in this transaction rolls back.
   */
  try {
    const employee = await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: {
          id: authUserId,
        },
        data: {
          roles: {
            set: data.roles,
          },
          isActive: true,
        },
      });

      return tx.employee.create({
        data: {
          employeeCode: normalizedEmployeeCode,
          department: data.department,
          designation: data.designation?.trim() || null,
          joiningDate: dateOnly(data.joiningDate),
          employmentStatus: data.employmentStatus,

          user: {
            connect: {
              id: authUserId,
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
          department: true,
          designation: true,
          joiningDate: true,
          employmentStatus: true,

          user: {
            select: {
              id: true,
              name: true,
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
    });

    return employee;
  } catch (error) {
    /*
     * Step 3:
     * Prisma transaction failed, therefore the Better Auth user
     * must be compensated/removed.
     */
    await cleanupAuthUser(authUserId);

    /*
     * Expected database uniqueness errors can happen despite
     * the preflight checks because another request may have created
     * the same record concurrently.
     */
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const target = Array.isArray(error.meta?.target)
          ? error.meta.target.join(",")
          : String(error.meta?.target ?? "");

        if (target.includes("employeeCode")) {
          throw new ApiError(
            "EMPLOYEE_CODE_EXISTS",
            "An employee with this employee code already exists.",
            409,
          );
        }

        if (target.includes("email")) {
          throw new ApiError(
            "EMAIL_ALREADY_EXISTS",
            "This email address is already associated with another account.",
            409,
          );
        }
      }
    }

    console.error("CRM employee creation failed", {
      authUserId,
      error,
    });

    throw new ApiError(
      "EMPLOYEE_CREATE_FAILED",
      "The employee account could not be created. Please try again.",
      500,
    );
  }
}

