"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { CreateEmployeeFormValues } from "@/features/users/schemas/user-schema";
import { usersKeys } from "./users-keys";
import { apiFetch } from "@/lib/api-fetch";

type CreateUserResponse = {
  id: string;
  name: string;
  email: string;
};

async function createUser( values: CreateEmployeeFormValues, ): Promise<CreateUserResponse> {
  return await apiFetch("api/users", {
    method:"post", 
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
    },
  });
}