import React, { Suspense } from "react";
import { Bell, Search } from "lucide-react";

import DateFilter from "./DateFilter";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/resuable-components/ModeToggle";
import HeaderCoverDesign from "./HeaderCoverDesign";
import { UserMenu } from "./user-menu";

import type { getCurrentUser } from "@/lib/auth/get-current-user-server-side";

type CurrentUser = NonNullable<
  Awaited<ReturnType<typeof getCurrentUser>>
>;

type HeaderProps = {
  user: CurrentUser;
};

function Header({ user }: HeaderProps) {
  const today = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  return (
    <header className="relative z-30 overflow-hidden border-b border-border/40 bg-linear-to-b from-primary/10 to-primary/20 px-4 pb-44 backdrop-blur-md sm:px-8">
      <HeaderCoverDesign />

      <div className="sticky top-0 z-50 flex h-16 items-center justify-between">
        <div className="flex items-center gap-3" />

        <div className="flex items-center gap-x-4">
          <Button
            variant="outline"
            size="icon-lg"
            aria-label="Search"
          >
            <Search className="size-5" />
          </Button>

          <Button
            variant="outline"
            size="icon-lg"
            aria-label="Notifications"
          >
            <Bell className="size-5" />
          </Button>

          <ModeToggle />

          <UserMenu />
        </div>
      </div>

      <div className="flex flex-col items-start justify-start gap-y-3 pt-10 md:flex-row md:items-center md:justify-between">
        <div className="text-muted-foreground">
          <div className="pb-1 text-sm tracking-wider">
            {today}
          </div>

          <div className="text-2xl text-foreground">
            Welcome,{" "}
            <span className="font-semibold">
              {user.name}
            </span>
          </div>
        </div>

        <Suspense fallback={null}>
          <DateFilter />
        </Suspense>
      </div>
    </header>
  );
}

export default Header;