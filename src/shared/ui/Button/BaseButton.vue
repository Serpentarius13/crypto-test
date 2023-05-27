<template>
  <button class="btn text-small rounded-very-small"><slot /></button>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.btn {
  @apply w-fit transition-all outline-none border-none focus:ring-2 focus:ring-gray-600  leading-[120%];

  &.blue {
    @apply bg-light-blue text-white hover:bg-blue active:bg-blue;
    @apply disabled:bg-light-blue;
  }

  &.medium {
    @apply font-bold py-[1.5rem] px-[5.9rem];
  }
}
</style>
