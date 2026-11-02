export const leadKeys = {
  all: ["leads"] as const,
  lists: () => [...leadKeys.all, "list"] as const,
  list: (branchId: string, filters: Record<string, unknown>) =>
    [...leadKeys.lists(), branchId, filters] as const,
  branches: () => [...leadKeys.all, "branches"] as const,
  assignees: (branchId: string, type: "TELECALLING" | "COUNSELLING" = "COUNSELLING") =>
    [...leadKeys.all, "assignees", branchId, type] as const,
  details: () => [...leadKeys.all, "detail"] as const,
  detail: (id: string) => [...leadKeys.details(), id] as const,
  summaries: () => [...leadKeys.all, "summary"] as const,
  summary: (branchId: string, filters: Record<string, unknown>) =>
    [...leadKeys.summaries(), branchId, filters] as const,
  insights: () => [...leadKeys.all, "insights"] as const,
  insight: (branchId: string, filters: Record<string, unknown>) =>
    [...leadKeys.insights(), branchId, filters] as const,
};
