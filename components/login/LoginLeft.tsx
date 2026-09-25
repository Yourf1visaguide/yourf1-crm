import React from "react";
import {
  Check,
  MessageCircle,
  UserRound,
  WalletCards,
} from "lucide-react";

import LoginFeatureCard from "./LoginFeatureCard";

function LoginLeft() {
  return (
    <div className="opacity-50 z-50 hidden lg:block ">
      <LoginFeatureCard
        title="New Lead"
        time="2m ago"
        icon={<UserRound size={19} strokeWidth={1.8} />}
        iconClassName="bg-[#16b96c]"
        className=" left-[5%] top-[-18%] z-50  "
      >
        <p className="text-[14px] font-semibold text-[#17365d]">Rahul Sharma</p>

        <p className="mt-1 text-[10px] text-[#71839a]">USA · Study Visa</p>

        <div className="mt-3 flex items-center gap-1.5 relative">
          <span className="size-2 rounded-full bg-[#18b96d] top-[3px] left-0 absolute " />
          <span className="size-2 rounded-full bg-[#18b96d] animate-ping top-[3px] left-0 absolute" />

          <span className="text-[10px] font-medium text-[#42607e] ml-5">
            Interested
          </span>
        </div>
      </LoginFeatureCard>
      <LoginFeatureCard
        title="WhatsApp Alert"
        time="5m ago"
        icon={<MessageCircle size={20} strokeWidth={1.8} />}
        iconClassName="bg-[#18b96b]"
        className=" left-[2%] top-[20%] scale-75 scale-90 hidden xl:block "
      >
        <p className="text-[11px] leading-[1.5] text-[#4b6582]">
          Payment reminder sent
          <br />
          to Rahul Sharma
        </p>

        <div className="mt-3 flex items-center gap-1.5">
          <span className="grid size-4 place-items-center rounded-full bg-[#1678ed] text-white">
            <Check size={10} strokeWidth={3} />
          </span>

          <span className="text-[10px] font-semibold text-[#1678ed]">
            Delivered
          </span>
        </div>
      </LoginFeatureCard>
      <LoginFeatureCard
        title="Payment"
        time="1h ago"
        icon={<WalletCards size={19} strokeWidth={1.8} />}
        iconClassName="bg-[#ed3b8e]"
        className=" left-[8%] bottom-[14%] scale-90 "
      >
        <p className="text-[17px] font-semibold tracking-[-0.02em] text-[#17365d]">
          ₹15,000 received
        </p>

        <p className="mt-1 text-[10px] text-[#71839a]">Balance ₹21,000</p>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e8eef3]">
          <div className="h-full w-[42%] rounded-full bg-[#19b879]" />
        </div>

        <span className="mt-3 inline-flex rounded-full bg-[#e7aa24]/15 px-2.5 py-1 text-[9px] font-semibold text-[#9a6913]">
          Partially Paid
        </span>
      </LoginFeatureCard>
    </div>
  );
}

export default LoginLeft;
