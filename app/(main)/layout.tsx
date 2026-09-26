import { ThemeProvider } from "next-themes";
import DashboardShell from "@/components/layout/DashboardShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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