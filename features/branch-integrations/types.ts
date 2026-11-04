import type { IntegrationProvider } from "@/prisma/generated/prisma/enums";

export type BranchIntegrationListItem = {
  id: string;
  branchId: string;
  branch: {
    id: string;
    name: string;
  };
  provider: IntegrationProvider;
  displayName: string;
  phoneNumber: string;
  providerEndpointId: string;
  providerAccountId: string | null;
  hasCredentials: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type BranchIntegrationListResponse =
  BranchIntegrationListItem[];

export type CreateBranchIntegrationPayload = {
  branchId: string;
  provider: IntegrationProvider;
  displayName: string;
  phoneNumber: string;
  providerEndpointId: string;
  providerAccountId?: string | null;
  credentials: Record<string, string>;
};

export type UpdateBranchIntegrationPayload = {
  displayName?: string;
  phoneNumber?: string;
  providerEndpointId?: string;
  providerAccountId?: string | null;
  credentials?: Record<string, string>;
  isActive?: boolean;
};