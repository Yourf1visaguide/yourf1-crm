export const officeReportKeys = {
  all: ["office-reports"] as const,

  lists: () => [...officeReportKeys.all, "list"] as const,

  list: (filters: Record<string, unknown>) =>
    [...officeReportKeys.lists(), filters] as const,

  details: () => [...officeReportKeys.all, "detail"] as const,

  detail: (id: string) =>
    [...officeReportKeys.details(), id] as const,

  summaries: () =>
    [...officeReportKeys.all, "summary"] as const,

  summary: (filters: Record<string, unknown>) =>
    [...officeReportKeys.summaries(), filters] as const,
};