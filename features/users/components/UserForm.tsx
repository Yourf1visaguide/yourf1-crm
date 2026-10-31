"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";

import { getBranches } from "@/features/branches/api/get-branches";
import {
  DEPARTMENT,
  EmploymentStatus,
  ROLES,
} from "@/prisma/generated/prisma/enums";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  CreateEmployeeFormValues,
  employeeFormSchema,
} from "@/features/users/schemas/user-schema";
import { todayLocalDate } from "@/lib/utils";
import Field from "@/components/resuable-components/form-field";
import FormSubHeading from "@/components/resuable-components/form-subheading";

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

  const {
    data: branches = [],
    isLoading: isBranchesLoading,
    isError: isBranchesError,
  } = useQuery({
    queryKey: ["branches", "active"],
    queryFn: getBranches,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const form = useForm<CreateEmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      email: "",
      password: "",
      employeeCode: "",
      name: "",
      department: DEPARTMENT.RECEPTION,
      roles: [ROLES.RECEPTION],
      designation: "",
      joiningDate: today,
      employmentStatus: "ACTIVE",
      monthlySalary: "",
      salaryEffectiveFrom: today,
      startTime: "09:30",
      endTime: "05:30",
      scheduleEffectiveFrom: today,
      branchId: "",
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
  const anchor = useComboboxAnchor();

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
          <FormSubHeading
            title="Account information"
            description="Login credentials for the employee."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Email address" error={fieldError("email")}>
              <Input
                type="email"
                autoComplete="off"
                placeholder="employee@company.com"
                disabled={isDisabled}
                {...register("email")}
              />
            </Field>

            <Field label="Password" error={fieldError("password")}>
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
        <FormSubHeading
          title="Employee information"
          description="Employment details and organizational assignment."
        />
        <section className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold"></h3>
            <p className="text-sm text-muted-foreground"></p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" error={fieldError("name")}>
              <Input
                placeholder="Employee name"
                disabled={isDisabled}
                {...register("name")}
              />
            </Field>

            <Field label="Employee code" error={fieldError("employeeCode")}>
              <Input
                placeholder="EMP-001"
                disabled={isDisabled}
                {...register("employeeCode")}
              />
            </Field>

            <Field label="Department" error={fieldError("department")}>
              <select
                className={
                  inputClassName +
                  " h-9 rounded-md border bg-background px-3 text-sm"
                }
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

            <Controller
              name="roles"
              control={form.control}
              defaultValue={[]}
              render={({ field }) => (
                <Field label="Role" error={fieldError("roles")}>
                  <Combobox
                    multiple
                    autoHighlight
                    items={Object.values(ROLES)}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <ComboboxChips ref={anchor} className="w-full">
                      <ComboboxValue>
                        {(values) => (
                          <>
                            {values.map((value: string) => (
                              <ComboboxChip key={value}>{value}</ComboboxChip>
                            ))}

                            <ComboboxChipsInput />
                          </>
                        )}
                      </ComboboxValue>
                    </ComboboxChips>

                    <ComboboxContent anchor={anchor}>
                      <ComboboxEmpty>No items found.</ComboboxEmpty>

                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </Field>
              )}
            />

            <Field label="Designation" error={fieldError("designation")}>
              <Input
                placeholder="e.g. Senior Counselor"
                disabled={isDisabled}
                {...register("designation")}
              />
            </Field>

            <Field label="Joining date" error={fieldError("joiningDate")}>
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
                className={
                  inputClassName +
                  " h-9 rounded-md border bg-background px-3 text-sm"
                }
                disabled={isDisabled}
                {...register("employmentStatus")}
              >
                {Object.values(EmploymentStatus).map(
                  (item: string, index: number) => (
                    <option value={item} key={index}>
                      {" "}
                      {item}
                    </option>
                  ),
                )}
              </select>
            </Field>
            <Field label="Primary branch" error={fieldError("branchId")}>
              <select
                className={
                  inputClassName +
                  " h-9 rounded-md border bg-background px-3 text-sm"
                }
                disabled={isDisabled || isBranchesLoading || isBranchesError}
                {...register("branchId")}
              >
                <option value="">
                  {isBranchesLoading ? "Loading branches..." : "Select branch"}
                </option>

                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name} ({branch.branchCode})
                  </option>
                ))}
              </select>

              {isBranchesError && (
                <p className="text-sm text-destructive">
                  Unable to load branches. Please refresh and try again.
                </p>
              )}
            </Field>
          </div>
        </section>

        <Separator />

        {/* Compensation */}
        <FormSubHeading
          title="Initial compensation"
          description="Set the employee's starting monthly salary."
        />
        <section className="space-y-4">
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
        <FormSubHeading
          title="Initial work schedule"
          description="Set the employee's daily working hours."
        />
        <section className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold"></h3>
            <p className="text-sm text-muted-foreground"></p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Start time" error={fieldError("startTime")}>
              <Input
                type="time"
                disabled={isDisabled}
                {...register("startTime")}
              />
            </Field>

            <Field label="End time" error={fieldError("endTime")}>
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
            This schedule currently stores start and end times only. Working
            days, breaks, and overnight shifts are not represented in your
            current schema.
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
