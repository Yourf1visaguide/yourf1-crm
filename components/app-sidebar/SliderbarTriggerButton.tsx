"use client"
import React from 'react'
import { SidebarTrigger, useSidebar } from "../ui/sidebar"
import { LayoutDashboard } from "lucide-react"
import { Button } from "../ui/button"

function SliderbarTriggerButton() {
  const {toggleSidebar, isMobile, openMobile, setOpenMobile} = useSidebar();
  if(isMobile){
    return (
      <div className="absolute top-4 left-6 z-50">
      <Button variant="ghost" className="  " onClick={() => setOpenMobile(!openMobile)}>
        <LayoutDashboard className="size-6  " />
      </Button>
    </div>
    )
  }
  return (
    
      <div className="absolute top-2 z-50">
        <SidebarTrigger />
      </div>
  )
}

export default SliderbarTriggerButton