<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  semesterGrades: Array,
  propSubject: Object,
  semester: String,
});

console.log('Semester subject: ', props.propSubject);

const moreOpen = ref(false);
const color = computed(() => props.propSubject.color);

const formattedGrades = computed(() =>
  props.semesterGrades
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((grade) => {
      const date = new Date(grade.date);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();

      return {
        ...grade,
        date: `${day}.${month}.${year}`,
      };
    }),
);

let sum = computed(() => {
  const validGrades = formattedGrades.value.filter((g) => g.result != null);
  if (validGrades.length === 0) return '...';
  const total = validGrades.reduce((acc, g) => acc + g.result, 0);
  return (total / validGrades.length).toFixed(1); // optional: round
});
</script>

<template>
  <div class="bg-gray-100 p-1 rounded-md border-l-[3px]" :style="`border-color: ${color}`">
    <div class="flex justify-between" @click="moreOpen ? (moreOpen = false) : (moreOpen = true)">
      <div class="">
        <div class="text-xs flex">Semester</div>
        <div class="">{{ semester }}</div>
      </div>
      <div class="ml-auto">
        <div class="text-xs flex">Average</div>
        <div v-if="sum" class="">{{ sum }}</div>
      </div>
    </div>
    <div v-if="moreOpen" class="mt-2">
      <hr class="bg-gray-300 mt-0 h-[2px]" :style="`background-color: ${color}`" />
      <table v-if="formattedGrades.length > 0" class="mt-2 w-full text-start">
        <tr class="border-b-2 border-gray-300">
          <th class="text-left uppercase text-gray-500 font-normal">Title</th>
          <th class="text-left uppercase text-gray-500 font-normal">Type</th>
          <th class="text-left uppercase text-gray-500 font-normal">Date</th>
          <th class="text-left uppercase text-gray-500 font-normal">Grade</th>
        </tr>
        <tr v-for="grade in formattedGrades">
          <td class="pt-1">{{ grade.title }}</td>
          <td class="pt-1">{{ grade.type }}</td>
          <td class="pt-1">{{ grade.date }}</td>
          <td class="pt-1">{{ grade.result ? grade.result : 'tba' }}</td>
        </tr>
      </table>
      <div v-else class="mt-2">No grades yet.</div>
    </div>
  </div>
</template>
