"use client";
import { GoogleIcon } from "@/assets/icons";
import { Button, Input, Logo } from "@/components";
import Link from "next/link";
import { Controller } from "react-hook-form";
import { useSignupForm } from "../useSignupForm";
import Image from "next/image";

export default function FormSection() {
  const { form, handleSubmit, errors, hasErrors, isPending, onSubmit } = useSignupForm();
  const { control } = form;
  return (
    <section
      aria-labelledby="signup-heading"
      className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-12 min-[1600px]:py-20 min-[1600px]:px-16">
      <Logo
        aria-label="Fintech - Home"
        className="flex w-full max-w-md min-[1600px]:max-w-lg"
      />
      <div className="flex flex-col flex-1 w-full max-w-md min-[1600px]:max-w-lg items-center justify-center">
        <div className="flex  flex-col gap-8  min-[1600px]:gap-10 w-full">
          <header className="flex flex-col gap-6 min-[1600px]:gap-8 w-full">
            <div>
              <h1
                id="signup-heading"
                className="text-2xl font-bold tracking-tight text-text1Color min-[1600px]:text-4xl">
                Create new account
              </h1>
              <p className="mt-1 text-sm text-text2Color min-[1600px]:mt-2 min-[1600px]:text-base">
                Welcome back! Please enter your details
              </p>
            </div>
          </header>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-6 min-[1600px]:gap-8"
            aria-label="Sign up form">
            <div className="flex flex-col gap-4 min-[1600px]:gap-5">
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Full Name"
                    type="text"
                    autoComplete="full-name"
                    placeholder="John Doe"
                    error={errors.fullName?.message}
                    disabled={isPending}
                    labelClassName="min-[1600px]:text-base"
                    inputClassName="min-[1600px]:py-3.5 min-[1600px]:text-base min-[1600px]:px-4"
                    wrapperClassName="min-[1600px]:gap-2"
                    errorClassName="min-[1600px]:text-base"
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Email"
                    type="email"
                    autoComplete="email"
                    placeholder="example@gmail.com"
                    error={errors.email?.message}
                    disabled={isPending}
                    labelClassName="min-[1600px]:text-base"
                    inputClassName="min-[1600px]:py-3.5 min-[1600px]:text-base min-[1600px]:px-4"
                    wrapperClassName="min-[1600px]:gap-2"
                    errorClassName="min-[1600px]:text-base"
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    error={errors.password?.message}
                    disabled={isPending}
                    labelClassName="min-[1600px]:text-base"
                    inputClassName="min-[1600px]:py-3.5 min-[1600px]:text-base min-[1600px]:px-4"
                    wrapperClassName="min-[1600px]:gap-2"
                    errorClassName="min-[1600px]:text-base"
                  />
                )}
              />
            </div>

            <div className="flex flex-col gap-3 min-[1600px]:gap-4">
              <Button
                type="submit"
                variant="primary"
                isLoading={isPending}
                disabled={hasErrors || isPending}
                aria-label="Sign up"
                className="w-full min-[1600px]:h-12 min-[1600px]:text-base">
                Create Account
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="w-full min-[1600px]:h-12 min-[1600px]:text-base"
                leftIcon={<GoogleIcon />}
                disabled={isPending}
                aria-label="Sign in with Google">
                Sign up with google
              </Button>
            </div>
          </form>

          <p className="text-center text-sm text-text2Color min-[1600px]:text-base">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold hover:underline relative inline-block cursor-pointer text-text1Color">
              Sign in
              <Image
                width={43}
                height={5}
                src="/images/svg/lime-line.svg"
                className="absolute -bottom-3 left-0 w-full"
                alt="line"
              />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
