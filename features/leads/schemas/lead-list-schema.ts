import { z } from "zod";

import {
  ApplicationType,
  Country,
  LeadAssignmentType,
  LeadSource,
  LeadStatus,
} from "@/prisma/generated/prisma/enums";

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

export const leadListQuerySchema = z
  .object({
    from: dateOnly,
    to: dateOnly,
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    search: z.string().trim().max(200).optional().or(z.literal("")),
    status: z.enum(LeadStatus).optional(),
    assignmentType: z.enum(LeadAssignmentType).optional(),
    applicationType: z.enum(ApplicationType).optional(),
    preferredCountry: z.enum(Country).optional(),
    assignmentScope: z.enum(["ALL", "ASSIGNED", "UNASSIGNED"]).default("ALL"),
    sortBy: z
      .enum(["clientName", "phone", "status", "source", "createdAt"])
      .default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
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

export type LeadListQuery = z.infer<typeof leadListQuerySchema>;

export const leadListItemSchema = z
  .object({
    id: z.string(),
    leadCode: z.string(),
    clientId: z.string(),
    clientName: z.string(),
    phone: z.string().nullable(),
    applicationType: z.enum(ApplicationType).nullable(),
    status: z.enum(LeadStatus),
    source: z.enum(LeadSource),
    assignmentType: z.enum(LeadAssignmentType).nullable(),
    assignedTo: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .nullable(),
    createdAt: z.string(),
  })
  .strict();

export type LeadListItem = z.infer<typeof leadListItemSchema>;

export const leadListResponseSchema = z
  .object({
    leads: z.array(leadListItemSchema),
    pagination: z
      .object({
        page: z.number(),
        limit: z.number(),
        total: z.number(),
        totalPages: z.number(),
      })
      .strict(),
    counts: z
      .object({
        all: z.number(),
        assigned: z.number(),
        unassigned: z.number(),
        status: z.record(z.enum(LeadStatus), z.number()),
      })
      .strict(),
  })
  .strict();

export type LeadListResponse = z.infer<typeof leadListResponseSchema>;
