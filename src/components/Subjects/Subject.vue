<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
const route = useRoute();

const props = defineProps({
  subject: String,
  teacher: String,
  color: String,
  id: String,
});

let averageGrade = ref(0);
async function getAverage() {
  const response = await fetch('http://localhost:3000/grade');
  let data = await response.json();

  let allGrades = data.filter((grade) => {
    return grade.subject._id === props.id && grade.result && grade.type != 'Abitur';
  });

  console.log('All grades: ', props.subject, allGrades);

  if (Object.keys(allGrades).length > 0) {
    for (const elem of allGrades) {
      averageGrade.value += elem.result;
    }
    console.log('Average grade: ', averageGrade);
    averageGrade.value = averageGrade.value / Object.keys(allGrades).length;
    averageGrade.value = averageGrade.value.toFixed(2);
  } else {
    averageGrade.value = '...';
  }

  console.log('result: ', averageGrade.value);
}

onMounted(() => {
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
