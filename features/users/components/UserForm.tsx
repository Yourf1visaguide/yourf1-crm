"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DEPARTMENT, EmploymentStatus, ROLES } from "@/prisma/generated/prisma/enums";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreateEmployeeFormValues, employeeFormSchema } from "@/features/users/schemas/user-schema";
import { todayLocalDate } from "@/lib/utils";


const inputClassName = "w-full";

type UserFormProps = {
  onSubmit: (values: CreateEmployeeFormValues) => Promise<void>;
  disabled?: boolean;
  error?: string;
};


export default function UserForm({
  onSubmit,
  disabled = false,
  error,
}: UserFormProps) {
  const today = todayLocalDate();

  const form = useForm<CreateEmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      email: "",
      password: "",
      employeeCode: "",
      name: "",
      department: DEPARTMENT.RECEPTION,
      role: ROLES.RECEPTION,
      designation: "",
      joiningDate: today,
      employmentStatus: "ACTIVE",
      monthlySalary: "",
      salaryEffectiveFrom: today,
      startTime: "09:30",
      endTime: "05:30",
      scheduleEffectiveFrom: today,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const isDisabled = disabled || isSubmitting;

  function fieldError(name: keyof CreateEmployeeFormValues) {
    return errors[name]?.message;
  }

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await onSubmit(values);
      })}
      className="flex min-h-0 flex-1 flex-col"
    >
      <div className="flex-1 space-y-7 overflow-y-auto px-6 py-6">
        {/* Account information */}
        <section className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold">
              Account information
            </h3>
            <p className="text-sm text-muted-foreground">
              Login credentials for the employee.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Email address"
              error={fieldError("email")}
            >
              <Input
                type="email"
                autoComplete="off"
                placeholder="employee@company.com"
                disabled={isDisabled}
                {...register("email")}
              />
            </Field>

            <Field
              label="Password"
              error={fieldError("password")}
            >
              <Input
                type="password"
                autoComplete="new-password"
                placeholder="Minimum 8 characters"
                disabled={isDisabled}
                {...register("password")}
              />
            </Field>
          </div>
        </section>

        <Separator />

        {/* Employee information */}
        <section className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold">
              Employee information
            </h3>
            <p className="text-sm text-muted-foreground">
              Employment details and organizational assignment.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Full name"
              error={fieldError("name")}
            >
              <Input
                placeholder="Employee name"
                disabled={isDisabled}
                {...register("name")}
              />
            </Field>

            <Field
              label="Employee code"
              error={fieldError("employeeCode")}
            >
              <Input
                placeholder="EMP-001"
                disabled={isDisabled}
                {...register("employeeCode")}
              />
            </Field>

            <Field
              label="Department"
              error={fieldError("department")}
            >
              <select
                className={inputClassName + " h-9 rounded-md border bg-background px-3 text-sm"}
                disabled={isDisabled}
                {...register("department")}
              >
                {Object.values(DEPARTMENT).map((department) => (
                  <option key={department} value={department}>
                    {department.replaceAll("_", " ")}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="Role"
              error={fieldError("role")}
            >
              <select
                className={inputClassName + " h-9 rounded-md border bg-background px-3 text-sm"}
                disabled={isDisabled}
                {...register("role")}
              >
                {Object.values(ROLES).map((role) => (
                  <option key={role} value={role}>
                    {role.replaceAll("_", " ")}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="Designation"
              error={fieldError("designation")}
            >
              <Input
                placeholder="e.g. Senior Counselor"
                disabled={isDisabled}
                {...register("designation")}
              />
            </Field>

            <Field
              label="Joining date"
              error={fieldError("joiningDate")}
            >
              <Input
                type="date"
                disabled={isDisabled}
                {...register("joiningDate")}
              />
            </Field>

            <Field
              label="Employment status"
              error={fieldError("employmentStatus")}
            >
              <select
                className={inputClassName + " h-9 rounded-md border bg-background px-3 text-sm"}
                disabled={isDisabled}
                {...register("employmentStatus")}
              >
                
                {Object.values(EmploymentStatus).map((item:string, index:number) => (
                  <option value={item} key={index} > {item}</option>
                ))}
                
              </select>
            </Field>
          </div>
        </section>

        <Separator />

        {/* Compensation */}
        <section className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold">
              Initial compensation
            </h3>
            <p className="text-sm text-muted-foreground">
              Set the employee&apos;s starting monthly salary.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Monthly salary (₹)"
              error={fieldError("monthlySalary")}
            >
              <Input
                type="number"
                min="0.01"
                step="0.01"
                placeholder="25000.00"
                disabled={isDisabled}
                {...register("monthlySalary")}
              />
            </Field>

            <Field
              label="Salary effective from"
              error={fieldError("salaryEffectiveFrom")}
            >
              <Input
                type="date"
                disabled={isDisabled}
                {...register("salaryEffectiveFrom")}
              />
            </Field>
          </div>
        </section>

        <Separator />

        {/* Work schedule */}
        <section className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold">
              Initial work schedule
            </h3>
            <p className="text-sm text-muted-foreground">
              Set the employee&apos;s daily working hours.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field
              label="Start time"
              error={fieldError("startTime")}
            >
              <Input
                type="time"
                disabled={isDisabled}
                {...register("startTime")}
              />
            </Field>

            <Field
              label="End time"
              error={fieldError("endTime")}
            >
              <Input
                type="time"
                disabled={isDisabled}
                {...register("endTime")}
              />
            </Field>

            <Field
              label="Schedule effective from"
              error={fieldError("scheduleEffectiveFrom")}
            >
              <Input
                type="date"
                disabled={isDisabled}
                {...register("scheduleEffectiveFrom")}
              />
            </Field>
          </div>

          <p className="text-xs text-muted-foreground">
            This schedule currently stores start and end times only.
            Working days, breaks, and overnight shifts are not
            represented in your current schema.
          </p>
        </section>

        {error && (
          <div
            role="alert"
            className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
          >
            {error}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
        <Button
          type="button"
          variant="outline"
          disabled={isDisabled}
          onClick={() => form.reset()}
        >
          Reset
        </Button>

        <Button type="submit" disabled={isDisabled}>
          {isDisabled ? "Creating employee..." : "Create employee"}
        </Button>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

function Field({ label, error, children }: FieldProps) {
  return (
    <div className="min-w-0 space-y-2">
      <Label>{label}</Label>
      {children}
      {error && (
        <p className="text-xs text-destructive">{String(error)}</p>
      )}
    </div>
  );
}