"use client";

import type { ReactNode } from "react";

import { usePermission } from "@/hooks/use-permission";
import type { Permission } from "@/lib/auth/permissions";

type CanProps = {
  permission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
};

export function Can({
  permission,
  children,
  fallback = null,
}: CanProps) {
  const allowed = usePermission(permission);

  if (!allowed) {
    return fallback;
  }

  return <>{children}</>;
}


// <Can permission={PERMISSIONS.EMPLOYEE_CREATE}>
//   <Button>
//     Create Employee
//   </Button>
// </Can>


// <Can
//   permission={PERMISSIONS.INVOICE_CREATE}
//   fallback={<span>No access</span>}
// >
//   <Button>
//     Create Invoice
//   </Button>
// </Can>