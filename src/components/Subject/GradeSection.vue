<script setup>
import { ref, onMounted } from 'vue';
import Semester from './Semester.vue';
import { useGradeStore } from '@/stores/gradeStore';
import GradesOverview from '../Dashboard/GradesOverview.vue';

const props = defineProps({
  propSubject: Object,
});

const gradeStore = useGradeStore();

//Semester overview

const { firstSemester, secondSemester, thirdSemester, fourthSemester } =
  gradeStore.getGradesSortedBySemester(props.propSubject);
// const firstSemester = ref([]);
// const secondSemester = ref([]);
// const thirdSemester = ref([]);
// const fourthSemester = ref([]);
// async function getSemester() {
//   const response = await fetch(`http://localhost:3000/grade/subject/${props.propSubject._id}`);
//   let data = await response.json();

//   firstSemester.value = data.filter((grade) => {
//     return grade.semester == '12/1';
//   });
//   secondSemester.value = data.filter((grade) => {
//     return grade.semester == '12/2';
//   });
//   thirdSemester.value = data.filter((grade) => {
//     return grade.semester == '13/1';
//   });
//   fourthSemester.value = data.filter((grade) => {
//     return grade.semester == '13/2';
//   });
// }

onMounted(() => {
  // getSemester();
  gradeStore.init();
});
</script>

<template>
  <!-- Bottom left: Overview of grades -->
  <div class="bg-white rounded-md p-2 overflowy-scrolly h-[250px] md:h-auto">
    <h1>
      Grade Section
      <hr :style="`background-color: ${propSubject?.color};`" />
    </h1>
    <div class="mt-2 pb-2 space-y-1 flex-1">
      <Semester
        v-if="propSubject && firstSemester"
        :propSubject="propSubject"
        :semesterGrades="firstSemester"
        semester="12/1"
      />
      <Semester
        v-if="propSubject && secondSemester"
        :propSubject="propSubject"
        :semesterGrades="secondSemester"
        semester="12/2"
      />
      <Semester
        v-if="propSubject && thirdSemester"
        :propSubject="propSubject"
        :semesterGrades="thirdSemester"
        semester="13/1"
      />
      <Semester
        v-if="propSubject && fourthSemester"
        :propSubject="propSubject"
        :semesterGrades="fourthSemester"
        semester="13/2"
      />
    </div>
  </div>
</template>
