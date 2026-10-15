"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { apiFetch } from "@/lib/api-fetch";
import { toast } from "@/components/ui/toast";
import { usersKeys } from "./users-keys";

import type {
  CompensationInput,
} from "@/features/users/schemas/user-schema";

export function useChangeSalary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      employeeId,
      data,
    }: {
      employeeId: string;
      data: CompensationInput;
    }) => {
      const response =
        await apiFetch(
          `/api/users/${employeeId}/compensation`,
          {
            method: "POST",
            body: JSON.stringify(data),
          },
        );

      return response.data;
    },

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: usersKeys.detail(
          variables.employeeId,
        ),
      });

      toast.add({
        type: "info",
        title: "Salary updated",
        description:
          "A new salary record has been created.",
      });
    },
  });
}