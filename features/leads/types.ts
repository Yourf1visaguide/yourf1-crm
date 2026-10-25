import type { DEPARTMENT, ROLES } from "@/prisma/generated/prisma/enums";

export type BranchOption = {
  id: string;
  branchCode: string;
  name: string;
  city: string | null;
  state: string | null;
};

export type LeadAssigneeOption = {
  id: string;
  name: string;
  roles: ROLES[];
  employee: {
    employeeCode: string;
    designation: string | null;
    department: DEPARTMENT | null;
  } | null;
};

export type LeadCreatedResponse = {
  id: string;
  leadCode: string;
  clientId: string;
  applicationId: string;
  status: string;
  source: string;
  createdAt: string;
  assignedTo: {
    id: string;
    name: string;
  };
};
