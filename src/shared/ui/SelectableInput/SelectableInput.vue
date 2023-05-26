<template>
  <div class="grid grid-cols-[0.67fr_0.33fr] padding-small relative">
    <TextInput
      class="border-r-[1px] border-r-white-gray"
      v-model="valueModel"
    />
    <TextInput type="search" v-model="searchModel" />

    <button class="flex gap-[3.3rem] items-center">
      <slot name="button" />

      <Icon name="cross" v-show="isOpened" key="1" />
      <Icon name="arrow-down" v-show="!isOpened" key="2" />
    </button>

    <Transition name="fade">
      <div
        class="absolute bottom-0 w-full max-h-[14.4rem] left-0"
        v-if="isOpened"
      >
        <slot name="menu" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Icon from "../Icon/Icon.vue";
import TextInput from "../Input/TextInput.vue";

const isOpened = ref<boolean>(false);

const valueModel = defineModel<string>("value", { required: true });

const searchModel = defineModel<string>("search", { required: true });
</script>

<style scoped lang="scss"></style>
