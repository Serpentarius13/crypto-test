<template>
  <input
    v-model="model"
    class="padding-small borderline-gray w-full rounded-very-small"
  />
</template>

<script setup lang="ts">
const model = defineModel<string>({ required: true });
</script>

<style scoped lang="scss"></style>
