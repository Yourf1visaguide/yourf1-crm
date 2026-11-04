"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { apiFetch } from "@/lib/api-fetch";
import { toast } from "@/components/ui/toast";

import { branchIntegrationKeys } from "./branch-integration-query-keys";
import { getBranchIntegrations } from "./get-branch-integrations";

import type {
  BranchIntegrationListItem,
  CreateBranchIntegrationPayload,
  UpdateBranchIntegrationPayload,
} from "../types";

function showMutationError(error: unknown) {
  toast.add({
    title: "Operation failed",
    description:
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again.",
  });
}

export function useBranchIntegrations(branchId: string | null) {
  return useQuery({
    queryKey: branchId
      ? branchIntegrationKeys.list(branchId)
      : [...branchIntegrationKeys.lists(), "not-ready"],

    queryFn: () => {
      if (!branchId) {
        throw new Error("Branch context is not ready.");
      }

      return getBranchIntegrations(branchId);
    },

    enabled: Boolean(branchId),

    staleTime: 30 * 1000,

    retry: false,
  });
}

export function useCreateBranchIntegration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      values: CreateBranchIntegrationPayload,
    ): Promise<BranchIntegrationListItem> => {
      const response =
        await apiFetch<BranchIntegrationListItem>(
          "/api/branch-integrations",
          {
            method: "POST",
            body: JSON.stringify(values),
          },
        );

      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: branchIntegrationKeys.all,
      });

      toast.add({
        type: "info",
        title: "Integration added",
        description:
          "The integration configuration was saved successfully.",
      });
    },

    onError: showMutationError,
  });
}

export function useUpdateBranchIntegration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateBranchIntegrationPayload;
    }) => {
      const response =
        await apiFetch<BranchIntegrationListItem>(
          `/api/branch-integrations/${id}`,
          {
            method: "PATCH",
            body: JSON.stringify(data),
          },
        );

      return response.data;
    },

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: branchIntegrationKeys.all,
      });

      await queryClient.invalidateQueries({
        queryKey: branchIntegrationKeys.detail(
          variables.id,
        ),
      });

      toast.add({
        type: "info",
        title: "Integration updated",
        description:
          "The integration configuration was updated successfully.",
      });
    },

    onError: showMutationError,
  });
}

export function useDeleteBranchIntegration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiFetch<{ id: string }>(
        `/api/branch-integrations/${id}`,
        {
          method: "DELETE",
        },
      );

      return response.data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: branchIntegrationKeys.all,
      });

      toast.add({
        type: "info",
        title: "Integration deleted",
        description:
          "The integration configuration was deleted successfully.",
      });
    },

    onError: showMutationError,
  });
}