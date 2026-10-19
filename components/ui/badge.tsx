
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border px-2 py-0.5 text-xs font-medium transition-colors [&>svg]:pointer-events-none [&>svg]:size-3 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-red-700 text-red-100",
        outline:
          "border-border text-foreground",

        success:
          "border-emerald-500/25 bg-emerald-600/20 text-emerald-700 dark:text-emerald-400",
        warning:
          "border-amber-500/25 bg-amber-500/20 text-amber-700 dark:text-amber-400",
        info:
          "border-blue-500/25 bg-blue-500/20 text-blue-700 dark:text-blue-400",
        danger:
          "border-rose-500/25 bg-rose-500/20 text-rose-700 dark:text-rose-400",
        neutral:
          "border-border bg-muted/70 text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
