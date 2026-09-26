"use client"
import { useState } from "react";
import NavLink from "./NavLink";
import { ChevronDown } from "lucide-react";

import { isRouteActive, NavGroup } from "./SideBar";
import { usePathname } from "next/navigation";

export default function NavGroupSection({
  group,
  collapsed,
  onNavigate,
}: {
  group: NavGroup;
  collapsed: boolean;
  onNavigate?: () => void;
}) {

  const pathname = usePathname();

  const groupActive = group.items.some((item) =>
    isRouteActive(pathname, item.href)
  );

  const [open, setOpen] = useState(groupActive);
  const Icon = group.icon;

  if (collapsed) {
    return (
      <div className="space-y-1">
        {group.items.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            collapsed
            onNavigate={onNavigate}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className={[
          "flex h-10 w-full items-center gap-3 rounded-lg px-3",
          "text-sm transition-colors",
          groupActive
            ? "text-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        ].join(" ")}
      >
        <Icon className="size-[18px] shrink-0" strokeWidth={1.8} />
        <span className="flex-1 text-left">{group.title}</span>
        <ChevronDown
          className={[
            "size-4 transition-transform duration-200",
            open ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>

      {open && (
        <div className="ml-4 space-y-1 border-l border-border pl-3">
          {group.items.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              collapsed={false}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
