<template>
  <label class="flex w-full flex-col gap-[0.8rem]">
    <span> {{ label }} </span>
    <slot />
  </label>
</template>

<script setup lang="ts">
interface ITextInput {
  label: string;
}

defineProps<Partial<ITextInput>>();
</script>

<style scoped lang="scss"></style>
