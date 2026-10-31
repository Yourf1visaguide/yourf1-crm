"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, PencilLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { LeadProfileSection } from "./lead-profile.types";

type ProfileInfoCardProps = {
  section: LeadProfileSection;
  onEdit?: (sectionId: string) => void;
  className?: string;
};

/** Reusable key/value card. Edit is intentionally inert in the static phase. */
export function ProfileInfoCard({
  section,
  onEdit,
  className,
}: ProfileInfoCardProps) {
  const [expanded, setExpanded] = useState(!section.initiallyCollapsed);

  return (
    <Card className={cn("min-w-0 gap-0 py-0", className)}>
      <CardHeader className="flex min-h-16 flex-row items-center justify-between gap-3 border-b border-border/70 px-4 py-3 sm:px-5">
        <div className="min-w-0 space-y-1">
          <CardTitle className="text-sm font-semibold sm:text-base">
            {section.title}
          </CardTitle>
          {section.description ? (
            <CardDescription className="text-xs leading-5">
              {section.description}
            </CardDescription>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {onEdit ? (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Edit ${section.title}`}
              onClick={() => onEdit(section.id)}
            >
              <PencilLine className="size-4" />
            </Button>
          ) : null}
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`${expanded ? "Collapse" : "Expand"} ${section.title}`}
            aria-expanded={expanded}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      {expanded ? (
        <CardContent className="px-4 py-3 sm:px-5 sm:py-4">
          <dl className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
            {section.fields.map((field) => (
              <div
                key={field.label}
                className="grid min-w-0 grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-3 border-b border-border/50 py-2.5 last:border-b-0 sm:odd:pr-2 sm:even:pl-2"
              >
                <dt className="min-w-0 text-xs leading-5 text-muted-foreground sm:text-sm">
                  {field.label}
                </dt>
                <dd
                  className={cn(
                    "min-w-0 break-words text-xs leading-5 sm:text-sm",
                    field.value
                      ? "font-medium text-card-foreground"
                      : "text-muted-foreground/75",
                  )}
                >
                  {field.value ?? "Not provided"}
                </dd>
              </div>
            ))}
          </dl>
        </CardContent>
      ) : null}
    </Card>
  );
}
