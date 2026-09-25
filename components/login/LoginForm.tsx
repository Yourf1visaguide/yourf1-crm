"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-[950px]:col-span-3 flex min-h-[calc(100dvh-3rem)] items-center justify-center z-50 ">
      <section className=" w-full max-w-[430px] rounded-md border border-[var(--border)] bg-[var(--background)] backdrop-blur-md px-6 py-8 shadow-[0_24px_60px_rgba(16,40,75,0.07)] sm:px-[38px] sm:py-[42px]  ">
        {/* Brand */}

        {/* Heading */}
        <div className="mt-0 flex items-center flex-col">
          <h1 className="  text-[31px] font-medium leading-[1.05] tracking-[-0.04em] text-[#10284b] sm:text-[37px] ">
            Log In
          </h1>

          <p className="mt-2 text-[12px] leading-[1.55] text-[#60708a] sm:text-[13px]">
            to continue managing Client
          </p>
        </div>
        <div className="relative mt-6 mx-auto flex w-full max-w-[250px]  justify-center">
          <div className="h-px w-full bg-[var(--primary)]/20" />

          <span className="absolute top-0 bottom-0 h-px w-10  bg-[var(--primary)]" />
          {/* <span className="absolute top-0 bottom-0 h-px w-10 animate-ping bg-blue-600" /> */}
        </div>
        {/* Login */}
        <form className="mt-6 flex flex-col gap-[17px]">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-[#172b47]"
            >
              Email
            </label>

            <div className="relative flex h-[43px] items-center">
              <Mail
                size={15}
                strokeWidth={1.7}
                aria-hidden="true"
                className="pointer-events-none absolute left-[13px] text-[#718096]"
              />
              <Input
                placeholder="you@yourf1visaguide.com"
                className="pl-8  placeholder:text-xs"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-[#172b47]"
            >
              Password
            </label>

            <div className="relative flex h-[43px] items-center">
              <LockKeyhole
                size={15}
                strokeWidth={1.7}
                aria-hidden="true"
                className="pointer-events-none absolute left-[13px] text-[#718096]"
              />

              <Input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                className="pl-8  placeholder:text-xs"
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className=" absolute right-2.5 grid size-[26px] place-items-center rounded-[5px] text-[#6e7c90] transition hover:bg-[#f3f5f8] hover:text-[#10284b] "
              >
                {showPassword ? (
                  <EyeOff size={15} strokeWidth={1.7} />
                ) : (
                  <Eye size={15} strokeWidth={1.7} />
                )}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="-mt-0.5 flex items-center justify-between">
            <label className="flex cursor-pointer select-none items-center gap-1.5 text-sm ">
              <Input type="checkbox" name="remember" className=" size-3 " />

              <span>Remember me</span>
            </label>
          </div>

          {/* Submit */}
          <Button variant="default" size="lg">
            <span>Sign in</span>

            <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
          </Button>
        </form>

        {/* Security */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-center text-[8.5px] leading-[1.4] text-[#52637a]">
          <LockKeyhole
            size={12}
            strokeWidth={2}
            className="shrink-0 text-[#10284b]"
          />

          <span>Secure access for authorized team members only.</span>
        </div>
      </section>
    </div>
  );
}
