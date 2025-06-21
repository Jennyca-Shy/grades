<script setup>
const props = defineProps({
  subject: String,
  title: String,
  date: String,
  grade: String,
});
</script>

<template>
  <div :class="`bg-gray-100 p-2 rounded-md flex items-center border-l-[3px] cursor-pointer`">
    <div class="">
      <div class="text-xs flex">{{ subject }}, am {{ date }}</div>
      <div class="">{{ title }}</div>
    </div>
    <div v-if="grade" class="ml-auto mr-2 text-sm">{{ grade }}</div>
    <div v-else class="ml-auto mr-2 text-sm">ausstehend</div>
  </div>
</template>
