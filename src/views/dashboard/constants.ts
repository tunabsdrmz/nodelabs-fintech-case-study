/** Default number of recent transactions shown on the dashboard */
export const RECENT_TRANSACTIONS_LIMIT = 3;

/** Working capital chart date range options */
export const DATE_RANGE_OPTIONS = [
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
] as const;

/** Default selected date range for the working capital chart */
export const DEFAULT_DATE_RANGE = "7";
