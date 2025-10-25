<script setup>
import CircleProgressHalf from './CircleProgressHalf.vue';
import VerticalProgressBar from './VerticalProgressBar.vue';
import { ref, onMounted } from 'vue';

let lk = ref([]);
let gk = ref([]);
async function getSubjects() {
  const response = await fetch('http://localhost:3000/subject');
  const data = await response.json();

  lk.value = data.filter((subject) => {
    return subject.type == 'LK';
  });

  console.log('LK: ', lk.value);
  console.log('HEYYYY');

  gk.value = data.filter((subject) => {
    return subject.type == 'GK';
  });

  getPoints();
}

let lkPoints = ref([]);
let gkPoints = ref([]);
async function getPoints() {
  for (const sub of lk.value) {
    let id = sub._id;
    const response = await fetch(`http://localhost:3000/grade/subject/${id}`);
    const data = await response.json();

    let totalPoints = 0;
    let gottenPoints = 0;

    data.forEach((grade) => {
      totalPoints += +grade.outOf;
      gottenPoints += grade.result;
    });
    lkPoints.value.push([gottenPoints, totalPoints - gottenPoints, sub.name.substr(0, 3)]);
  }
  console.log('LK points: ', lkPoints.value);

  for (const sub of gk.value) {
    let id = sub._id;
    const response = await fetch(`http://localhost:3000/grade/subject/${id}`);
    const data = await response.json();

    let totalPoints = 0;
    let gottenPoints = 0;

    data.forEach((grade) => {
      totalPoints += +grade.outOf;
      gottenPoints += grade.result;
    });
    gkPoints.value.push([gottenPoints, totalPoints - gottenPoints, sub.name.substr(0, 3)]);
  }
}

onMounted(() => {
  getSubjects();
});
</script>

<template>
  <div class="bg-white rounded-md m-2 p-2 flex items-center justify-center">
    <CircleProgressHalf />
    <div class="self-stretch bg-gray-200 w-[3px] rounded-md mx-6"></div>
    <div class="self-stretch mt-2 mb-3">
      <h1 class="mb-3">
        Overview
        <hr class="bg-newBlue" />
      </h1>
      <div class="flex flex-row gap-8">
        <!-- vertical progress bars -->
        <div class="flex gap-2">
          <VerticalProgressBar
            v-for="sub in lkPoints"
            :progress="sub[0]"
            :lost="sub[1]"
            :subject="sub[2]"
          />
        </div>
        <div class="flex gap-2">
          <VerticalProgressBar
            v-for="sub in gkPoints"
            :progress="sub[0]"
            :lost="sub[1]"
            :subject="sub[2]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
