import { z } from "zod";

const dateOnly = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
  .refine((value) => {
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(0);
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCFullYear(year, month - 1, day);

    return (
      date.getUTCFullYear() === year &&
      date.getUTCMonth() === month - 1 &&
      date.getUTCDate() === day
    );
  }, "Enter a valid calendar date");

export const leadSummaryQuerySchema = z
  .object({
    from: dateOnly,
    to: dateOnly,
  })
  .superRefine((data, ctx) => {
    if (data.from > data.to) {
      ctx.addIssue({
        code: "custom",
        path: ["from"],
        message: "From date cannot be after to date.",
      });
    }
  });

export type LeadSummaryQuery = z.infer<
  typeof leadSummaryQuerySchema
>;

export const leadSummarySchema = z
  .object({
    total: z.number().int().nonnegative(),
    converted: z.number().int().nonnegative(),
    conversionRatePercent: z.number().nonnegative(),
    unassigned: z.number().int().nonnegative(),
  })
  .strict();

export type LeadSummary = z.infer<
  typeof leadSummarySchema
>;
