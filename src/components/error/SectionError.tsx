"use client";

import { WarningTriangleIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";

interface SectionErrorProps {
  title: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function SectionError({ title, message, onRetry, className }: SectionErrorProps) {
  return (
    <section
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50/50 px-6 py-12",
        className,
      )}>
      <div
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-red-100 animate-bounce"
        aria-hidden>
        <WarningTriangleIcon className="h-10 w-10 text-red-600" />
      </div>
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="font-medium text-red-800">{title}</h3>
        {message && <p className="max-w-sm text-xs text-red-600">{message}</p>}
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          aria-label="Retry loading"
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
          Retry
        </button>
      )}
    </section>
  );
}
