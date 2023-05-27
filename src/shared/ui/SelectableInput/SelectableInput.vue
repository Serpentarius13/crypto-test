<template>
  <div
    class="padding-small borderline-gray relative grid w-full grid-cols-[1fr_0.33fr] rounded-very-small"
    v-click-away="handleClickAway"
  >
    <input
      class="border-r-[1px] border-r-white-gray focus:outline-none"
      @input="e => emit('input', (e.target as HTMLInputElement).value)"
      :value="value"
      v-if="!isOpened"
    />
    <input
      class="w-full focus:outline-none"
      type="search"
      v-model="searchModel"
      v-else
    />

    <button
      class="flex items-center gap-[3.3rem] justify-self-end"
      @click="emit('open')"
    >
      <slot name="button" />

      <BaseIcon name="cross" v-show="isOpened" key="1" />
      <BaseIcon name="arrow-down" v-show="!isOpened" key="2" />
    </button>

    <Transition name="fade">
      <div class="absolute left-0 top-full w-full" v-if="isOpened">
        <slot name="menu" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { sleep } from "@/shared/utils/sleep/sleep.js";
import BaseIcon from "../Icon/BaseIcon.vue";

const props = defineProps<{ isOpened: boolean; value: string }>();

const searchModel = defineModel<string>("search", { required: true });

const emit = defineEmits<{ open: []; input: [value: string] }>();

function handleClickAway() {
  sleep(1).then(() => props.isOpened && emit("open"));
}
</script>

<style scoped lang="scss"></style>
