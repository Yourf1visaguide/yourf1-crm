import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible";
import { 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarMenuSub, 
  SidebarMenuSubButton, 
  SidebarMenuSubItem, 
  useSidebar 
  } from "../ui/sidebar";

import { 
  isRouteActive, 
  NavGroup 
  } from "./app-sidebar";

import SidebarNavItem from "./side-bar-navItem";
import { cn } from "cn";

  export default function SidebarNavGroup({ group }: { group: NavGroup }) {
    const pathname = usePathname();
    const { state } = useSidebar();

    const groupActive = group.items.some((item) =>
      isRouteActive(pathname, item.href)
    );

    const [collapseOpen, setCollapseOpen] = React.useState(groupActive);
    const Icon = group.icon;

    // Match your old sidebar: when collapsed, show the child
    // links directly instead of hiding them inside a group.
    if (state === "collapsed") {
      return (
        <>
          {group.items.map((item) => (
            <SidebarNavItem key={item.href} item={item} />
          ))}
        </>
      );
    }

    return (
      <Collapsible
        open={collapseOpen}
        onOpenChange={setCollapseOpen}
        className="group/collapsible"
      >
        <SidebarMenuItem className=" ">
          <CollapsibleTrigger
            render={
              <SidebarMenuButton
                tooltip={group.title}
                className="h-10 hover:bg-accent rounded-md"
              />
            }
          >
            <Icon className="size-[18px]" strokeWidth={1.8} />
            <span className="font-semibold">{group.title}</span>
            <ChevronDown
              className={`ml-auto size-4  transition-transform ${
                collapseOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>

          <CollapsibleContent>
            <SidebarMenuSub className="mr-0">
              {group.items.map((item) => {
                const active = isRouteActive(pathname, item.href);
                const ItemIcon = item.icon;

                return (
                  <SidebarMenuSubItem key={item.href}>
                    <SidebarMenuSubButton
                      render={<Link href={item.href} />}
                      className={cn("hover:bg-accent rounded-md py-4", active  && "bg-secondary")}
                    >
                      {active && (
        <span className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-primary" />
      )}
                      <ItemIcon className="size-4" strokeWidth={1.8} />
                      <span>{item.title}</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                );
              })}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }