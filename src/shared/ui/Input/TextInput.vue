<template>
  <label class="flex flex-col gap-[8rem] text-small">
    <span> {{ label }} </span>
    <input
      v-model="model"
      v-bind="props"
      class="w-full padding-small rounded-very-small"
    />
  </label>
</template>

<script setup lang="ts">
import { InputHTMLAttributes } from "vue";

interface ITextInput extends InputHTMLAttributes {
  label?: string;
}

const props = defineProps<ITextInput>();
const model = defineModel();
</script>

<style scoped lang="scss"></style>
