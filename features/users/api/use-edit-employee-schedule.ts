"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { apiFetch } from "@/lib/api-fetch";
import { toast } from "@/components/ui/toast";
import { usersKeys } from "./users-keys";

import type {
  WorkScheduleInput,
} from "@/features/users/schemas/user-schema";

export function useChangeSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      employeeId,
      data,
    }: {
      employeeId: string;
      data: WorkScheduleInput;
    }) => {
      const response =
        await apiFetch(
          `/api/users/${employeeId}/schedules`,
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
        title: "Schedule updated",
        description:
          "A new work schedule has been created.",
      });
    },
  });
}