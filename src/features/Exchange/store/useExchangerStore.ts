import { defineStore } from "pinia";
import { ICurrency, IEstimatedAmount } from "../types/currency.types";
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
  warning: IEstimatedAmount["warningMessage"];
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
    warning: null,
  }),
  actions: {
    async getCurrencies() {
      this.load();
      const currencies = await getAllCurrencies();

      const strippedCurrencies = currencies.map((c) =>
        pickFields(c, ["image", "name", "ticker"])
      );

      this.setLeftCurrency(strippedCurrencies[0]);
      this.setRightCurrency(strippedCurrencies[1]);

      this.currencies = strippedCurrencies;

      this.unload();
    },

    setLeftCurrency(currency: ICurrency) {
      this.leftCurrency.currency = currency;
      if (this.rightCurrency.currency === currency) {
        this.rightCurrency.currency = this.currencies.find(
          (c) => c.ticker !== currency.ticker
        );
      }

      if (this.rightCurrency.currency) {
        this.getMinimal().then(() => {
          this.rightCurrency.value && this.getEstimateRight();
        });
      }
    },
    setRightCurrency(currency: ICurrency) {
      this.rightCurrency.currency = currency;

      if (this.leftCurrency.currency === currency) {
        this.leftCurrency.currency = this.currencies.find(
          (c) => c.ticker !== currency.ticker
        );
      }
      if (this.leftCurrency.currency) {
        this.getMinimal().then(() => {
          this.leftCurrency.value && this.getEstimateLeft();
        });
      }
    },

    handleUpdateLeftCurrency(value: string) {
      if (typeof parseFloat(value) !== "number") return;

      this.leftCurrency.value = value;

      if (value === "" || value === "0") return (this.rightCurrency.value = "");

      const getEstimateRight = debounce(this.getEstimateRight, 500);

      if (+value > this.minimalAmount.fromLeft) getEstimateRight();
    },
    handleUpdateRightCurrency(value: string) {
      if (typeof parseFloat(value) !== "number") return;

      this.rightCurrency.value = value;

      if (value === "" || value === "0") return (this.leftCurrency.value = "");

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
      this.load();
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

      this.unload();
    },

    async getEstimateLeft() {
      this.load();
      const [left, right] = this.getCurrenciesSide();

      const estimate = await getEstimatedAmount(
        right.value,
        right.currency,
        left.currency
      );

      this.warning = estimate.warningMessage;

      this.leftCurrency.value = estimate.estimatedAmount.toString();
      this.unload();
    },

    async getEstimateRight() {
      this.load();
      const [left, right] = this.getCurrenciesSide();

      const estimate = await getEstimatedAmount(
        left.value,
        left.currency,
        right.currency
      );

      this.warning = estimate.warningMessage;

      this.rightCurrency.value = estimate.estimatedAmount.toString();
      this.unload();
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

    load() {
      this.isLoading = true;
    },
    unload() {
      this.isLoading = false;
    },
  },
  getters: {
    getLeftCurrencies(state) {
      return state.currencies.filter(
        (c) => c.ticker !== state.leftCurrency.currency?.ticker
      );
    },
    getRightCurrencies(state) {
      return state.currencies.filter(
        (c) => c.ticker !== state.rightCurrency.currency?.ticker
      );
    },

    isMinimalBreached(state): boolean {
      if (this.warning) return true;

      console.log(state.leftCurrency.value, state.minimalAmount.fromLeft);
      const isLeftBreaches =
        this.leftFloat < state.minimalAmount.fromLeft &&
        state.leftCurrency.value !== "";
      const isRightBreaches =
        this.rightFloat < state.minimalAmount.fromRight &&
        state.rightCurrency.value !== "";

      return isLeftBreaches || isRightBreaches;
    },

    leftFloat(state) {
      return parseFloat(state.leftCurrency.value);
    },
    rightFloat(state) {
      return parseFloat(state.rightCurrency.value);
    },
  },
});
