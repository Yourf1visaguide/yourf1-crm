"use client";

import * as React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

type MultiSelectOption = {
  label: string;
  value: string;
};

type MultiSelectProps = {
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select options",
  disabled = false,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  function toggleValue(optionValue: string) {
    if (value.includes(optionValue)) {
      onChange(value.filter((item) => item !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            "h-9 w-full justify-between font-normal",
            !value.length && "text-muted-foreground",
            className
          )}
        >
          <span className="truncate">
            {value.length === 0
              ? placeholder
              : value.length === 1
                ? options.find(
                    (option) => option.value === value[0]
                  )?.label
                : `${value.length} selected`}
          </span>

          <ChevronDown className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] p-1"
      >
        <div className="max-h-64 overflow-y-auto">
          {options.map((option) => {
            const selected = value.includes(option.value);

            return (
              <label
                key={option.value}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-sm px-2 py-2 text-sm",
                  "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Checkbox
                  checked={selected}
                  onCheckedChange={() =>
                    toggleValue(option.value)
                  }
                />

                <span>{option.label}</span>
              </label>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}