import { defineStore } from "pinia";
import { ICurrency } from "../types/currency.types";
import { getAllCurrencies } from "../api/getAllCurrencies";
import { pickFields } from "@/shared/utils/pickFields";
import { checkInclusiveStrings } from "@/shared/utils/checkInclusiveStrings";

interface ISelectedCurrency {
  value: string;
  currency?: ICurrency;
}

interface IExchangerStore {
  currencies: ICurrency[];
  leftCurrency: ISelectedCurrency;
  rightCurrency: ISelectedCurrency;
}

export const useExchangerStore = defineStore("exchanger-store", {
  state: (): IExchangerStore => ({
    currencies: [],
    leftCurrency: {
      value: "",
    },
    rightCurrency: {
      value: "",
    },
  }),
  actions: {
    async getCurrencies() {
      const currencies = await getAllCurrencies();

      const strippedCurrencies = currencies.map((c) =>
        pickFields(c, ["image", "name", "ticker"])
      );

      this.leftCurrency.currency = strippedCurrencies[0];
      this.rightCurrency.currency = strippedCurrencies[1];

      this.currencies = strippedCurrencies;
    },

    setLeftCurrency(currency: ICurrency) {
      this.leftCurrency.currency = currency;
      if (this.rightCurrency.currency === currency) {
        this.rightCurrency.currency = this.currencies.find(
          (c) => c.ticker !== currency.ticker
        );
      }
    },
    setRightCurrency(currency: ICurrency) {
      this.rightCurrency.currency = currency;

      if (this.leftCurrency.currency === currency) {
        this.leftCurrency.currency = this.currencies.find(
          (c) => c.ticker !== currency.ticker
        );
      }
    },
  },
  getters: {
    leftCurrencies(state) {
      return state.currencies.filter(
        (c) => c.ticker !== state.leftCurrency.currency?.ticker
      );
    },
    rightCurrencies(state) {
      return state.currencies.filter(
        (c) => c.ticker !== state.rightCurrency.currency?.ticker
      );
    },
  },
});
