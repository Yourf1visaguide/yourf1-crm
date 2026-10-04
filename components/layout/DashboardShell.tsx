import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";

import Header from "@/components/header/Header";
import AppSidebar from "@/components/app-sidebar/app-sidebar";
import SliderbarTriggerButton from "../app-sidebar/SliderbarTriggerButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider >
      <AppSidebar />

      <SidebarInset className="bg-background ">
        {/* Top row: sidebar trigger */}
        <div className="relative ">
          {/* <SidebarTrigger /> */}
          <SliderbarTriggerButton />
          
        <Header />
        </div>

        {/* Header below the trigger */}

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8 -mt-28 z-50 relative ">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}