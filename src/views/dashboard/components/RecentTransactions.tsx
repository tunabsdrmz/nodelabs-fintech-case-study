"use client";

import Link from "next/link";
import { ChevronRightIcon } from "@/assets/icons";
import { SectionError } from "@/components/error/SectionError";
import { Skeleton } from "@/components/Skeleton";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useRecentTransactions } from "../useDashboard";
import Image from "next/image";

export default function RecentTransactions() {
  const { transactions, isLoading, isError, error, refetch } = useRecentTransactions();

  if (isError) {
    return (
      <SectionError
        title="Recent transactions could not be loaded"
        message={error instanceof Error ? error.message : undefined}
        onRetry={() => refetch()}
        className="min-h-[300px] md:col-span-2 lg:col-span-3 xl:col-span-6 rounded-xl border border-gray4Background"
      />
    );
  }

  if (isLoading) {
    return (
      <section
        className="flex h-full flex-col rounded-xl border border-gray4Background bg-white px-6 py-5 md:col-span-2 lg:col-span-3 xl:col-span-6"
        aria-label="Recent transactions"
        aria-busy="true">
        <div className="mb-6 flex items-center justify-between">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-5 w-20" />
        </div>
        <div className="flex flex-col gap-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 shrink-0 rounded-xl" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="hidden h-4 w-24 md:block" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="hidden h-4 w-24 sm:block" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      className="flex flex-col rounded-xl border border-gray4Background bg-white px-6 py-5 md:col-span-2 lg:col-span-3 xl:col-span-6"
      aria-labelledby="recent-transactions-heading"
      aria-label="Recent transactions">
      <header className="mb-6 flex items-center justify-between">
        <h2
          id="recent-transactions-heading"
          className="text-xl font-bold text-text1Color">
          Recent Transactions
        </h2>
        <Link
          href="/transactions"
          className="flex items-center gap-1 rounded text-sm font-semibold text-secondaryColor transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:ring-offset-2"
          aria-label="View all recent transactions">
          View All
          <ChevronRightIcon />
        </Link>
      </header>

      {transactions.length === 0 ? (
        <p className="py-4 text-text2Color" role="status">
          No recent transactions.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table
            className="w-full min-w-[150px] border-collapse"
            aria-label="Recent transactions list">
            <caption className="sr-only">
              Recent transactions: name or business, type, amount, and date
            </caption>
            <thead>
              <tr className="text-left text-xs font-semibold uppercase text-gray-400">
                <th scope="col" className="min-w-[200px] pb-4 font-medium">
                  NAME/BUSINESS
                </th>
                <th scope="col" className="min-w-[120px] pb-4 font-medium text-center">
                  TYPE
                </th>
                <th scope="col" className="min-w-[150px] pb-4 font-medium text-center">
                  AMOUNT
                </th>
                <th scope="col" className="min-w-[130px] pb-4 font-medium text-center">
                  DATE
                </th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((trx) => (
                <tr
                  key={trx.id}
                  className="group cursor-default rounded-lg border-t border-gray4Background transition-colors duration-300 hover:bg-gray2Background">
                  <td className="py-4 pl-1">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg"
                        aria-hidden="true">
                        <Image
                          width={40}
                          height={40}
                          src={trx.image}
                          alt=""
                          className="h-8 w-8 object-contain"
                        />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-text1Color">
                          {trx.name}
                        </span>
                        <span className="text-xs text-text2Color">
                          {trx.business}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 text-center text-sm font-medium text-text2Color">
                    {trx.type}
                  </td>

                  <td
                    className="py-4 text-center text-sm font-semibold text-text1Color"
                    aria-label={`Amount: ${formatCurrency(Math.abs(trx.amount), trx.currency)}`}>
                    {formatCurrency(Math.abs(trx.amount), trx.currency)}
                  </td>

                  <td className="py-4 text-center text-sm font-medium text-gray-400">
                    <time dateTime={trx.date}>{formatDate(trx.date)}</time>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
