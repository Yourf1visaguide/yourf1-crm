"use client";

import { useEffect, useMemo, useState } from "react";
import { Building2, ChevronDown, Globe2, Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiFetch } from "@/lib/api-fetch";

type BranchOption = {
  id: string;
  branchCode: string;
  name: string;
  city: string | null;
  state: string | null;
};

type BranchSelectorData = {
  branches: BranchOption[];
  primaryBranchId: string | null;
  canSelectAll: boolean;
};

const ALL_BRANCHES_VALUE = "__all_branches__";

export default function BranchSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [data, setData] = useState<BranchSelectorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [changing, setChanging] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    async function loadBranches() {
      try {
        const response = await apiFetch<BranchSelectorData>("/api/branches/selector", { cache: "no-store" });
        if (active) setData(response.data);
      } catch {
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    }
    void loadBranches();
    return () => { active = false; };
  }, []);

  const branchIds = useMemo(
    () => new Set(data?.branches.map((branch) => branch.id) ?? []),
    [data?.branches],
  );

  const currentValue = useMemo(() => {
    const firstSegment = pathname.split("/").filter(Boolean)[0];
    if (firstSegment === "all" && data?.canSelectAll) return ALL_BRANCHES_VALUE;
    if (firstSegment && branchIds.has(firstSegment)) return firstSegment;
    return data?.primaryBranchId ?? "";
  }, [pathname, data?.canSelectAll, data?.primaryBranchId, branchIds]);

  function changeBranch(value: string) {
    if (!value || !data) return;

    const segments = pathname.split("/").filter(Boolean);
    const firstSegment = segments[0];
    if (firstSegment === "all" || (firstSegment && branchIds.has(firstSegment))) {
      segments.shift();
    }

    const prefix = value === ALL_BRANCHES_VALUE ? "all" : value;
    const path = `/${prefix}${segments.length ? `/${segments.join("/")}` : ""}`;
    const query = searchParams.toString();

    setChanging(true);
    router.push(`${path}${query ? `?${query}` : ""}`);
  }

  if (loading) {
    return (
      <Button type="button" variant="secondary" size="sm" disabled className="gap-2 border border-foreground/20" aria-label="Loading branch options">
        <Loader2 className="size-4 animate-spin" />
        <span className="hidden sm:inline">Loading branches</span>
      </Button>
    );
  }

  if (error || !data || data.branches.length === 0) return null;

  const selectedBranch = data.branches.find((branch) => branch.id === currentValue);
  const selectedLabel = currentValue === ALL_BRANCHES_VALUE ? "All branches" : selectedBranch?.name ?? "Select branch";

  return (
    <Select value={currentValue} onValueChange={changeBranch} disabled={changing}>
      <SelectTrigger size="default" aria-label="Select branch" className="max-w-52 gap-2 border-foreground/20 bg-secondary shadow-xs">
        {currentValue === ALL_BRANCHES_VALUE ? <Globe2 className="size-4 shrink-0" /> : <Building2 className="size-4 shrink-0" />}
        <SelectValue>{selectedLabel}</SelectValue>
        <ChevronDown className="size-4 shrink-0 opacity-60" />
      </SelectTrigger>
      <SelectContent align="end">
        {data.branches.map((branch) => (
          <SelectItem key={branch.id} value={branch.id}>
            <span className="flex flex-col">
              <span>{branch.name}</span>
              <span className="text-xs text-muted-foreground">
                {[branch.city, branch.state].filter(Boolean).join(", ") || branch.branchCode}
              </span>
            </span>
          </SelectItem>
        ))}
        {data.canSelectAll && (
          <SelectItem value={ALL_BRANCHES_VALUE}>
            <span className="flex items-center gap-2"><Globe2 className="size-4" />All branches</span>
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}
