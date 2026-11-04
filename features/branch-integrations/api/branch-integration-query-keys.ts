export const branchIntegrationKeys = {
  all: ["branch-integrations"] as const,

  lists: () => [...branchIntegrationKeys.all, "list"] as const,

  list: (branchId: string) =>
    [...branchIntegrationKeys.lists(), branchId] as const,

  details: () =>
    [...branchIntegrationKeys.all, "detail"] as const,

  detail: (id: string) =>
    [...branchIntegrationKeys.details(), id] as const,
};