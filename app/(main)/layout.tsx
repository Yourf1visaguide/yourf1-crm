import { ThemeProvider } from "next-themes";
import DashboardShell from "@/components/layout/DashboardShell";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const user = await getCurrentUser();
    console.log(user);
  } catch (error) {
    
  }
  // if(!user){
  //   redirect("/login")
  // }
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