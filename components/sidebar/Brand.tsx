import Link from "next/link";

export default function Brand({ collapsed }: { collapsed: boolean }) {
  return (
    <Link
      href="/dashboard"
      className="flex min-h-16 items-center gap-3 px-5"
      aria-label="Your F1 Visa Guide dashboard"
    >
      <div className="flex size-9 shrink-0 items-center justify-center">
        {/* Replace with your actual logo */}
        <span className="text-2xl font-black tracking-tighter text-primary">
          F<span className="text-foreground">1</span>
        </span>
      </div>

      {!collapsed && (
        <div className="min-w-0 leading-tight">
          <p className="text-sm font-bold tracking-[0.13em]">
            YOUR F1
          </p>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground">
            VISA GUIDE
          </p>
        </div>
      )}
    </Link>
  );
}
