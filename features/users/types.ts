import type { DEPARTMENT, ROLES, EmploymentStatus } from "@/prisma/generated/prisma/client";

export type EmployeeListItem = {
  id: string;
  employeeCode: string;
  name: string;
  department: DEPARTMENT;
  designation: string | null;
  joiningDate: string;
  employmentStatus: EmploymentStatus ;

  user: {
    id: string;
    email: string;
    isActive: boolean;
    roles: ROLES[];
  };
};

export type EmployeeListResponse = {
  employees: EmployeeListItem[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};