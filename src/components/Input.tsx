"use client";

import { forwardRef, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "@/assets/icons";

const inputVariants = cva(
  "w-full rounded-lg border bg-white px-3 py-2.5 text-text1Color outline-none transition-colors placeholder:text-text2Color focus:ring-2 focus:ring-primaryColor/50 focus:border-primaryColor",
  {
    variants: {
      inputState: {
        default: "border-gray3Background",
        error: "border-red-500 focus:ring-red-500/30 focus:border-red-500",
      },
    },
    defaultVariants: {
      inputState: "default",
    },
  },
);

export interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">,
    VariantProps<typeof inputVariants> {
  label: string;
  error?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    label,
    error,
    id,
    wrapperClassName,
    inputClassName,
    labelClassName,
    errorClassName,
    inputState,
    type = "text",
    "aria-describedby": ariaDescribedby,
    ...rest
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputId = id ?? `input-${label.replace(/\s/g, "-").toLowerCase()}`;
  const errorId = error ? inputId + "-error" : undefined;

  const inputElement = (
    <input
      ref={ref}
      id={inputId}
      type={isPassword ? (showPassword ? "text" : "password") : type}
      autoComplete={props.autoComplete}
      aria-invalid={!!error}
      aria-describedby={[ariaDescribedby, errorId].filter(Boolean).join(" ") || undefined}
      className={cn(
        inputVariants({
          inputState: error ? "error" : (inputState ?? "default"),
          className: inputClassName,
        }),
        isPassword && "pr-10",
      )}
      {...rest}
    />
  );

  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      <label
        htmlFor={inputId}
        className={cn("text-sm font-medium text-text1Color", labelClassName)}>
        {label}
      </label>
      {isPassword ? (
        <div className="relative">
          {inputElement}
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded p-1 text-text1Color/50 transition-colors duration-200 hover:text-text1Color"
            aria-label={showPassword ? "Hide password" : "Show password"}>
            <span className="relative size-5">
              <span
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-in-out",
                  showPassword ? "opacity-0" : "opacity-100",
                )}
                aria-hidden>
                <EyeIcon className="size-5" />
              </span>
              <span
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-in-out",
                  showPassword ? "opacity-100" : "opacity-0",
                )}
                aria-hidden>
                <EyeOffIcon className="size-5" />
              </span>
            </span>
          </button>
        </div>
      ) : (
        inputElement
      )}
      {error && (
        <p
          id={errorId}
          role="alert"
          className={cn("text-sm text-red-500", errorClassName)}>
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export { Input, inputVariants };
