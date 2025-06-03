<script setup>
import { RouterLink } from 'vue-router';
defineProps({
  duration: String,
  subject: String,
  room: String,
  color: String,
});
</script>

<template>
  <RouterLink :to="'/schedule'">
    <li :class="`mb-2 ml-3 p-2 ${color} rounded-md`">
      <div
        class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"
      ></div>
      <div v-if="subject" class="">
        <time class="mb-1 text-sm font-normal leading-none text-gray-400">{{ duration }}</time>
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-900">{{ subject }}</h3>
          <p class="text-gray-400 text-sm">{{ room }}</p>
        </div>
      </div>
      <div v-else class="">
        <h3 class="text-gray-900">{{ duration }} break</h3>
      </div>
    </li>
  </RouterLink>
</template>
