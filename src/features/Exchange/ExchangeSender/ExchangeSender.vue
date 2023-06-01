<template>
  <div class="flex w-full items-end gap-[3.2rem] sm:flex-col sm:items-stretch">
    <TextInput v-model="address" label="Your Ethereum Address" />

    <div class="relative flex flex-col gap-[0.8rem]">
      <BaseButton
        class="blue medium uppercase sm:!w-full sm:pt-[0.8rem]"
        :disabled="store.isMinimalBreached"
      >
        Exchange
      </BaseButton>
      <Transition name="fade">
        <strong
          class="text-small absolute top-full w-full text-center text-red"
          v-if="store.isMinimalBreached && !store.isLoading"
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
import { useExchangerStore } from "../store/useExchangerStore/useExchangerStore.js";

const address = ref<string>("");

const store = useExchangerStore();
</script>

<style scoped lang="scss"></style>
