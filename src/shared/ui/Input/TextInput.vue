<template>
  <label class="flex w-full flex-col gap-[0.8rem]">
    <span> {{ label }} </span>
    <input
      v-model="model"
      v-bind="props"
      class="padding-small borderline-gray w-full rounded-very-small"
    />
  </label>
</template>

<script setup lang="ts">
interface ITextInput {
  label: string;
  placeholder: string;
  defaultValue: string;
}

const props = defineProps<Partial<ITextInput>>();
const model = defineModel();
</script>

<style scoped lang="scss"></style>
