const STORAGE_KEY_PREFIX = "yourf1-crm:selected-branch:";
const memoryStore = new Map<string, string>();
let activeUserId: string | null = null;

export function setActiveBranchStorageUser(userId: string) { activeUserId = userId; }

type StorageKind = "local" | "session" | "memory";

function usableStorage(kind: Exclude<StorageKind, "memory">): Storage | null {
  try {
    const storage = kind === "local" ? window.localStorage : window.sessionStorage;
    const probe = `${STORAGE_KEY_PREFIX}probe`;
    storage.setItem(probe, "1");
    storage.removeItem(probe);
    return storage;
  } catch {
    return null;
  }
}

function getStorage(): { kind: StorageKind; storage: Storage | null } {
  if (typeof window === "undefined") return { kind: "memory", storage: null };
  const local = usableStorage("local");
  if (local) return { kind: "local", storage: local };
  const session = usableStorage("session");
  if (session) return { kind: "session", storage: session };
  return { kind: "memory", storage: null };
}

function key(userId: string) {
  return `${STORAGE_KEY_PREFIX}${userId}`;
}

export function readSelectedBranch(userId: string): string | null {
  const storage = getStorage();
  try {
    return storage.storage?.getItem(key(userId)) ?? memoryStore.get(key(userId)) ?? null;
  } catch {
    return memoryStore.get(key(userId)) ?? null;
  }
}

export function writeSelectedBranch(userId: string, branchId: string): void {
  const storage = getStorage();
  memoryStore.set(key(userId), branchId);
  try {
    storage.storage?.setItem(key(userId), branchId);
  } catch {
    // The in-memory copy remains available for this runtime.
  }
}

export function getSelectedBranchForApi(): string | null {
  if (!activeUserId) return null;
  return readSelectedBranch(activeUserId);
}
