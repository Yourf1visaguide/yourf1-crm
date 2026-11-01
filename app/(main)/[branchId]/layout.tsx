import "server-only";

import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { ThemeProvider } from "next-themes";

import DashboardShell from "@/components/layout/DashboardShell";
import { getCurrentUser } from "@/lib/auth/get-current-user-server-side";
import { prisma } from "@/lib/prisma";
import { resolveBranchContext } from "@/lib/auth/resolve-branch-context";
import type { BranchAccessActor } from "@/lib/auth/branch-access";
import { ROLES } from "@/prisma/generated/prisma/client";

type Props = {
  children: ReactNode;
  params: Promise<{ branchId: string }>;
};

function BranchAccessDenied({ message }: { message: string }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="max-w-md space-y-3 text-center">
        <h1 className="text-xl font-semibold">Branch access denied</h1>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

export default async function DashboardLayout({ children, params }: Props) {
  const [{ branchId }, user] = await Promise.all([params, getCurrentUser()]);
  if (!user) redirect("/login");

  const actor = await prisma.user.findFirst({
    where: { id: user.id, isActive: true },
    select: {
      branchId: true,
      roles: true,
      branchAccesses: { select: { branchId: true } },
    },
  });

  if (!actor) redirect("/login");

  const branchActor: BranchAccessActor = {
    branchId: actor.branchId,
    branchAccesses: actor.branchAccesses,
    roles: actor.roles as ROLES[],
  };

  try {
    await resolveBranchContext(branchActor, branchId);
  } catch (error) {
    const status =
      error instanceof Error && "status" in error
        ? (error as Error & { status?: number }).status
        : undefined;

    if (status === 403) {
      return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <DashboardShell user={user}>
            <BranchAccessDenied message="Your account does not have access to this branch." />
          </DashboardShell>
        </ThemeProvider>
      );
    }

    if (status === 400) {
      return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <DashboardShell user={user}>
            <BranchAccessDenied message="This branch does not exist or is inactive." />
          </DashboardShell>
        </ThemeProvider>
      );
    }

    throw error;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <DashboardShell user={user}>{children}</DashboardShell>
    </ThemeProvider>
  );
}
