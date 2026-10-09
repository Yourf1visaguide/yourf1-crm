import "server-only";

import { prisma } from "@/lib/prisma";

export type EmployeeProfileData = {
  employeeId: string;
  userId: string;

  name: string;
  email: string;
  username: string | null;

  employeeCode: string;
  department: string;
  designation: string | null;
  joiningDate: Date;
  employmentStatus: string;

  accountActive: boolean;
  roles: string[];
};

export async function getEmployeeProfile(
  employeeId: string,
): Promise<EmployeeProfileData | null> {
  const employee = await prisma.employee.findUnique({
    where: {
      id: employeeId,
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
          username: true,
          isActive: true,
          roles: true,
        },
      },
    },
  });

  if (!employee) {
    return null;
  }

  return {
    employeeId: employee.id,
    userId: employee.user.id,

    name: employee.name,
    email: employee.user.email,
    username: employee.user.username,

    employeeCode: employee.employeeCode,
    department: employee.department,
    designation: employee.designation,
    joiningDate: employee.joiningDate,
    employmentStatus: employee.employmentStatus,

    accountActive: employee.user.isActive,
    roles: employee.user.roles,
  };
}