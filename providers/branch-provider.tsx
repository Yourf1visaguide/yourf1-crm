"use client";

import * as React from "react";
import { apiFetch } from "@/lib/api-fetch";
import { readSelectedBranch, writeSelectedBranch, setActiveBranchStorageUser } from "@/lib/branch/client-branch-storage";

type BranchOption = { id: string; branchCode: string; name: string; city: string | null; state: string | null };
type SelectorData = { branches: BranchOption[]; primaryBranchId: string | null; canSelectAll: boolean };
type BranchContextValue = {
  branches: BranchOption[];
  selectedBranchId: string | null;
  canSelectAll: boolean;
  isReady: boolean;
  isLoading: boolean;
  setSelectedBranchId: (id: string) => void;
};

const BranchContext = React.createContext<BranchContextValue | null>(null);

export function BranchProvider({ userId, primaryBranchId, children }: {
  userId: string;
  primaryBranchId: string | null;
  children: React.ReactNode;
}) {
  const [branches, setBranches] = React.useState<BranchOption[]>([]);
  const [selectedBranchId, setSelected] = React.useState<string | null>(null);
  const [canSelectAll, setCanSelectAll] = React.useState(false);
  const [isReady, setReady] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setActiveBranchStorageUser(userId);
    let alive = true;
    async function initialize() {
      try {
        const response = await apiFetch<SelectorData>("/api/branches/selector", { cache: "no-store", headers: { "x-skip-branch-context": "1" } });
        if (!alive) return;
        const data = response.data;
        setBranches(data.branches);
        setCanSelectAll(data.canSelectAll);
        const stored = readSelectedBranch(userId);
        const valid = stored === "all"
          ? data.canSelectAll
          : data.branches.some((branch) => branch.id === stored);
        const initial = valid ? stored : (data.primaryBranchId ?? primaryBranchId ?? data.branches[0]?.id ?? null);
        setSelected(initial);
        if (initial) writeSelectedBranch(userId, initial);
      } catch {
        if (!alive) return;
        const stored = readSelectedBranch(userId);
        setSelected(stored ?? primaryBranchId);
      } finally {
        if (alive) { setReady(true); setLoading(false); }
      }
    }
    void initialize();
    return () => { alive = false; };
  }, [userId, primaryBranchId]);

  const setSelectedBranchId = React.useCallback((id: string) => {
    if (id !== "all" && !branches.some((branch) => branch.id === id)) return;
    if (id === "all" && !canSelectAll) return;
    setSelected(id);
    writeSelectedBranch(userId, id);
  }, [branches, canSelectAll, userId]);

  React.useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (!event.key?.endsWith(`:${userId}`)) return;
      const value = event.newValue;
      if (value === "all" && canSelectAll) setSelected(value);
      else if (value && branches.some((branch) => branch.id === value)) setSelected(value);
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [userId, branches, canSelectAll]);

  const value = React.useMemo(() => ({ branches, selectedBranchId, canSelectAll, isReady, isLoading, setSelectedBranchId }), [branches, selectedBranchId, canSelectAll, isReady, isLoading, setSelectedBranchId]);
  return <BranchContext.Provider value={value}>{children}</BranchContext.Provider>;
}

export function useBranchContext() {
  const context = React.useContext(BranchContext);
  if (!context) throw new Error("useBranchContext must be used within BranchProvider");
  return context;
}
