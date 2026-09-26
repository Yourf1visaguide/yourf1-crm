"use client";

import AppSidebar from "@/components/sidebar/SideBar";
import Header from "@/components/header/Header";
import { useSidebarStore } from "@/stores/sidebar-store";
import { cn } from "@/lib/utils";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const isCollapsed = useSidebarStore(
    (state) => state.isCollapsed
  );

  return (
    <div className="min-h-screen ">
      <AppSidebar />

      <div
        className={cn(
          "min-h-screen transition-[margin] duration-300",
          isCollapsed
            ? "lg:ml-[76px]"
            : "lg:ml-[260px]"
        )}
      >
        <Header />

        <main className="p-4 sm:p-6 lg:p-8  ">
          {children}
        </main>
      </div>
    </div>
  );
}