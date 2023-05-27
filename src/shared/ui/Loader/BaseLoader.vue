<template>
  <div
    class="lds-dual-ring"
    :style="{ '--width': size, '--color': color }"
  ></div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: number | string; color?: string }>(), {
  size: 24,
  color: "#000",
});
</script>

<style scoped lang="scss">
.lds-dual-ring {
  --width: 80;
  --color: #000;
  display: inline-block;
  width: calc(var(--width) * 1px);
  height: calc(var(--width) * 1px);
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: calc(var(--width) * 0.8px);
  height: calc(var(--width) * 0.8px);
  margin: calc(var(--width) * 0.1px);
  border-radius: 50%;
  border: calc(var(--width) * 0.08px) solid var(--color);
  border-color: var(--color) transparent var(--color) transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
