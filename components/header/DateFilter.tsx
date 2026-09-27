"use client";

import { useEffect, useState } from "react";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format, subDays } from "date-fns";
import type { DateRange } from "react-day-picker";

function DateFilter() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [calendarState, setCalendarState] = useState(false);

  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  const from = params.get("from");
  const to = params.get("to");
  const accountId = params.get("accountId") || "";

  const period: DateRange = {
    from: from ? new Date(from) : defaultFrom,
    to: to ? new Date(to) : defaultTo,
  };

  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>(
    period,
  );

  // Run only once after mounting.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync the selected range when URL parameters change.
  useEffect(() => {
    setSelectedDate(period);
  }, [from, to]);

  if (!mounted) return null;

  const onCancel = () => {
    setCalendarState(false);
  };

  const onApply = (date: DateRange | undefined) => {
    const fromDate = format(date?.from || defaultFrom, "yyyy-MM-dd");

    const toDate = format(date?.to || date?.from || defaultTo, "yyyy-MM-dd");

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          from: fromDate,
          to: toDate,
          accountId,
        },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      },
    );

    router.push(url);
    onCancel();
  };

  const dateLabel =
    selectedDate?.from && selectedDate?.to
      ? `${format(selectedDate.from, "dd MMM")} - ${format(
          selectedDate.to,
          "dd MMM yyyy",
        )}`
      : selectedDate?.from
        ? format(selectedDate.from, "dd MMM yyyy")
        : "Select date range";

  return (
    <Popover open={calendarState} onOpenChange={setCalendarState}>
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
        className="mt-2 w-auto border-border bg-popover p-3 text-popover-foreground"
      >
        <Calendar
          mode="range"
          selected={selectedDate}
          onSelect={setSelectedDate}
          numberOfMonths={2}
        />

        <div className="mt-3 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>

          <Button onClick={() => onApply(selectedDate)}>Apply</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default DateFilter;
