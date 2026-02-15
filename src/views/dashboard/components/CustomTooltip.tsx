"use client";
import type { ReactNode } from "react";
import { formatCurrency } from "@/lib/utils";

interface TooltipEntry {
  dataKey?: string | number;
  color?: string;
  name?: string;
  value?: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: ReactNode;
}

export function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length || !label) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-lg border border-gray4Background bg-white px-4 py-3 shadow-lg">
      <p className="mb-2 text-sm font-semibold text-text1Color">{label}</p>
      <dl className="space-y-1">
        {payload.map((entry, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-sm">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: entry.color }}
              aria-hidden
            />
            <dt className="text-text2Color">{entry.name}:</dt>
            <dd className="font-medium text-text1Color">
              {formatCurrency(Number(entry.value ?? 0), "USD")}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
