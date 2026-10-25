import {
  format,
  isValid,
  parse,
  subDays,
} from "date-fns";

export const OFFICE_TIME_ZONE = "Asia/Kolkata";

export const DEFAULT_DATE_RANGE_DAYS = 7;

export const DATE_RANGE_QUERY_KEYS = {
  from: "from",
  to: "to",
} as const;

export type DateRangeValue = {
  from: string;
  to: string;
};

const DATE_FORMAT = "yyyy-MM-dd";

/**
 * Convert a YYYY-MM-DD string into a local Date object.
 *
 * The Date is only used for calendar/preset calculations.
 * The actual application value remains the YYYY-MM-DD string.
 */
export function dateStringToLocalDate(
  value: string,
): Date {
  return parse(value, DATE_FORMAT, new Date());
}

/**
 * Validate a date-only string and make sure it represents
 * a real calendar date.
 */
export function isValidDateString(
  value: string | null | undefined,
): value is string {
  if (!value) {
    return false;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const parsed = parse(
    value,
    DATE_FORMAT,
    new Date(),
  );

  return (
    isValid(parsed) &&
    format(parsed, DATE_FORMAT) === value
  );
}

/**
 * Get today's calendar date in the office timezone.
 *
 * This does NOT depend on the server or browser timezone.
 */
export function getOfficeToday(): Date {
  const officeDateString =
    new Intl.DateTimeFormat("en-CA", {
      timeZone: OFFICE_TIME_ZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());

  return dateStringToLocalDate(
    officeDateString,
  );
}

/**
 * Get today's office date as YYYY-MM-DD.
 */
export function getOfficeTodayString(): string {
  return format(
    getOfficeToday(),
    DATE_FORMAT,
  );
}

/**
 * Default application date range.
 */
export function getDefaultDateRange(): DateRangeValue {
  const to = getOfficeToday();

  const from = subDays(
    to,
    DEFAULT_DATE_RANGE_DAYS,
  );

  return {
    from: format(from, DATE_FORMAT),
    to: format(to, DATE_FORMAT),
  };
}

/**
 * Resolve URL parameters into a safe date range.
 *
 * Invalid or incomplete URL values fall back to the
 * application's default office date range.
 */
export function resolveDateRange(params: {
  from?: string | null;
  to?: string | null;
}): DateRangeValue {
  const defaults = getDefaultDateRange();

  const from = isValidDateString(params.from)
    ? params.from
    : defaults.from;

  const to = isValidDateString(params.to)
    ? params.to
    : defaults.to;

  if (from > to) {
    return defaults;
  }

  return {
    from,
    to,
  };
}

/**
 * Format a Date object for use in the URL.
 */
export function formatDateRangeValue(
  value: Date,
): string {
  return format(value, DATE_FORMAT);
}

export function formatDateRangeLabel(
  range: DateRangeValue,
): string {
  const from =
    dateStringToLocalDate(
      range.from,
    );

  const to =
    dateStringToLocalDate(
      range.to,
    );

  if (range.from === range.to) {
    return format(
      from,
      "dd MMM yyyy",
    );
  }

  return `${format(
    from,
    "dd MMM",
  )} – ${format(
    to,
    "dd MMM yyyy",
  )}`;
}