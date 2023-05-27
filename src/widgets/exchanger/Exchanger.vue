<template>
  <section class="container flex flex-col gap-[6rem]">
    <header class="flex flex-col gap-[1.6rem]">
      <h1 class="heading-big">Crypto Exchange</h1>
      <h2 class="text-big">Exchange fast and easy</h2>
    </header>

    <TheExchanger />

    <ExchangeSender />
  </section>
</template>

<script setup lang="ts">
import ExchangeSender from "@/features/Exchange/ExchangeSender.vue";
import TheExchanger from "@/features/Exchange/TheExchanger.vue";
</script>

<style scoped lang="scss"></style>
