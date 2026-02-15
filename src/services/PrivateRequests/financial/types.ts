import { BaseApiResponse } from "@/services/types";

export type IGetFinancialSummaryResponse = BaseApiResponse<{
  totalBalance: {
    amount: number;
    currency: string;
    change: {
      percentage: number;
      trend: string;
    };
  };
  totalExpense: {
    amount: number;
    currency: string;
    change: {
      percentage: number;
      trend: string;
    };
  };
  totalSavings: {
    amount: number;
    currency: string;
    change: {
      percentage: number;
      trend: string;
    };
  };
  lastUpdated: string;
}>;

export type IGetFinancialWorkingCapitalResponse = BaseApiResponse<{
  period: string;
  currency: string;
  data: {
    month: string;
    income: number;
    expense: number;
    net: number;
  }[];
  summary: {
    totalIncome: number;
    totalExpense: number;
    netBalance: number;
  };
}>;

export type IGetWalletCardsResponse = BaseApiResponse<{
  cards: {
    id: string;
    name: string;
    type: string;
    cardNumber: string;
    bank: string;
    network: string;
    expiryMonth: number;
    expiryYear: number;
    color: string;
    isDefault: boolean;
  }[];
}>;

export type IGetRecentTransactionsResponse = BaseApiResponse<{
  transactions: {
    id: string;
    name: string;
    business: string;
    image: string;
    type: string;
    amount: number;
    currency: string;
    date: string;
    status: string;
    summary: {
      totalIncome: number;
      totalExpense: number;
      count: number;
    };
  };
}>;

export type IGetScheduledTransfersResponse = BaseApiResponse<{
  transfers: {
    id: string;
    name: string;
    image: string;
    date: string;
    amount: number;
    currency: string;
    status: string;
  }[];
  summary: {
    totalScheduledAmount: number;
    count: number;
  };
}>;

/** View / UI types derived from API responses */
export type WorkingCapitalChartEntry =
  IGetFinancialWorkingCapitalResponse["data"]["data"][number];
export type WalletCardItem = IGetWalletCardsResponse["data"]["cards"][number];
export type RecentTransactionItem =
  IGetRecentTransactionsResponse["data"]["transactions"];
export type ScheduledTransferItem =
  IGetScheduledTransfersResponse["data"]["transfers"][number];
export type SummaryData = IGetFinancialSummaryResponse["data"];
