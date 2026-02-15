"use client";

import { forwardRef } from "react";
import { ChevronDownIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className"> {
  options: SelectOption[];
  /** Optional wrapper class (e.g. for width) */
  wrapperClassName?: string;
  /** Optional class for the select element */
  className?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, wrapperClassName, className, ...rest }, ref) => (
    <div className={cn("relative", wrapperClassName)}>
      <select
        ref={ref}
        className={cn(
          "appearance-none rounded-lg border border-gray3Background bg-gray4Background px-3 py-2 pr-8 text-sm font-medium text-text1Color outline-none transition-colors hover:bg-gray3Background focus:ring-2 focus:ring-secondaryColor/30",
          className,
        )}
        {...rest}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-text2Color"
        aria-hidden>
        <ChevronDownIcon />
      </span>
    </div>
  ),
);

Select.displayName = "Select";

export { Select };
