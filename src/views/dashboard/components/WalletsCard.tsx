"use client";

import CreditCardItem from "./CreditCardItem";
import { ThreePointsIcon } from "@/assets/icons";
import { SectionError } from "@/components/error/SectionError";
import { Skeleton } from "@/components/Skeleton";
import { useWalletsCard } from "../useDashboard";

export default function WalletsCard() {
  const { cards, isLoading, isError, error, refetch } = useWalletsCard();

  if (isError) {
    return (
      <SectionError
        title="Wallet cards could not be loaded"
        message={error instanceof Error ? error.message : undefined}
        onRetry={() => refetch()}
        className="min-h-[350px] rounded-xl border border-gray4Background"
      />
    );
  }

  if (isLoading) {
    return (
      <section
        className="flex min-h-[200px] flex-col gap-4 rounded-xl border border-gray4Background bg-white px-6 py-5"
        aria-label="Wallet cards"
        aria-busy="true">
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
        <Skeleton className="h-90 w-full min-h-[120px] rounded-xl" />
      </section>
    );
  }

  return (
    <section
      className="flex flex-col rounded-xl bg-white"
      aria-labelledby="wallets-heading">
      <header className="mb-4 flex items-center justify-between">
        <h2
          id="wallets-heading"
          className="text-xl font-bold text-text1Color">
          Wallet
        </h2>
        <button
          type="button"
          className="cursor-pointer text-text3Color transition-opacity hover:opacity-80 focus:outline-none rounded p-1 "
          aria-label="Wallet options">
          <ThreePointsIcon aria-hidden />
        </button>
      </header>

      <div className="relative h-90 w-full items-center justify-center flex">
        {cards.map((card, index) => (
          <CreditCardItem
            key={card.id}
            card={card}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
