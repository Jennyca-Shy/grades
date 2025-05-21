<script setup>
import { computed } from 'vue';
const props = defineProps({
  subject: String,
  task: String,
  date: String,
  color: String,
});
const borderColorClass = computed(() => `border-${props.color}`);
const textColorClass = computed(() => `text-${props.color}`);
</script>

<template>
  <div
    :class="`bg-gray-100 p-2 rounded-md flex items-center my-1 border-l-[3px] ${borderColorClass}`"
  >
    <div class="">
      <div class="text-xs">{{ subject }}</div>
      <div class="">{{ task }}</div>
    </div>
    <div
      v-if="date"
      :class="`pi pi-ellipsis-v ml-auto cursor-pointer mr-1 ${textColorClass}`"
    ></div>
    <div
      v-else
      :class="`cursor-pointer border-[3px] ${borderColorClass} rounded-full size-6 ml-auto mr-2`"
    ></div>
  </div>
</template>
