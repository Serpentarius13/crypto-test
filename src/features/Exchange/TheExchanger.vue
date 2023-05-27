<template>
  <div class="flex w-full gap-[3.3rem]">
    <ExchangePicker
      :selectedCurrency="store.leftCurrency.currency"
      :handleSelectCurrency="store.setLeftCurrency"
      :currencies="store.rightCurrencies"
    />

    <ExchangePickerBtn />

    <ExchangePicker
      :selectedCurrency="store.rightCurrency.currency"
      :handleSelectCurrency="store.setRightCurrency"
      :currencies="store.leftCurrencies"
    />
  </div>
</template>

<script setup lang="ts">
import ExchangePicker from "@/features/Exchange/ExchangePicker/ExchangePicker.vue";
import ExchangePickerBtn from "@/features/Exchange/ExchangePicker/ExchangePickerBtn.vue";
import { useExchangerStore } from "./store/useExchangerStore";
import { onMounted } from "vue";

const store = useExchangerStore();

onMounted(() => {
  store.getCurrencies();
});
</script>

<style scoped lang="scss"></style>
