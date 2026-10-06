"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

/* -------------------------------------------------------------------------- */
/* Validation                                                                 */
/* -------------------------------------------------------------------------- */

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  password: z.string().min(1, "Password is required"),

  rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = form;

  /* ------------------------------------------------------------------------ */
  /* Submit                                                                   */
  /* ------------------------------------------------------------------------ */

  async function onSubmit(values: LoginFormValues) {
    setServerError(null);

    try {
      const result = await authClient.signIn.email({
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
        callbackURL: "/",
      });

      if (result.error) {
        setServerError(
          result.error.message || "Invalid email or password."
        );

        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch {
      setServerError(
        "Unable to sign in right now. Please try again."
      );
    }
  }

  /* ------------------------------------------------------------------------ */
  /* UI                                                                       */
  /* ------------------------------------------------------------------------ */

  return (
    <div className="relative z-50 flex min-h-[calc(100dvh-3rem)] items-center justify-center min-[950px]:col-span-3">
      <section className="w-full max-w-[430px] rounded-md border border-[var(--border)] bg-[var(--background)] px-6 py-8 shadow-[0_24px_60px_rgba(16,40,75,0.07)] backdrop-blur-md sm:px-[38px] sm:py-[42px]">

        {/* ---------------------------------------------------------------- */}
        {/* Heading                                                          */}
        {/* ---------------------------------------------------------------- */}

        <div className="mt-0 flex flex-col items-center">
          <h1 className="text-[31px] font-medium leading-[1.05] tracking-[-0.04em] text-[#10284b] sm:text-[37px]">
            Log In
          </h1>

          <p className="mt-2 text-[12px] leading-[1.55] text-[#60708a] sm:text-[13px]">
            Sign in to continue managing your CRM
          </p>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Divider                                                          */}
        {/* ---------------------------------------------------------------- */}

        <div className="relative mx-auto mt-6 flex w-full max-w-[250px] justify-center">
          <div className="h-px w-full bg-[var(--primary)]/20" />

          <span className="absolute top-0 h-px w-10 bg-[var(--primary)]" />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Login Form                                                       */}
        {/* ---------------------------------------------------------------- */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-6 flex flex-col gap-[17px]"
        >
          {/* -------------------------------------------------------------- */}
          {/* Email                                                          */}
          {/* -------------------------------------------------------------- */}

          <Field>
            <FieldLabel
              htmlFor="email"
              className="text-sm font-semibold text-[#172b47]"
            >
              Email
            </FieldLabel>

            <div className="relative flex h-[43px] items-center">
              <Mail
                size={15}
                strokeWidth={1.7}
                aria-hidden="true"
                className="pointer-events-none absolute left-[13px] text-[#718096]"
              />

              <Input
                id="email"
                type="email"
                autoComplete="username"
                placeholder="you@yourf1visaguide.com"
                disabled={isSubmitting}
                aria-invalid={!!errors.email}
                className="pl-8 placeholder:text-xs"
                {...register("email")}
              />
            </div>

            <FieldError errors={[errors.email]} />
          </Field>

          {/* -------------------------------------------------------------- */}
          {/* Password                                                       */}
          {/* -------------------------------------------------------------- */}

          <Field>
            <FieldLabel
              htmlFor="password"
              className="text-sm font-semibold text-[#172b47]"
            >
              Password
            </FieldLabel>

            <div className="relative flex h-[43px] items-center">
              <LockKeyhole
                size={15}
                strokeWidth={1.7}
                aria-hidden="true"
                className="pointer-events-none absolute left-[13px] text-[#718096]"
              />

              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                disabled={isSubmitting}
                aria-invalid={!!errors.password}
                className="pl-8 pr-10 placeholder:text-xs"
                {...register("password")}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((current) => !current)
                }
                disabled={isSubmitting}
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
                className="absolute right-2.5 grid size-[26px] place-items-center rounded-[5px] text-[#6e7c90] transition hover:bg-[#f3f5f8] hover:text-[#10284b] disabled:pointer-events-none disabled:opacity-50"
              >
                {showPassword ? (
                  <EyeOff
                    size={15}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                ) : (
                  <Eye
                    size={15}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>

            <FieldError errors={[errors.password]} />
          </Field>

          {/* -------------------------------------------------------------- */}
          {/* Remember Me                                                    */}
          {/* -------------------------------------------------------------- */}

          <Field orientation="horizontal" className="-mt-0.5">
            <Input
              id="rememberMe"
              type="checkbox"
              disabled={isSubmitting}
              className="size-3"
              {...register("rememberMe")}
            />

            <FieldLabel
              htmlFor="rememberMe"
              className="cursor-pointer text-sm font-normal"
            >
              Remember me
            </FieldLabel>
          </Field>

          {/* -------------------------------------------------------------- */}
          {/* Server Error                                                   */}
          {/* -------------------------------------------------------------- */}

          {serverError && (
            <div
              role="alert"
              aria-live="polite"
              className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs leading-5 text-red-700"
            >
              {serverError}
            </div>
          )}

          {/* -------------------------------------------------------------- */}
          {/* Submit                                                         */}
          {/* -------------------------------------------------------------- */}

          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={isSubmitting}
          >
            <span>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </span>

            {!isSubmitting && (
              <ArrowRight
                size={16}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            )}
          </Button>
        </form>

        {/* ---------------------------------------------------------------- */}
        {/* Security                                                         */}
        {/* ---------------------------------------------------------------- */}

        <div className="mt-4 flex items-center justify-center gap-1.5 text-center text-[8.5px] leading-[1.4] text-[#52637a]">
          <LockKeyhole
            size={12}
            strokeWidth={2}
            aria-hidden="true"
            className="shrink-0 text-[#10284b]"
          />

          <span>
            Secure access for authorized team members only.
          </span>
        </div>
      </section>
    </div>
  );
}