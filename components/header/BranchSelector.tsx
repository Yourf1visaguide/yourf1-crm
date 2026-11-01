"use client";

import { Building2, ChevronDown, Globe2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBranchContext } from "@/providers/branch-provider";

const ALL_BRANCHES_VALUE = "all";

export default function BranchSelector() {
  const { branches, selectedBranchId, canSelectAll, isReady, isLoading, setSelectedBranchId } = useBranchContext();
  if (isLoading || !isReady) return <Button type="button" variant="secondary" size="sm" disabled className="gap-2"><Loader2 className="size-4 animate-spin" /><span className="hidden sm:inline">Loading branches</span></Button>;
  if (!branches.length) return null;
  const selected = branches.find((branch) => branch.id === selectedBranchId);
  const label = selectedBranchId === ALL_BRANCHES_VALUE ? "All branches" : selected?.name ?? "Select branch";
  return (
    <Select value={selectedBranchId ?? ""} onValueChange={setSelectedBranchId}>
      <SelectTrigger size="default" aria-label="Select branch" className="max-w-52 gap-2 border-foreground/20 bg-secondary shadow-xs">
        {selectedBranchId === ALL_BRANCHES_VALUE ? <Globe2 className="size-4 shrink-0" /> : <Building2 className="size-4 shrink-0" />}
        <SelectValue>{label}</SelectValue><ChevronDown className="size-4 shrink-0 opacity-60" />
      </SelectTrigger>
      <SelectContent align="end">
        {branches.map((branch) => <SelectItem key={branch.id} value={branch.id}><span className="flex flex-col"><span>{branch.name}</span><span className="text-xs text-muted-foreground">{[branch.city, branch.state].filter(Boolean).join(", ") || branch.branchCode}</span></span></SelectItem>)}
        {canSelectAll && <SelectItem value={ALL_BRANCHES_VALUE}><span className="flex items-center gap-2"><Globe2 className="size-4" />All branches</span></SelectItem>}
      </SelectContent>
    </Select>
  );
}
