/** Include this scope in every branch-dependent TanStack Query key. */
export function branchQueryScope(branchId: string | null | undefined) {
  return branchId ?? "branch-context-not-ready";
}
