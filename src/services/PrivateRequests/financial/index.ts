import { privateAxiosInstance } from "@/api/axios";
import { QueryOptions } from "@/services/types/query-types";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import {
  IGetFinancialSummaryResponse,
  IGetFinancialWorkingCapitalResponse,
  IGetRecentTransactionsResponse,
  IGetScheduledTransfersResponse,
  IGetWalletCardsResponse,
} from "./types";

const baseUrl = "/financial";

const getFinancialSummary = async () => {
  return await privateAxiosInstance.get<IGetFinancialSummaryResponse>(
    `${baseUrl}/summary`,
  );
};

const useGetFinancialSummary = (
  options?: QueryOptions<AxiosResponse<IGetFinancialSummaryResponse>>,
) =>
  useQuery({
    queryKey: ["getFinancialSummary"],
    queryFn: () => getFinancialSummary(),
    ...options,
  });

const getFinancialWorkingCapital = async () => {
  return await privateAxiosInstance.get<IGetFinancialWorkingCapitalResponse>(
    `${baseUrl}/working-capital`,
  );
};

const useGetFinancialWorkingCapital = (
  options?: QueryOptions<AxiosResponse<IGetFinancialWorkingCapitalResponse>>,
) =>
  useQuery({
    queryKey: ["getFinancialWorkingCapital"],
    queryFn: () => getFinancialWorkingCapital(),
    ...options,
  });

const getWalletCards = async () => {
  return await privateAxiosInstance.get<IGetWalletCardsResponse>(`${baseUrl}/wallet`);
};

const useGetWalletCards = (
  options?: QueryOptions<AxiosResponse<IGetWalletCardsResponse>>,
) =>
  useQuery({
    queryKey: ["getWalletCards"],
    queryFn: () => getWalletCards(),
    ...options,
  });

const getRecentTransactions = async (limit = 20) => {
  return await privateAxiosInstance.get<IGetRecentTransactionsResponse>(
    `${baseUrl}/transactions/recent`,
    {
      params: {
        limit,
      },
    },
  );
};

const useGetRecentTransactions = (
  limit = 20,
  options?: QueryOptions<AxiosResponse<IGetRecentTransactionsResponse>>,
) =>
  useQuery({
    queryKey: ["getRecentTransactions", limit],
    queryFn: () => getRecentTransactions(limit),
    ...options,
  });

const getScheduledTransfers = async () => {
  return await privateAxiosInstance.get<IGetScheduledTransfersResponse>(
    `${baseUrl}/transfers/scheduled`,
  );
};

const useGetScheduledTransfers = (
  options?: QueryOptions<AxiosResponse<IGetScheduledTransfersResponse>>,
) =>
  useQuery({
    queryKey: ["getScheduledTransfers"],
    queryFn: () => getScheduledTransfers(),
    ...options,
  });

export const FinancialPrivateService = {
  useGetFinancialSummary,
  useGetFinancialWorkingCapital,
  useGetWalletCards,
  useGetRecentTransactions,
  useGetScheduledTransfers,
};
