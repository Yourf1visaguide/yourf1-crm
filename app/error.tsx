"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useRef } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a real CRM, you would send this to your error tracking service (e.g., Sentry) here.
    console.error("Route Error:", error);
  }, [error]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    containerRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    containerRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  // Show digest in dev, hide in prod for security/cleanliness
  const isDev = process.env.NODE_ENV === "development";

  return (
    <main
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 bg-background"
    >
      {/* Amber Warning Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-50"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245, 158, 11, 0.08), transparent 40%)`,
        }}
      />
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 w-full max-w-md text-center space-y-6">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
            <AlertTriangle className="h-8 w-8 text-amber-500" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Something went wrong
          </h1>
        </div>

        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <p className="text-sm leading-6 text-muted-foreground max-w-xs mx-auto">
            We couldn't complete this request. The system encountered an unexpected error.
          </p>
          {isDev && error.digest && (
            <p className="text-xs font-mono text-muted-foreground/70 mt-2">
              Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col items-center gap-3 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <Button 
            onClick={reset} 
            size="lg" 
            className="shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            Try Again
          </Button>
          
          <p className="text-xs text-muted-foreground">
            If the problem persists, please contact support.
          </p>
        </div>
      </div>
    </main>
  );
}