import { ROLE_PERMISSIONS } from "./role-permission-mapping";
import { type Permission } from "./permissions";
import { ROLES } from "@/prisma/generated/prisma/client";

export function hasPermission(
  roles: ROLES[],
  permission: Permission
): boolean {
  return roles.some((role) =>
    ROLE_PERMISSIONS[role].includes(permission)
  );
}



// const canCreateEmployee = hasPermission(
//   currentUser.roles,
//   PERMISSIONS.EMPLOYEE_CREATE
// );

// return (
//   <>
//     {canCreateEmployee && (
//       <Button>Create employee</Button>
//     )}
//   </>
// );