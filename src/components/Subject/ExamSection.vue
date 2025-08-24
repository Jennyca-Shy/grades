<script setup>
import { ref, onMounted } from 'vue';
import AddExamsModal from '../Modal/AddExamsModal.vue';
import Exam from '../Exam.vue';

const props = defineProps({
  propSubject: Object,
});

let subject = ref(props.propSubject);
let id = ref(subject.value._id);
console.log('ID: ', id.value);

const addExamsOpen = ref(false);
let activeNavExam = ref('upcoming');

//Exams in navbar
let upcomingExams = ref([]);
let pastExams = ref([]);
let today = new Date();
console.log('Today: ', today);
async function getExams() {
  const response = await fetch('http://localhost:3000/grade');
  const data = await response.json();
  upcomingExams.value = data.filter((exam) => {
    return exam.subject._id === id.value && new Date(exam.date) >= today && exam.result === null;
  });

  pastExams.value = data.filter((exam) => {
    return (
      (exam.subject._id === id.value && new Date(exam.date) < today) ||
      (exam.subject._id === id.value && exam.result != null)
    );
  });

  console.log('upcoming: ', upcomingExams.value);
  console.log('past: ', pastExams.value);
  console.log('all exams: ', data);
}

onMounted(() => {
  getExams();
});
</script>
<template>
  <div class="bg-white rounded-md p-2 overflowy-scrolly">
    <div class="mb-2 flex justify-between">
      <h1>
        Exams:
        <hr :style="`background-color: ${subject?.color};`" />
      </h1>
      <div class="flex">
        <AddExamsModal
          v-if="addExamsOpen"
          @close="addExamsOpen = false"
          @added="
            () => {
              getExams();
            }
          "
          :color="subject?.color"
          :subject="subject"
        />
        <!-- Exams navbar -->
        <nav class="flex gap-x-2 border-b justify-end" :style="`border-color: ${subject?.color};`">
          <a
            @click="activeNavExam = 'upcoming'"
            :class="[
              'border px-2 py-1 rounded-t-lg -mb-px hover:cursor-pointer',
              activeNavExam === 'upcoming' ? 'bg-white' : 'bg-gray-100',
            ]"
            :style="`border-bottom-color: ${activeNavExam === 'upcoming' ? '#FFFFFF' : `${subject?.color}`};
                border-left-color: ${subject?.color};
                border-right-color: ${subject?.color};
                border-top-color: ${subject?.color};`"
            >Upcoming ({{ upcomingExams.length }})</a
          >
          <a
            @click="activeNavExam = 'past'"
            :class="[
              'border px-2 py-1 rounded-t-lg -mb-px hover:cursor-pointer',
              activeNavExam === 'past' ? 'bg-white' : 'bg-gray-100',
            ]"
            :style="`border-bottom-color: ${activeNavExam === 'past' ? '#FFFFFF' : `${subject?.color}`};
                border-left-color: ${subject?.color};
                border-right-color: ${subject?.color};
                border-top-color: ${subject?.color};`"
            >Past ({{ pastExams.length }})</a
          >
        </nav>

        <button
          class="px-1 border-2 rounded-md ml-4"
          :style="`border-color: ${subject?.color}`"
          @click="addExamsOpen = true"
        >
          Add
        </button>
      </div>
    </div>

    <!-- Exams -->
    <div v-if="activeNavExam === 'upcoming'" class="space-y-2 overflowy-scrolly">
      <Exam
        v-if="upcomingExams.length > 0"
        v-for="exam in upcomingExams"
        :exam="exam"
        @finished="getExams"
        @added="getExams"
      />
      <div v-else class="">Pheew, no upcoming exam...yet</div>
    </div>
    <div v-if="activeNavExam === 'past'" class="space-y-2 overflowy-scrolly">
      <Exam
        v-if="pastExams.length > 0"
        v-for="exam in pastExams"
        :exam="exam"
        @finished="getExams"
        @added="getExams"
      />
      <div v-else class="">Wohoo, no Exams...yet</div>
    </div>
  </div>
</template>
