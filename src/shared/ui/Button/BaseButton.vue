<template>
  <button :class="buttonVariants({ variant, size })"><slot /></button>
</template>

<script setup lang="ts">
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./buttonVariants";

type TVariant = Required<VariantProps<typeof buttonVariants>>;

defineProps<TVariant>();
</script>

<style scoped lang="scss"></style>
