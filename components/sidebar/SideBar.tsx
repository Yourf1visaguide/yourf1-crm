"use client";


import SidebarContent from "./SideBarContent";
import { useSidebarStore } from "@/stores/sidebar-store";

export type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
};

export type NavGroup = {
  title: string;
  icon: React.ElementType;
  items: NavItem[];
};

export function isRouteActive(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AppSidebar() {
  

  const isCollapsed = useSidebarStore(
    (state) => state.isCollapsed
  );

  const toggle = useSidebarStore(
    (state) => state.toggle
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 hidden border-r border-sidebar-border",
          "transition-[width] duration-300 ease-in-out lg:block",
          isCollapsed ? "w-[76px]" : "w-[260px]",
        ].join(" ")}
      >
        <SidebarContent
          collapsed={isCollapsed}
          onToggle={() => toggle()}
        />
      </aside>

      
    </>
  );
}
