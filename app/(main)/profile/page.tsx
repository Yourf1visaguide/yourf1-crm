import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth/get-current-user-server-side";
import {
  EmployeeProfile,
} from "@/features/users/components/employee-profile";

import type {
  EmployeeProfileData,
} from "@/features/users/queries/employee-profile-queries";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!user.employee) {
    redirect("/dashboard");
  }

  const employee: EmployeeProfileData = {
    employeeId: user.employee.id,
    userId: user.id,

    name: user.name,
    email: user.email,
    username: user.username,

    employeeCode: user.employee.employeeCode,
    department: user.employee.department,
    designation: user.employee.designation,
    joiningDate: user.employee.joiningDate,
    employmentStatus: user.employee.employmentStatus,

    accountActive: user.isActive,
    roles: user.roles,
  };

  return (
    <EmployeeProfile
      employee={employee}
      backHref="/dashboard"
      backLabel="Dashboard"
    />
  );
}