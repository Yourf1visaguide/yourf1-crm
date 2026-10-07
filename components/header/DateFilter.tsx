"use client";

import { useEffect, useState } from "react";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format, subDays, startOfMonth, endOfMonth, subMonths } from "date-fns";
import type { DateRange } from "react-day-picker";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

function DateFilter() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const today = new Date();

  const defaultFrom = subDays(today, 30);
  const defaultTo = today;

  const fromParam = params.get("from");
  const toParam = params.get("to");

  const initialRange: DateRange = {
    from: fromParam ? new Date(`${fromParam}T00:00:00`) : defaultFrom,

    to: toParam ? new Date(`${toParam}T00:00:00`) : defaultTo,
  };

  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>(
    initialRange,
  );

  useEffect(() => {
    setSelectedDate({
      from: fromParam ? new Date(`${fromParam}T00:00:00`) : defaultFrom,

      to: toParam ? new Date(`${toParam}T00:00:00`) : defaultTo,
    });
  }, [fromParam, toParam]);

  function updateUrl(range: DateRange | undefined) {
    const from = range?.from ?? defaultFrom;
    const to = range?.to ?? range?.from ?? defaultTo;

    const searchParams = new URLSearchParams();

    searchParams.set("from", format(from, "yyyy-MM-dd"));

    searchParams.set("to", format(to, "yyyy-MM-dd"));

    router.push(`${pathname}?${searchParams.toString()}`);

    setOpen(false);
  }

  function selectPreset(from: Date, to: Date = today) {
    const range = {
      from,
      to,
    };

    setSelectedDate(range);
    updateUrl(range);
  }

  const dateLabel =
    selectedDate?.from && selectedDate?.to
      ? `${format(selectedDate?.from, "dd MMM")} – ${format(
          selectedDate?.to,
          "dd MMM yyyy",
        )}`
      : "Select date range";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="secondary"
            className="flex items-center gap-3 border border-foreground/20 shadow-xs"
          >
            <CalendarIcon className="size-5" />

            <span>{dateLabel}</span>

            <ChevronDown className="size-5" />
          </Button>
        }
      />

      <PopoverContent
        align="end"
        className="w-auto border-border bg-popover p-3 text-popover-foreground"
      >
        <div className="grid grid-cols-2 gap-2 pb-3 sm:grid-cols-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => selectPreset(today)}
          >
            Today
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const yesterday = subDays(today, 1);
              selectPreset(yesterday, yesterday);
            }}
          >
            Yesterday
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => selectPreset(subDays(today, 6))}
          >
            Last 7 days
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => selectPreset(subDays(today, 30))}
          >
            Last 30 days
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => selectPreset(startOfMonth(today), today)}
          >
            This month
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const lastMonth = subMonths(today, 1);

              selectPreset(startOfMonth(lastMonth), endOfMonth(lastMonth));
            }}
          >
            Last month
          </Button>
        </div>

        <Calendar
          mode="range"
          selected={selectedDate}
          onSelect={(range) => setSelectedDate(range)}
          numberOfMonths={2}
        />

        <div className="mt-3 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            disabled={!selectedDate?.from}
            onClick={() => updateUrl(selectedDate)}
          >
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default DateFilter;
