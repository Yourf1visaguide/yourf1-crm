"use client";

import * as React from "react";
import {
  Activity,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  CreditCard,
  Cross,
  FileText,
  FolderKanban,
  Headset,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Settings,
  ShieldCheck,
  UserRound,
  UserRoundPlus,
  Users,
  Wallet,
  XCircle,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";
import Brand from "./Brand";
import SidebarNavItem from "./side-bar-navItem";
import SidebarNavGroup from "./side-bar-navGroup";

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

const mainNavigation: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Leads",
    href: "/dashboard/leads",
    icon: UserRoundPlus,
    badge: "12",
  },
  {
    title: "Students",
    href: "/dashboard/students",
    icon: Users,
  },
  {
    title: "Documents",
    href: "/dashboard/documents",
    icon: FileText,
  },
  {
    title: "Payments",
    href: "/dashboard/payments",
    icon: Wallet,
  },
  {
    title: "Follow-ups",
    href: "/dashboard/follow-ups",
    icon: CalendarDays,
  },
];

const teamNavigation: NavGroup = {
  title: "People",
  icon: Users,
  items: [
    {
      title: "Users",
      href: "/users",
      icon: UserRound,
    },
    {
      title: "Attendance",
      href: "/dashboard/attendance",
      icon: CalendarDays,
    },
    {
      title: "Roles & Permissions",
      href: "/dashboard/roles",
      icon: ShieldCheck,
    },
  ],
};

const operationsNavigation: NavGroup = {
  title: "Operations",
  icon: FolderKanban,
  items: [
    {
      title: "Teaching",
      href: "/dashboard/teaching",
      icon: BookOpen,
    },
    {
      title: "Filing",
      href: "/dashboard/filing",
      icon: BriefcaseBusiness,
    },
    {
      title: "Helpdesk",
      href: "/dashboard/helpdesk",
      icon: Headset,
    },
    {
      title: "Messages",
      href: "/dashboard/messages",
      icon: MessageCircle,
    },
  ],
};

const managementNavigation: NavItem[] = [
  {
    title: "Finance",
    href: "/dashboard/finance",
    icon: CreditCard,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: BarChart3,
  },
  {
    title: "Activity",
    href: "/dashboard/activity",
    icon: Activity,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function AppSidebar() {
  const { setOpenMobile, openMobile, state } = useSidebar();
  console.log(state);
  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="p-0 ">
        <div className="flex justify-between pr-4">
          <Brand collapsedState={state} />
          {openMobile && (
            <XCircle
              className="text-foreground size-5 mt-5 cursor-pointer"
              onClick={() => setOpenMobile(!openMobile)}
            />
          )}
        </div>
        <Separator />
      </SidebarHeader>

      <SidebarContent className="gap-0 overflow-y-scroll  ">
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarMenu>
            {mainNavigation.map((item) => (
              <SidebarNavItem key={item.href} item={item} />
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <div className="px-4">
          <Separator className="w-auto" />
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>People</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarNavGroup group={teamNavigation} />
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Operations</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarNavGroup group={operationsNavigation} />
          </SidebarMenu>
        </SidebarGroup>

        <div className="px-4">
          <Separator className="w-auto" />
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarMenu>
            {managementNavigation.map((item) => (
              <SidebarNavItem key={item.href} item={item} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Administrator"
              className="h-auto min-h-12 rounded-xl py-2"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                AS
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Aman Sharma</span>
                <span className="truncate text-xs text-muted-foreground">
                  Administrator
                </span>
              </div>

              <LogOut className="ml-auto size-4" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
