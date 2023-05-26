<template>
  <div class="flex gap-[3.2rem] items-end">
    <TextInput v-model="address" label="Your Ethereum Address" />

    <BaseButton class="uppercase"> Exchange </BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/shared/ui/Button/BaseButton.vue";
import TextInput from "@/shared/ui/Input/TextInput.vue";
import { ref } from "vue";

const address = ref<string>("");
</script>

<style scoped lang="scss"></style>
