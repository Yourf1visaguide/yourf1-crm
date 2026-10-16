"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  Minus,
  AlertTriangle,
  SquareOff,
  ClipboardCheck,
} from "lucide-react";

import {
  OFFICEREPORTCHECKSTATUS,
} from "@/prisma/generated/prisma/enums";

import {
  createOfficeReportSchema,
  type CreateOfficeReportInput,
} from "@/features/office-reports/schemas/office-reports-schema";

import {
  OFFICE_REPORT_CHECKLIST,
} from "@/features/office-reports/constants/office-report-checklist";

import Field from "@/components/resuable-components/form-field";
import FormSubHeading from "@/components/resuable-components/form-subheading";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

type OfficeReportFormProps = {
  onSubmit: (values: CreateOfficeReportInput) => void;
  onCancel?: () => void;
  disabled?: boolean;
  error?: string;
};

const STATUS_OPTIONS = [
  {
    value: OFFICEREPORTCHECKSTATUS.OK,
    label: "OK",
    description: "No issue",
    icon: Check,
  },
  {
    value: OFFICEREPORTCHECKSTATUS.ISSUE,
    label: "Issue",
    description: "Problem found",
    icon: AlertTriangle,
  },
  {
    value: OFFICEREPORTCHECKSTATUS.NA,
    label: "N/A",
    description: "Not applicable",
    icon: Minus,
  },
] as const;

const CATEGORY_ORDER = [
  "FACILITIES",
  "CLEANLINESS",
  "EQUIPMENT",
] as const;

const CATEGORY_LABELS: Record<string, string> = {
  CLEANLINESS: "Cleanliness",
  FACILITIES: "Facilities",
  EQUIPMENT: "Equipment",
};

export default function OfficeReportForm({
  onSubmit,
  onCancel,
  disabled = false,
  error,
}: OfficeReportFormProps) {
  const form = useForm<CreateOfficeReportInput>({
    resolver: zodResolver(createOfficeReportSchema),
    defaultValues: {
      generalNotes: "",
      checks: OFFICE_REPORT_CHECKLIST.map((item) => ({
        itemKey: item.key,
        status: OFFICEREPORTCHECKSTATUS.NOT_CHECKED,
        issueNote: "",
        actionTaken: "",
        followUpRequired: false,
      })),
    },
  });

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  const isDisabled = disabled || isSubmitting;
  const checks = watch("checks");

  const completedCount = checks.filter(
    (check) =>
      check.status !== OFFICEREPORTCHECKSTATUS.NOT_CHECKED,
  ).length;

  const issueCount = checks.filter(
    (check) =>
      check.status === OFFICEREPORTCHECKSTATUS.ISSUE,
  ).length;

  const followUpCount = checks.filter(
    (check) => check.followUpRequired,
  ).length;

  const progress =
    OFFICE_REPORT_CHECKLIST.length > 0
      ? Math.round(
          (completedCount / OFFICE_REPORT_CHECKLIST.length) * 100,
        )
      : 0;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-h-0 flex-1 flex-col overflow-hidden"
    >
      <div className="flex-1 space-y-7 overflow-y-auto px-6 py-6">
        {/* Header summary */}
        <section className="space-y-4">
          

          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                <span>
                  <strong>{completedCount}</strong>/{OFFICE_REPORT_CHECKLIST.length} completed
                </span>

                <span className="text-muted-foreground">
                  {issueCount} {issueCount === 1 ? "issue" : "issues"}
                </span>

                <span className="text-muted-foreground">
                  {followUpCount} follow-ups
                </span>
              </div>

              <span className="shrink-0 text-sm font-medium tabular-nums">
                {progress}%
              </span>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-[width]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </section>

        {errors.checks?.message && (
          <p
            role="alert"
            className="text-sm text-destructive"
          >
            {errors.checks.message}
          </p>
        )}

        {/* Checklist */}
        <div className="space-y-8">
          {CATEGORY_ORDER.map((category) => {
            const items = OFFICE_REPORT_CHECKLIST.map((item, index) => ({
                item,
                index,
              }))
              .filter(
                ({ item }) => item.category === category,
              );

            return (
              <section
                key={category}
                className="space-y-4"
              >
                <FormSubHeading
                  title={CATEGORY_LABELS[category]}
                  description={`${items.length} inspection ${
                    items.length === 1
                      ? "item"
                      : "items"
                  }`}
                />

                <div className="divide-y rounded-lg border">
                  {items.map(({ item, index }) => {
                    const status = checks[index]?.status;
                    const isIssue =
                      status ===
                      OFFICEREPORTCHECKSTATUS.ISSUE;

                    const checkErrors =
                      errors.checks?.[index];

                    return (
                      <div
                        key={item.key}
                        className="p-4"
                      >
                        {/* Main row */}
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                          <div className="min-w-0">
                            <p className="text-sm font-medium">
                              {item.label}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                              Item {index + 1}
                            </p>
                          </div>

                          <Controller
                            control={control}
                            name={`checks.${index}.status`}
                            render={({ field }) => (
                              <div
                                className="grid w-full md:grid-cols-4 grid-cols-2 gap-3 lg:gap-2 lg:w-[450px] "
                                role="radiogroup"
                                aria-label={`Status for ${item.label}`}
                              >
                                {STATUS_OPTIONS.map(
                                  (option) => {
                                    const Icon =
                                      option.icon;

                                    const selected =
                                      field.value ===
                                      option.value;

                                    return (
                                      <button
                                        key={option.value}
                                        type="button"
                                        disabled={isDisabled}
                                        onClick={() =>
                                          field.onChange(
                                            option.value,
                                          )
                                        }
                                        className={`
                                          flex min-h-10 items-center justify-center gap-1.5
                                          rounded-md border px-2.5 py-2 whitespace-nowrap w-auto
                                          text-sm font-medium
                                          transition-colors
                                          disabled:pointer-events-none
                                          disabled:opacity-50
                                          ${
                                            selected
                                              ? "border-primary bg-primary/10 text-primary"
                                              : "border-border bg-background text-muted-foreground hover:bg-muted"
                                          }
                                        `}
                                        aria-pressed={selected}
                                      >
                                        <Icon className="size-4" />
                                        {option.label}
                                      </button>
                                    );
                                  },
                                )}
                              </div>
                            )}
                          />
                        </div>

                        {checkErrors?.status?.message && (
                          <p
                            role="alert"
                            className="mt-2 text-xs text-destructive"
                          >
                            {checkErrors.status.message}
                          </p>
                        )}

                        {/* Issue details */}
                        {isIssue && (
                          <div className="mt-4 space-y-4 rounded-md border bg-muted/20 p-4">
                            <Field
                              label="Issue description"
                              error={
                                checkErrors?.issueNote
                                  ?.message
                              }
                            >
                              <Textarea
                                placeholder="Describe what was found..."
                                rows={3}
                                maxLength={1000}
                                disabled={isDisabled}
                                aria-invalid={
                                  !!checkErrors?.issueNote
                                }
                                {...register(
                                  `checks.${index}.issueNote`,
                                )}
                              />
                            </Field>

                            <Field
                              label="Action taken"
                              error={
                                checkErrors?.actionTaken
                                  ?.message
                              }
                            >
                              <Textarea
                                placeholder="Describe what was done, if anything..."
                                rows={3}
                                maxLength={1000}
                                disabled={isDisabled}
                                aria-invalid={
                                  !!checkErrors?.actionTaken
                                }
                                {...register(
                                  `checks.${index}.actionTaken`,
                                )}
                              />
                            </Field>

                            <Controller
                              control={control}
                              name={`checks.${index}.followUpRequired`}
                              render={({ field }) => (
                                <label className="flex cursor-pointer items-start gap-3">
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={
                                      field.onChange
                                    }
                                    disabled={isDisabled}
                                  />

                                  <span>
                                    <span className="block text-sm font-medium">
                                      Follow-up required
                                    </span>

                                    <span className="mt-0.5 block text-xs text-muted-foreground">
                                      Someone needs to check this issue again.
                                    </span>
                                  </span>
                                </label>
                              )}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        <Separator />

        {/* General notes */}
        <section className="space-y-4">
          <FormSubHeading
            title="General notes"
            description="Optional observations that are not related to one specific checklist item."
          />

          <Field
            label="Additional notes"
            error={errors.generalNotes?.message}
          >
            <Textarea
              placeholder="Add any additional observations..."
              rows={5}
              maxLength={2000}
              disabled={isDisabled}
              aria-invalid={!!errors.generalNotes}
              {...register("generalNotes")}
            />
          </Field>
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
      <div className="flex items-center justify-between gap-3 border-t bg-background px-6 py-4">
        <p className="hidden text-xs text-muted-foreground sm:block">
          Once created, this report is recorded as final.
        </p>

        <div className="ml-auto flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={isDisabled}
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isDisabled}
          >
            {isDisabled
              ? "Creating report..."
              : "Create report"}
          </Button>
        </div>
      </div>
    </form>
  );
}