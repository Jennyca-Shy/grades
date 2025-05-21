<script setup>
defineProps({
  progress: Number,
  lost: Number,
  subject: String,
});
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="flex w-2 h-32 bg-gray-200 rounded-md">
      <div class="flex flex-col justify-end h-full w-full">
        <div
          class="bg-blue-500/50 w-full rounded-t-full mb-[-2px]"
          role="progressbar"
          :aria-valuenow="lost"
          aria-valuemin="0"
          aria-valuemax="100"
          :style="`height: calc(${lost}% + 2px)`"
        ></div>
        <div
          class="bg-blue-500 w-full rounded-b-full rounded-t-full"
          role="progressbar"
          :aria-valuenow="progress"
          aria-valuemin="0"
          aria-valuemax="100"
          :style="`height: ${progress}%`"
        ></div>
      </div>
    </div>
    <p class="font-[550]">{{ subject }}</p>
  </div>
</template>
