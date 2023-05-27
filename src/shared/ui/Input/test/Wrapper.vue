<template>
  <TextInput v-model="reffy" />
  <span>
    {{ reffy }}
  </span>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TextInput from "../TextInput.vue";

const reffy = ref<string>("");
</script>

<style scoped lang="scss"></style>
