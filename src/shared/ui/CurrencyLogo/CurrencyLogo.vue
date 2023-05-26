<template>
  <figure class="flex items-center gap-[1.439rem]">
    <img :src="`Logo of ${name}`" :alt="image" class="max-w-[2rem]" />

    <span class="uppercase">
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
