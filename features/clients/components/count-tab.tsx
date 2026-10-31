import { cn } from "cn";

export default function CountTab({
  active,
  label,
  count,
  onClick,
}: {
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-9 shrink-0 items-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors",
        active
          ? "bg-background text-foreground shadow-xs ring-1 ring-border/70"
          : "text-muted-foreground hover:bg-background/70 hover:text-foreground",
      )}
    >
      <span>{label}</span>
      <span
        className={cn(
          "inline-flex min-w-6 items-center justify-center rounded-full px-1.5 py-0.5 text-[11px] font-semibold tabular-nums",
          active
            ? "bg-primary text-primary-foreground"
            : "bg-primary/20 text-secondary-foreground",
        )}
      >
        {count.toLocaleString()}
      </span>
    </button>
  );
}