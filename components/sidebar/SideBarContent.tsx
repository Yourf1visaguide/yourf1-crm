import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";

import {
  Activity,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  CreditCard,
  FileText,
  FolderKanban,
  Headset,
  LayoutDashboard,
  MessageCircle,
  Settings,
  ShieldCheck,
  UserRound,
  UserRoundPlus,
  Users,
  Wallet,
} from "lucide-react";
import Brand from "./Brand";
import NavLink from "./NavLink";
import { NavGroup, NavItem } from "./SideBar";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import NavGroupSection from "./NavGroundSection";


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
      icon: ClipboardList,
    },
  ];
  
  const teamNavigation: NavGroup = {
    title: "Team",
    icon: Users,
    items: [
      {
        title: "Users",
        href: "/dashboard/users",
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

export default function SidebarContent({
  collapsed,
  onNavigate,
  onToggle,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
  onToggle?: () => void;
  
}) {
  return (
    <TooltipProvider >
      <div className="flex h-full flex-col bg-sidebar text-foreground">
        <div className="flex items-center justify-between">
          <Brand collapsed={collapsed} />

          {onToggle && (
            <Button
              variant="default"
              size="xs"
              onClick={onToggle}
              className=" size-8 -ml-2 mr-2"
              aria-label={
                collapsed ? "Expand sidebar" : "Collapse sidebar"
              }
            >
              {collapsed ? (
                <ChevronRight className="size-4" />
              ) : (
                <ChevronLeft className="size-4" />
              )}
            </Button>
          )}
        </div>

        <Separator />

        <div className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
          <div className="space-y-1">
            {!collapsed && (
              <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70">
                Workspace
              </p>
            )}

            {mainNavigation.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                collapsed={collapsed}
                onNavigate={onNavigate}
              />
            ))}
          </div>

          <Separator />

          <div className="space-y-1">
            {!collapsed && (
              <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70">
                People
              </p>
            )}

            <NavGroupSection
              group={teamNavigation}
              collapsed={collapsed}
              onNavigate={onNavigate}
            />
          </div>

          <div className="space-y-1">
            {!collapsed && (
              <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70">
                Operations
              </p>
            )}

            <NavGroupSection
              group={operationsNavigation}
              collapsed={collapsed}
              onNavigate={onNavigate}
            />
          </div>

          <Separator />

          <div className="space-y-1">
            {!collapsed && (
              <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70">
                Management
              </p>
            )}

            {managementNavigation.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                collapsed={collapsed}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>

        <div className="border-t border-border p-3">
          <div
            className={[
              "flex items-center gap-3 rounded-xl p-2",
              "transition-colors hover:bg-sidebar-accent",
              collapsed ? "justify-center" : "",
            ].join(" ")}
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              AS
            </div>

            {!collapsed && (
              <>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    Aman Sharma
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Administrator
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  aria-label="Account menu"
                >
                  <LogOut className="size-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
