"use client";

import { getResponseData } from "@/lib/response-helpers";
import { FinancialPrivateService } from "@/services/PrivateRequests/financial";
import type {
  RecentTransactionItem,
  ScheduledTransferItem,
  SummaryData,
  WalletCardItem,
  WorkingCapitalChartEntry,
} from "@/services/PrivateRequests/financial/types";
import { RECENT_TRANSACTIONS_LIMIT } from "./constants";

export function useWorkingCapital() {
  const {
    data: response,
    isLoading,
    error,
    isError,
    refetch,
  } = FinancialPrivateService.useGetFinancialWorkingCapital();
  const payload = getResponseData(response);
  const chartData: WorkingCapitalChartEntry[] = payload?.data ?? [];

  return { chartData, isLoading, error, isError, refetch };
}

export function useRecentTransactions(limit = RECENT_TRANSACTIONS_LIMIT) {
  const {
    data: response,
    isLoading,
    error,
    isError,
    refetch,
  } = FinancialPrivateService.useGetRecentTransactions(limit);
  const apiData = getResponseData(response);
  const transactions: RecentTransactionItem[] = Array.isArray(apiData?.transactions)
    ? apiData.transactions
    : apiData?.transactions
      ? [apiData.transactions]
      : [];

  return { transactions, isLoading, error, isError, refetch };
}

export function useScheduledTransfers() {
  const {
    data: response,
    isLoading,
    error,
    isError,
    refetch,
  } = FinancialPrivateService.useGetScheduledTransfers();
  const transfers: ScheduledTransferItem[] =
    getResponseData(response)?.transfers ?? [];

  return { transfers, isLoading, error, isError, refetch };
}

export function useWalletsCard() {
  const {
    data: response,
    isLoading,
    error,
    isError,
    refetch,
  } = FinancialPrivateService.useGetWalletCards();
  const cards: WalletCardItem[] = getResponseData(response)?.cards ?? [];

  return { cards, isLoading, error, isError, refetch };
}

export function useSummaryCards() {
  const {
    data: response,
    isLoading,
    error,
    isError,
    refetch,
  } = FinancialPrivateService.useGetFinancialSummary();
  const summaryCards: SummaryData | undefined = getResponseData(response);

  return { summaryCards, isLoading, error, isError, refetch };
}
