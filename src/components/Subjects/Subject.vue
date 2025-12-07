<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { onMounted, ref, computed } from 'vue';
import { useGradeStore } from '@/stores/gradeStore';

const props = defineProps({
  subject: String,
  teacher: String,
  color: String,
  id: String,
});

const route = useRoute();
const gradeStore = useGradeStore();

let averageGrade = ref(0);
async function getAverage() {
  // const response = await fetch('http://localhost:3000/grade');
  // let data = await response.json();

  const allGrades = gradeStore.getGradesWithResult(props.id);
  averageGrade.value = 0;

  console.log('All grades: ', props.subject, allGrades);

  if (allGrades.value.length > 0) {
    for (const elem of allGrades.value) {
      averageGrade.value += elem.result;
    }
    console.log('Average grade: ', averageGrade);
    averageGrade.value = averageGrade.value / allGrades.value.length;
    averageGrade.value = averageGrade.value.toFixed(2);
  } else {
    averageGrade.value = '...';
  }

  console.log('result: ', averageGrade.value);
}

onMounted(async () => {
  await gradeStore.init();
  getAverage();
});
</script>

<template>
  <RouterLink :to="`${route.path}/${props.id}`">
    <div class="p-2 rounded-md cursor-pointer" :style="`background-color: ${color}`">
      <h2 class="text-lg">{{ subject }}</h2>
      <div class="flex justify-between items-center">
        <div class="">Ø {{ averageGrade }}</div>
        <div class="text-sm">{{ teacher }}</div>
      </div>
    </div>
  </RouterLink>
</template>
