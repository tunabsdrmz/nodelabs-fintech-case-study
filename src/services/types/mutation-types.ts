import { UseMutationOptions } from "@tanstack/react-query";

export type MutationOptions<TData, TError, TVariables> = Omit<
  UseMutationOptions<TData, TError, TVariables, unknown>,
  "mutationFn"
>;
