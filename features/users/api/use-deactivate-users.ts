"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api-fetch";
import { toast } from "@/components/ui/toast";
import { usersKeys } from "./users-keys";

type DeactivateUsersResponse = {
  count: number;
};

export function useDeactivateUsers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (employeeIds: string[]) => {
      const response = await apiFetch<DeactivateUsersResponse>(
        "/api/users/bulk-deactive",
        {
          method: "POST",
          body: JSON.stringify({
            employeeIds,
          }),
        },
      );

      return response.data;
    },

    onSuccess: async (result) => {
      await queryClient.invalidateQueries({
        queryKey: usersKeys.lists(),
      });

      toast.add({
        type: "info",
        title: "Employees deactivated",
        description: `${result.count} employee${
          result.count === 1 ? "" : "s"
        } ${
          result.count === 1 ? "has" : "have"
        } been deactivated.`,
      });
    },
  });
}