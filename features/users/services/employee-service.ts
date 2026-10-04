import "server-only";

import bcrypt from "bcryptjs";
import { Prisma } from "@/prisma/generated/prisma/client";

import { prisma } from "@/lib/prisma";
import { ApiError } from "@/lib/api-error";

import type { CreateEmployeeFormValues } from "@/features/users/schemas/user-schema";

function dateOnly(value: string) {
  return new Date(`${value}T00:00:00.000Z`);
}

export async function createEmployee(
  data: CreateEmployeeFormValues,
) {
  const passwordHash = await bcrypt.hash(data.password, 12);

  try {
    const employee = await prisma.employee.create({
      data: {
        employeeCode: data.employeeCode,
        name: data.name,
        department: data.department,
        role: [data.role],
        designation: data.designation || null,
        joiningDate: dateOnly(data.joiningDate),
        employmentStatus: data.employmentStatus,

        user: {
          create: {
            email: data.email,
            passwordHash,
            isActive: data.employmentStatus === "ACTIVE",
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
        role: true,
        designation: true,
        joiningDate: true,
        employmentStatus: true,

        user: {
          select: {
            id: true,
            email: true,
            isActive: true,
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

    return employee;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new ApiError(
        "EMPLOYEE_ALREADY_EXISTS",
        "Email or employee code already exists.",
        409,
      );
    }

    throw error;
  }
}