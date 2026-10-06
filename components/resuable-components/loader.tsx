"use client";

import { cn } from "@/lib/utils";
import React from "react";

// 1. Circular spinner
export default function CircleLoader({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "size-5 animate-spin rounded-full border-2 border-primary/20 border-t-primary",
        className
      )}
    />
  );
}

// 2. Horizontal loading line
export function LineLoader({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-1 w-full overflow-hidden rounded-full bg-primary/10 z-50 relative",
        className
      )}
    >
      <div className="h-full w-1/3 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-primary" />

      <style>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(300%);
          }
        }
      `}</style>
    </div>
  );
}

// 3. Circle + "Loading your workspace"
export function WorkspaceLoader({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-[50vh] flex-col items-center justify-center gap-4",
        className
      )}
    >
      <CircleLoader className="size-8 border-[3px]" />

      <h2 className="text-lg font-semibold tracking-tight">
        Loading your workspace
      </h2>
    </div>
  );
}

// 4. Loading message + horizontal line
export function WorkspaceLoadingLine({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center gap-3",
        className
      )}
    >
      <p className="text-sm text-muted-foreground">
        Getting everything ready for you...
      </p>

      <LineLoader className="max-w-48" />

      <p className="text-xs text-muted-foreground/70">
        Please wait a moment
      </p>
    </div>
  );
}

export function  FullScreenLoader({
  loader,
  text
}: {
  loader: React.ReactNode;
  text?:string;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/60 backdrop-blur-sm">
        <div className="w-full max-w-48">
          {loader}
          <p className="mt-3 text-center text-sm text-muted-foreground">
            {text}
          </p>
        </div>
      </div>
  );
}

