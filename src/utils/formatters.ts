const getLocale = () => (typeof window !== "undefined" ? navigator.language : "en-US");

export const formatCurrency = (amount = 0, currency = "TRY") => {
  return new Intl.NumberFormat(getLocale(), {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(getLocale(), {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};
