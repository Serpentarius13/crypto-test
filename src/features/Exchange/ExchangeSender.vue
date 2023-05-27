<template>
  <div class="flex w-full items-end gap-[3.2rem]">
    <TextInput v-model="address" label="Your Ethereum Address" />

    <div class="relative flex flex-col gap-[0.8rem]">
      <BaseButton class="blue medium uppercase"> Exchange </BaseButton>
      <Transition name="fade">
        <strong
          class="text-small absolute top-full text-center text-red w-full"
          v-if="store.isMinimalBreached"
        >
          This pair is disabled now
        </strong>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/shared/ui/Button/BaseButton.vue";
import TextInput from "@/shared/ui/Input/TextInput.vue";
import { ref } from "vue";
import { useExchangerStore } from "./store/useExchangerStore";

const address = ref<string>("");

const store = useExchangerStore();
</script>

<style scoped lang="scss"></style>
