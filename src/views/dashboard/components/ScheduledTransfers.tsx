"use client";

import Link from "next/link";
import { ChevronRightIcon } from "@/assets/icons";
import { SectionError } from "@/components/error/SectionError";
import { Skeleton } from "@/components/Skeleton";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useScheduledTransfers } from "../useDashboard";
import Image from "next/image";

export default function ScheduledTransfers() {
  const { transfers, isLoading, isError, error, refetch } = useScheduledTransfers();

  if (isError) {
    return (
      <SectionError
        title="Scheduled transfers could not be loaded"
        message={error instanceof Error ? error.message : undefined}
        onRetry={() => refetch()}
        className="min-h-[300px] rounded-xl border border-gray4Background"
      />
    );
  }

  if (isLoading) {
    return (
      <section
        className="flex flex-col rounded-xl bg-white px-6 py-5"
        aria-label="Scheduled transfers"
        aria-busy="true">
        <div className="mb-6 flex items-center justify-between">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="flex flex-col gap-5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-5 w-20" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      className="flex flex-col rounded-xl bg-white"
      aria-labelledby="scheduled-transfers-heading"
      aria-label="Scheduled transfers">
      <header className="mb-4 flex items-center justify-between">
        <h2
          id="scheduled-transfers-heading"
          className="text-xl font-bold text-text1Color">
          Scheduled Transfers
        </h2>
        <Link
          href="/invoices"
          className="flex cursor-pointer items-center gap-1 rounded text-sm font-semibold text-secondaryColor transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:ring-offset-2"
          aria-label="View all scheduled transfers">
          View All
          <ChevronRightIcon />
        </Link>
      </header>

      {transfers.length === 0 ? (
        <p
          className="text-text2Color py-4"
          role="status">
          No scheduled transfers.
        </p>
      ) : (
        <ul
          className="flex min-w-(280px,85vw) w-full flex-col overflow-x-auto"
          role="list"
          aria-label="List of scheduled transfers">
          {transfers.map((transfer) => (
            <li
              key={transfer.id}
              className="flex w-full shrink-0 cursor-default items-center justify-between rounded-lg px-2 py-3 transition-colors duration-300 hover:bg-gray2Background">
              <div className="flex min-w-[220px] w-[200px] items-center gap-3">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-100 bg-gray-50"
                  aria-hidden="true">
                  {transfer.image ? (
                    <Image
                      width={48}
                      height={48}
                      src={transfer.image}
                      alt=""
                      className="h-auto w-auto object-cover"
                    />
                  ) : (
                    <span className="text-lg font-bold text-gray-400">
                      {transfer.name?.charAt(0)}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <span className="text-base font-bold text-text1Color">
                    {transfer.name}
                  </span>
                  <time
                    dateTime={transfer.date}
                    className="text-xs text-text2Color">
                    {formatDate(transfer.date)}
                  </time>
                </div>
              </div>

              <span
                className="flex flex-row items-center justify-center text-base font-bold text-text1Color"
                aria-label={`Outgoing amount: ${formatCurrency(Math.abs(transfer.amount), "USD")}`}>
                <span
                  className="mr-0.5 pb-1 text-base"
                  aria-hidden="true">
                  -
                </span>
                {formatCurrency(Math.abs(transfer.amount), "USD")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
