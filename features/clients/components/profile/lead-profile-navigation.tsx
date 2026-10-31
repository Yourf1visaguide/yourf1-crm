"use client";

import { useRef } from "react";
import {
  CalendarClock,
  ClipboardList,
  FileText,
  LayoutDashboard,
  MessageSquareText,
  ReceiptText,
  StickyNote,
  Workflow,
} from "lucide-react";

import { cn } from "@/lib/utils";

import type { LeadProfileTabId } from "./lead-profile.types";

const tabs: Array<{ id: LeadProfileTabId; label: string; icon: typeof LayoutDashboard }> = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "applications", label: "Applications", icon: Workflow },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "notes", label: "Notes", icon: StickyNote },
  { id: "follow-ups", label: "Follow-ups", icon: CalendarClock },
  { id: "tasks", label: "Tasks", icon: ClipboardList },
  { id: "payments", label: "Payments", icon: ReceiptText },
  { id: "timeline", label: "Timeline", icon: MessageSquareText },
];

type LeadProfileNavigationProps = {
  activeTab: LeadProfileTabId;
  onTabChange: (tab: LeadProfileTabId) => void;
};

export function LeadProfileNavigation({ activeTab, onTabChange }: LeadProfileNavigationProps) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | undefined;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    if (nextIndex !== undefined) {
      event.preventDefault();
      tabRefs.current[nextIndex]?.focus();
      onTabChange(tabs[nextIndex].id);
    }
  }

  return (
    <div className="-mx-1 overflow-x-auto px-1 pb-1">
      <div role="tablist" aria-label="Lead profile sections" className="flex min-w-max items-center gap-1 border-b border-border/80">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const selected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(node) => { tabRefs.current[index] = node; }}
              type="button"
              role="tab"
              id={`lead-profile-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls="lead-profile-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => onTabChange(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                "relative inline-flex min-h-11 items-center gap-2 px-3 text-xs font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring sm:px-4 sm:text-sm",
                selected && "text-primary after:absolute after:inset-x-3 after:bottom-[-1px] after:h-0.5 after:rounded-full after:bg-primary sm:after:inset-x-4",
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
