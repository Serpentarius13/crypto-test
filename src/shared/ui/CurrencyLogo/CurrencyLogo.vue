<template>
  <figure class="flex items-center gap-[1.4rem] overflow-x-hidden">
    <img
      :alt="`Logo of ${name}`"
      :src="image"
      class="aspect-square max-w-[2rem]"
    />

    <span class="text-ellipsis whitespace-nowrap uppercase">
      {{ ticker }}
    </span>
  </figure>
</template>

<script setup lang="ts">
import { ICurrency } from "@/features/Exchange/types/currency.types";

interface ICurrencyLogo extends Pick<ICurrency, "image" | "ticker" | "name"> {}

defineProps<ICurrencyLogo>();
</script>

<style scoped lang="scss"></style>
