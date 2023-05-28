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
    fromRight: number;
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
      fromRight: 0,
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
    setLeftCurrency(currency: ICurrency) {
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

      // Если у нас есть вторая валюта для получения минималки
      if (this.rightCurrency.currency) {
        // Гетаем минималку
        this.getMinimal().then(() => {
          // И также гетаем эстимейт если у нас уже есть вторая валюта
          this.rightCurrency.value && this.getEstimateRight();
        });
      }
    },

    /**
     * Выставляет правую валюту в стейт и обновляет минимальные/эстимейт значения
     *
     * @param currency Валюта
     */
    setRightCurrency(currency: ICurrency) {
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

      // Если у нас есть вторая валюта для получения минималки
      if (this.leftCurrency.currency) {
        // Гетаем минималку
        this.getMinimal().then(() => {
          // И также гетаем эстимейт если у нас уже есть вторая валюта
          this.leftCurrency.value && this.getEstimateLeft();
        });
      }
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

      // Если значение равняется пустой строек либо нулю, обнуляем также значение другого инпута и возвращаем
      if (value === "" || value === "0") return (this.rightCurrency.value = "");

      // Гетаем эстимейт
      if (+value > this.minimalAmount.fromLeft) this.getEstimateRight();
    },

    /**
     * Обновляет значение стейта правой валюты
     *
     * @param value Значение инпута
     */
    handleUpdateRightCurrency(value: string) {
      // Проверяем, является ли значение инпута числом, если нет заканчиваем функцию
      if (typeof parseFloat(value) !== "number") return;

      // Выставляем значение
      this.rightCurrency.value = value;

      // Если значение равняется пустой строек либо нулю, обнуляем также значение другого инпута и возвращаем
      if (value === "" || value === "0") return (this.leftCurrency.value = "");

      // Гетаем эстимейт
      if (+value > this.minimalAmount.fromRight) this.getEstimateLeft();
    },

    /**
     * Меняет валюты местами и обновляет минималку
     */
    switchCurrencies() {
      // Меняем местами с помощью деструктуризации массива
      [this.rightCurrency, this.leftCurrency] = [
        this.leftCurrency,
        this.rightCurrency,
      ];

      // Обновляем минималку
      this.getMinimal();
    },

    /**
     * Обновляет минимальное значение в обе стороны
     */
    async getMinimal() {
      try {
        this.load();

        // Получаем текущие куренси
        const [left, right] = this.getCurrenciesSide();

        const [minLeft, minRight] = await Promise.all([
          getMinimalAmount(left.currency, right.currency),
          getMinimalAmount(right.currency, left.currency),
        ]);

        // Обновляем минималки
        this.minimalAmount.fromLeft = minLeft;
        this.minimalAmount.fromRight = minRight;

        this.unload();
      } catch (error: Error | any) {
        this.warning = error.message;
      } finally {
        this.unload();
      }
    },

    /**
     * Выставляет эстимейт для левой валюты
     */
    async getEstimateLeft() {
      try {
        this.clearError();
        this.load();
        // Получаем текущие валюты
        const [left, right] = this.getCurrenciesSide();

        // Гетаем эстимейт
        const estimate = await getEstimatedAmount(
          right.value,
          right.currency,
          left.currency
        );
        // Выставляем ошибку
        this.warning = estimate.warningMessage;

        // Выставляем эстимейт
        this.leftCurrency.value = estimate.estimatedAmount.toString();
      } catch (error) {
        this.warning = "Some error occured";
      } finally {
        this.unload();
      }
    },

    /**
     * Выставляет эстимейт для правой валюты
     */
    async getEstimateRight() {
      try {
        this.clearError();
        this.load();
        // Получаем текущие валюты
        const [left, right] = this.getCurrenciesSide();

        // Гетаем эстимейт
        const estimate = await getEstimatedAmount(
          left.value,
          left.currency,
          right.currency
        );

        // Выставляем ошибку
        this.warning = estimate.warningMessage;

        // Выставляем эстимейт
        this.rightCurrency.value = estimate.estimatedAmount.toString();
      } catch (error) {
        this.warning = "Some error occured";
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
      this.isLoading = true;
    },
    unload() {
      this.isLoading = false;
    },

    clearError() {
      this.warning = null;
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
        this.rightFloat < state.minimalAmount.fromRight &&
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
