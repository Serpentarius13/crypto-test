<template>
  <label class="flex flex-col gap-[0.8rem] w-full borderline-gray">
    <span> {{ label }} </span>
    <input
      v-model="model"
      v-bind="props"
      class="w-full padding-small rounded-very-small"
      
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
