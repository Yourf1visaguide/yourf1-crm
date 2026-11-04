import "server-only";

import { prisma } from "@/lib/prisma";
import { ApiError } from "@/lib/api-error";
import {
  encryptIntegrationCredentials,
  decryptIntegrationCredentials,
} from "@/lib/security/integration-encryption";
import type {
  CreateBranchIntegrationInput,
  UpdateBranchIntegrationInput,
} from "../schemas/branch-integration-schema";

function isPrismaUniqueError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2002"
  );
}

function handleDatabaseError(error: unknown): never {
  if (isPrismaUniqueError(error)) {
    throw new ApiError(
      "CONFLICT",
      "This provider application or phone number is already configured.",
      409,
    );
  }

  throw error;
}

/**
 * Return only safe configuration metadata.
 * Never return encrypted or decrypted credentials.
 */
function toSafeEndpoint(endpoint: {
  id: string;
  branchId: string;
  provider: string;
  displayName: string;
  phoneNumber: string;
  providerEndpointId: string;
  providerAccountId: string | null;
  credentialsEncrypted: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: endpoint.id,
    branchId: endpoint.branchId,
    provider: endpoint.provider,
    displayName: endpoint.displayName,
    phoneNumber: endpoint.phoneNumber,
    providerEndpointId: endpoint.providerEndpointId,
    providerAccountId: endpoint.providerAccountId,
    hasCredentials: Boolean(endpoint.credentialsEncrypted),
    isActive: endpoint.isActive,
    createdAt: endpoint.createdAt,
    updatedAt: endpoint.updatedAt,
  };
}

export async function listBranchIntegrations(branchId: string) {
  const endpoints =
    await prisma.branchIntegrationEndpoint.findMany({
      where: { branchId },
      orderBy: [
        { provider: "asc" },
        { createdAt: "asc" },
      ],
    });

  return endpoints.map(toSafeEndpoint);
}

export async function createBranchIntegration(
  input: CreateBranchIntegrationInput,
) {
  try {
    const credentialsEncrypted =
      encryptIntegrationCredentials(input.credentials);

    const endpoint =
      await prisma.branchIntegrationEndpoint.create({
        data: {
          branchId: input.branchId,
          provider: input.provider,
          displayName: input.displayName,
          phoneNumber: input.phoneNumber,
          providerEndpointId: input.providerEndpointId,
          providerAccountId: input.providerAccountId ?? null,
          credentialsEncrypted,
        },
      });

    return toSafeEndpoint(endpoint);
  } catch (error) {
    handleDatabaseError(error);
  }
}

export async function updateBranchIntegration(
  id: string,
  input: UpdateBranchIntegrationInput,
) {
  try {
    const existing =
      await prisma.branchIntegrationEndpoint.findUnique({
        where: { id },
      });

    if (!existing) {
      throw new ApiError(
        "NOT_FOUND",
        "Integration configuration was not found.",
        404,
      );
    }

    const endpoint =
      await prisma.branchIntegrationEndpoint.update({
        where: { id },
        data: {
          ...(input.displayName !== undefined && {
            displayName: input.displayName,
          }),

          ...(input.phoneNumber !== undefined && {
            phoneNumber: input.phoneNumber,
          }),

          ...(input.providerEndpointId !== undefined && {
            providerEndpointId: input.providerEndpointId,
          }),

          ...(input.providerAccountId !== undefined && {
            providerAccountId: input.providerAccountId,
          }),

          ...(input.credentials !== undefined && {
            credentialsEncrypted:
              encryptIntegrationCredentials(input.credentials),
          }),

          ...(input.isActive !== undefined && {
            isActive: input.isActive,
          }),
        },
      });

    return toSafeEndpoint(endpoint);
  } catch (error) {
    handleDatabaseError(error);
  }
}

export async function deleteBranchIntegration(id: string) {
  const existing =
    await prisma.branchIntegrationEndpoint.findUnique({
      where: { id },
      select: { id: true },
    });

  if (!existing) {
    throw new ApiError(
      "NOT_FOUND",
      "Integration configuration was not found.",
      404,
    );
  }

  await prisma.branchIntegrationEndpoint.delete({
    where: { id },
  });

  return { id };
}

/**
 * Internal server-only helper for provider adapters.
 * Never call this from a route that returns data to the browser.
 */
export async function getDecryptedIntegrationCredentials(
  id: string,
) {
  const endpoint =
    await prisma.branchIntegrationEndpoint.findUnique({
      where: { id },
    });

  if (!endpoint) {
    throw new ApiError(
      "NOT_FOUND",
      "Integration configuration was not found.",
      404,
    );
  }

  return {
    endpoint: toSafeEndpoint(endpoint),
    credentials: decryptIntegrationCredentials(
      endpoint.credentialsEncrypted,
    ),
  };
}