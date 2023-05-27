<template>
  <div class="flex w-full gap-[3.3rem]">
    <ExchangePicker
      :selectedCurrency="store.leftCurrency"
      :handleSelectCurrency="store.setLeftCurrency"
      :currencies="store.getRightCurrencies"
      :handleInput="store.handleUpdateLeftCurrency"
    />

    <ExchangePickerBtn @click="store.switchCurrencies" />

    <ExchangePicker
      :selectedCurrency="store.rightCurrency"
      :handleSelectCurrency="store.setRightCurrency"
      :currencies="store.getLeftCurrencies"
      :handleInput="store.handleUpdateRightCurrency"
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
