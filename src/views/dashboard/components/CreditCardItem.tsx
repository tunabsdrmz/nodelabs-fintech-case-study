"use client";

import { cn } from "@/lib/utils";
import type { WalletCardItem } from "@/services/PrivateRequests/financial/types";
import Image from "next/image";

const getBankDisplayParts = (bank: string): [string, string] => {
  if (bank.includes("|")) {
    const parts = bank.split("|").map((s) => s.trim());
    return [parts[0] ?? "Fintech.", parts[1] ?? "Bank"];
  }
  return ["Fintech.", "Bank"];
};

const formatExpiry = (month: number, year: number): string =>
  `${String(month).padStart(2, "0")}/${String(year).slice(-2)}`;

function CreditCardItem({ card, index }: { card: WalletCardItem; index: number }) {
  const isFirst = index === 0;
  const isDark = card.color === "#000000";
  const [bankName, bankSubtitle] = getBankDisplayParts(card.bank);
  const cardBrand = isFirst ? "Mastercard" : "Visa";

  return (
    <article
      className={cn(
        "absolute rounded-3xl transition-all duration-300 overflow-hidden border border-white/10",
        isFirst
          ? "w-full z-0 top-0 h-55 max-w-[560px]"
          : "w-[90%] z-10 top-35 h-55 max-w-[500px] shadow-2xl backdrop-blur-md",
      )}
      aria-label={`${card.name}, ${bankName} ${bankSubtitle}, ending in ${card.cardNumber.slice(-4)}, expires ${formatExpiry(card.expiryMonth, card.expiryYear)}`}>
      {!isFirst && (
        <div
          className="absolute inset-0 bg-linear-to-b from-white/30 via-white/80 to-white z-0"
          aria-hidden
        />
      )}

      <Image
        src={isDark ? "/images/svg/black-card.svg" : "/images/svg/white-card.svg"}
        alt=""
        role="presentation"
        loading="eager"
        className={cn(
          "absolute inset-0 h-full w-full object-cover aspect-auto",
          isFirst ? "z-[-1]" : "z-[-1] opacity-50 hidden",
        )}
        width={560}
        height={55}
      />

      <div
        className={cn(
          "relative flex h-full flex-col justify-between p-6 z-10",
          isDark ? "text-white" : "text-text1Color",
        )}>
        <header className="flex items-start justify-between">
          <div>
            <p className="flex items-baseline gap-1.5 text-sm">
              <span className="font-semibold text-opacity-90">{bankName}</span>
              <span aria-hidden>|</span>
              <span
                className={cn(
                  "font-light",
                  isDark ? "text-white/70" : "text-text1Color/70",
                )}>
                {bankSubtitle}
              </span>
            </p>
            <div
              className="mt-6"
              aria-hidden>
              <Image
                src="/images/svg/chip.svg"
                alt=""
                className="h-8 w-auto aspect-auto"
                width={32}
                height={32}
              />
            </div>
          </div>
          <div aria-hidden>
            <Image
              src="/images/svg/contactless.svg"
              alt=""
              className="h-8 w-auto aspect-auto"
              width={32}
              height={32}
            />
          </div>
        </header>

        <div
          className={cn(
            "flex flex-col",
            isFirst ? "items-start justify-center pb-14" : "justify-end",
          )}>
          <p
            className={cn(
              "font-mono font-black tracking-widest whitespace-nowrap",
              isFirst
                ? "text-md xs:text-lg sm:text-xl md:text-lg 2xl:text-2xl"
                : "text-lg 2xl:text-[22px] mb-2 text-text1Color",
            )}>
            {card.cardNumber}
          </p>

          {!isFirst && (
            <p
              className="text-xs font-semibold opacity-80 text-text1Color"
              aria-label={`Expires ${formatExpiry(card.expiryMonth, card.expiryYear)}`}>
              {formatExpiry(card.expiryMonth, card.expiryYear)}
            </p>
          )}
        </div>

        <Image
          width={20}
          height={20}
          src={isFirst ? "/images/svg/mastercard.svg" : "/images/svg/visa.svg"}
          alt={cardBrand}
          className="absolute bottom-6 right-6 h-5 w-auto object-contain aspect-auto"
        />
      </div>
    </article>
  );
}

export default CreditCardItem;
