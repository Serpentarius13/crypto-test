<template>
  <div class="flex flex-col gap-[0.8rem]">
    <h2>Your ethereum address</h2>

    <div class="flex w-full gap-[3.2rem] sm:flex-col sm:gap-[1.6rem] ">
      <TextInput v-model="address" class="!py-0 sm:!py-[1.4rem]" />
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
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/shared/ui/Button/BaseButton.vue";
import TextInput from "@/shared/ui/Input/TextInput/TextInput.vue";
import { ref } from "vue";
import { useExchangerStore } from "../store/useExchangerStore/useExchangerStore.js";

const address = ref<string>("");

const store = useExchangerStore();
</script>

<style scoped lang="scss"></style>
