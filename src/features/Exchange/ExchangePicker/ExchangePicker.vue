<template>
  <SelectableInput
    v-model:search="searchValue"
    @open="isSelectOpened = !isSelectOpened"
    @input="handleInput"
    :value="selectedCurrency.value"
    :is-opened="isSelectOpened"
  >
    <template #button>
      <CurrencyLogo
        :name="selectedCurrency.currency?.name"
        :image="selectedCurrency.currency?.image"
        :ticker="selectedCurrency.currency?.ticker"
        v-if="selectedCurrency"
      />
    </template>

    <template #menu>
      <ExchangePickerSelect
        :currencies="
          currencies.filter(
            (c) => c.ticker !== selectedCurrency.currency?.ticker
          )
        "
        @select="handleSelect"
        :search-value="searchValue"
      />
    </template>
  </SelectableInput>
</template>

<script setup lang="ts">
import SelectableInput from "@/shared/ui/SelectableInput/SelectableInput.vue";
import { ICurrency } from "../types/currency.types";
import CurrencyLogo from "@/shared/ui/CurrencyLogo/CurrencyLogo.vue";
import { ref } from "vue";

import ExchangePickerSelect from "./ExchangePickerSelect.vue";
import { ISelectedCurrency } from "../store/useExchangerStore/useExchangerStore.js";

interface IExchangePicker {
  selectedCurrency: ISelectedCurrency;
  handleSelectCurrency: (currency: ICurrency) => void;
  currencies: ICurrency[];
  handleInput: (value: string) => void;
}

const isSelectOpened = ref<boolean>(false);

const searchValue = ref<string>("");

const { selectedCurrency, handleSelectCurrency } =
  defineProps<IExchangePicker>();

function handleSelect(currency: ICurrency) {
  isSelectOpened.value = false;
  handleSelectCurrency(currency);
}
</script>

<style scoped lang="scss"></style>
