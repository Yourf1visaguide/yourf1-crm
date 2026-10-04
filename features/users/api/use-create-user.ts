"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { usersKeys } from "./users-keys";
import { apiFetch } from "@/lib/api-fetch";
import { toast } from "@/components/ui/toast";
import type { CreateEmployeeFormValues } from "@/features/users/schemas/user-schema";

type CreateUserResponse = {
  id: string;
  name: string;
  email: string;
};

async function createUser(
  values: CreateEmployeeFormValues,
): Promise<CreateUserResponse> {
  return await apiFetch("api/users", {
    method: "post",
    body: JSON.stringify(values),
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  

  return useMutation({
    mutationFn: createUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: usersKeys.all,
      });
      toast.add({
        type:"info",
        title: "Success",
        description: "User is created successfully.",
      });
    },
    onError: async () => {
      // onClose();
      toast.add({
        title: "Error",
        description: "Something went Wrong. Please try again.",
      });
    },
  });
}
