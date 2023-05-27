<template>
  <span data-test="search"> {{ search }}</span>
  <span data-test="value"> {{ value }}</span>

  <SelectableInput
    @open="onOpen"
    :isOpened="isOpened"
    :value="value"
    @input="(v: string) => (value = v)"
    v-model:search="search"
  />

  <div id="opened">
    {{ isOpened ? "opened" : "closed" }}
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SelectableInput from "../SelectableInput.vue";

const search = ref<string>("");

const value = ref<string>("");

const isOpened = ref<boolean>(false);

function onOpen() {
  isOpened.value = !isOpened.value;
}
</script>

<style scoped lang="scss"></style>
