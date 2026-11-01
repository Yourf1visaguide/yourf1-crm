import {
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { isRouteActive, NavItem } from "./app-sidebar";
import Link from "next/link";
import { cn } from "cn";
export default function SidebarNavItem({ item }: { item: NavItem }) {
  
  const pathname = usePathname();
  const active = isRouteActive(pathname, item.href);
  const Icon = item.icon;
  return (
    <SidebarMenuItem >
      
      <SidebarMenuButton
        render={<Link href={item.href} />}
        // isActive={active}
        tooltip={item.title}
        className={cn("h-10 mt-1 rounded-lg font-semibold hover:bg-accent ", active && "bg-secondary")}
      >
        {active && (
        <span className="absolute bottom-2 left-0 top-2.5 w-[3px] rounded-r-full bg-primary" />
      )}
        <Icon className="size-[18px]" strokeWidth={1.8} />
        <span >{item.title}</span>
      </SidebarMenuButton>

      {item.badge && (
        <SidebarMenuBadge className="mt-2 rounded-md bg-destructive/80 text-destructive-foreground  ">
          <span className="text-white">{item.badge}</span>
        </SidebarMenuBadge>
      )}
    </SidebarMenuItem>
  );
}
