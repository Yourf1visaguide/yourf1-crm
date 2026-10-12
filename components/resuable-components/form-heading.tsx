
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { SheetHeader } from "../ui/sheet";
import { ShieldCheck } from "lucide-react";

type FormHeadingProps = {
  icon: ReactNode;
  title: string;
  description: string;

  badge?: string;

  footer?: ReactNode;
};

export function FormHeading({
  icon,
  title,
  description,
  badge,
  footer,
}: FormHeadingProps) {
  return (
    <>
      <SheetHeader className="relative overflow-hidden border-b border-border/70 text-left p-8 px-6">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-12 -top-20 size-52 rounded-full bg-primary/10 blur-3xl" />

        <div className="pointer-events-none absolute right-5 top-5 size-24 rounded-full border border-primary/10" />

        <div className="relative flex items-start gap-4 ">
          {/* Icon */}
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary shadow-sm">
            {icon}
          </div>

          {/* Title + description */}
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-semibold tracking-tight">
                {title}
              </h2>

              {badge && (
                <Badge
                  variant="secondary"
                  className="font-normal"
                >
                  {badge}
                </Badge>
              )}
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </div>

        {footer && (
          <div className="relative mt-5 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5 text-primary" />{footer}
          </div>
        )}
      </SheetHeader>
    </>
  );
}