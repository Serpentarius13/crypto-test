<template>
  <div class="h-[14.4rem] overflow-y-auto z-[20] relative" v-bind="containerProps">
    <ul class="z-[20] flex w-full flex-col" v-bind="wrapperProps">
      <li v-for="{ data, index } in list" :key="index">
        <button
          @click="emit('select', data)"
          class="padding-small flex w-full items-center gap-[1.2rem] bg-white hover:bg-white-grayish"
          :style="{ height: '4.8rem' }"
        >
          <CurrencyLogo
            :name="data.name"
            :image="data.image"
            :ticker="data.ticker"
          />
          <span class="blueish-gray">
            {{ data.name }}
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import CurrencyLogo from "@/shared/ui/CurrencyLogo/CurrencyLogo.vue";
import { ICurrency } from "../types/currency.types";
import { useVirtualList } from "@vueuse/core";
import { watchEffect } from "vue";
import { computed } from "@vue/reactivity";
import { checkInclusiveStrings } from "@/shared/utils/checkInclusiveStrings/checkInclusiveStrings.js";

const props = defineProps<{ currencies: ICurrency[]; searchValue: string }>();

const emit = defineEmits<{ select: [currency: ICurrency] }>();

const currencies = computed<ICurrency[]>(() => {
  const incl = props.currencies.filter((c) =>
    checkInclusiveStrings(props.searchValue, [c.name, c.ticker])
  );

  return incl;
});

const { list, wrapperProps, containerProps } = useVirtualList(currencies, {
  itemHeight: 48,
});
</script>

<style scoped lang="scss"></style>
