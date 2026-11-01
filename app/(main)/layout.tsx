import { redirect } from "next/navigation";
import { ThemeProvider } from "next-themes";

import DashboardShell from "@/components/layout/DashboardShell";
import { getCurrentUser } from "@/lib/auth/get-current-user-server-side";
import { BranchProvider } from "@/providers/branch-provider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
    >
      <BranchProvider userId={user.id} primaryBranchId={user.branchId}>
        <DashboardShell user={user}>
          {children}
        </DashboardShell>
      </BranchProvider>
    </ThemeProvider>
  );
}