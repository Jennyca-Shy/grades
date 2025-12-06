<script setup>
import CircleProgressHalf from './CircleProgressHalf.vue';
import VerticalProgressBar from './VerticalProgressBar.vue';
import { ref, onMounted } from 'vue';
import { useSubjectStore } from '@/stores/subjectStore';

const subjectStore = useSubjectStore();
/*async function getSubjects() {
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
}*/

let lkPoints = ref([]);
let gkPoints = ref([]);
let sonstigesPoints = ref([]);
let maxPointsGK = 0;
let maxPointsAbi = 0;
let maxPointsLK = 0;
async function getPoints() {
  for (const sub of subjectStore.lk) {
    let id = sub._id;
    const response = await fetch(`http://localhost:3000/grade/subject/${id}`);
    const data = await response.json();

    let totalPoints = 0;
    let gottenPoints = 0;

    data.forEach((grade) => {
      totalPoints += +grade.outOf;
      gottenPoints += grade.result;
    });
    lkPoints.value.push([gottenPoints, totalPoints - gottenPoints, sub.name.substr(0, 3), id]);
  }

  for (const sub of subjectStore.gk) {
    let id = sub._id;
    const response = await fetch(`http://localhost:3000/grade/subject/${id}`);
    const data = await response.json();

    let totalPoints = 0;
    let gottenPoints = 0;

    data.forEach((grade) => {
      totalPoints += +grade.outOf;
      gottenPoints += grade.result;
    });
    gkPoints.value.push([gottenPoints, totalPoints - gottenPoints, sub.name.substr(0, 3), id]);
  }

  for (const sub of subjectStore.sonstiges) {
    let id = sub._id;
    const response = await fetch(`http://localhost:3000/grade/subject/${id}`);
    const data = await response.json();

    let totalPoints = 0;
    let gottenPoints = 0;

    data.forEach((grade) => {
      totalPoints += +grade.outOf;
      gottenPoints += grade.result;
    });
    sonstigesPoints.value.push([
      gottenPoints,
      totalPoints - gottenPoints,
      sub.name.substr(0, 3),
      id,
    ]);
  }
  console.log('gk points: ', gkPoints.value);
}

onMounted(async () => {
  //getSubjects();
  await subjectStore.init();
  getPoints();
});
</script>

<template>
  <div class="bg-white rounded-md m-2 p-2 flex justify-center items-center pl-6">
    <CircleProgressHalf />
    <div class="self-stretch bg-gray-200 w-[3px] rounded-md mx-6 hidden sm:block"></div>
    <div class="self-stretch mt-2 mb-3 overflow-hidden hidden sm:block">
      <h1 class="mb-3">
        Overview
        <hr class="bg-newBlue" />
      </h1>
      <div class="flex flex-row gap-8">
        <!-- vertical progress bars -->

        <div class="flex gap-2">
          <RouterLink v-for="sub in lkPoints" :to="`/subjects/${sub[3]}`">
            <VerticalProgressBar :progress="sub[0]" :lost="sub[1]" :subject="sub[2]" />
          </RouterLink>
        </div>
        <div class="gap-2 hidden sm:flex">
          <RouterLink v-for="sub in gkPoints" :to="`/subjects/${sub[3]}`">
            <VerticalProgressBar :progress="sub[0]" :lost="sub[1]" :subject="sub[2]" />
          </RouterLink>
        </div>
        <div class="gap-2 hidden sm:flex">
          <RouterLink v-for="sub in sonstigesPoints" :to="`/subjects/${sub[3]}`">
            <VerticalProgressBar :progress="sub[0]" :lost="sub[1]" :subject="sub[2]" />
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
