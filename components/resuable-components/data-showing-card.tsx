import { cn } from "cn";
import type { LucideIcon } from "lucide-react";

interface DataShowingCardProps {
  title: string;
  dateRange: string;
  value: string;
  change: string;
  icon: LucideIcon;
  variant?: "primary" | "success" | "danger" | "danger2" | "warning" | "info" | "violet";
}
const variants = {
  primary: {
    icon: "bg-secondary/70 text-primary",
    accent: "bg-primary",
    border: "border-indigo-500",
    bg: "bg-indigo-50/70",
  },

  success: {
    icon: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    accent: "bg-emerald-500",
    border: "border-emerald-500",
    bg: "bg-emerald-50/70",
  },

  danger: {
    icon: "bg-rose-600/10 text-rose-600 dark:text-rose-400",
    accent: "bg-rose-600",
    border: "border-rose-600",
    bg: "bg-rose-50/70",
  },
  
  danger2: {
    icon: "bg-red-600/30 text-red-700 dark:text-red-400",
    accent: "bg-red-600",
    border: "border-red-700",
    bg: "bg-red-50/70",
  },

  warning: {
    icon: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    accent: "bg-amber-500",
    border: "border-amber-500",
    bg: "bg-amber-50/70",
  },

  info: {
    icon: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400",
    accent: "bg-zinc-500",
    border: "border-zinc-600",
    bg: "bg-zinc-50/70",
  },

  violet: {
    icon: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
    accent: "bg-violet-500",
    border: "border-violet-500",
    bg: "bg-violet-50/70",
  },

  neutral: {
    icon: "bg-slate-500/15 text-slate-600 dark:text-slate-400",
    accent: "bg-slate-500",
    border: "border-slate-500",
    bg: "bg-slate-50/70",
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
      className={cn(
        "group relative isolate overflow-hidden rounded-md shadow-sm transition-all duration-300 ease-out  hover:-translate-y-0.5 hover:shadow-md border-t-2 backdrop-blur-md  bg-card",colors.border, )}
    >
      {/* Subtle accent along the top */}
      {/* <div
        className={`absolute inset-x-0 top-0 h-[2px] ${colors.accent} opacity-0 transition-opacity duration-300 opacity-100`}
      /> */}

      <div className="flex min-h-[176px]  flex-col justify-between p-5 sm:p-6">
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