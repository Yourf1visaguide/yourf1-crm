"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { useRef } from "react";

export default function UnauthorizedPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    containerRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    containerRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <main
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 bg-background"
    >
      {/* Red/Orange Restrictive Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-50"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(239, 68, 68, 0.08), transparent 40%)`,
        }}
      />
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 w-full max-w-md text-center space-y-6">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-destructive/10 border border-destructive/20 mb-4">
            <ShieldAlert className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Access Restricted
          </h1>
        </div>

        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <p className="text-sm leading-6 text-muted-foreground max-w-xs mx-auto">
            You don't have the required permissions to view this section. 
            If you believe this is a mistake, please contact your system administrator.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          {/* Fixed: Link to /dashboard instead of / */}
          <Button  size="lg" className="shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <Link href="/dashboard">
              Return to Dashboard
            </Link>
          </Button>
          
          <Button variant="ghost" size="sm" >
            <Link href="/login">
              Switch Account
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}