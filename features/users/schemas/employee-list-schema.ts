import { z } from "zod";

export const employeeListQuerySchema = z.object({
  page: z.coerce
    .number()
    .int()
    .min(1)
    .default(1),

  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(100)
    .default(10),

  search: z
    .string()
    .trim()
    .max(100)
    .optional()
    .or(z.literal("")),

  sortBy: z
    .enum([
      "name",
      "employeeCode",
      "department",
      "designation",
      "joiningDate",
      "employmentStatus",
    ])
    .default("name"),

  sortOrder: z
    .enum(["asc", "desc"])
    .default("asc"),
});

export type EmployeeListQuery = z.infer<
  typeof employeeListQuerySchema
>;