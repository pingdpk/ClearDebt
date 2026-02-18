export type CurrencyCode = "EUR" | "USD" | "GBP" | "INR" | "AED" | string;

export type DebtSummary = {
  person: string;
  netCents: number;     // + they owe you, - you owe them
  currency: CurrencyCode;
  updatedAt: string;    // ISO
};