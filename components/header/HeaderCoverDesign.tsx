import React from "react";

function HeaderCoverDesign() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Base gradient */}

      {/* Large ambient glow */}
      <div className="absolute -top-48 left-[38%] size-[32rem] rounded-full bg-primary/[0.08] blur-[100px] dark:bg-primary/[0.16]" />

      <div className="absolute -right-32 top-10 size-[26rem] rounded-full bg-primary/[0.10] blur-[110px] dark:bg-primary/[0.18]" />

      <div className="absolute -bottom-52 -left-24 size-[28rem] rounded-full bg-primary/[0.07] blur-[100px] dark:bg-primary/[0.12] border-2" />

      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-background to-primary/[0.14] dark:from-primary/[0.12] dark:via-background dark:to-primary/[0.18] opacity-40" />
      {/* Oversized orbital curves */}
      <div className="absolute -top-[28rem] left-[30%] size-[62rem] rounded-full border border-primary/[0.08] dark:border-primary/[0.16]" />

      <div className="absolute -top-[23rem] left-[34%] size-[52rem] rounded-full border border-dashed border-primary/[0.10] dark:border-primary/[0.14]" />

      <div className="absolute -top-[18rem] left-[38%] size-[42rem] rounded-full border border-primary/[0.08] dark:border-primary/[0.12]" />

      {/* Diagonal accent ribbon */}
      <div className="absolute -right-20 top-[-65%] h-[150%] w-24 rotate-[42deg] rounded-full bg-gradient-to-b from-primary/[0.02] via-primary/[0.08] to-primary/[0.02] dark:from-primary/[0.03] dark:via-primary/[0.20] dark:to-primary/[0.03]" />

      <div className="absolute -right-8 top-[-65%] h-[150%] w-px rotate-[42deg] bg-primary/[0.10] dark:bg-primary/[0.20]" />

      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 opacity-40 dark:opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--primary) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "linear-gradient(to bottom, black, transparent 85%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 85%)",
        }}
      />

      {/* Bottom fade into the page */}
      {/* <div className=" absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background/70" /> */}
    </div>
  );
}

export default HeaderCoverDesign;
