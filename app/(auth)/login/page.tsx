import Image from "next/image";
import { BarChart3, LockKeyhole, ShieldCheck, UsersRound } from "lucide-react";

import { cn } from "cn";
import LeftLogin from "@/components/login/LeftLogin";
import LoginHeader from "@/components/login/LoginHeader";
import LoginBackground from "@/components/login/LoginBackground";
import LoginForm from "@/components/login/LoginForm";
import LoginLeft from "@/components/login/LoginLeft";
import LoginRight from "@/components/login/LoginRight";

export default function LoginPage() {
  return (
    <main className={cn("min-h-dvh  overflow-hidden px-4 pt-6 pb-40 sm:px-6 bg-background  ")} >
      {/* <div className="absolute inset-0 bg-zinc-950 z-50 " /> */}
      <LoginHeader />
      <div className="absolute inset-0  border-zinc-900 z-0">
        {/* <Image
          src="/images/crm/login-bg.jpg"
          alt="Your f1 visa login page background"
          className="object-cover"
          fill
        /> */}

        {/* <div className="flex flex-wrap">
          {Array.from({ length: 900 }).map((_, index) => (
            <div
              key={index}
              className="size-1 shrink-0 rounded-full m-4 bg-zinc-300 animate-bounce"
            />
          ))}
        </div> */}

        <div className="absolute top-0 left-[20%] size-80 rounded-full blur-2xl opacity-50 bg-secondary -z-10 " />
        <div className="absolute top-[30%] right-[10%] size-10 rounded-full opacity-30 bg-secondary -z-10 " />
        <div className="absolute bottom-[0%] right-[15%] size-80 rounded-full opacity-10 bg-secondary -z-10 " />
        
        {/* <div className="bg-black absolute inset-0 opacity-20" /> */}
      </div>
      <div className="relative">
            
      <LoginBackground />

      <div className="min-[950px]:grid min-[950px]:grid-cols-9 ">
        {/* <LeftLogin /> */}
        <div className="col-span-3" >
          <LoginLeft />
        </div>
        <LoginForm />
        <div className="col-span-3 " >
          <LoginRight />
        </div>
      </div>
      </div>
    </main>
  );
}
