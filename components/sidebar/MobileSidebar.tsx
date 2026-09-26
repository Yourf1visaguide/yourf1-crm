"use client"
import { useState } from "react";
import { LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import SidebarContent from "./SideBarContent";


export function MobileSidebar({
  trigger,
}: {
  trigger?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="lg:hidden">
        {trigger ?? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
          >
            <LayoutDashboard className="size-5" />
          </Button>
        )}
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-[280px]  border-border bg-sidebar p-0 text-foreground sm:w-[300px]"
        >
          <SheetTitle className="sr-only">
            Main navigation
          </SheetTitle>

          <SidebarContent
            collapsed={false}
            onNavigate={() => setOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}