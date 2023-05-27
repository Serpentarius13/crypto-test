<template>
  <div
    class="padding-small borderline-gray relative grid w-full grid-cols-[1fr_0.33fr] rounded-very-small"
    v-click-away="handleClickAway"
  >
    <input
      class="numeric border-r-[1px] border-r-white-gray focus:outline-none"
      @input="handleInputEvent"
      :value="value"
      v-if="!isOpened"
      type="number"
      min="0"
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
      data-test="opener"
    >
      <slot name="button" />

      <BaseIcon name="cross" v-show="isOpened" key="1" id="cross" />
      <BaseIcon name="arrow-down" v-show="!isOpened" key="2" id="arrow" />
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
import { onMounted, onUnmounted } from "vue";
import { debounce } from "@/shared/utils/debounce/debounce";

const props = defineProps<{ isOpened: boolean; value: string }>();

const searchModel = defineModel<string>("search", { required: true });

const emit = defineEmits<{ open: []; input: [value: string] }>();

function handleClickAway() {
  sleep(1).then(() => props.isOpened && emit("open"));
}

function handleClose(e: KeyboardEvent) {
  if (e.key === "Enter" || e.key === "") {
    handleClickAway();
  }
}

function handleInputEvent(e: Event) {
  const debounced = debounce(
    () => emit("input", (e.target as HTMLInputElement).value),
    500
  );
  debounced();
}

onMounted(() => {
  document.addEventListener("keydown", handleClose);
});
onUnmounted(() => {
  document.removeEventListener("keydown", handleClose);
});
</script>

<style scoped lang="scss">
.numeric {
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    @apply m-0 appearance-none;
  }

  @apply appearance-none;
}
</style>
