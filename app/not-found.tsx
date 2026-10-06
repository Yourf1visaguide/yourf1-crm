"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRef } from "react";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Performance-optimized mouse tracking using CSS variables 
  // instead of React state to prevent unnecessary re-renders.
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    containerRef.current.style.setProperty("--mouse-x", `${x}px`);
    containerRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <main
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 bg-background"
    >
      {/* Interactive Background Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(124, 58, 237, 0.08), transparent 40%)`,
        }}
      />
      
      {/* Subtle Grid Background */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
      />

      <div className="relative z-10 w-full max-w-md text-center space-y-6">
        {/* Animated 404 Text */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-[8rem] font-black leading-none tracking-tighter bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent select-none">
            404
          </h1>
        </div>

        {/* Contextual Message */}
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Route not found
          </h2>
          <p className="text-sm leading-6 text-muted-foreground max-w-xs mx-auto">
            The page or record you are looking for doesn't exist, may have been moved, or you might not have permission to view it.
          </p>
        </div>

        {/* Interactive Action Area */}
        <div className="flex flex-col items-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <div className="flex gap-3">
            <Button size="lg" className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:scale-[1.02]">
              <Link href="/dashboard">
                Go to Dashboard
              </Link>
            </Button>

            <Button  variant="outline" size="lg" className="transition-all duration-300 hover:scale-[1.02] hover:bg-accent">
              <Link href="/">
                Go Home
              </Link>
            </Button>
          </div>

          {/* CRM-Specific Quick Action */}
          <div className="pt-4 w-full max-w-xs">
            <p className="text-xs text-muted-foreground mb-2">Looking for a specific case or student?</p>
            <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground hover:text-foreground gap-2" >
              <Link href="/dashboard?search=true">
                <Search className="h-4 w-4" />
                Search Records
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}