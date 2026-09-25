import Image from "next/image";
import {
  Check,
  CircleAlert,
  FileText,
  Plane,
  UserRound,
  WalletCards,
  MessageCircle,
  GraduationCap,
  FolderOpen,
  Globe2,
} from "lucide-react";

export default function LeftLogin() {
  return (
    <section className="relative h-full overflow-hidden min-[950px]:col-span-5">
      
      {/* Main content */}
      <div className="relative z-10 flex w-full flex-col px-8 py-8 xl:px-12 2xl:px-16">
        {/* Top brand */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.34em] text-white">
              YOUR F1 VISA GUIDE
            </p>
          </div>

          
        </div>

        {/* Hero copy */}
        <div className="mt-8 max-w-[650px] text-white">

          <h1 className="max-w-[650px] font-serif text-4xl sm:text-5xl md:text-6xl/tight font-medium  ">
            <span className="relative">Everything
              </span> your team needs, in one place.
            <br />
            <span className=""></span>
          </h1>

          <p className="mt-6 max-w-[510px] text-[15px] leading-[1.65] text- xl:text-[16px]">
            Manage leads, students, documents, payments,
            follow-ups and workflows from a single connected
            workspace.
          </p>
        </div>

        {/* Handwritten accent */}
        <div className="relative mt-5 w-fit">
          <p className="font-serif text-[25px] italic leading-[0.95] text-[#263f5d] -rotate-2">
            Everything in sync.
            <br />
            Nothing overlooked.
          </p>

          <div className="mt-2 h-[2px] w-[215px] -rotate-2 rounded-full bg-[#c8a76a]" />
          <div className="-mt-[1px] ml-0.5 h-[4px] w-[200px] -rotate-[2deg] rounded-full bg-[#c8a76a]" />
        </div>

        {/* CRM cards area */}
        <div className="hidden md:block relative mt-auto min-h-[410px] w-full max-w-[900px]">
          {/* New Lead */}
          <div
            className=" absolute left-[7%] top-[12%] w-[210px] rounded-2xl border border-white/70 bg-white/90 p-4 shadow-[0_18px_45px_rgba(16,43,78,0.13)] backdrop-blur-md xl:w-[225px] "
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-[#18b56b] text-white">
                  <UserRound size={19} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-[12px] font-semibold text-[#102b4e]">
                    New Lead
                  </p>

                  <p className="mt-0.5 text-[10px] text-[#718198]">
                    2m ago
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-[14px] font-semibold text-[#17365d]">
                Rahul Sharma
              </p>

              <p className="mt-1 text-[10px] text-[#60738d]">
                USA · Study Visa
              </p>

              <div className="mt-3 flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#18b56b]" />

                <span className="text-[10px] font-medium text-[#36516f]">
                  Interested
                </span>
              </div>
            </div>
          </div>

          {/* WhatsApp */}
          <div
            className=" absolute right-[13%] top-[0%] w-[240px] rounded-2xl border border-white/70 bg-white/90 p-4 shadow-[0_18px_45px_rgba(16,43,78,0.13)] backdrop-blur-md xl:w-[255px] "
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-[#19b76b] text-white">
                  <MessageCircle size={20} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-[12px] font-semibold text-[#102b4e]">
                    WhatsApp Alert
                  </p>

                  <p className="mt-0.5 text-[10px] text-[#718198]">
                    5m ago
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-4 text-[12px] leading-[1.5] text-[#344e6b]">
              Payment reminder sent
              <br />
              to Rahul Sharma
            </p>

            <div className="mt-3 flex items-center gap-1.5">
              <Check
                size={12}
                strokeWidth={3}
                className="text-[#1670df]"
              />

              <span className="text-[10px] font-semibold text-[#1670df]">
                Delivered
              </span>
            </div>
          </div>

          {/* Documents */}
          <div
            className=" absolute right-[2%] top-[39%] w-[205px] rounded-2xl border border-white/70 bg-white/90 p-4 shadow-[0_18px_45px_rgba(16,43,78,0.13)] backdrop-blur-md xl:w-[220px] "
          >
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-[#6854e8] text-white">
                <FileText size={19} strokeWidth={1.8} />
              </div>

              <p className="text-[12px] font-semibold text-[#102b4e]">
                Documents
              </p>
            </div>

            <div className="mt-4 space-y-2.5">
              <DocumentRow label="Passport" status="done" />
              <DocumentRow label="IELTS" status="done" />
              <DocumentRow label="Bank Statement" status="warning" />
              <DocumentRow label="Visa Form" status="pending" />
            </div>
          </div>

          {/* Payment */}
          <div
            className="
              absolute left-[30%] top-[59%]
              w-[225px]
              rounded-2xl
              border border-white/70
              bg-white/90
              p-4
              shadow-[0_18px_45px_rgba(16,43,78,0.13)]
              backdrop-blur-md
              xl:w-[240px]
            "
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-[#ed3c8f] text-white">
                  <WalletCards size={19} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-[12px] font-semibold text-[#102b4e]">
                    Payment
                  </p>

                  <p className="mt-0.5 text-[10px] text-[#718198]">
                    1h ago
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-[15px] font-semibold text-[#17365d]">
                ₹15,000 received
              </p>

              <p className="mt-1 text-[10px] text-[#60738d]">
                Balance ₹21,000
              </p>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e8edf2]">
                <div className="h-full w-[42%] rounded-full bg-[#19ad70]" />
              </div>

              <div className="mt-3 inline-flex rounded-full bg-[#e5a523]/15 px-2.5 py-1">
                <span className="text-[9px] font-semibold text-[#9a6811]">
                  Partially Paid
                </span>
              </div>
            </div>
          </div>

         
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- */
/* Document row                     */
/* -------------------------------- */

function DocumentRow({
  label,
  status,
}: {
  label: string;
  status: "done" | "warning" | "pending";
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] text-[#435a75]">{label}</span>

      {status === "done" && (
        <span className="grid size-[18px] place-items-center rounded-full bg-[#1aaf6e] text-white">
          <Check size={11} strokeWidth={3} />
        </span>
      )}

      {status === "warning" && (
        <span className="grid size-[18px] place-items-center rounded-full bg-[#e9a51f] text-white">
          <CircleAlert size={11} strokeWidth={2.5} />
        </span>
      )}

      {status === "pending" && (
        <span className="size-[18px] rounded-full border border-[#cbd3dc] bg-[#f4f6f8]" />
      )}
    </div>
  );
}
