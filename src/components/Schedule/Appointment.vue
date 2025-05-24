<script setup>
const props = defineProps({
  title: String,
  color: String,
  module: String,
});
</script>

<template>
  <!-- One single appointment -->
  <div class="mx-2 mt-1" v-if="module === 'single'">
    <div class="rounded-md w-full text-xs" :style="`background-color: ${color};`">
      {{ title }}
    </div>
  </div>

  <!-- Start appointment -->
  <div class="ml-2 mt-1" v-if="module === 'start'">
    <div class="rounded-l-md w-full text-xs" :style="`background-color: ${color};`">
      {{ title }}
    </div>
  </div>

  <!-- Middle appointment -->
  <div class="mt-1" v-if="module === 'middle'">
    <div class="w-full text-xs" :style="`background-color: ${color};`">
      {{ title }}
    </div>
  </div>

  <!-- End appointment -->
  <div class="mr-2 mt-1" v-if="module === 'end'">
    <div class="rounded-r-md w-full text-xs" :style="`background-color: ${color};`">
      {{ title }}
    </div>
  </div>
</template>
