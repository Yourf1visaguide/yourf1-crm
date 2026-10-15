export { cn } from "cn"


export function todayLocalDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


export function dateToInputValue(
  value: Date | string,
) {
  const date =
    typeof value === "string"
      ? new Date(value)
      : value;

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

export function dateOnlyUTC(value: string) {
  return new Date(`${value}T00:00:00.000Z`);
}

export function formatDate(
  value: Date | string,
  options?: Intl.DateTimeFormatOptions,
) {
  const date =
    typeof value === "string"
      ? new Date(value)
      : value;

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    options ?? {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  ).format(date);
}