"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  editEmployeeFormSchema,
  EditEmployeeFormValues,
} from "@/features/users/schemas/user-schema";
import { todayLocalDate } from "@/lib/utils";
import Field from "@/components/resuable-components/form-field";
import FormSubHeading from "@/components/resuable-components/form-subheading";

const inputClassName = "w-full";

type UserFormProps = {
  onSubmit: (values: EditEmployeeFormValues) => Promise<void>;
  disabled?: boolean;
  error?: string;
  employee: EditEmployeeFormValues;
};

export default function UserForm({
  employee,
  onSubmit,
  disabled = false,
  error,
}: UserFormProps) {
  const today = todayLocalDate();
  

  const form = useForm<EditEmployeeFormValues>({
    resolver: zodResolver(editEmployeeFormSchema),
    defaultValues: {
      email:employee.email ,
      employeeCode: employee.employeeCode,
      name: employee.name,
      department: employee.department,
      roles:employee.roles ,
      designation: employee.designation ?? "",
      joiningDate: employee.joiningDate,
      employmentStatus: employee.employmentStatus,
      branchId: employee.branchId,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const isDisabled = disabled || isSubmitting;

  function fieldError(name: keyof EditEmployeeFormValues) {
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
          <FormSubHeading title="Account information" description="Login credentials for the employee." />
          

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
        <FormSubHeading title="Employee information" description="Employment details and organizational assignment." />
        <section className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold"></h3>
            <p className="text-sm text-muted-foreground">
              
            </p>
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
          </div>
        </section>

        <Separator />
        
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
          {isDisabled ? "Updating employee..." : "Update employee"}
        </Button>
      </div>
    </form>
  );
}


