import {
  Bell,
  CalendarCheck,
  ChartArea,
  Check,
  CircleDollarSign,
  FileText,
  MessageCircle,
  NotebookPen,
  UsersRound,
  WalletCards,
} from "lucide-react";

function LoginBackground() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 size-[650px] md:size-[800px] -translate-x-1/2 -translate-y-1/2 opacity-60">
      {/* ============================= */}
      {/* Decorative orbit circles */}
      {/* ============================= */}

      {/* Outer soft circle */}
      <div
        className=" absolute left-1/2 top-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-300 " 
      />

      {/* Outer dashed orbit */}
      <div
        className=" absolute left-1/2 top-1/2 size-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-zinc-400 "
      />

      {/* Middle dashed orbit */}
      <div
        className=" absolute left-1/2 top-1/2 size-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-zinc-400/20 "
      />

      {/* Inner subtle orbit */}
      <div
        className=" absolute left-1/2 top-1/2 size-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-200/70 "
      />

      {/* ============================= */}
      {/* TOP - WhatsApp */}
      {/* ============================= */}

      <FeatureIcon
        className=" left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-[#20b76b] "
      >
        <MessageCircle size={22} />
      </FeatureIcon>

      {/* ============================= */}
      {/* TOP RIGHT - Analytics */}
      {/* ============================= */}

      <FeatureIcon
        className=" right-[6%] top-[17%] bg-blue-600"
      >
        <ChartArea size={21} />
      </FeatureIcon>

      {/* ============================= */}
      {/* RIGHT - Attendance */}
      {/* ============================= */}

      <FeatureIcon
        className="
          right-[-2%] top-1/2
          -translate-y-1/2
          bg-violet-600
        "
      >
        <CalendarCheck size={21} />
      </FeatureIcon>

      {/* ============================= */}
      {/* BOTTOM RIGHT - Notes */}
      {/* ============================= */}

      <FeatureIcon
        className="
          right-[10%] bottom-[13%]
          bg-orange-500
        "
      >
        <NotebookPen size={21} />
      </FeatureIcon>

      {/* ============================= */}
      {/* BOTTOM - Payment */}
      {/* ============================= */}

      <FeatureIcon
        className="
          left-1/2 bottom-0
          -translate-x-1/2 translate-y-1/2
          bg-pink-500
        "
      >
        <WalletCards size={21} />
      </FeatureIcon>

      {/* ============================= */}
      {/* BOTTOM LEFT - Finance */}
      {/* ============================= */}

      <FeatureIcon
        className="
          left-[10%] bottom-[13%]
          bg-emerald-600
        "
      >
        <CircleDollarSign size={21} />
      </FeatureIcon>

      {/* ============================= */}
      {/* LEFT - Students */}
      {/* ============================= */}

      <FeatureIcon
        className="
          left-[-3%] top-1/2
          -translate-y-1/2
          bg-blue-500
        "
      >
        <UsersRound size={21} />
      </FeatureIcon>

      {/* ============================= */}
      {/* TOP LEFT - Documents */}
      {/* ============================= */}

      <FeatureIcon
        className="
          left-[8%] top-[17%]
          bg-violet-500
        "
      >
        <FileText size={21} />
      </FeatureIcon>

      {/* ============================= */}
      {/* Small notification bubbles */}
      {/* ============================= */}

      <SmallBubble className="left-[40%] top-[12%]">
        <Check size={13} strokeWidth={3} />
      </SmallBubble>

      <SmallBubble className="right-[14%] top-[34%]">
        <Bell size={13} />
      </SmallBubble>

      <SmallBubble className="left-[13%] bottom-[35%]">
        <MessageCircle size={13} />
      </SmallBubble>
    </div>
  );
}

function FeatureIcon({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={` absolute z-20 grid size-12 place-items-center rounded-full border-4 border-white text-white shadow-[0_10px_30px_rgba(15,23,42,0.15)] ${className}
      `}
    >
      {children}
    </div>
  );
}

function SmallBubble({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={` absolute z-10 grid size-7 place-items-center rounded-full border border-white bg-white text-[#31557d] shadow-[0_5px_18px_rgba(15,23,42,0.10)] ${className}
      `}
    >
      {children}
    </div>
  );
}

export default LoginBackground;
