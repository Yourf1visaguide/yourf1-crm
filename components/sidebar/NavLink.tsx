"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { isRouteActive, NavItem } from "./SideBar";


export default function NavLink({ item, collapsed, onNavigate, }: { item: NavItem; collapsed: boolean; onNavigate?: () => void; }) {
  const pathname = usePathname();
  const active = isRouteActive(pathname, item.href);
  const Icon = item.icon;

  const link = (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={[
        "group relative flex h-10 items-center gap-3 rounded-lg px-3",
        "text-[15px]  transition-colors duration-200 text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ",
        active
          ? "bg-secondary/50 text-secondary-foreground font-medium "
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        collapsed ? "justify-center px-0" : "",
      ].join(" ")}
    >
      {active && (
        <span className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-primary" />
      )}

      <Icon
        className={[
          "size-[18px] shrink-0 transition-colors",
          active
            ? " text-secondary-foreground "
            : "text-foreground group-hover:text-foreground",
        ].join(" ")}
        strokeWidth={1.8}
      />

      {!collapsed && (
        <>
          <span className="flex-1 truncate">{item.title}</span>

          {item.badge && (
            <span className="rounded-md bg-primary/30 px-1.5 py-0.5 text-[11px] font-medium text-primary">
              {item.badge}
            </span>
          )}
        </>
      )}
    </Link>
  );

  if (!collapsed) return link;

  return (
    <Tooltip>
      <TooltipTrigger >{link}</TooltipTrigger>
      <TooltipContent side="right">
        {item.title}
      </TooltipContent>
    </Tooltip>
  );
}
