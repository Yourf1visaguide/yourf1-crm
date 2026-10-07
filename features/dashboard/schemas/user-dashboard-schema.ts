import { z } from "zod";

const dateOnlySchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD");

export const userDashboardQuerySchema = z
  .object({
    from: dateOnlySchema.optional(),
    to: dateOnlySchema.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.from && data.to) {
      const from = new Date(`${data.from}T00:00:00.000Z`);
      const to = new Date(`${data.to}T00:00:00.000Z`);

      if (from > to) {
        ctx.addIssue({
          code: "custom",
          path: ["from"],
          message: "`from` cannot be later than `to`.",
        });
      }
    }
  });

export type UserDashboardQuery = z.infer<
  typeof userDashboardQuerySchema
>;