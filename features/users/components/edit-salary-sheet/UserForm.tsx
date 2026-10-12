"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  CompensationInput,
  compensationSchema,
} from "@/features/users/schemas/user-schema";
import { todayLocalDate } from "@/lib/utils";
import Field from "@/components/resuable-components/form-field";
import FormSubHeading from "@/components/resuable-components/form-subheading";

const inputClassName = "w-full";

type UserFormProps = {
  onSubmit: (values:  CompensationInput) => Promise<void>;
  disabled?: boolean;
  error?: string;
};

export default function UserForm({
  onSubmit,
  disabled = false,
  error,
}: UserFormProps) {
  const today = todayLocalDate();

  const form = useForm< CompensationInput>({
    resolver: zodResolver(compensationSchema),
    defaultValues: {
      monthlySalary: "",
      salaryEffectiveFrom: today,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const isDisabled = disabled || isSubmitting;

  function fieldError(name: keyof  CompensationInput) {
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
        

        {/* Compensation */}
        <FormSubHeading title="Initial compensation" description="Set the employee&apos;s starting monthly salary." />
        <section className="space-y-4">
          

          <div className="grid gap-4 sm:grid-cols-1">
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


