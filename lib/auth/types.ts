import type { ROLES, DEPARTMENT } from "@/prisma/generated/prisma/client";

export type CurrentUser = {
  id: string;
  name: string | null;
  email: string;
  username: string | null;
  isActive: boolean;
  roles: ROLES[];

  employee: {
    id: string;
    employeeCode: string;
    name: string;
    department: DEPARTMENT;
    designation: string | null;
    employmentStatus: string;
  } | null;
};