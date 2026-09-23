import Image from "next/image";
import {
  BarChart3,
  LockKeyhole,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

import LoginForm from "@/components/login/LoginForm";

const features = [
  {
    icon: ShieldCheck,
    title: (
      <>
        Your Data
        <br />
        Is Secure
      </>
    ),
  },
  {
    icon: UsersRound,
    title: (
      <>
        Built for
        <br />
        Our Team
      </>
    ),
  },
  {
    icon: BarChart3,
    title: (
      <>
        Driving More
        <br />
        Student Success
      </>
    ),
  },
];

export default function LoginPage() {
  return (
    <main className="min-h-dvh relative bg-[#f8f9fb] px-4 py-6 text-[#10284b] sm:px-6">
      <div className="absolute w-full ">

        <div className="w-1 h-1 bg-black" />
      </div>
      <div className="flex min-h-[calc(100dvh-3rem)] items-center justify-center">
        <section
          className="
            w-full max-w-[430px]
            rounded-[18px]
            border border-slate-900/[0.08]
            bg-white
            px-6 py-8
            shadow-[0_24px_60px_rgba(16,40,75,0.07)]
            sm:px-[38px] sm:py-[42px]
          "
        >
          {/* Brand */}
          <div className="flex flex-col items-center">
            <Image
              src="/images/crm/logo.png"
              alt="Your F1 Visa Guide"
              width={190}
              height={100}
              priority
              className="h-auto w-[170px] object-contain sm:w-[185px]"
            />

            <div className="relative mt-4 flex w-full max-w-[150px] justify-center">
              <div className="h-px w-full bg-[#e8ebef]" />

              <span className="absolute top-0 h-px w-6 bg-[#b58a3a]" />
            </div>
          </div>

          {/* Heading */}
          <div className="mt-6">
            <h1
              className="
                font-serif
                text-[31px]
                font-medium
                leading-[1.05]
                tracking-[-0.04em]
                text-[#10284b]
                sm:text-[37px]
              "
            >
              Welcome back.
            </h1>

            <p className="mt-2 text-[12px] leading-[1.55] text-[#60708a] sm:text-[13px]">
              Sign in to continue managing your
              <br />
              student journey.
            </p>
          </div>

          {/* Login */}
          <LoginForm />

          {/* Security */}
          <div className="mt-[17px] flex items-center justify-center gap-1.5 text-center text-[8.5px] leading-[1.4] text-[#52637a]">
            <LockKeyhole
              size={11}
              strokeWidth={2}
              className="shrink-0 text-[#10284b]"
            />

            <span>
              Secure access for authorized team members only.
            </span>
          </div>

          {/* Feature strip */}
          <div
            className="
              mt-[23px]
              grid grid-cols-3
              overflow-hidden
              rounded-[10px]
              border border-[#edf0f3]
              bg-[#fcfcfd]
            "
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className={`
                    flex min-h-[77px]
                    flex-col items-center
                    justify-start
                    px-1 py-[13px]
                    text-center
                    ${index !== 0 ? "border-l border-[#edf0f3]" : ""}
                  `}
                >
                  <div className="mb-1.5 grid size-6 place-items-center text-[#1266df]">
                    <Icon size={17} strokeWidth={1.6} />
                  </div>

                  <span className="text-[8px] font-medium leading-[1.35] text-[#243853] sm:text-[8.5px]">
                    {feature.title}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}