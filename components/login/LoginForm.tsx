"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="mt-6 flex flex-col gap-[17px]">
      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="text-[11px] font-semibold text-[#172b47]"
        >
          Work email
        </label>

        <div className="relative flex h-[43px] items-center">
          <Mail
            size={15}
            strokeWidth={1.7}
            aria-hidden="true"
            className="pointer-events-none absolute left-[13px] text-[#718096]"
          />

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@yourf1visaguide.com"
            required
            className="
              h-full
              w-full
              rounded-[6px]
              border border-[#d9dfe7]
              bg-white
              pl-[38px]
              pr-3
              text-[11px]
              text-[#152b49]
              outline-none
              transition
              placeholder:text-[#a0aaba]
              hover:border-[#c6ced9]
              focus:border-[#294e7e]
              focus:ring-[3px]
              focus:ring-[#294e7e]/[0.08]
            "
          />
        </div>
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="password"
          className="text-[11px] font-semibold text-[#172b47]"
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

          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            required
            className="
              h-full
              w-full
              rounded-[6px]
              border border-[#d9dfe7]
              bg-white
              pl-[38px]
              pr-11
              text-[11px]
              text-[#152b49]
              outline-none
              transition
              placeholder:text-[#a0aaba]
              hover:border-[#c6ced9]
              focus:border-[#294e7e]
              focus:ring-[3px]
              focus:ring-[#294e7e]/[0.08]
            "
          />

          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={
              showPassword ? "Hide password" : "Show password"
            }
            className="
              absolute
              right-2.5
              grid
              size-[26px]
              place-items-center
              rounded-[5px]
              text-[#6e7c90]
              transition
              hover:bg-[#f3f5f8]
              hover:text-[#10284b]
            "
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
        <label className="flex cursor-pointer select-none items-center gap-1.5 text-[10px] text-[#52637a]">
          <input
            type="checkbox"
            name="remember"
            className="
              size-3
              rounded-[2px]
              border-[#b9c2ce]
              accent-[#153b69]
            "
          />

          <span>Remember me</span>
        </label>

        <Link
          href="/forgot-password"
          className="
            text-[10px]
            text-[#1c63d5]
            hover:underline
          "
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="
          mt-0.5
          flex
          h-[43px]
          w-full
          items-center
          justify-center
          gap-2
          rounded-full
          border-0
          bg-[#12375f]
          text-[12px]
          font-semibold
          text-white
          shadow-none
          transition
          hover:-translate-y-px
          hover:bg-[#0d2d51]
          hover:shadow-[0_8px_20px_rgba(18,55,95,0.17)]
          active:translate-y-0
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#1c63d5]/30
          focus-visible:ring-offset-2
        "
      >
        <span>Sign in</span>

        <ArrowRight
          size={16}
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </button>
    </form>
  );
}