"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Spinner } from "./Spinner";

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primaryColor/50 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-70 [&_svg]:pointer-events-none shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primaryColor text-darkGray1Background hover:bg-primaryColor/70",
        secondary:
          "border border-gray3Background bg-white text-text1Color hover:bg-gray4Background",
      },
      size: {
        default: "h-10 px-4 py-2.5",
        sm: "h-8 gap-1.5 px-3 py-2 text-[0.8rem]",
        lg: "h-11 px-5 py-3",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      isLoading = false,
      leftIcon,
      children,
      disabled,
      type = "button",
      "aria-busy": ariaBusy,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={ariaBusy ?? isLoading}
        aria-disabled={isDisabled}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}>
        {leftIcon}
        {isLoading ? <Spinner /> : children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
