<template>
  <div
    class="relative max-h-[14.4rem] w-full overflow-y-auto rounded-b-very-small border-[1px] border-blueish-gray-light !border-t-white-gray bg-white"
    v-bind="containerProps"
  >
    <ul class="flex w-full flex-col" v-bind="wrapperProps">
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
          <span
            class="overflow-clip text-ellipsis whitespace-nowrap text-blueish-gray"
          >
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
