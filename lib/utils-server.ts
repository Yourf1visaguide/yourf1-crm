export function dateOnly(value: string) {
  return new Date(`${value}T00:00:00.000Z`);
}


export function todayOfficeDate(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}