import type { LucideIcon } from "lucide-react";

interface DataShowingCardProps {
  title: string;
  dateRange: string;
  value: string;
  change: string;
  icon: LucideIcon;
  variant?: "primary" | "success" | "danger";
}

const variants = {
  primary: {
    icon: "bg-secondary/70 text-primary",
    accent: "bg-primary",
  },
  success: {
    icon: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    accent: "bg-emerald-500",
  },
  danger: {
    icon: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
    accent: "bg-rose-500",
  },
};

export function DataShowingCard({
  title,
  dateRange,
  value,
  change,
  icon: Icon,
  variant = "primary",
}: DataShowingCardProps) {
  const colors = variants[variant];

  return (
    <div
      className="
        group relative isolate overflow-hidden
        rounded-xl border border-border/70
        bg-card 
        shadow-sm
        transition-all duration-300 ease-out
        hover:-translate-y-0.5
        hover:border-primary/20
        hover:shadow-md
      "
    >
      {/* Subtle accent along the top */}
      <div
        className={`absolute inset-x-0 top-0 h-[2px] ${colors.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />

      <div className="flex min-h-[176px] flex-col justify-between p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-1.5">
            <h3 className="text-xl font-semibold tracking-normal text-foreground">
              {title}
            </h3>

            <p className="text-sm font-medium text-foreground/70">
              {dateRange}
            </p>
          </div>

          <div
            className={`
              flex size-10 shrink-0 items-center justify-center
              rounded-lg transition-transform duration-300
              group-hover:scale-105
              ${colors.icon}
            `}
          >
            <Icon className="size-5" strokeWidth={2.2} />
          </div>
        </div>

        {/* Value and comparison */}
        <div className="mt-7 space-y-1">
          <p className="text-lg font-semibold tracking-tight tabular-nums sm:text-2xl">
            {value}
          </p>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span>{change}</span>
          </div>
        </div>
      </div>
    </div>
  );
}