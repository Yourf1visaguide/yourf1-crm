"use client";

import { IconCalendarClock, IconChecklist, IconFileText, IconFiles, IconLayoutDashboard, IconMessage, IconReceipt, IconTimeline } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

import type { LeadProfileSection } from "./lead-profile.types";

const sections: Array<{ id: LeadProfileSection; label: string; icon: React.ReactNode }> = [
  { id: "overview", label: "Overview", icon: <IconLayoutDashboard aria-hidden="true" /> },
  { id: "applications", label: "Applications", icon: <IconFiles aria-hidden="true" /> },
  { id: "documents", label: "Documents", icon: <IconFileText aria-hidden="true" /> },
  { id: "notes", label: "Notes", icon: <IconMessage aria-hidden="true" /> },
  { id: "follow-ups", label: "Follow-ups", icon: <IconCalendarClock aria-hidden="true" /> },
  { id: "tasks", label: "Tasks", icon: <IconChecklist aria-hidden="true" /> },
  { id: "payments", label: "Payments", icon: <IconReceipt aria-hidden="true" /> },
  { id: "timeline", label: "Timeline", icon: <IconTimeline aria-hidden="true" /> },
];

type LeadProfileNavigationProps = {
  activeSection: LeadProfileSection;
  onChange: (section: LeadProfileSection) => void;
};

export function LeadProfileNavigation({ activeSection, onChange }: LeadProfileNavigationProps) {
  return (
    <nav aria-label="Lead profile sections" className="-mx-1 overflow-x-auto px-1">
      <div className="flex min-w-max items-center gap-1 border-b border-border/80">
        {sections.map((section) => {
          const active = activeSection === section.id;
          return (
            <button
              key={section.id}
              type="button"
              aria-current={active ? "page" : undefined}
              onClick={() => onChange(section.id)}
              className={cn(
                "relative inline-flex min-h-11 items-center gap-2 whitespace-nowrap border-b-2 border-transparent px-3 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                active && "border-primary font-medium text-primary",
              )}
            >
              <span className="[&>svg]:size-4">{section.icon}</span>
              {section.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
