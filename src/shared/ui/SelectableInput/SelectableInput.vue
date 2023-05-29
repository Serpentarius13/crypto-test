<template>
  <div
    class="padding-small borderline-gray xs:max-w-screen xs:max-w-screen relative flex w-full justify-between rounded-very-small"
    v-click-away="handleClickAway"
  >
    <input
      class="numeric w-full border-r-[1px] border-r-white-gray focus:outline-none"
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
      class="flex items-center gap-[3.3rem] justify-self-end md:gap-[1rem]"
      @click="emit('open')"
      data-test="opener"
    >
      <slot name="button" />

      <BaseIcon name="cross" v-show="isOpened" key="1" data-test="cross" />

      <BaseIcon
        name="arrow-down"
        v-show="!isOpened"
        key="2"
        data-test="arrow"
      />
    </button>

    <div class="absolute left-0 top-full w-full" v-if="isOpened">
      <slot name="menu" />
    </div>
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
  debouncedEmit((e.target as HTMLInputElement).value);
}

const debouncedEmit = debounce((v: string) => {
  emit("input", v);
}, 300);

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

input[type="search"]::-ms-clear {
  @apply hidden h-0 w-0;
}
input[type="search"]::-ms-reveal {
  @apply hidden h-0 w-0;
}

input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  @apply hidden;
}
</style>
