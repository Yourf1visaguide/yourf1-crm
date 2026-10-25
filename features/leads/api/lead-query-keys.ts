export const leadKeys = {
  all: ["leads"] as const,

  lists: () =>
    [...leadKeys.all, "list"] as const,

  list: (
    filters: Record<string, unknown>,
  ) =>
    [
      ...leadKeys.lists(),
      filters,
    ] as const,

  branches: () =>
    [...leadKeys.all, "branches"] as const,

  assignees: () =>
    [...leadKeys.all, "assignees"] as const,

  details: () =>
    [...leadKeys.all, "detail"] as const,

  detail: (id: string) =>
    [
      ...leadKeys.details(),
      id,
    ] as const,

  summaries: () =>
    [...leadKeys.all, "summary"] as const,

  summary: (
    filters: Record<string, unknown>,
  ) =>
    [
      ...leadKeys.summaries(),
      filters,
    ] as const,

  insights: () =>
    [...leadKeys.all, "insights"] as const,

  insight: (
    filters: Record<string, unknown>,
  ) =>
    [
      ...leadKeys.insights(),
      filters,
    ] as const,
};