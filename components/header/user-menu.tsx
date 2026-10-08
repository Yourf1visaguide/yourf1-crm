"use client";

import { BriefcaseBusiness, LogOut, Settings, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useCurrentUser } from "@/hooks/use-current-user";
import { authClient } from "@/lib/auth-client";
import { usersKeys } from "@/features/users/api/users-keys";
import { cn } from "cn";

export function UserMenu() {
  const { data: user, isLoading } = useCurrentUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  if (isLoading) {
    return <div className="size-10 animate-pulse rounded-xl bg-primary/10" />;
  }

  if (!user) {
    return null;
  }

  const initials = getInitials(user.name);
  const primaryRole = formatRole(user.roles[0] ?? "User");
  const department = user.employee?.department
    ? formatRole(user.employee.department)
    : null;

  async function handleLogout() {
    await authClient.signOut();

    queryClient.removeQueries({
      queryKey: usersKeys.all,
    });

    queryClient.removeQueries({
      queryKey: ["current-user"],
    });

    router.replace("/login");
    router.refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            className=" flex size-9 items-center justify-center rounded-md bg-primary  text-md font-semibold text-primary-foreground "
          />
        }
      >
        <span> {initials} </span>

        {/* <span className="hidden min-w-0 sm:block">
          <span className=" block max-w-28 truncate text-sm font-medium leading-4 text-foreground " >
            {user.name}
          </span>

          <span className=" mt-0.5 block max-w-28 truncate text-[11px] leading-4 text-muted-foreground " >
            {formatRole(primaryRole)}
          </span>
        </span>

        <ChevronDown
          className=" size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-popup-open:rotate-180 " /> */}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        side="bottom"
        sideOffset={10}
        className="
          w-[320px]
          overflow-hidden
          rounded-md
          border border-border/70
          bg-popover/95
          p-1.5
          shadow-2xl
          backdrop-blur-md
          ring-0
        "
      >
        <DropdownMenuGroup>
          {/* Identity */}
          <DropdownMenuLabel className="p-0">
            <div className="px-3 pb-3 pt-3">
              <div className="flex items-start gap-3">
                <div
                  className="
                  flex size-12 shrink-0 items-center justify-center
                  rounded-xl
                  border border-primary/20
                  bg-primary/10
                  text-sm font-semibold
                  tracking-wide
                  text-primary
                "
                >
                  {initials}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {user.name}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>

                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="text-[11px] font-medium text-primary">
                      {primaryRole}
                    </span>

                    <span className="text-muted-foreground/40">•</span>

                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <span className={cn("size-1.5 rounded-full ", user.isActive ? "bg-emerald-500" : "bg-red-600")} />
                      {user.isActive ? "Active" : "Inactive" }
                    </span>
                  </div>
                </div>
              </div>

              {department && (
                <div className="mt-3 flex items-center gap-2 border-t border-border/50 pt-3 text-xs text-muted-foreground">
                  <BriefcaseBusiness className="size-3.5" />
                  <span>{department}</span>

                  {user.employee?.designation && (
                    <>
                      <span className="text-muted-foreground/30">/</span>
                      <span className="truncate">
                        {user.employee.designation}
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="mx-2" />

          {/* Account */}
          <div className="p-1">
            <DropdownMenuItem className="h-10 rounded-lg px-3">
              <UserRound className="size-4 text-muted-foreground" />
              <span>Profile</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="h-10 rounded-lg px-3">
              <Settings className="size-4 text-muted-foreground" />
              <span>Settings</span>
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator className="mx-2" />

          {/* Logout */}
          <div className="p-1">
            <DropdownMenuItem
              variant="destructive"
              className="h-10 rounded-lg px-3"
              onClick={handleLogout}
            >
              <LogOut className="size-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function getInitials(name: string | null) {
  if (!name) return "U";

  return name
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatRole(value: string) {
  return value
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
