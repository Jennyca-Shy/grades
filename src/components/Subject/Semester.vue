<script setup>
import { ref } from 'vue';

const props = defineProps({
  semesterGrades: Array,
});

const moreOpen = ref(false);
const color = '#808080';
</script>

<template>
  <div class="bg-gray-100 p-1 rounded-md border-l-[3px]" :style="`border-color: ${color}`">
    <div class="flex justify-between" @click="moreOpen ? (moreOpen = false) : (moreOpen = true)">
      <div class="">
        <div class="text-xs flex">Semester</div>
        <div class="">12/1</div>
      </div>
      <div class="ml-auto">
        <div class="text-xs flex">Average</div>
        <div class="">13.4</div>
      </div>
    </div>
    <div v-if="moreOpen" class="mt-2">
      <hr class="bg-gray-300 mt-0 h-[2px]" :style="`background-color: ${color}`" />
      <table class="mt-2 w-full text-start">
        <tr class="border-b-2 border-gray-300">
          <th class="text-left uppercase text-gray-500 font-normal">Title</th>
          <th class="text-left uppercase text-gray-500 font-normal">Type</th>
          <th class="text-left uppercase text-gray-500 font-normal">Date</th>
          <th class="text-left uppercase text-gray-500 font-normal">Grade</th>
        </tr>
        <tr>
          <td class="pt-2">Test</td>
          <td class="pt-2">Kurzarbeit</td>
          <td class="pt-2">20.09.2024</td>
          <td class="pt-2">13</td>
        </tr>
        <tr>
          <td class="pt-1">Test 2</td>
          <td class="pt-1">Schulaufgabe</td>
          <td class="pt-1">13.09.2024</td>
          <td class="pt-1">10</td>
        </tr>
        <tr>
          <td class="pt-1">Test 2</td>
          <td class="pt-1">Schulaufgabe</td>
          <td class="pt-1">13.09.2024</td>
          <td class="pt-1">10</td>
        </tr>
      </table>
    </div>
  </div>
</template>
