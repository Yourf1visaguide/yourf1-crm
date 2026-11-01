import { notFound } from "next/navigation";

import { requirePermission } from "@/lib/auth/require-permission";

import {
  getEmployeeProfile,
} from "@/features/users/queries/employee-profile-queries";

import {
  EmployeeProfile,
} from "@/features/users/components/employee-profile";

type EmployeeProfilePageProps = {
  params: Promise<{
    employeeId: string;
  }>;
};

export default async function EmployeeProfilePage({
  params,
}: EmployeeProfilePageProps) {
  await requirePermission("EMPLOYEE_READ");

  const { employeeId } = await params;

  const employee = await getEmployeeProfile(employeeId);

  if (!employee) {
    notFound();
  }

  return (
    <EmployeeProfile
      employee={employee}
      backHref="/users"
      backLabel="Employees"
    />
  );
}