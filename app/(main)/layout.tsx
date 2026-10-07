import { redirect } from "next/navigation";
import { ThemeProvider } from "next-themes";

import DashboardShell from "@/components/layout/DashboardShell";
import { getCurrentUser } from "@/lib/auth/get-current-user-server-side";

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
      <DashboardShell user={user}>
        {children}
      </DashboardShell>
    </ThemeProvider>
  );
}