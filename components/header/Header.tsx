import React, { Suspense } from "react";
import { Bell, Search } from "lucide-react";

import DateFilter from "./DateFilter";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "@/components/sidebar/MobileSidebar";
import { ModeToggle } from "@/components/resuable-components/ModeToggle";
import HeaderCoverDesign from "./HeaderCoverDesign";

function Header() {
  return (
    <header className=" relative  z-30 sm:px-8 px-4  backdrop-blur-md bg-linear-to-b from-primary/10 to-primary/20 pb-44  border-border/40 overflow-hidden border-b ">
      <HeaderCoverDesign />
      <div className="sticky top-0 flex h-16 items-center justify-between  z-50">
        <div className="flex items-center gap-3">
          <MobileSidebar />

          {/* <div className="hidden text-base font-bold sm:block   py-1.5 rounded-md  text-secondary-foreground">
            <span className=""> Dashboard</span>
          </div> */}
        </div>

        <div className="flex items-center gap-x-4">
          <Button variant="outline" size="icon-lg" aria-label="Notifications">
            <Search className="size-5" />
          </Button>
          <Button variant="outline" size="icon-lg" aria-label="Notifications">
            <Bell className="size-5" />
          </Button>

          <ModeToggle />

          <div className="flex size-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            AS
          </div>
        </div>
      </div>
      <div className="pt-10 flex md:justify-between md:items-center items-start justify-start flex-col md:flex-row gap-y-3 ">
        <div className="text-muted-foreground ">
          <div className="pb-1 text-sm tracking-wider">Sunday, 28 Aug 2026</div>
          <div className="text-2xl text-foreground   ">
            Welcome , <span className="font-semibold">Amardeep Singh</span>
          </div>
        </div>
        <Suspense fallback="Loading">
          <DateFilter />
        </Suspense>
      </div>
    </header>
  );
}

export default Header;
