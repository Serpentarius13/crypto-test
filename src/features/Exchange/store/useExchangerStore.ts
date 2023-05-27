import { defineStore } from "pinia";
import { ICurrency } from "../types/currency.types";
import { getAllCurrencies } from "../api/getAllCurrencies";
import { pickFields } from "@/shared/utils/pickFields";
import { checkInclusiveStrings } from "@/shared/utils/checkInclusiveStrings";
import { getMinimalAmount } from "../api/getMinimalAmount";
import { getEstimatedAmount } from "../api/getEstimatedAmount";
import { debounce } from "@/shared/utils/debounce";

export interface ISelectedCurrency {
  value: string;
  currency?: ICurrency;
}

interface IExchangerStore {
  currencies: ICurrency[];
  leftCurrency: ISelectedCurrency;
  rightCurrency: ISelectedCurrency;
  minimalAmount: {
    fromRight: number;
    fromLeft: number;
  };
  isLoading: boolean;
}

type TSide = "left" | "right";

export const useExchangerStore = defineStore("exchanger-store", {
  state: (): IExchangerStore => ({
    currencies: [],
    leftCurrency: {
      value: "",
    },
    rightCurrency: {
      value: "",
    },
    minimalAmount: {
      fromLeft: 0,
      fromRight: 0,
    },

    isLoading: false,
  }),
  actions: {
    async getCurrencies() {
      const currencies = await getAllCurrencies();

      const strippedCurrencies = currencies.map((c) =>
        pickFields(c, ["image", "name", "ticker"])
      );

      this.setLeftCurrency(strippedCurrencies[0]);
      this.setRightCurrency(strippedCurrencies[1]);

      console.log(this.rightCurrency, this.leftCurrency);

      this.currencies = strippedCurrencies;
    },

    setLeftCurrency(currency: ICurrency) {
      this.leftCurrency.currency = currency;
      if (this.rightCurrency.currency === currency) {
        this.rightCurrency.currency = this.currencies.find(
          (c) => c.ticker !== currency.ticker
        );
      }

      if (this.rightCurrency.currency) {
        this.getMinimal().then(() => this.getEstimateRight());
      }
    },
    setRightCurrency(currency: ICurrency) {
      this.rightCurrency.currency = currency;

      console.log(currency);

      if (this.leftCurrency.currency === currency) {
        this.leftCurrency.currency = this.currencies.find(
          (c) => c.ticker !== currency.ticker
        );
      }
      if (this.leftCurrency.currency) {
        this.getMinimal().then(() => this.getEstimateLeft());
      }
    },

    handleUpdateLeftCurrency(value: string) {
      this.leftCurrency.value = value;
      if (value === "") return (this.rightCurrency.value = "");
      const getEstimateRight = debounce(this.getEstimateRight, 500);
      if (+value > this.minimalAmount.fromLeft) getEstimateRight();
    },
    handleUpdateRightCurrency(value: string) {
      this.rightCurrency.value = value;
      if (value === "") return (this.leftCurrency.value = "");
      const getEstimateLeft = debounce(this.getEstimateLeft, 500);
      if (+value > this.minimalAmount.fromRight) getEstimateLeft();
    },

    switchCurrencies() {
      [this.rightCurrency, this.leftCurrency] = [
        this.leftCurrency,
        this.rightCurrency,
      ];

      this.getMinimal();
    },

    async getMinimal() {
      const [left, right] = this.getCurrenciesSide();

      const minAmountLeft = await getMinimalAmount(
        left.currency,
        right.currency
      );

      const minAmountRight = await getMinimalAmount(
        right.currency,
        left.currency
      );

      this.minimalAmount.fromLeft = minAmountLeft;
      this.minimalAmount.fromRight = minAmountRight;
    },

    async getEstimateLeft() {
      const [left, right] = this.getCurrenciesSide();

      const estimate = await getEstimatedAmount(
        right.value,
        right.currency,
        left.currency
      );

      this.leftCurrency.value = estimate.estimatedAmount.toString();
    },

    async getEstimateRight() {
      const [left, right] = this.getCurrenciesSide();

      const estimate = await getEstimatedAmount(
        left.value,
        left.currency,
        right.currency
      );

      console.log(estimate);

      this.rightCurrency.value = estimate.estimatedAmount.toString();
    },

    getCurrenciesSide() {
      const leftCurrency = this.leftCurrency;
      const rightCurrency = this.rightCurrency;

      if (!leftCurrency.currency || !rightCurrency.currency)
        throw new Error("No currencies provided");

      const currencies = [leftCurrency, rightCurrency];

      return currencies as [
        Required<ISelectedCurrency>,
        Required<ISelectedCurrency>
      ];
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

    isMinimalBreached(state): boolean {
      console.log(this.minimalAmount.fromLeft, this.minimalAmount.fromRight);

      const isLeftBreaches =
        +state.leftCurrency.value < state.minimalAmount.fromLeft &&
        state.leftCurrency.value !== "";
      const isRightBreaches =
        +state.rightCurrency.value < state.minimalAmount.fromRight &&
        state.rightCurrency.value !== "";
      return isLeftBreaches || isRightBreaches;
    },
  },
});
