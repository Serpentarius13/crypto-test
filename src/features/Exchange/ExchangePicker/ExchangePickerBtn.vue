<template>
  <button>
    <BaseLoader v-show="store.isLoading" key="1" />
    <BaseIcon name="exchange" v-show="!store.isLoading" key="2" />
  </button>
</template>

<script setup lang="ts">
import BaseIcon from "@/shared/ui/Icon/BaseIcon.vue";
import BaseLoader from "@/shared/ui/Loader/BaseLoader.vue";
import { useExchangerStore } from "../store/useExchangerStore/useExchangerStore.js";

const store = useExchangerStore();
</script>

<style scoped lang="scss"></style>
