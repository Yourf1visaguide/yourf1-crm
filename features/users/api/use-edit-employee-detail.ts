import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditEmployeeFormValues } from "../schemas/user-schema";
import { apiFetch } from "@/lib/api-fetch";

export function useEditEmployeeDetail(){

  // async ( values: CreateEmployeeFormValues, ): Promise<CreateUserResponse> => {
  //       const response = await apiFetch<CreateUserResponse>("/api/users", {
  //         method: "POST",
  //         body: JSON.stringify(values),
  //       });
  
  //       return response.data;
  //     },
  const queryClient = useQueryClient();
  useMutation({
     mutationFn: async (values:EditEmployeeFormValues) => {
      const response= await apiFetch("/api/users", {
        method:"patch",
        body:JSON.stringify(values)
      })
     },
    onSuccess: () => {
      // Automatically refresh the UI by invalidating the cached data list
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  })
}