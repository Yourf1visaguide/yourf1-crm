"use client";

import { useCurrentUser } from "./use-current-user";
import {
  hasPermission,
} from "@/lib/auth/has-permission-client";
import type { Permission } from "@/lib/auth/permissions";

export function usePermission(permission: Permission) {
  const { data: user } = useCurrentUser();

  if (!user) {
    return false;
  }

  return hasPermission(user.roles, permission);
}

// example how to use


// "use client";

// import { usePermission } from "@/features/auth/hooks/use-permission";
// import { PERMISSIONS } from "@/lib/auth/permissions";

// export function EmployeeActions() {
//   const canCreateEmployee = usePermission(
//     PERMISSIONS.EMPLOYEE_CREATE
//   );

//   return (
//     <>
//       {canCreateEmployee && (
//         <button>
//           Create Employee
//         </button>
//       )}
//     </>
//   );
// }