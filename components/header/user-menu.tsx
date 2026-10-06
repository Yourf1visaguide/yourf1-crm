"use client";

import { ChevronDown, ChevronUp, LogOut, Settings, UserRound } from "lucide-react";

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
import { useQueryClient } from "@tanstack/react-query";
import { usersKeys } from "@/features/users/api/users-keys";
import { useRouter } from "next/navigation";

export function UserMenu() {
  const { data: user, isLoading } = useCurrentUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  if (isLoading) {
    return (
      <div
        className="
          h-11
          w-36
          animate-pulse
          rounded-xl
          border
          border-white/10
          bg-white/[0.04]
        "
      />
    );
  }

  if (!user) {
    return null;
  }

  const initials = getInitials(user.name);
  const primaryRole = user.roles[0] ?? "User";

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
        sideOffset={6}
        className="w-72 rounded-md ring-0 border border-border shadow-xs bg-background/50 p-2  backdrop-blur-xs "
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="p-0 relative  ">
            <div className="flex items-center gap-3 rounded-xl px-2.5 py-3">
              <div className=" flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-sm font-semibold tracking-wide text-primary ">
                {initials}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold leading-5 text-foreground">
                  {user.name}
                </p>

                <p className="mt-0.5 truncate text-xs leading-4 text-muted-foreground">
                  {user.email}
                </p>

                {/* <div className="mt-2 flex flex-wrap gap-1">
                  {user.roles.map((role) => (
                    <span
                      key={role}
                      className=" inline-flex items-center rounded-md border border-primary/20 bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium leading-4 text-primary "
                    >
                      {formatRole(role)}
                    </span>
                  ))}
                </div> */}
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="h-10 rounded-xl px-3 hover:bg-accent focus-within:bg-accent ">
            <UserRound className="size-4 text-muted-foreground" />
            <span>View profile</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            className="h-10 rounded-xl px-3"
            onClick={handleLogout}
          >
            <LogOut className="size-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {/* <DropdownMenuSeparator /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function getInitials(name: string | null) {
  if (!name) {
    return "U";
  }

  return name
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatRole(role: string) {
  return role
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
