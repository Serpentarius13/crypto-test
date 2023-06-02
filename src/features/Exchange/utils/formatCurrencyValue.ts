import { ISelectedCurrency } from "../store/useExchangerStore/useExchangerStore";

export const formatCurrencyValue = (currency: ISelectedCurrency) =>
  parseFloat(currency.value)
    .toFixed(6)
    .replace(/\.?0+$/, "")
    .toString();
