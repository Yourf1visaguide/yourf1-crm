"use client";

import * as React from "react";
import {
  IconBook2,
  IconBriefcase2,
  IconChevronDown,
  IconFileText,
  IconHome2,
  IconId,
  IconPencil,
  IconUsers,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { ProfileField, ProfileFieldGroup } from "./lead-profile.types";

type ProfileInfoCardProps = {
  group: ProfileFieldGroup;
  onEdit?: (sectionId: string) => void;
  className?: string;
};

function displayValue(field: ProfileField) {
  if (field.value === null || field.value === undefined || field.value === "") {
    return <span className="text-muted-foreground/80">Not provided</span>;
  }

  return <span className="break-words text-foreground">{field.value}</span>;
}

const groupIcons = {
  personal: IconUsers,
  education: IconBook2,
  address: IconHome2,
  tests: IconFileText,
  family: IconUsers,
  work: IconBriefcase2,
  passport: IconId,
} as const;

export function ProfileInfoCard({ group, onEdit, className }: ProfileInfoCardProps) {
  const GroupIcon = group.icon ? groupIcons[group.icon] : null;
  const [expanded, setExpanded] = React.useState(group.initiallyExpanded ?? true);
  const contentId = React.useId();

  return (
    <Card className={cn("min-w-0 gap-0 py-0", className)}>
      <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-border/80 px-4 py-3.5 sm:px-5">
        <div className="flex min-w-0 items-start gap-3">
          {GroupIcon ? (
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary [&>svg]:size-[18px]">
              <GroupIcon aria-hidden="true" />
            </span>
          ) : null}
          <div className="min-w-0 space-y-0.5">
            <CardTitle className="text-sm font-semibold sm:text-[15px]">{group.title}</CardTitle>
            {group.description ? (
              <CardDescription className="text-xs leading-5 sm:text-[13px]">
                {group.description}
              </CardDescription>
            ) : null}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {onEdit ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="hidden h-7 gap-1.5 text-xs sm:inline-flex"
              onClick={() => onEdit(group.id)}
            >
              <IconPencil className="size-3.5" aria-hidden="true" />
              Edit
            </Button>
          ) : null}
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="size-7 text-muted-foreground"
            aria-expanded={expanded}
            aria-controls={contentId}
            aria-label={`${expanded ? "Collapse" : "Expand"} ${group.title}`}
            onClick={() => setExpanded((value) => !value)}
          >
            <IconChevronDown
              className={cn("size-4 transition-transform", expanded && "rotate-180")}
              aria-hidden="true"
            />
          </Button>
        </div>
      </CardHeader>

      {expanded ? (
        <CardContent id={contentId} className="px-4 py-2.5 sm:px-5 sm:py-3">
          <dl className="grid grid-cols-1 gap-x-7 sm:grid-cols-2">
            {group.fields.map((field, index) => (
              <div
                key={`${group.id}-${field.label}`}
                className={cn(
                  "grid min-w-0 grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-3 border-b border-border/60 py-2.5 text-[13px] leading-5 last:border-b-0 sm:gap-4",
                  index >= group.fields.length - 2 && "sm:last:border-b-0",
                )}
              >
                <dt className="min-w-0 text-muted-foreground">{field.label}</dt>
                <dd className="min-w-0 font-medium">{displayValue(field)}</dd>
              </div>
            ))}
          </dl>
          {onEdit ? (
            <div className="mt-2 border-t border-border/60 pt-2 sm:hidden">
              <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => onEdit(group.id)}>
                <IconPencil className="size-3.5" aria-hidden="true" />
                Edit {group.title.toLowerCase()}
              </Button>
            </div>
          ) : null}
        </CardContent>
      ) : null}
    </Card>
  );
}
