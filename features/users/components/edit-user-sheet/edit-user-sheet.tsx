"use client";

import { UserRound } from "lucide-react";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import { useUserSheet } from "@/features/users/store/use-user-sheet";
import { useEditEmployee } from "@/features/users/api/use-edit-employee-detail";
import UserForm from "./UserForm";
import { FormHeading } from "@/components/resuable-components/form-heading";

import type { EditEmployeeFormValues } from "../../schemas/user-schema";

export default function EditUserSheet() {
  const isOpen = useUserSheet((state) => state.isOpen);
  const onClose = useUserSheet((state) => state.onClose);

  const mutation = useEditEmployee();
  const employee = useUserSheet((state) => state.employee);

  if (!employee) {
    return null;
  }

  const employeeId = employee.id;

  const updatedEmployee: EditEmployeeFormValues = {
    email: employee.user.email,
    employeeCode: employee.employeeCode,
    name: employee.name,
    department: employee.department,
    roles: employee.user.roles,
    designation: employee.designation ?? "",
    joiningDate: employee.joiningDate.slice(0, 10),
    employmentStatus: employee.employmentStatus,
    password: "",
  };

  async function handleSubmit(
    values: EditEmployeeFormValues,
  ) {
    await mutation.mutateAsync({
      employeeId,
      data: values,
    });

    onClose();
  }

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !mutation.isPending) {
          onClose();
        }
      }}
    >
      <SheetContent
        side="right"
        className="flex flex-col gap-0 overflow-hidden border-l border-border/70 bg-background p-0 data-[side=right]:max-w-4xl"
      >
        <FormHeading
          icon={<UserRound className="size-5" />}
          title="Edit Employee Information"
          badge="Employee"
          description="Update the employee's basic information, department, designation, and joining date."
          footer="These changes update the employee's current profile information."
        />

        <UserForm
          employee={updatedEmployee}
          onSubmit={handleSubmit}
          disabled={mutation.isPending}
          error={mutation.error?.message}
        />
      </SheetContent>
    </Sheet>
  );
}