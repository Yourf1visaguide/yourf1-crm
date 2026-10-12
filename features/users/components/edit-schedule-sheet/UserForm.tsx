"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  workScheduleSchema,
  WorkScheduleInput

} from "@/features/users/schemas/user-schema";
import { todayLocalDate } from "@/lib/utils";
import Field from "@/components/resuable-components/form-field";
import FormSubHeading from "@/components/resuable-components/form-subheading";

const inputClassName = "w-full";

type UserFormProps = {
  onSubmit: (values: WorkScheduleInput) => Promise<void>;
  disabled?: boolean;
  error?: string;
};

export default function UserForm({
  onSubmit,
  disabled = false,
  error,
}: UserFormProps) {
  const today = todayLocalDate();

  const form = useForm<WorkScheduleInput>({
    resolver: zodResolver(workScheduleSchema),
    defaultValues: {
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

  function fieldError(name: keyof WorkScheduleInput) {
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
        

        {/* Work schedule */}
        <FormSubHeading title="Initial work schedule" description="Set the employee&apos;s daily working hours." />
        <section className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold"></h3>
            <p className="text-sm text-muted-foreground">
              
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-1">
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


