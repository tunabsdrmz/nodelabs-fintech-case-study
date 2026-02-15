"use client";

import React from "react";

import { Skeleton } from "@/components/Skeleton";
import { formatCurrency } from "@/lib/utils";

interface SummaryCardProps {
  label: string;
  price?: number;
  currency?: string;
  isLoading?: boolean;
  Icon: React.ElementType;
}

function SummaryCard(props: SummaryCardProps) {
  const { label, price, currency, Icon, isLoading } = props;

  if (isLoading) {
    return (
      <div
        className="flex h-full w-full flex-row items-center gap-4 bg-gray2Background px-5 py-6 rounded-lg"
        role="status"
        aria-label="Loading"
        aria-busy="true">
        <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-6 w-3/4" />
        </div>
      </div>
    );
  }

  return (
    <article
      className="w-full h-full items-center flex flex-row gap-3.5 bg-gray2Background hover:bg-darkGray1Background px-5 py-6 rounded-lg group transition-colors text-nowrap cursor-default"
      aria-labelledby={`summary-card-${label.replace(/\s+/g, "-").toLowerCase()}-label`}>
      <div className="bg-gray3Background p-3 rounded-full group-hover:bg-darkGray2Background transition-colors" aria-hidden>
        <Icon className="w-5 h-5 text-darkGray1Background group-hover:text-primaryColor transition-colors" />
      </div>

      <div className="flex flex-col gap-2">
        <p
          id={`summary-card-${label.replace(/\s+/g, "-").toLowerCase()}-label`}
          className="text-text2Color font-normal text-sm">
          {label}
        </p>
        <p
          className="font-bold text-xl text-text1Color group-hover:text-white transition-colors"
          aria-label={`${label}: ${formatCurrency(price, currency)}`}>
          {formatCurrency(price, currency)}
        </p>
      </div>
    </article>
  );
}

export default SummaryCard;
