"use client";

import SummaryCard from "./SummaryCard";
import { TotalBalanceIcon, TotalSavedIcon } from "@/assets/icons";
import { SectionError } from "@/components/error/SectionError";
import { useSummaryCards } from "../useDashboard";

export default function SummaryCards() {
  const { summaryCards, isLoading, isError, error, refetch } = useSummaryCards();

  if (isError) {
    return (
      <SectionError
        title="Summary cards could not be loaded"
        message={
          error instanceof Error ? error.message : "An error occurred. Please try again."
        }
        onRetry={() => refetch()}
        className="min-h-[220px] sm:col-span-3"
      />
    );
  }

  return (
    <section
      className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3"
      aria-label="Financial summary">
      <SummaryCard
        label="Total balance"
        price={summaryCards?.totalBalance.amount}
        currency={summaryCards?.totalBalance.currency}
        isLoading={isLoading}
        Icon={TotalBalanceIcon}
      />

      <SummaryCard
        label="Total spending"
        price={summaryCards?.totalExpense.amount}
        currency={summaryCards?.totalExpense.currency}
        isLoading={isLoading}
        Icon={TotalBalanceIcon}
      />

      <SummaryCard
        label="Total saved"
        price={summaryCards?.totalSavings.amount}
        currency={summaryCards?.totalSavings.currency}
        isLoading={isLoading}
        Icon={TotalSavedIcon}
      />
    </section>
  );
}
