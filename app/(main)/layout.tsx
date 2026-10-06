import { ThemeProvider } from "next-themes";
import DashboardShell from "@/components/layout/DashboardShell";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/get-current-user-server-side";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  console.log(user);
  
  if(!user){
    redirect("/login")
  }
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
    >
      <DashboardShell>
        {children}
      </DashboardShell>
    </ThemeProvider>
  );
}