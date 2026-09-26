import React from 'react'
import { MobileSidebar } from "../sidebar/MobileSidebar"
import { Button } from "../ui/button"
import { Bell } from "lucide-react"
import { ModeToggle } from "../ModeToggle"

function Header() {
 
  return (
    <header className="sticky top-0 z-30  backdrop-blur-md  border-border/40 ">
          <div className="flex h-16 items-center justify-between sm:px-6  px-4">
            <div className="flex items-center gap-3">
            <MobileSidebar />

            <div className="hidden text-sm text-muted-foreground sm:block">
              <span className="pl-4">Workspace</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
            >
              <Bell className="size-5" />
            </Button>

            <ModeToggle />
            
            <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              AS
            </div>
          </div>
          </div>
        </header>
  )
}

export default Header