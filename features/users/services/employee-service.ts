import "server-only";

import { Prisma, ROLES } from "@/prisma/generated/prisma/client";

import { prisma } from "@/lib/prisma";
import { ApiError } from "@/lib/api-error";
import { auth } from "@/lib/auth";

import type {
  CompensationInput,
  CreateEmployeeFormValues,
  WorkScheduleInput,
} from "@/features/users/schemas/user-schema";
import { hashPassword } from "better-auth/crypto";

import type { EditEmployeeFormValues } from "@/features/users/schemas/user-schema";
import { ROLE_PERMISSIONS } from "@/lib/auth/role-permission-mapping";

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
      const branch = await tx.branch.findFirst({
        where: {
          id: data.branchId,
          isActive: true,
        },
        select: {
          id: true,
        },
      });

      if (!branch) {
        throw new ApiError(
          "BAD_REQUEST",
          "Selected branch does not exist or is inactive.",
          400,
        );
      }
      await tx.user.update({
        where: {
          id: authUserId,
        },
        data: {
          roles: {
            set: data.roles,
          },
          isActive: true,
          branchId: data.branchId,
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

type EmployeeActor = {
  id: string;
  employeeId: string | null;
  roles: ROLES[];
};

export async function updateEmployee(
  employeeId: string,
  data: EditEmployeeFormValues,
  actor: EmployeeActor,
) {
  const email = data.email.trim().toLowerCase();
  const name = data.name.trim();
  const employeeCode = data.employeeCode.trim().toUpperCase();

  return prisma.$transaction(async (tx) => {
    const employee = await tx.employee.findUnique({
      where: {
        id: employeeId,
      },

      select: {
        id: true,
        userId: true,
        employmentStatus: true,

        user: {
          select: {
            email: true,
            isActive: true,
            roles: true,
          },
        },
      },
    });

    if (!employee) {
      throw new ApiError("NOT_FOUND", "Employee not found.", 404);
    }

    /*
     * Role changes require the stronger permission.
     */
    const rolesChanged =
      JSON.stringify([...employee.user.roles].sort()) !==
      JSON.stringify([...data.roles].sort());

    if (
      rolesChanged &&
      !actor.roles.some((role) =>
        ROLE_PERMISSIONS[role].includes("EMPLOYEE_ROLE_MANAGE"),
      )
    ) {
      throw new ApiError(
        "ROLE_ASSIGNMENT_FORBIDDEN",
        "You do not have permission to manage employee roles.",
        403,
      );
    }

    /*
     * Password changes require credential-management permission.
     */
    if (
      data.password &&
      !actor.roles.some((role) =>
        ROLE_PERMISSIONS[role].includes("EMPLOYEE_CREDENTIAL_MANAGE"),
      )
    ) {
      throw new ApiError(
        "FORBIDDEN",
        "You do not have permission to change employee passwords.",
        403,
      );
    }

    /*
     * Do not allow someone to change their own account
     * into an inactive/terminated state through this form.
     */
    if (
      actor.employeeId === employeeId &&
      data.employmentStatus !== employee.employmentStatus
    ) {
      throw new ApiError(
        "SELF_DEACTIVATION_NOT_ALLOWED",
        "You cannot change your own employment status.",
        403,
      );
    }

    /*
     * Email uniqueness.
     */
    if (email !== employee.user.email) {
      const existingUser = await tx.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
        },
      });

      if (existingUser && existingUser.id !== employee.userId) {
        throw new ApiError(
          "EMAIL_ALREADY_EXISTS",
          "This email address is already associated with another account.",
          409,
        );
      }
    }

    /*
     * Update User + Employee as one logical transaction.
     */
    await tx.user.update({
      where: {
        id: employee.userId,
      },

      data: {
        name,
        email,
        roles: {
          set: data.roles,
        },
      },
    });

    await tx.employee.update({
      where: {
        id: employeeId,
      },

      data: {
        employeeCode,
        department: data.department,
        designation: data.designation.trim() || null,
        joiningDate: dateOnly(data.joiningDate),
        employmentStatus: data.employmentStatus,
      },
    });

    /*
     * Optional password update.
     */
    if (data.password) {
      const passwordHash = await hashPassword(data.password);

      const credentialAccount = await tx.account.findFirst({
        where: {
          userId: employee.userId,
          providerId: "credential",
        },

        select: {
          id: true,
        },
      });

      if (!credentialAccount) {
        throw new ApiError(
          "BAD_REQUEST",
          "This account does not have a password credential.",
          400,
        );
      }

      await tx.account.update({
        where: {
          id: credentialAccount.id,
        },

        data: {
          password: passwordHash,
        },
      });

      /*
       * A password reset should invalidate existing sessions.
       */
      await tx.session.deleteMany({
        where: {
          userId: employee.userId,
        },
      });
    }

    return tx.employee.findUniqueOrThrow({
      where: {
        id: employeeId,
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
      },
    });
  });
}

export async function changeEmployeeSalary(
  employeeId: string,
  data: CompensationInput,
) {
  const effectiveFrom = dateOnly(data.salaryEffectiveFrom);

  return prisma.$transaction(async (tx) => {
    const employee = await tx.employee.findUnique({
      where: {
        id: employeeId,
      },
      select: {
        id: true,
      },
    });

    if (!employee) {
      throw new ApiError("NOT_FOUND", "Employee not found.", 404);
    }

    const latest = await tx.employeeCompensation.findFirst({
      where: {
        employeeId,
      },

      orderBy: {
        effectiveFrom: "desc",
      },
    });

    if (latest && effectiveFrom <= latest.effectiveFrom) {
      throw new ApiError(
        "CONFLICT",
        "The new salary effective date must be later than the current salary record.",
        409,
      );
    }

    if (latest) {
      const effectiveTo = new Date(effectiveFrom);

      effectiveTo.setUTCDate(effectiveTo.getUTCDate() - 1);

      await tx.employeeCompensation.update({
        where: {
          id: latest.id,
        },

        data: {
          effectiveTo,
        },
      });
    }

    return tx.employeeCompensation.create({
      data: {
        employeeId,

        monthlySalary: new Prisma.Decimal(data.monthlySalary),

        effectiveFrom,
      },

      select: {
        id: true,
        monthlySalary: true,
        effectiveFrom: true,
        effectiveTo: true,
      },
    });
  });
}

export async function changeEmployeeSchedule(
  employeeId: string,
  data: WorkScheduleInput,
) {
  const effectiveFrom = dateOnly(data.scheduleEffectiveFrom);

  return prisma.$transaction(async (tx) => {
    const employee = await tx.employee.findUnique({
      where: {
        id: employeeId,
      },

      select: {
        id: true,
      },
    });

    if (!employee) {
      throw new ApiError("NOT_FOUND", "Employee not found.", 404);
    }

    const latest = await tx.employeeWorkSchedule.findFirst({
      where: {
        employeeId,
      },

      orderBy: {
        effectiveFrom: "desc",
      },
    });

    if (latest && effectiveFrom <= latest.effectiveFrom) {
      throw new ApiError(
        "CONFLICT",
        "The new schedule effective date must be later than the current schedule record.",
        409,
      );
    }

    if (latest) {
      const effectiveTo = new Date(effectiveFrom);

      effectiveTo.setUTCDate(effectiveTo.getUTCDate() - 1);

      await tx.employeeWorkSchedule.update({
        where: {
          id: latest.id,
        },

        data: {
          effectiveTo,
        },
      });
    }

    return tx.employeeWorkSchedule.create({
      data: {
        employeeId,
        startTime: data.startTime,
        endTime: data.endTime,
        effectiveFrom,
      },

      select: {
        id: true,
        startTime: true,
        endTime: true,
        effectiveFrom: true,
        effectiveTo: true,
      },
    });
  });
}
