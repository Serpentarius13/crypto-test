export interface IFullCurrency {
  ticker: string;
  name: string;

  image: string;
  hasExternalId: boolean;
  isFiat: boolean;
  featured: boolean;
  isStable: boolean;
  supportsFixedRate: boolean;
}

export interface ICurrency
  extends Pick<IFullCurrency, "ticker" | "name" | "image"> {}

export interface IEstimatedAmount {
  estimatedAmount: number;
  transactionSpeedForecast: string;
  warningMessage: null | string;
}

export interface IMinimalAmount {
  minAmount: number;
}
