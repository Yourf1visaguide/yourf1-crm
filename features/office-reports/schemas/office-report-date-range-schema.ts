import { z } from "zod";

const dateOnlySchema = z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2}$/,
    "Date must be in YYYY-MM-DD format",
  )
  .refine((value) => {
    const [year, month, day] = value
      .split("-")
      .map(Number);

    const date = new Date(0);
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCFullYear(
      year,
      month - 1,
      day,
    );

    return (
      date.getUTCFullYear() === year &&
      date.getUTCMonth() === month - 1 &&
      date.getUTCDate() === day
    );
  }, "Enter a valid calendar date");

export const officeReportDateRangeSchema =
  z
    .object({
      from: dateOnlySchema,
      to: dateOnlySchema,
    })
    .superRefine((data, ctx) => {
      if (data.from > data.to) {
        ctx.addIssue({
          code: "custom",
          path: ["from"],
          message:
            "From date cannot be after to date.",
        });
      }
    });

export type OfficeReportDateRange =
  z.infer<
    typeof officeReportDateRangeSchema
  >;