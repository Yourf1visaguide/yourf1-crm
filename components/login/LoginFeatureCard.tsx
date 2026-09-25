import type { ReactNode } from "react";

type LoginFeatureCardProps = {
  icon: ReactNode;
  iconClassName?: string;
  title: string;
  time?: string;
  children: ReactNode;
  className?: string;
};

export default function LoginFeatureCard({
  icon,
  iconClassName = "bg-blue-500",
  title,
  time,
  children,
  className = "",
}: LoginFeatureCardProps) {
  return (
    <div
      className={`
        absolute
        w-[220px]
        rounded-2xl
        border border-white/80
        bg-white/90
        p-4
        shadow-[0_18px_45px_rgba(30,55,90,0.10)]
        backdrop-blur-md
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`
              grid size-10 shrink-0
              place-items-center
              rounded-xl
              text-white
              shadow-sm
              ${iconClassName}
            `}
          >
            {icon}
          </div>

          <p className="text-[12px] font-semibold tracking-[-0.01em] text-[#16365d]">
            {title}
          </p>
        </div>

        {time && (
          <span className="text-[9px] font-medium text-[#94a3b8]">
            {time}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="mt-4">{children}</div>
    </div>
  );
}