import { z } from "zod";

const credentialsSchema = z
  .record(z.string(), z.string().min(1))
  .refine(
    (credentials) => Object.keys(credentials).length > 0,
    "At least one credential is required.",
  );

export const createBranchIntegrationSchema = z.object({
  branchId: z.string().min(1), 
  provider: z.enum([ "SUKAM_IVR", "META_WHATSAPP", ]), 
  displayName: z.string().trim().min(2).max(100), 
  phoneNumber: z.string().trim().min(3).max(30), 
  providerEndpointId: z.string().trim().min(1).max(255), 
  providerAccountId: z.string().trim().max(255).nullable().optional(), 
  credentials: credentialsSchema, 

});

export const updateBranchIntegrationSchema = z.object({
  displayName: z.string().trim().min(2).max(100).optional(), 
  phoneNumber: z.string().trim().min(3).max(30).optional(), 
  providerEndpointId: z.string().trim().min(1).max(255).optional(), 
  providerAccountId: z.string().trim().max(255).nullable().optional(), 
  credentials: credentialsSchema.optional(), 
  isActive: z.boolean().optional(),
});

export type CreateBranchIntegrationInput = z.infer<typeof createBranchIntegrationSchema >;
export type UpdateBranchIntegrationInput = z.infer< typeof updateBranchIntegrationSchema >;