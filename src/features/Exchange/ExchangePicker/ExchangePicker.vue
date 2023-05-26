<template>
  <SelectableInput v-model:value="value" v-model:search="searchValue">
    <template #button>
      <CurrencyLogo :name="name" :image="image" :ticker="ticker" />
    </template>

    <template #menu>
      <ul class="w-full flex flex-col">
        <li
          v-for="{ name, image, ticker } in currencies.filter((c) =>
            checkInclusiveStrings(searchValue, [c.name, c.ticker])
          )"
          :key="ticker"
          class="padding-small w-full flex items-center gap-[1.2rem] hover:bg-white-grayish"
        >
          <CurrencyLogo :name="name" :image="image" :ticker="ticker" />
          <span class="blueish-gray">
            {{ name }}
          </span>
        </li>
      </ul>
    </template>
  </SelectableInput>
</template>

<script setup lang="ts">
import SelectableInput from "@/shared/ui/SelectableInput/SelectableInput.vue";
import { ICurrency } from "../types/currency.types";
import CurrencyLogo from "@/shared/ui/CurrencyLogo/CurrencyLogo.vue";
import { ref } from "vue";
import { checkInclusiveStrings } from "@/shared/utils/checkInclusiveStrings";

interface IExchangePicker {
  selectedCurrency: ICurrency;
  currencies: ICurrency[];
}

const value = ref<string>("");
const searchValue = ref<string>("");

const {
  selectedCurrency: { name, image, ticker },
} = defineProps<IExchangePicker>();
</script>

<style scoped lang="scss"></style>
