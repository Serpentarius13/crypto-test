<template>
  <component :is="icon" />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

type TIconName = "exchange" | "arrow-down" | "cross";

const props = defineProps<{ name: TIconName }>();

const icon = defineAsyncComponent(() => import(`./icons/${name}.svg`));
</script>

<style scoped lang="scss"></style>
