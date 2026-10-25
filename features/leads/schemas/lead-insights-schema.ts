import { z } from "zod";

import { leadListQuerySchema } from "./lead-list-schema";

export const leadInsightsQuerySchema = z
  .object({
    from: leadListQuerySchema.shape.from,
    to: leadListQuerySchema.shape.to,
  })
  .strict()
  .refine(
    (data) => data.from <= data.to,
    {
      message: "From date cannot be after to date.",
      path: ["to"],
    },
  );

export type LeadInsightsQuery = z.infer<
  typeof leadInsightsQuerySchema
>;

export const leadInsightSourceSchema = z
  .object({
    source: z.string(),
    label: z.string(),
    count: z.number().int().nonnegative(),
  })
  .strict();

export const leadInsightsResponseSchema = z
  .object({
    studyAbroad: z.number().int().nonnegative(),
    touristVisa: z.number().int().nonnegative(),

    sources: z.array(leadInsightSourceSchema),

    topCountry: z
      .object({
        country: z.string(),
        count: z.number().int().nonnegative(),
      })
      .strict()
      .nullable(),
  })
  .strict();

export type LeadInsightsResponse = z.infer<
  typeof leadInsightsResponseSchema
>;
