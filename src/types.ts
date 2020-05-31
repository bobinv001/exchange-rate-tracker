export interface ICurrencyComparison {
  from: string;
  to: string;
}

export type ComparisonKeys = keyof ICurrencyComparison;

export interface ITracker extends ICurrencyComparison {
  amount: number;
  rate: number;
}
