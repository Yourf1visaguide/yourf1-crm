"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { apiFetch } from "@/lib/api-fetch";
import { toast } from "@/components/ui/toast";
import { usersKeys } from "./users-keys";

import type {
  EditEmployeeFormValues,
} from "@/features/users/schemas/user-schema";

export function useEditEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ employeeId, data, }: { employeeId: string ; data: EditEmployeeFormValues; }) => {
      const response =
        await apiFetch( `/api/users/${employeeId}`, { method: "PATCH", body: JSON.stringify(data), }, );

      return response.data;
    },

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: usersKeys.lists(),
        }),

        queryClient.invalidateQueries({
          queryKey: usersKeys.detail(
            variables.employeeId,
          ),
        }),
      ]);

      toast.add({
        type: "info",
        title: "Employee updated",
        description:
          "Employee information has been updated successfully.",
      });
    },
  });
}