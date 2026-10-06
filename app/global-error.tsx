"use client";

import { Button } from "@/components/ui/button";
import { AlertOctagon } from "lucide-react";
import { useRef } from "react";
// CRITICAL: You MUST import your global CSS here, because global-error 
// bypasses the root layout where this is normally imported.
import "@/app/globals.css"; 

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Log to your error tracking service (e.g., Sentry, LogRocket)
  console.error("Global Fatal Error:", error);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    containerRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    containerRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <html lang="en">
      <body>
        <main
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 bg-background"
        >
          {/* Intense Red Critical Spotlight */}
          <div
            className="pointer-events-none absolute -inset-px opacity-50"
            style={{
              background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(239, 68, 68, 0.12), transparent 40%)`,
            }}
          />
          
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

          <div className="relative z-10 w-full max-w-md text-center space-y-6">
            <div>
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-destructive/10 border border-destructive/20 mb-4">
                <AlertOctagon className="h-8 w-8 text-destructive" />
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                Critical System Error
              </h1>
            </div>

            <div className="space-y-2">
              <p className="text-sm leading-6 text-muted-foreground max-w-xs mx-auto">
                The application failed to load correctly. This is usually caused by a network issue or a critical system failure.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 pt-4">
              {/* CRITICAL FIX: Added reload button since Next.js doesn't pass 'reset' to global-error */}
              <Button 
                onClick={handleReload} 
                size="lg" 
                className="shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                Reload Application
              </Button>
              
              <p className="text-xs text-muted-foreground">
                If this keeps happening, please contact IT support.
              </p>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}