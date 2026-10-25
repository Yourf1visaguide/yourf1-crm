import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type FormChoiceOption<T extends string> = {
  value: T;
  label: string;
  description?: string;
  icon?: LucideIcon;
};

type FormChoiceCardsProps<T extends string> = {
  value: T;
  options: readonly FormChoiceOption<T>[];
  onChange: (value: T) => void;
  disabled?: boolean;
};

export function FormChoiceCards<T extends string>({
  value,
  options,
  onChange,
  disabled = false,
}: FormChoiceCardsProps<T>) {
  return (
    <div className="grid gap-3 sm:grid-cols-2" role="radiogroup">
      {options.map((option) => {
        const selected = option.value === value;
        const Icon = option.icon;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={disabled}
            onClick={() => onChange(option.value)}
            className={cn(
              "group relative flex min-h-20 items-start gap-3 rounded-xl border p-4 text-left transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "disabled:pointer-events-none disabled:opacity-50",
              selected
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border bg-background hover:border-primary/40 hover:bg-muted/40",
            )}
          >
            <span
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-lg border",
                selected
                  ? "border-primary/20 bg-primary/10 text-primary"
                  : "border-border bg-muted/40 text-muted-foreground",
              )}
            >
              {Icon ? <Icon className="size-4" /> : null}
            </span>

            <span className="min-w-0 pr-4">
              <span className="block text-sm font-semibold">{option.label}</span>
              {option.description && (
                <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                  {option.description}
                </span>
              )}
            </span>

            <span
              className={cn(
                "absolute right-3 top-3 size-2 rounded-full",
                selected ? "bg-primary" : "bg-transparent",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
