<template>
  <SelectableInput
    v-model:value="value"
    v-model:search="searchValue"
    @open="isSelectOpened = !isSelectOpened"
    :is-opened="isSelectOpened"
  >
    <template #button>
      <CurrencyLogo
        :name="selectedCurrency.name"
        :image="selectedCurrency.image"
        :ticker="selectedCurrency.ticker"
        v-if="selectedCurrency"
      />
    </template>

    <template #menu>
      <ExchangePickerSelect
        :currencies="
          currencies.filter((c) => c.ticker !== selectedCurrency.ticker)
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

import { useExchangerStore } from "../store/useExchangerStore";
import ExchangePickerSelect from "./ExchangePickerSelect.vue";

interface IExchangePicker {
  selectedCurrency: ICurrency;
  handleSelectCurrency: (currency: ICurrency) => void;
  currencies: ICurrency[];
}

const isSelectOpened = ref<boolean>(false);

const value = ref<string>("");
const searchValue = ref<string>("");

const { selectedCurrency, handleSelectCurrency } =
  defineProps<IExchangePicker>();

const store = useExchangerStore();

function handleSelect(currency: ICurrency) {
  isSelectOpened.value = false;
  handleSelectCurrency(currency);
}
</script>

<style scoped lang="scss"></style>
