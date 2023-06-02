import { defineStore } from "pinia";
import { ICurrency, IEstimatedAmount } from "../../types/currency.types";
import { getAllCurrencies } from "../../api/getAllCurrencies";
import { pickFields } from "@/shared/utils/pickFields/pickFields";

import { getMinimalAmount } from "../../api/getMinimalAmount";

import { getEstimatedAmount } from "../../api/getEstimatedAmount";

export interface ISelectedCurrency {
  value: string;
  currency?: ICurrency;
}

interface IExchangerStore {
  currencies: ICurrency[];
  leftCurrency: ISelectedCurrency;
  rightCurrency: ISelectedCurrency;
  minimalAmount: {
    fromLeft: number;
  };

  isLoading: boolean;
  warning: IEstimatedAmount["warningMessage"];
}

export const useExchangerStore = defineStore("exchanger-store", {
  state: (): IExchangerStore => ({
    // Все валюты
    currencies: [],
    // Левая валюта
    leftCurrency: {
      value: "",
    },
    // Правая валюта
    rightCurrency: {
      value: "",
    },
    // Минималки слева направо и справа налево
    minimalAmount: {
      fromLeft: 0,
    },

    // Загрузка
    isLoading: false,
    // Ошибка
    warning: null,
  }),
  actions: {
    /**
     * Гетает все возможные валюты, выставляет левую и правую по дефолту и гетает их минималки
     */
    async getCurrencies() {
      this.load();
      // Гет валют
      const currencies = await getAllCurrencies();

      // Обработка объектов, чтобы не было лишних полей
      const strippedCurrencies = currencies.map((c) =>
        pickFields(c, ["image", "name", "ticker"])
      );

      // Выставляем левую валюту
      this.setLeftCurrency(strippedCurrencies[0]);

      // Выставляем правую
      this.setRightCurrency(strippedCurrencies[1]);

      // Выставляем все валюты
      this.currencies = strippedCurrencies;

      this.unload();
    },

    /**
     * Выставляет левую валюту в стейт и обновляет минимальные/эстимейт значения
     *
     * @param currency Валюта
     */
    async setLeftCurrency(currency: ICurrency) {
      this.clearError();
      // Проверяем, другая ли это валюта
      if (this.rightCurrency.currency === currency) {
        // Если нет, ищем другую
        this.rightCurrency.currency = this.currencies.find(
          (c) => c.ticker !== currency.ticker
        );
      } else {
        // Если да, выставляем
        this.leftCurrency.currency = currency;
      }
      this.clearValues();

      this.getMinimal().then(() => {
        this.leftCurrency.value = this.minimalAmount.fromLeft.toString();
      });
    },

    /**
     * Выставляет правую валюту в стейт и обновляет минимальные/эстимейт значения
     *
     * @param currency Валюта
     */
    async setRightCurrency(currency: ICurrency) {
      this.clearError();
      // Проверяем, другая ли это валюта
      if (this.leftCurrency.currency === currency) {
        // Если нет, ищем другую
        this.leftCurrency.currency = this.currencies.find(
          (c) => c.ticker !== currency.ticker
        );
      } else {
        // Если да, выставляем
        this.rightCurrency.currency = currency;
      }
      this.clearValues();

      this.getMinimal().then(() => {
        this.leftCurrency.value = this.minimalAmount.fromLeft.toString();
      });
    },

    /**
     * Обновляет значение стейта левой валюты
     *
     * @param value Значение инпута
     */
    handleUpdateLeftCurrency(value: string) {
      // Проверяем, является ли значение инпута числом, если нет заканчиваем функцию
      if (typeof parseFloat(value) !== "number") return;

      // Выставляем значение
      this.leftCurrency.value = value;

      const parsed = parseFloat(value);

      // Если значение равняется пустой строек либо нулю, обнуляем также значение другого инпута и возвращаем
      if (value === "" || value === "0") return (this.rightCurrency.value = "");

      if (parsed < this.minimalAmount.fromLeft) {
        this.setError("Minimal breached");
        this.rightCurrency.value = "";
        return;
      }

      this.clearError();

      // Гетаем эстимейт
      this.getEstimateLeft();
    },

    clearValues() {
      this.leftCurrency.value = "";
      this.rightCurrency.value = "";
    },

    /**
     * Обновляет значение стейта правой валюты
     *
     * @param value Значение инпута
     */
    handleUpdateRightCurrency(value: string) {
      console.log(typeof parseFloat(value) === "number");
      // Проверяем, является ли значение инпута числом, если нет заканчиваем функцию
      if (typeof parseFloat(value) !== "number") return;

      // Выставляем значение
      this.rightCurrency.value = value;

      const parsed = parseFloat(value);

      // Если значение равняется пустой строек либо нулю, обнуляем также значение другого инпута и возвращаем
      if (value === "" || value === "0") return (this.leftCurrency.value = "");

      if (parsed < this.minimalAmount.fromLeft * this.leftFloat) {
        this.setError("Minimal breached");
        this.leftCurrency.value = "";
        return;
      }
      this.clearError();

      this.getEstimateRight();
    },

    /**
     * Меняет валюты местами и обновляет минималку
     */
    switchCurrencies() {
      if (!this.rightCurrency?.currency || !this.leftCurrency?.currency) return;
      [
        // Меняем местами с помощью деструктуризации массива
        this.rightCurrency.currency,
        this.leftCurrency.currency,
      ] = [this.leftCurrency.currency, this.rightCurrency.currency];

      // Обновляем минималку
      this.getEstimateLeft();
    },

    /**
     * Обновляет минимальное значение в обе стороны
     */
    async getMinimal() {
      try {
        this.load();

        // Получаем текущие куренси
        const [left, right] = this.getCurrenciesSide();

        const minLeft = await getMinimalAmount(left.currency, right.currency);

        this.minimalAmount.fromLeft = minLeft;
      } catch (error: Error | any) {
        this.setError(error.message);
      } finally {
        this.unload();
      }
    },

    /**
     * Выставляет эстимейт для правой валюты
     */
    async getEstimateLeft() {
      try {
        this.clearError();
        const [left, right] = this.getCurrenciesSide();

        if (!left.value) return;

        this.clearError();
        this.load();
        // Получаем текущие валюты

        // Гетаем эстимейт
        const estimate = await getEstimatedAmount(
          left.value,
          left.currency,
          right.currency
        );

        // Выставляем ошибку
        this.setError(estimate.warningMessage);

        this.rightCurrency.value = String(
          this.leftFloat * estimate.estimatedAmount
        );
      } catch (error) {
        this.setError("Some error occured");
      } finally {
        this.unload();
      }
    },

    async getEstimateRight() {
      try {
        this.clearError();
        const [left, right] = this.getCurrenciesSide();

        if (!right.value) return;

        this.clearError();
        this.load();
        // Получаем текущие валюты

        // Гетаем эстимейт
        const estimate = await getEstimatedAmount(
          right.value,
          right.currency,
          left.currency
        );

        // Выставляем ошибку
        this.setError(estimate.warningMessage);

        this.leftCurrency.value = String(
          this.rightFloat * estimate.estimatedAmount
        );
      } catch (error) {
        this.setError("Some error occured");
      } finally {
        this.unload();
      }
    },

    /**
     * Получает текущие валюты из стейта, убеждаясь в том, что они не пустые, иначе выдает ошибку
     *
     * @returns Текущие валюты
     */
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
      if (this.warning) throw new Error("there is an error");
      this.isLoading = true;
    },
    unload() {
      this.isLoading = false;
    },

    clearError() {
      this.warning = null;
    },

    setError(message: string | null) {
      this.warning = message;
    },
  },
  getters: {
    // Возможные валюты для левого селекта
    getLeftCurrencies(state) {
      return state.currencies.filter(
        (c) => c.ticker !== state.leftCurrency.currency?.ticker
      );
    },

    // Возможные валюты для правого селекта
    getRightCurrencies(state) {
      return state.currencies.filter(
        (c) => c.ticker !== state.rightCurrency.currency?.ticker
      );
    },

    // Проверяет, нарушены ли границы минимальных значений
    isMinimalBreached(state): boolean {
      // Если есть ошибка, границы нарушены

      if (this.warning) return true;

      // Границы левой минималки
      const isLeftBreaches =
        this.leftFloat < state.minimalAmount.fromLeft &&
        state.leftCurrency.value !== "";
      // Границы правой минималки
      const isRightBreaches =
        this.rightFloat < state.minimalAmount.fromLeft * this.leftFloat &&
        state.rightCurrency.value !== "";

      return isLeftBreaches || isRightBreaches;
    },

    leftFloat(state) {
      // Флоат значение инпут стринги левой валюты
      return parseFloat(state.leftCurrency.value);
    },
    rightFloat(state) {
      // Флоат значение инпут стринги правой валюты
      return parseFloat(state.rightCurrency.value);
    },
  },
});
