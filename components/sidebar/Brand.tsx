import Image from "next/image";
import Link from "next/link";

export default function Brand({ collapsed }: { collapsed: boolean }) {
  return (
    <Link
      href="/dashboard"
      className="flex min-h-16 items-center gap-x-2 px-5"
      aria-label="Your F1 Visa Guide dashboard"
    >
      <div className="flex size-9 shrink-0 items-center justify-center">
        {/* Replace with your actual logo */}
        <span className="size-9 relative">
          <Image src="/images/crm/f1-single.png" alt="F1 Logo" fill />
        </span>
      </div>

      {!collapsed && (
        <div className="w-[80px] h-[28.3687943px] relative">
          <Image src="/images/crm/f1-text.png" alt="F1 Logo" fill className="block dark:hidden" />
          <Image src="/images/crm/f1-text-white.png" alt="F1 Logo" fill className=" hidden dark:block " />
          
        </div>
      )}
    </Link>
  );
}
