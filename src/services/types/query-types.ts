import { UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type QueryOptions<T, TError = AxiosError> = Omit<
  UseQueryOptions<T, TError, T, readonly unknown[]>,
  "queryKey" | "queryFn" | "initialData"
>;
