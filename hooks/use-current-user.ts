"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/auth/get-current-user";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    staleTime: 2 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
}



// EXAMPLE - EXAMPLE - EXAMPLE - EXAMPLE - EXAMPLE
// "use client";

// import { useCurrentUser } from "@/features/auth/hooks/use-current-user";

// export function Header() {
//   const {
//     data: user,
//     isLoading,
//   } = useCurrentUser();

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (!user) {
//     return null;
//   }

//   return (
//     <div>
//       Welcome, {user.name}
//     </div>
//   );
// }


// "use client";

// import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
// import { hasPermission } from "@/lib/auth/has-permission";
// import { PERMISSIONS } from "@/lib/auth/permissions";

// export function EmployeeActions() {
//   const { data: user } = useCurrentUser();

//   if (!user) {
//     return null;
//   }

//   const canCreateEmployee = hasPermission(
//     user.roles,
//     PERMISSIONS.EMPLOYEE_CREATE
//   );

//   return (
//     <div>
//       {canCreateEmployee && (
//         <button>
//           Create Employee
//         </button>
//       )}
//     </div>
//   );
// }