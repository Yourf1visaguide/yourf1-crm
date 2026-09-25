import React from "react";
import { CalendarCheck, Check, FileText, NotebookPen } from "lucide-react";
import LoginFeatureCard from "./LoginFeatureCard";

function LoginRight() {
  return (
    <div className="opacity-50 hidden lg:block">
      <LoginFeatureCard
        title="Documents"
        icon={<FileText size={19} strokeWidth={1.8} />}
        iconClassName="bg-[#6953ed]"
        className="right-[5%] top-[-18%] scale-75 "
      >
        <div className="space-y-2.5">
          <DocumentRow label="Passport" status="complete" />

          <DocumentRow label="IELTS" status="complete" />

          <DocumentRow label="Bank Statement" status="warning" />

          <DocumentRow label="Visa Form" status="pending" />
        </div>
      </LoginFeatureCard>

      <LoginFeatureCard
        title="Attendance"
        time="Today"
        icon={<CalendarCheck size={19} strokeWidth={1.8} />}
        iconClassName="bg-[#2c7bea]"
        className=" right-[2%] top-[20%] scale-[80%] hidden xl:block"
      >
        <div className="flex items-center">
          <div className="flex -space-x-2">
            <Avatar />
            <Avatar />
            <Avatar />
          </div>

          <span className="ml-3 grid size-8 place-items-center rounded-full bg-[#edf2f7] text-[9px] font-semibold text-[#56708c]">
            +5
          </span>
        </div>

        <p className="mt-3 text-[10px] font-medium text-[#385570]">
          8/10 team members present
        </p>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e8eef3]">
          <div className="h-full w-[80%] rounded-full bg-[#19b879]" />
        </div>
      </LoginFeatureCard>
      <LoginFeatureCard
        title="Follow-ups"
        time="3h ago"
        icon={<NotebookPen size={19} strokeWidth={1.8} />}
        iconClassName="bg-[#f2a51f]"
        className=" right-[7%] bottom-[14%] "
      >
        <p className="text-[11px] leading-[1.5] text-[#4b6582]">
          Follow up with Rahul
          <br />
          regarding visa appointment.
        </p>

        <div className="mt-3 flex items-center gap-2">
          <div className="grid size-6 place-items-center rounded-full bg-[#dce6ef] text-[8px] text-[#45617e]">
            P
          </div>

          <span className="text-[9px] text-[#71839a]">Assigned to Priya</span>
        </div>
      </LoginFeatureCard>
    </div>
  );
}

export default LoginRight;

function DocumentRow({
  label,
  status,
}: {
  label: string;
  status: "complete" | "warning" | "pending";
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] text-[#526a85]">{label}</span>

      {status === "complete" && (
        <span className="grid size-[19px] place-items-center rounded-full bg-[#18b876] text-white">
          <Check size={11} strokeWidth={3} />
        </span>
      )}

      {status === "warning" && (
        <span className="grid size-[19px] place-items-center rounded-full bg-[#e9a523] text-white">
          <span className="text-[11px] font-bold">!</span>
        </span>
      )}

      {status === "pending" && (
        <span className="size-[19px] rounded-full border border-[#cbd5df] bg-[#f7f9fb]" />
      )}
    </div>
  );
}

function Avatar() {
  return (
    <div className="size-7 overflow-hidden rounded-full border-2 border-white bg-[#dbe4ec]">
      <div className="flex h-full items-center justify-center text-[9px] text-[#58708a]">
        ●
      </div>
    </div>
  );
}
